import Head from "next/head"
import React, { Component } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import Donate from "./Donate"
import Footer from "./Footer"

class Layout extends Component {
    render () {
        const { children } = this.props
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
                            <Nav.Link href="/steam-review-facts">Home</Nav.Link>
                            <Nav.Link href="/steam-review-facts/about">About</Nav.Link>
                        </Nav>
                        <Donate/>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                {children}
            </Container>
            <Footer />
            <style jsx global>{`
                html {
                    min-height: 100vh;
                }
            `}</style>
        </>)
    }
}

export default Layout