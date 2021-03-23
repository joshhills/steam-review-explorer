import React from "react"
import GameSearch from "../components/GameSearch"
import { Row, Col } from "react-bootstrap"
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