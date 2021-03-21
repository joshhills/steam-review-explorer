import React from "react"
import { CardDeck } from "react-bootstrap"
import GameCard from "./GameCard"

const GameCardDeck = ({ games }) => {
    return (
        <CardDeck>
            {games.map(game => <GameCard game={game}/>)}
        </CardDeck>
    )
}

export default GameCardDeck