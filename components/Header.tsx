import React from "react"
import Link from "next/link"
import { Row, Col, Jumbotron } from "react-bootstrap"

const Header = () => {

    return (
        <Row>
          <style jsx global>{`
            .header {
              background-image: url('/steam-review-explorer/jumbotron-bg.jpg');
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }

            html.dark .header {
              background-image: url('/steam-review-explorer/jumbotron-bg-dark.jpg');
            }
          `}</style>
          <Col>
            <header>
              <Jumbotron className="header">
                <h1>Understand player feedback</h1>
                <p>Make better sense of all Steam product reviews using this free exploratory data analysis tool</p>
                <Link href="/about">Find out more about how it works</Link>
              </Jumbotron>
            </header>
          </Col>
        </Row>
    )
}

export default Header