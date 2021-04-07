import React, { useState } from "react"
import _ from "lodash"
import SteamWebApiClient from "lib/utils/SteamWebApiClient"
import { Container, Row, Col, Form, Spinner } from "react-bootstrap"
import GameCardDeck from "./GameCardDeck"

const GameSearch = () => {

    const [searchResult, setSearchResult] = useState(null)
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
            return
        }

        let now = new Date()

        setLoadingSomething(true)
    
        let response = null

        if (searchStr.indexOf('http') !== -1 || searchStr.indexOf('www.') !== -1) {
            let match = searchStr.match(/\/app\/(\d+)/)
            if (match && match[1]) {
                const individualGame = await SteamWebApiClient.getGame(match[1])
                if (individualGame) {
                    response = [individualGame]
                }
            }
        }

        if (response === null) {
            response = await SteamWebApiClient.findGamesBySearchTerm(searchStr)
        }

        setSearchResult(previousSearchResult => previousSearchResult === null || now > previousSearchResult.time ? { time: now, data: response, term: searchStr } : previousSearchResult)

        setLoadingSomething(false)
    }, 400)

    return (
        <Container>
            <Row>
                <Col>
                    <Form.Control className="mb-3" placeholder="Search for a game by name or paste a store page URL..." type="text" onChange={(e) => getGames(e.target.value)} />
                </Col>
            </Row>

            {loadingSomething && <Row>
                <Spinner className="mx-auto mt-2" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Row>}

            {searchResult && !loadingSomething && <Row>
                <Col>
                    <p>{searchResult.data && `${searchResult.data.length} result${searchResult.data.length !== 1 ? 's' : ''} found for `}<a href={`https://store.steampowered.com/search/?term=${searchResult.term}`}>{searchResult.term}</a>.
                    {searchResult.data.length > 0 && searchResult.term.length < 11 && <span className="small"> Not what you're looking for? Try being more specific</span>}
                    {searchResult.data.length === 0 && <span className="small"> Looking for something specific? Try searching the name as it appears on Steam</span>}</p>
                </Col>
            </Row>}

            {!loadingSomething && searchResult?.data.length > 0 &&
                <GameCardDeck games={searchResult.data}/>}

            {featuredGames?.length > 0 && <>
            <Row>
                <Col>
                    <h3 className="mb-3">Featured Products</h3>
                </Col>
            </Row>
            <GameCardDeck games={featuredGames}/></>}
            
        </Container>
    )
}

export default GameSearch