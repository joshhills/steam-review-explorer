import React from "react"
import GameCard from "./GameCard"

const GameCardDeck = ({ games }) => {
    return (
        <div className="row">
            {games.map(game => <div key={game.steam_appid} className="col-auto mb-3"><GameCard game={game}/></div>)}
        </div>
    )
}

export default GameCardDeck