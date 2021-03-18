import React, { useState } from "react"
import _ from "lodash"
import SteamWebApiClient from "lib/utils/SteamWebApiClient";
import { Container, Row, Col, Form, CardDeck, Card, Button, Badge, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";

const GameSearch = ({ handleSelected }) => {

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

        console.log(response)

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
                <Spinner className="mx-auto mt-1" animation="border" role="status">
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
            <CardDeck>
                {games.map(game => {
                    return <Card key={game.steam_appid} style={{ minWidth: '30%', maxWidth: '16rem' }} className="mb-4">
                        <Card.Img variant="top" src={game.header_image}/>
                        <Card.Body>
                            <Card.Title>
                                <a href={`https://store.steampowered.com/app/${game.steam_appid}`}>{game.name}</a>&nbsp;
                                <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={(props) =>
                                    game.total_reviews > 0 ? <Tooltip id={`score-${game.steamp_appid}`} {...props}>
                                        {Math.round(game.total_positive / game.total_reviews * 100)}% of the {game.total_reviews.toLocaleString()} reviews for this {game.type === 'dlc' ? 'DLC' : game.type} are positive
                                    </Tooltip> : <p></p>}>
                                    <Badge className="mb-1" variant="secondary">{game.review_score_desc}</Badge>
                                </OverlayTrigger></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{game.type === 'dlc' ? 'DLC' : game.type.charAt(0).toUpperCase() + game.type.slice(1)} by {game.developers.join(', ')} released {game.release_date.date}</Card.Subtitle>
                            <Card.Text className="small">{game.short_description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button block variant={game.total_reviews > 0 ? 'primary' : 'outline-secondary'} className="float-right" disabled={game.total_reviews === 0} onClick={() => handleSelected(game)}>Explore</Button>
                        </Card.Footer>
                    </Card>
                })}
            </CardDeck>}

            {featuredGames?.length > 0 && <>
            <Row>
                <Col>
                    <h3 className="mb-3">Featured Games</h3>
                </Col>
            </Row>
            <CardDeck>
                {featuredGames.map(game => {
                    return <Card key={game.steam_appid} style={{ minWidth: '30%', maxWidth: '16rem' }} className="mb-4">
                        <Card.Img variant="top" src={game.header_image}/>
                        <Card.Body>
                            <Card.Title>
                                <a href={`https://store.steampowered.com/app/${game.steam_appid}`}>{game.name}</a>&nbsp;
                                <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={(props) =>
                                    game.total_reviews > 0 ? <Tooltip id={`score-${game.steamp_appid}`} {...props}>
                                        {Math.round(game.total_positive / game.total_reviews * 100)}% of the {game.total_reviews.toLocaleString()} reviews for this {game.type === 'dlc' ? 'DLC' : game.type} are positive
                                    </Tooltip> : <p></p>}>
                                    <Badge className="mb-1" variant="secondary">{game.review_score_desc}</Badge>
                                </OverlayTrigger></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{game.type === 'dlc' ? 'DLC' : game.type.charAt(0).toUpperCase() + game.type.slice(1)} by {game.developers.join(', ')} {game.release_date.coming_soon ? 'coming soon' : `released ${game.release_date.date}`}</Card.Subtitle>
                            <Card.Text className="small">{game.short_description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button block variant={game.total_reviews > 0 ? 'primary' : 'outline-secondary'} className="float-right" disabled={game.total_reviews === 0} onClick={() => handleSelected(game)}>Explore</Button>
                        </Card.Footer>
                    </Card>
                })}
            </CardDeck></>}
            
        </Container>
    )
}

export default GameSearch