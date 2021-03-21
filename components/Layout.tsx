import Head from "next/head"
import React, { Component } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Donate from "./Donate"
import Footer from "./Footer"
import { withRouter } from 'next/router'
import { WithRouterProps } from "next/dist/client/with-router"

class Layout extends Component<WithRouterProps> {
    
    render () {
        const { children } = this.props
        const { router } = this.props

        return (<>
            <Head>
                <title>Steam Review Explorer</title>
                <meta name="Steam Review Explorer" content="Explore the facts behind Steam product reviews" />
            </Head>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/steam-review-facts">Steam Review Explorer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => router.push('/')}>Home</Nav.Link>
                            <Nav.Link onClick={() => router.push('/about')}>About</Nav.Link>
                        </Nav>
                        <Donate/>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="pt-5 pb-5">
                {children}
            </Container>
            <Footer />
        </>)
    }
}

export default withRouter(Layout)