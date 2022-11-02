import React from "react"
import GameCard from "./GameCard"

const GameCardDeck = ({ games, onExplore }) => {
    return (
        <div className="row">
            {games.map(game => <div key={game.steam_appid} className="col-auto mb-3"><GameCard game={game} onExplore={onExplore}/></div>)}
        </div>
    )
}

export default GameCardDeck