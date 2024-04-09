import { useRouter } from "next/router"
import React from "react"
import { Button, Card } from "react-bootstrap"

const StorageCard = ({ game, quotaPercent, reviewCount, totalReviews, handleDelete }) => {

    const proportion = Math.round((reviewCount / totalReviews) * 100)
    const overallProportion = Math.round((proportion / 100) * quotaPercent)

    return (
        <Card key={game.steam_appid} className="mb-4 game-card">
            <Card.Img variant="top" src={game.header_image}/>
            <Card.Body>
                <Card.Title>
                    <a href={`/steam-review-explorer/game/${game.steam_appid}`}>{game.name}</a>
                </Card.Title>
                <Card.Subtitle>
                    Using {overallProportion}% of overall space
                </Card.Subtitle>
                <Card.Text className="small">{reviewCount.toLocaleString()} reviews stored</Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className="d-grid gap-2">
                    <Button variant="primary" className="float-end"
                        onClick={() => handleDelete(game.steam_appid)}>
                        Delete
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default StorageCard