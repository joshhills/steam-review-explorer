import React, { Component } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Donate from "./Donate"
import Footer from "./Footer"
import { withRouter } from 'next/router'
import { WithRouterProps } from "next/dist/client/with-router"
import DarkModeToggle from "./DarkModeToggle"
import Link from "next/link"

class Layout extends Component<WithRouterProps> {
    
    render () {
        const { children } = this.props

        return (
            <div style={{display: 'flex', minHeight: '100vh', flexDirection: 'column'}}>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Link href="/">
                            <Navbar.Brand style={{ cursor: 'pointer' }}>
                                <img
                                    src="/steam-review-explorer/steam-review-explorer-logo.png"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top me-2"
                                    alt="Steam Review Explorer logo"/>
                                Steam Review Explorer
                            </Navbar.Brand>
                        </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link href="/"><a className="nav-link">Home</a></Link>
                                <Link href="/about"><a className="nav-link">About</a></Link>
                                <Link href="/feedback"><a className="nav-link">Feedback</a></Link>
                            </Nav>
                            <br/>
                            <DarkModeToggle/>
                            <br/>
                            <Donate/>
                            <br/>
                            <br/>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container style={{flex: '1'}} className="pt-5 pb-4">
                    {children}
                </Container>
                <Footer />
            </div>
        )
    }
}

export default withRouter(Layout)