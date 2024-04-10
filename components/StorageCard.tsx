import { useRouter } from "next/router"
import React from "react"
import dateFormat from "dateformat"
import { Button, Card } from "react-bootstrap"

const StorageCard = ({ game, search, quotaPercent, reviewCount, totalReviews, handleDelete }) => {

    const dateFormatStringDetailed = 'hh:MMtt, dd/mm/yyyy'
    const proportion = reviewCount > 0 ? Math.round((reviewCount / totalReviews) * 100) : 0
    const overallProportion = Math.round((proportion / 100) * quotaPercent)

    return (
        <Card key={game.steam_appid} className="mb-4 game-card">
            <Card.Img variant="top" src={game.header_image}/>
            <Card.Body>
                <Card.Title>
                    <a href={`/steam-review-explorer/game/${game.steam_appid}?start=${search.start}&end=${search.end}`}>{game.name}</a>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Using {overallProportion}% of overall space
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                    Last updated {dateFormat(new Date(search.when), dateFormatStringDetailed)}
                </Card.Subtitle>
                <Card.Text className="small">{reviewCount.toLocaleString()} review{reviewCount === 1 ? '' : 's'} stored</Card.Text>
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