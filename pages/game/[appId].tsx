import React, { useState } from "react"
import { useRouter } from 'next/router'
import SteamWebApiClient from "lib/utils/SteamWebApiClient"
import { Row, Col, Breadcrumb, Alert, Spinner, Card, Button } from "react-bootstrap"
import BetaNotice from "components/BetaNotice"
import Breakdown from "components/Breakdown"
import Loader from "components/Loader"
import GameSummary from "components/GameSummary"
import Link from "next/link"
import ReviewListUtils from "lib/utils/ReviewListUtils"
import dateFormat from "dateformat"
import supportedLocales from "lib/utils/SteamLocales"
import _ from "lodash"
import DBUtils from "lib/utils/DBUtils"
import { FaArrowsRotate } from "react-icons/fa6"

/**
 * A page to scrape game info and propagate it
 * to breakdowns
 */
const Game = () => {

    // Format some stats for display
    const dateFormatString = 'mmm d, yyyy'
    const dateFormatStringDetailed = 'hh:MMtt, dd/mm/yyyy'

    // State objects
    const [originalGame, setOriginalGame] = useState(null)
    const [game, setActiveGame] = useState(null)
    const [showAlert, setShowAlert] = useState(true)
    const [wasReviewCountMismatch, setWasReviewCountMismatch] = useState(null)
    const [didProceed, setDidProceed] = useState(false)
    const [scrapeError, setScrapeError] = useState(null)
    const [reviewStatistics, setReviewStatistics] = useState(null)
    const [timeStartedScraping, setTimeStartedScraping] = useState(Date.now())
    const [update, setUpdate] = useState({checked: 0, count: 0, averageRequestTime: 0, bytes: 0, finished: false})
    const [dbCount, setDbCount] = useState(0)
    const [didSkipScrapingReviews, setDidSkipScrapingReviews] = useState(false)
    const [lastSearch, setLastSearch] = useState(null)

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

    const processReviews = (withGame, reviewCount) => {
        ReviewListUtils.processReviewsForGame(withGame).then((reviewStatisticsComputed) => {

            setReviewStatistics(reviewStatisticsComputed)

            if (reviewCount < withGame.total_reviews) {
                setWasReviewCountMismatch({ originalTotal: withGame.total_reviews })
                setActiveGame({ ...withGame, total_reviews: reviewCount, total_positive: reviewStatisticsComputed.totalReviewsPositive, total_negative: reviewStatisticsComputed.totalReviewsNegative })
            }
        })
    }

    const continueToScrapeReviews = (withGame) => {

        setDidSkipScrapingReviews(false)
        setReviewStatistics(null)
        
        const abortController = new AbortController()

        SteamWebApiClient.getReviews(withGame, appId, setUpdate, setScrapeError, abortController, startDate, endDate, selectedLanguages).then((reviewCount) => {
                            
            if (reviewCount === 0) {
                return
            }

            processReviews(withGame, reviewCount)
        })
    }

    const skipScrapingReviews = (withGame) => {
        setDidSkipScrapingReviews(true)
        processReviews(withGame, dbCount)
    }

    // Initial state fetch
    if (game === null && appId !== undefined) {

        SteamWebApiClient.getGame(appId, selectedLanguages)
            .then((withGame) => { setActiveGame(withGame); setOriginalGame(_.clone(withGame)); return withGame })
            .then((withGame) => {

                if (withGame.total_reviews === 0) {
                    let newUpdate = _.clone(update)
                    newUpdate.finished = true
                    setUpdate(newUpdate)
                    return
                }

                // Before getting reviews, check if we already have some
                const store = DBUtils.getReviewStoreForGame(withGame.steam_appid)
                store.count().then(dbCount => {
                    if (dbCount > 0) {
                        setDbCount(dbCount)

                        // So there are pre-existing ones, check if this matches the previous search
                        DBUtils.getSearch(withGame.steam_appid).then(search => {
                            if ((search.start === 0 && startDate.getTime() === 0) ||
                                (search.start === startDate.getTime()
                                && search.end === endDate.getTime())) {
                                setLastSearch(search)
                                // Was the same search, move to showing reviews
                                skipScrapingReviews(withGame)
                            } else {
                                continueToScrapeReviews(withGame)
                            }
                        })
                    } else {
                        continueToScrapeReviews(withGame)
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
        {/* <BetaNotice /> */}
        <Row>
            <Col>
                {game && <>
                    <div className="bg-light rounded-3 p-3 mb-4">
                        <Breadcrumb className="mb-0">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <Breadcrumb.Item active>{game.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {didSkipScrapingReviews && lastSearch &&
                        <Alert className="mb-4" variant={(Date.now() - lastSearch.when) > 3600000 ? 'warning' : 'info'}>
                            <Row>
                                <Col className="md-auto align-content-center" xs={9}>
                                    <p className="d-inline-block mb-0">You last explored at {dateFormat(new Date(lastSearch.when), dateFormatStringDetailed)}. {(Date.now() - lastSearch.when) > 3600000 ? 'It is recommended to search again as data may have changed.' : ''}</p>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <div>
                                        <Button onClick={() => continueToScrapeReviews(_.clone(originalGame))}><FaArrowsRotate/> Explore</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Alert>}
                    <GameSummary game={game}/>
                </>}

                {game && originalGame && (reviewStatistics ?
                    <>
                        {missingParams && wasReviewCountMismatch && <Alert show={showAlert} onClose={() => setShowAlert(false)} variant="warning" dismissible>
                            {didProceed && 'You chose to proceed without scraping all reviews, '}{reviewStatistics.totalReviews.toLocaleString()} out of a reported {wasReviewCountMismatch.originalTotal.toLocaleString()} review{wasReviewCountMismatch.originalTotal !== 1 ? 's were' : ' was'} retrieved.
                            {' '}{!didProceed && <Link href="/about#known-issues-mismatched-totals">Why can this happen?</Link>}
                            {reviewStatistics.totalReviews > 30000 && reviewStatistics.totalReviews <= 50000 && <><br/>Due to the large number of reviews for this product the site may perform slowly</>}
                            </Alert>}
                        {!missingParams && <Alert show={showAlert} onClose={() => setShowAlert(false)} variant="info" dismissible>
                                Retrieved {reviewStatistics.totalReviews.toLocaleString()} public review{reviewStatistics.totalReviews === 1 ? '' : 's'} in {selectedLanguages.length === 0 || selectedLanguages.length === Object.keys(supportedLocales).length ? 'all languages' : `${selectedLanguages.length} language${selectedLanguages.length !== 1 ? 's' : ''}`}, in date range {dateFormat(new Date(reviewStatistics.reviewMinTimestampCreated.timestamp_updated * 1000), dateFormatString)} - {dateFormat(new Date(reviewStatistics.reviewMaxTimestampUpdated.timestamp_updated * 1000), dateFormatString)}
                            </Alert>}
                        <Breakdown game={game} reviewStatistics={reviewStatistics} selectedLanguages={selectedLanguages.map((l) => { return {label: supportedLocales[l].englishName, value: l} })}/>
                    </>
                    : <Loader game={originalGame} update={update} error={scrapeError} proceedCallback={onProceed} timeStartedScraping={timeStartedScraping} foreverTime={missingParams} />)}

                {!game && <Row><Spinner className="mx-auto mt-2" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner></Row>}
            </Col>
        </Row>
    </>)
}

export default Game