import React, { useState } from "react"
import { useRouter } from 'next/router'
import SteamWebApiClient from "lib/utils/SteamWebApiClient"
import { Row, Col, Breadcrumb } from "react-bootstrap"
import Breakdown from "components/Breakdown"
import Loader from "components/Loader"
import GameSummary from "components/GameSummary"

/**
 * A page to scrape game info and propagate it
 * to breakdowns
 */
const Game = () => {

    // State objects
    const [game, setActiveGame] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [update, setUpdate] = useState({count: 0, averageRequestTime: 0, bytes: 0})

    // Retrieve the app ID from the query params
    const router = useRouter()
    let appId = router.query.appId as string

    // Initial state fetch
    if (game === null && appId !== undefined) {

        SteamWebApiClient.getGame(appId)
            .then(setActiveGame)
            .then(() => SteamWebApiClient.getReviews(appId, setUpdate)
            .then(setReviews))
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
                    <Breakdown game={game} reviews={reviews}/>
                    : <Loader game={game} update={update} cancelLoading={navigateHome}/>)}
            </Col>
        </Row>
    )
}

export default Game