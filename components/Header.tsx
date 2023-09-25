import React from "react"
import Link from "next/link"
import { Row, Col, Badge } from "react-bootstrap"

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
              <div className="header mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                  <h1>Understand player feedback</h1>
                  <p>Search, visualise and download Steam reviews using this free data analysis tool</p>
                  <Link href="/about">Find out how it works</Link><br/>
                  <Link href="/about#changelog"><a>View Changelog</a></Link>
                </div>
              </div>
            </header>
          </Col>
        </Row>
    )
}

export default Header