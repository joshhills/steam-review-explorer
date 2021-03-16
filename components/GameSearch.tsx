import React, { useState } from "react"
import _ from "lodash"
import SteamWebApiClient from "lib/utils/SteamWebApiClient";
import { Container, Row, Col, Form, CardDeck, Card, Button } from "react-bootstrap";
import { Http2ServerResponse } from "http2";

const GameSearch = ({ handleSelected }) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [games, setGames] = useState(null)
    const [featuredGames, setFeaturedGames] = useState(null)

    const getFeaturedGames = async () => {
        const featuredGames = await SteamWebApiClient.getFeaturedGames()
        setFeaturedGames(featuredGames)
    }
    
    if (featuredGames === null) {
        getFeaturedGames()
    }

    const getGames = _.debounce(async (searchStr) => {
        if (!searchStr || /^\s*$/.test(searchStr)) {
            setGames(null)
            return
        }

        const response = await SteamWebApiClient.findGamesBySearchTerm(searchStr)

        setSearchTerm(searchStr)
        setGames(response)
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
            
            <Row>
                <Col>
                    {games !== null && <p>{games && `${games.length} result${games.length > 1 ? 's' : ''} found for "${searchTerm}"`}</p>}
                    {games === null && featuredGames !== null && <h3 className="mb-3">Featured Games</h3>}
                </Col>
            </Row>

            {games === null && featuredGames?.length > 0 && <CardDeck>
                {featuredGames.map(game => {
                    return <Card key={game.id} style={{ minWidth: '30%', maxWidth: '16rem' }} className="mb-4">
                        <Card.Img variant="top" src={game.tiny_image}/>
                        <Card.Body>
                            <Card.Title><p>{game.name}</p></Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" onClick={() => handleSelected(game)}>View Stats</Button>
                        </Card.Footer>
                    </Card>
                })}
            </CardDeck>}

            {games?.length > 0 && <CardDeck>
                {games.map(game => {
                    return <Card key={game.id} style={{ minWidth: '30%', maxWidth: '16rem' }} className="mb-4">
                        <Card.Img variant="top" src={game.tiny_image}/>
                        <Card.Body>
                            <Card.Title><p>{game.name}</p></Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" onClick={() => handleSelected(game)}>View Stats</Button>
                        </Card.Footer>
                    </Card>
                })}
            </CardDeck>}
            
        </Container>
    )
}

export default GameSearch