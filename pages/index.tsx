import Head from "next/head"
import React, { useState } from "react"
import GameSearch from "../components/GameSearch"
import Breakdown from "../components/Breakdown"
import SteamWebApiClient from "lib/utils/SteamWebApiClient"
import { Container, Row, Col, Jumbotron } from "react-bootstrap"

const IndexPage = () => {

  const [activeGame, setActiveGame] = useState(null)
  const [activeGameReviews, setActiveGameReviews] = useState(null)

  const handleExit = () => {
    setActiveGame(null)
    setActiveGameReviews(null)
  }

  const handleGameSelected = (game) => {
    SteamWebApiClient.getGame(game.id).then(setActiveGame)
    SteamWebApiClient.getReviews(game.id).then(setActiveGameReviews)
  }

  return (
    <>
      <Head>
        <title>Steam Review Explorer</title>
        <meta
          name="Steam Review Explorer"
          content="Explore the facts behind Steam product reviews"
        />
      </Head>
      <Container>
        <Row>
          <Col>
            <Jumbotron className="mt-4">
              <h1>Steam Review Facts</h1>
              <p>A client-side exploratory data analysis tool for Steam product reviews</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            {activeGame? activeGameReviews ? <Breakdown game={activeGame} reviews={activeGameReviews} onExit={handleExit} /> : 'Loading...' :
              <GameSearch handleSelected={handleGameSelected} />}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default IndexPage