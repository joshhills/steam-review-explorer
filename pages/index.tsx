import React, { useState } from "react"
import GameSearch from "../components/GameSearch"
import Breakdown from "../components/Breakdown"
import SteamWebApiClient from "lib/utils/SteamWebApiClient"
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap"
import Header from "components/Header"

const IndexPage = () => {

  return (<>
    <Header />
    <Row>
      <Col>
          <GameSearch />
      </Col>
    </Row>
  </>)
}

export default IndexPage