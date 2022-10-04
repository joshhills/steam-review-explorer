import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import { FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <Container fluid>
            <Row className="bg-light p-3">
                <Col className="footer-col">
                    <Container className="footer-col">
                        <footer>
                            <span className="float-start text-muted">
                                Made by <a className="text-muted" href="https://twitter.com/joshmarcushills"><FaTwitter /> joshmarcushills</a>
                            </span>
                            <span className="float-end">
                                <a className="text-muted" href="https://github.com/joshhills/steam-review-explorer"><FaGithub /> Code</a>
                            </span>
                        </footer>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}