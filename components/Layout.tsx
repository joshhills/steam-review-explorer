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
                <meta name="title" content="Steam Review Explorer"/>
                <meta name="description" content="Better understand player feedback using this free data analysis tool"></meta>
                
                <link rel="apple-touch-icon" sizes="180x180" href="/steam-review-facts/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/steam-review-facts/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/steam-review-facts/favicon-16x16.png"/>
                <link rel="manifest" href="/steam-review-facts/site.webmanifest"/>
                <link rel="mask-icon" href="/steam-review-facts/safari-pinned-tab.svg" color="#5bbad5"/>
                <link rel="shortcut icon" href="/steam-review-facts/favicon.ico"/>
                <meta name="msapplication-TileColor" content="#00aba9"/>
                <meta name="msapplication-config" content="https://project.joshhills.dev/steam-review-facts/browserconfig.xml"/>
                <meta name="theme-color" content="#f8f9fa"></meta>
                
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://project.joshhills.dev/steam-review-facts/"/>
                <meta property="og:title" content="Steam Review Explorer"/>
                <meta property="og:description" content="Better understand player feedback using this free data analysis tool"/>
                <meta property="og:image" content="https://project.joshhills.dev/steam-review-facts/social-share-img.jpg"/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://project.joshhills.dev/steam-review-facts/"/>
                <meta property="twitter:title" content="Steam Review Explorer"/>
                <meta property="twitter:description" content="Better understand player feedback using this free data analysis tool"/>
                <meta property="twitter:image" content="/steam-review-facts/social-share-img.jpg"></meta>
            </Head>
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