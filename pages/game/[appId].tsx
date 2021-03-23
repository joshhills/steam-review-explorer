import React, { useState } from "react"
import { useRouter } from 'next/router'
import SteamWebApiClient from "lib/utils/SteamWebApiClient"
import { Row, Col, Breadcrumb, Alert } from "react-bootstrap"
import Breakdown from "components/Breakdown"
import Loader from "components/Loader"
import GameSummary from "components/GameSummary"
import Link from "next/link"

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
    const [update, setUpdate] = useState({count: 0, averageRequestTime: 0, bytes: 0})

    // Retrieve the app ID from the query params
    const router = useRouter()
    let appId = router.query.appId as string

    // Initial state fetch
    if (game === null && appId !== undefined) {

        SteamWebApiClient.getGame(appId)
            .then((withGame) => { setActiveGame(withGame); return withGame })
            .then((withGame) => {
                SteamWebApiClient.getReviews(withGame, appId, setUpdate, setScrapeError).then((withReviews) => {
                    setReviews(withReviews)

                    if (withReviews.length !== withGame.total_reviews) {
                        setWasReviewCountMismatch({ originalTotal: withGame.total_reviews })

                        let numPositive = 0
                        let numNegative = 0
                        
                        for (let review of withReviews) {
                            review.voted_up ? numPositive++ : numNegative++ 
                        }

                        setActiveGame({ ...withGame, total_reviews: withReviews.length, total_positive: numPositive, total_negative: numNegative })
                    }
                })
            })
    }

    // Navigate to the home page
    const navigateHome = () => {
        router.push('/')
    }

    return (
        <Row>
            <Col>
                {game && reviews && <>
                    <Breadcrumb className="mb-5">
                        <Breadcrumb.Item onClick={navigateHome}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>{game.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <GameSummary game={game}/>
                </>}

                {game && (reviews ?
                    <>
                        {wasReviewCountMismatch && <Alert show={showAlert} onClose={() => setShowAlert(false)} variant="warning" dismissible>
                            Steam reported a total of {wasReviewCountMismatch.originalTotal.toLocaleString()} reviews but {reviews.length.toLocaleString()} were retrieved.
                            {' '}<Link href="/about#known-issues-mismatched-totals">Why can this happen?</Link></Alert>}
                        <Breakdown game={game} reviews={reviews}/>
                    </>
                    : <Loader game={game} update={update} error={scrapeError} cancelLoading={navigateHome}/>)}
            </Col>
        </Row>
    )
}

export default Game