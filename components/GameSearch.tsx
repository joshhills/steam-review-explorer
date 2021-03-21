import React, { useState } from "react"
import _ from "lodash"
import SteamWebApiClient from "lib/utils/SteamWebApiClient";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import GameCardDeck from "./GameCardDeck";

const GameSearch = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [games, setGames] = useState(null)
    const [featuredGames, setFeaturedGames] = useState(null)
    const [loadingSomething, setLoadingSomething] = useState(true)

    const getFeaturedGames = async () => {

        const featuredGames = await SteamWebApiClient.getFeaturedGames()

        setFeaturedGames(featuredGames)
        setLoadingSomething(false)
    }
    
    if (featuredGames === null) {
        getFeaturedGames()
    }

    const getGames = _.debounce(async (searchStr) => {
        if (!searchStr || /^\s*$/.test(searchStr)) {
            setGames(null)
            return
        }

        setLoadingSomething(true)

        const response = await SteamWebApiClient.findGamesBySearchTerm(searchStr)

        setSearchTerm(searchStr)
        setGames(response)
        setLoadingSomething(false)
    }, 300)

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Control className="mb-3" placeholder="Find a game..." type="text" onChange={(e) => getGames(e.target.value)} />
                    </Form>
                </Col>
            </Row>

            {loadingSomething && <Row>
                <Spinner className="mx-auto mt-2" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Row>}

            {games && !loadingSomething && <Row>
                <Col>
                    <p>{games && `${games.length} result${games.length > 1 ? 's' : ''} found for `}<a href={`https://store.steampowered.com/search/?term=${searchTerm}`}>{searchTerm}</a>.
                    {games.length > 0 && searchTerm.length < 11 && <span className="small"> Not what you're looking for? Try being more specific</span>}
                    {games.length === 0 && <span className="small"> Looking for something specific? Try searching the name as it appears on Steam</span>}</p>
                </Col>
            </Row>}

            {!loadingSomething && games?.length > 0 &&
                <GameCardDeck games={games}/>}

            {featuredGames?.length > 0 && <>
            <Row>
                <Col>
                    <h3 className="mb-3">Featured Games</h3>
                </Col>
            </Row>
            <GameCardDeck games={featuredGames}/></>}
            
        </Container>
    )
}

export default GameSearch