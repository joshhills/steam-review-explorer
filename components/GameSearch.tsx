import React, { useState, useEffect, useCallback } from "react"
import _ from "lodash"
import SteamWebApiClient from "lib/utils/SteamWebApiClient"
import { Container, Row, Col, Form, Spinner } from "react-bootstrap"
import GameCardDeck from "./GameCardDeck"
import { useRouter } from "next/router"

const GameSearch = () => {

    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [featuredGames, setFeaturedGames] = useState(null)
    const [loadingSomething, setLoadingSomething] = useState(true)

    useEffect(() => {

        if (router.query.search !== undefined && searchResult !== router.query.search as string) {
            const searchStr = decodeURI(router.query.search as string)
            setSearchTerm(searchStr)
            getGames(searchStr)
        }
        
        if (featuredGames === null) {
            getFeaturedGames()
        }
    }, [router.query.search])

    const getFeaturedGames = async () => {

        const featuredGames = await SteamWebApiClient.getFeaturedGames()

        setFeaturedGames(featuredGames)
        setLoadingSomething(false)
    }
    
    const getGames = async (searchStr) => {
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
    }

    const updateQuery = useCallback(_.debounce((searchStr) => {
        router.push({
            pathname: '/',
            query: { search: encodeURI(searchStr) }
        }, null, { shallow: true })

        getGames(searchStr)
    }, 800), [])

    return (
        <Container>
            <Row>
                <Col>
                    <Form.Control className="mb-3" placeholder="Find a game..." type="text" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); updateQuery.cancel(); updateQuery(e.target.value); }} />
                </Col>
            </Row>

            {loadingSomething && <Row>
                <Spinner className="mx-auto mt-2" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
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