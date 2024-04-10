import React from "react"
import StorageCard from "./StorageCard"

const StorageCardDeck = ({ games, searches, quotaPercent, reviewCounts, handleDelete }) => {

    // Compute total reviews
    const totalReviews = Object.values(reviewCounts).reduce((p: number, c: number) => p + c)

    return (
        <div className="row">
            {Object.keys(games).sort((a, b) => reviewCounts[b] - reviewCounts[a]).map(game => <div key={games[game].steam_appid} className="col-auto mb-3">
                <StorageCard game={games[game]} search={searches[game]} quotaPercent={quotaPercent} reviewCount={reviewCounts[game]} totalReviews={totalReviews} handleDelete={handleDelete} /></div>)}
        </div>
    )
}

export default StorageCardDeck