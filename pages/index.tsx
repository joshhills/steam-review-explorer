import React, { useState } from "react"
import GameSearch from "../components/GameSearch"
import Breakdown from "../components/Breakdown"
import SteamWebApiClient from "lib/utils/SteamWebApiClient"
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap"
import Header from "components/Header"

function formatMs(ms) {
  let d = new Date(1000 * Math.round(ms / 1000))
  function pad(i) { return ('0' + i).slice(-2) }
  return d.getUTCHours() + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds())
}

const IndexPage = () => {

  const [activeGame, setActiveGame] = useState(null)
  const [activeGameReviews, setActiveGameReviews] = useState(null)
  const [scrapedReviewsUpdate, setScrapedReviewsUpdate] = useState({count: 0, averageRequestTime: 0})

  const cancelScraping = () => {
    location.reload()
  }

  const handleExit = () => {
    setActiveGame(null)
    setActiveGameReviews(null)
  }

  const handleScrapedReviewsUpdate = (update) => {
    setScrapedReviewsUpdate(update)
  }

  const handleGameSelected = (game) => {
    setActiveGame(game)
    SteamWebApiClient.getReviews(game.steam_appid, handleScrapedReviewsUpdate).then(setActiveGameReviews).then(() => {
      setScrapedReviewsUpdate({count: 0, averageRequestTime: 0})
    })
  }

  return (<>
    <Header />
    <Row>
      <Col>
        {activeGame? activeGameReviews ? <Breakdown game={activeGame} reviews={activeGameReviews} onExit={handleExit} /> :
          <Container>
            <ProgressBar className="mb-3" now={Math.round(scrapedReviewsUpdate.count / activeGame.total_reviews * 100)} label={`${Math.round(scrapedReviewsUpdate.count / activeGame.total_reviews * 100)}%`}/>
            <p>Loading <code>{scrapedReviewsUpdate.count.toLocaleString()}</code> of <code>{activeGame.total_reviews.toLocaleString()}</code> review{activeGame.total_reviews > 1 ? 's' : ''} for {activeGame.name},
              estimated time remaining <code>{formatMs(((activeGame.total_reviews - scrapedReviewsUpdate.count) / 100) * scrapedReviewsUpdate.averageRequestTime)}</code></p>
            <Button variant="secondary" onClick={cancelScraping}>Cancel</Button>
          </Container>
            :
          <GameSearch handleSelected={handleGameSelected} />}
      </Col>
    </Row>
  </>)
}

export default IndexPage