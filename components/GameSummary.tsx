import React from "react"
import { Row, Col } from "react-bootstrap"

const GameSummary = ({ game }) => {

    const type = game.type === 'dlc' ? 'DLC' : game.type.charAt(0).toUpperCase() + game.type.slice(1)
    const developers = game.developers.join(', ')

    return (
        <Row>
            <Col md="auto" className="mb-5">
                <img src={game.header_image}/>
            </Col>
            <Col className="mb-5">
                <h4>{game.name}</h4>
                <p className="text-muted mb-2">{type} by {developers} {game.release_date.coming_soon ? 'coming soon' : `released ${game.release_date.date}`}</p>
                <p className="text-muted small">App ID: {game.steam_appid} | <a className="text-muted" href={`https://store.steampowered.com/app/${game.steam_appid}`}>Steam Store Page</a></p>
                <p>{game.short_description}</p>
            </Col>
        </Row>
    )
}

export default GameSummary