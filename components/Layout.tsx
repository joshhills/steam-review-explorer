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
                <link rel="shortcut icon" href="/steam-review-facts/favicon.ico" type="image/x-icon" />
            </Head>
            <div style={{display: 'flex', minHeight: '100vh', flexDirection: 'column'}}>
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
                <Container style={{flex: '1'}} className="pt-5 pb-4">
                    {children}
                </Container>
                <Footer />
            </div>
        </>)
    }
}

export default withRouter(Layout)