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

/**
 * A page to scrape game info and propagate it
 * to breakdowns
 */
const Game = () => {

    // State objects
    const [game, setActiveGame] = useState(null)
    const [showAlert, setShowAlert] = useState(true)
    const [wasReviewCountMismatch, setWasReviewCountMismatch] = useState(null)
    const [scrapeError, setScrapeError] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [reviewStatistics, setReviewStatistics] = useState(null)
    const [update, setUpdate] = useState({count: 0, averageRequestTime: 0, bytes: 0, finished: false})

    // Retrieve the app ID from the query params
    const router = useRouter()
    let appId = router.query.appId as string

    // Initial state fetch
    if (game === null && appId !== undefined) {

        SteamWebApiClient.getGame(appId)
            .then((withGame) => { setActiveGame(withGame); return withGame })
            .then((withGame) => {
                SteamWebApiClient.getReviews(withGame, appId, setUpdate, setScrapeError).then((withReviews) => {
                    
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

    return (<>
        <BetaNotice />
        <Row>
            <Col>
                {game && reviews && <>
                    <Breadcrumb className="mb-5">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                        <Breadcrumb.Item active>{game.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <GameSummary game={game}/>
                </>}

                {game && (reviews ?
                    <>
                        {wasReviewCountMismatch && <Alert show={showAlert} onClose={() => setShowAlert(false)} variant="warning" dismissible>
                            Steam reported a total of {wasReviewCountMismatch.originalTotal.toLocaleString()} reviews but {reviews.length.toLocaleString()} {reviews.length !== 1 ? 'were' : 'was'} retrieved.
                            {' '}<Link href="/about#known-issues-mismatched-totals">Why can this happen?</Link>
                            {reviews.length > 30000 && reviews.length <= 50000 && <><br/>Due to the large number of reviews for this product the site may perform slowly</>}
                            {reviews.length > 50000 && <><br/>Due to the large number of reviews for this product, the site may perform slowly and even crash</>}
                            </Alert>}
                        <Breakdown game={game} reviews={reviews} reviewStatistics={reviewStatistics}/>
                    </>
                    : <Loader game={game} update={update} error={scrapeError}/>)}

                {!game && <Row><Spinner className="mx-auto mt-2" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner></Row>}
            </Col>
        </Row>
    </>)
}

export default Game