import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import { FaTwitter, FaGithub } from "react-icons/fa";
import Donate from "./Donate";

export default function Footer() {
    return (
        <Container fluid>
            <Row className="bg-light p-3">
                <Col className="footer-col">
                    <Container className="footer-col">
                        <footer className="text-center">
                            <span className="text-muted">
                                Made by <a className="text-muted" href="https://twitter.com/joshmarcushills"><FaTwitter /> joshmarcushills</a> &nbsp; <a className="text-muted" href="https://github.com/joshhills/steam-review-explorer"><FaGithub /> Code</a>
                            </span>
                        </footer>
                        <br/>
                        <br/>
                        <br/>
                        <Donate/>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}