import React, { useState } from "react"
import _ from "lodash"
import SteamWebApiClient from "lib/utils/SteamWebApiClient";
import { Container, Row, Col, Form, CardDeck, Card, Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

const GameSearch = ({ handleSelected }) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [games, setGames] = useState(null)
    const [featuredGames, setFeaturedGames] = useState(null)

    const getFeaturedGames = async () => {
        const featuredGames = await SteamWebApiClient.getFeaturedGames()

        console.log(featuredGames)

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
                    return <Card key={game.steam_appid} style={{ minWidth: '30%', maxWidth: '16rem' }} className="mb-4">
                        <Card.Img variant="top" src={game.header_image}/>
                        <Card.Body>
                            <Card.Title>
                                <a href={`https://store.steampowered.com/app/${game.steam_appid}`}>{game.name}</a>&nbsp;
                                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={(props) =>
                                    game.total_reviews > 0 ? <Tooltip id={`score-${game.steamp_appid}`} {...props}>
                                        {Math.round(game.total_positive / game.total_reviews * 100)}% of the {game.total_reviews.toLocaleString()} reviews for this {game.type === 'dlc' ? 'DLC' : game.type} are positive
                                    </Tooltip> : <p></p>}>
                                    <Badge className="mb-1" variant="secondary">{game.review_score_desc}</Badge>
                                </OverlayTrigger></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{game.type === 'dlc' ? 'DLC' : game.type.charAt(0).toUpperCase() + game.type.slice(1)} by {game.developers.join(', ')} {game.release_date.coming_soon ? 'coming soon' : `released ${game.release_date.date}`}</Card.Subtitle>
                            <Card.Text className="small">{game.short_description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant={game.total_reviews > 0 ? 'primary' : 'outline-secondary'} className="float-right" disabled={game.total_reviews === 0} onClick={() => handleSelected(game)}>Explore</Button>
                        </Card.Footer>
                    </Card>
                })}
            </CardDeck>}

            {games?.length > 0 && <CardDeck>
                {games.map(game => {
                    return <Card key={game.steam_appid} style={{ minWidth: '30%', maxWidth: '16rem' }} className="mb-4">
                        <Card.Img variant="top" src={game.header_image}/>
                        <Card.Body>
                            <Card.Title>
                                <a href={`https://store.steampowered.com/app/${game.steam_appid}`}>{game.name}</a>&nbsp;
                                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={(props) =>
                                    game.total_reviews > 0 ? <Tooltip id={`score-${game.steamp_appid}`} {...props}>
                                        {Math.round(game.total_positive / game.total_reviews * 100)}% of the {game.total_reviews.toLocaleString()} reviews for this {game.type === 'dlc' ? 'DLC' : game.type} are positive
                                    </Tooltip> : <p></p>}>
                                    <Badge className="mb-1" variant="secondary">{game.review_score_desc}</Badge>
                                </OverlayTrigger></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{game.type === 'dlc' ? 'DLC' : game.type.charAt(0).toUpperCase() + game.type.slice(1)} by {game.developers.join(', ')} {game.release_date.coming_soon ? 'coming soon' : `released ${game.release_date.date}`}</Card.Subtitle>
                            <Card.Text className="small">{game.short_description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant={game.total_reviews > 0 ? 'primary' : 'outline-secondary'} className="float-right" disabled={game.total_reviews === 0} onClick={() => handleSelected(game)}>Explore</Button>
                        </Card.Footer>
                    </Card>
                })}
            </CardDeck>}
            
        </Container>
    )
}

export default GameSearch