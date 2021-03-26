import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import { FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <Container fluid>
            <Row className="bg-light p-3">
                <Col>
                    <Container>
                        <footer>
                            <span className="float-left text-muted">
                                Made by <a className="text-muted" href="https://twitter.com/joshmarcushills"><FaTwitter /> joshmarcushills</a>
                            </span>
                            <span className="float-right">
                                <a className="text-muted" href="https://github.com/joshhills/steam-review-facts"><FaGithub /> Code</a>
                            </span>
                        </footer>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}