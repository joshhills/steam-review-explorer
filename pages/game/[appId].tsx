import React, { useState } from "react"
import { useRouter } from 'next/router'
import SteamWebApiClient from "lib/utils/SteamWebApiClient"
import { Row, Col, Breadcrumb, Alert, Spinner } from "react-bootstrap"
import BetaNotice from "components/BetaNotice"
import Breakdown from "components/Breakdown"
import Loader from "components/Loader"
import GameSummary from "components/GameSummary"
import Link from "next/link"
import ReviewListUtils from "lib/utils/ReviewListUtils"
import dateFormat from "dateformat"
import supportedLocales from "lib/utils/SteamLocales"
import _ from "lodash"

/**
 * A page to scrape game info and propagate it
 * to breakdowns
 */
const Game = () => {

    // Format some stats for display
    const dateFormatString = 'mmm d, yyyy'

    // State objects
    const [game, setActiveGame] = useState(null)
    const [showAlert, setShowAlert] = useState(true)
    const [wasReviewCountMismatch, setWasReviewCountMismatch] = useState(null)
    const [didProceed, setDidProceed] = useState(false)
    const [scrapeError, setScrapeError] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [reviewStatistics, setReviewStatistics] = useState(null)
    const [timeStartedScraping, setTimeStartedScraping] = useState(Date.now())
    const [update, setUpdate] = useState({checked: 0, count: 0, averageRequestTime: 0, bytes: 0, finished: false})

    // Retrieve the app ID from the query params
    const router = useRouter()
    let appId = router.query.appId as string

    let start = +(router.query.start as string)
    let end = +(router.query.end as string)
    const startDate = isNaN(start) ? new Date(0) : new Date(start)
    const endDate = isNaN(end) ? new Date() : new Date(end)

    let selectedLanguages = []
    let languages = router.query.languages as string
    if (languages) {
        selectedLanguages = languages.split(',')
    }

    let missingParams = isNaN(start) || isNaN(end)

    // Initial state fetch
    if (game === null && appId !== undefined) {

        const abortController = new AbortController()

        SteamWebApiClient.getGame(appId, selectedLanguages)
            .then((withGame) => { setActiveGame(withGame); return withGame })
            .then((withGame) => {

                if (withGame.total_reviews === 0) {
                    let newUpdate = _.clone(update)
                    newUpdate.finished = true
                    setUpdate(newUpdate)
                    return
                }

                SteamWebApiClient.getReviews(withGame, appId, setUpdate, setScrapeError, abortController, startDate, endDate, selectedLanguages).then((withReviews) => {
                    
                    if (withReviews.length === 0) {
                        return
                    }

                    const reviewStatisticsComputed = ReviewListUtils.processReviewsForGame(withGame, withReviews)
                    setReviewStatistics(reviewStatisticsComputed)

                    setReviews(withReviews)

                    if (withReviews.length < withGame.total_reviews) {
                        setWasReviewCountMismatch({ originalTotal: withGame.total_reviews })
                        setActiveGame({ ...withGame, total_reviews: withReviews.length, total_positive: reviewStatisticsComputed.totalReviewsPositive, total_negative: reviewStatisticsComputed.totalReviewsNegative })
                    }
                })
            })
    }

    const onProceed = () => {
        if (scrapeError.abortController) {
            scrapeError.abortController.abort('User clicked cancel')
            setDidProceed(true)
        }
    }

    return (<>
        <BetaNotice />
        <Row>
            <Col>
                {game && reviews && <>
                    <div className="bg-light rounded-3 p-3 mb-4">
                        <Breadcrumb className="mb-0">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <Breadcrumb.Item active>{game.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <GameSummary game={game}/>
                </>}

                {game && (reviews ?
                    <>
                        {missingParams && wasReviewCountMismatch && <Alert show={showAlert} onClose={() => setShowAlert(false)} variant="warning" dismissible>
                            {didProceed && 'You chose to proceed early, so only '}{reviews.length.toLocaleString()} out of a reported {wasReviewCountMismatch.originalTotal.toLocaleString()} review{wasReviewCountMismatch.originalTotal !== 1 ? 's were' : ' was'} retrieved.
                            {' '}{!didProceed && <Link href="/about#known-issues-mismatched-totals">Why can this happen?</Link>}
                            {reviews.length > 30000 && reviews.length <= 50000 && <><br/>Due to the large number of reviews for this product the site may perform slowly</>}
                            {reviews.length > 50000 && <><br/>Due to the large number of reviews for this product, the site may perform slowly and even crash</>}
                            </Alert>}
                        {!missingParams && <Alert show={showAlert} onClose={() => setShowAlert(false)} variant="info" dismissible>
                                Retrieved {reviewStatistics.totalReviews.toLocaleString()} total public reviews in {selectedLanguages.length === 0 || selectedLanguages.length === Object.keys(supportedLocales).length ? 'all languages' : `${selectedLanguages.length} language${selectedLanguages.length !== 1 ? 's' : ''}`}, in date range {dateFormat(new Date(reviewStatistics.reviewMinTimestampCreated.timestamp_updated * 1000), dateFormatString)} - {dateFormat(new Date(reviewStatistics.reviewMaxTimestampUpdated.timestamp_updated * 1000), dateFormatString)}
                            </Alert>}
                        <Breakdown game={game} reviews={reviews} reviewStatistics={reviewStatistics} selectedLanguages={selectedLanguages.map((l) => { return {label: supportedLocales[l].englishName, value: l} })}/>
                    </>
                    : <Loader game={game} update={update} error={scrapeError} proceedCallback={onProceed} timeStartedScraping={timeStartedScraping} foreverTime={missingParams} />)}

                {!game && <Row><Spinner className="mx-auto mt-2" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner></Row>}
            </Col>
        </Row>
    </>)
}

export default Game