import { useRouter } from "next/router"
import React from "react"
import { Badge, Button, Card } from "react-bootstrap"
import ReviewScoreBadge from "./ReviewScoreBadge"

const GameCard = ({ game }) => {

    // Use router to navigate to game if selected
    const router = useRouter()

    const steamUrl = `https://store.steampowered.com/app/${game.steam_appid}`
    const steamDBUrl = `https://steamdb.info/app/${game.steam_appid}`
    const steamSpyUrl = `https://steamspy.com/app/${game.steam_appid}`
    const type = game.type === 'dlc' ? 'DLC' : game.type.charAt(0).toUpperCase() + game.type.slice(1)
    const developers = game.developers ? game.developers.join(', ') : 'Unknown'

    return (
        <Card key={game.steam_appid} className="mb-4 game-card">
            <Card.Img variant="top" src={game.header_image}/>
            <Card.Body>
                <Card.Title>
                    {game.total_reviews === 0 ? <p>{game.name}</p> : <a href={`/steam-review-explorer/game/${game.steam_appid}`}>{game.name}</a>}
                    &nbsp;
                    <ReviewScoreBadge game={game} showTooltip={true}/>
                    {(game.content_descriptors.ids !== null && game.content_descriptors.ids.indexOf(3) !== -1) && <Badge bg="danger">Adult</Badge>}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {type} by {developers} {game.release_date.coming_soon ? 'coming soon' : `released ${game.release_date.date}`}<br/>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                    <a href={steamUrl}>Steam Store</a> | <a href={steamDBUrl}>SteamDB</a> | <a href={steamSpyUrl}>SteamSpy</a>
                </Card.Subtitle>
                <Card.Text className="small">{game.short_description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className="d-grid gap-2">
                    <Button variant={game.total_reviews > 0 ? 'primary' : 'outline-secondary'} className="float-end"
                        disabled={game.total_reviews === 0} onClick={() => router.push(`/game/${game.steam_appid}`)}>
                        Explore
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default GameCard