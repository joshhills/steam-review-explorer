import React, { Component } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Donate from "./Donate"
import Footer from "./Footer"
import { withRouter } from 'next/router'
import { WithRouterProps } from "next/dist/client/with-router"
import DarkModeToggle from "./DarkModeToggle"

class Layout extends Component<WithRouterProps> {
    
    render () {
        const { children } = this.props
        const { router } = this.props

        return (
            <div style={{display: 'flex', minHeight: '100vh', flexDirection: 'column'}}>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#" onClick={() => router.push('/')}>
                            <img
                                src="/steam-review-facts/android-chrome-192x192.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top mr-2"
                                alt="Steam Review Explorer logo"/>
                            Steam Review Explorer
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link onClick={() => router.push('/')}>Home</Nav.Link>
                                <Nav.Link onClick={() => router.push('/about')}>About</Nav.Link>
                                <Nav.Link onClick={() => router.push('/feedback')}>Feedback</Nav.Link>
                            </Nav>
                            <DarkModeToggle/>
                            <Donate/>
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