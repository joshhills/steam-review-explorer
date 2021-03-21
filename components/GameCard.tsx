import { useRouter } from "next/router"
import React from "react"
import { Button, Card } from "react-bootstrap"
import ReviewScoreBadge from "./ReviewScoreBadge"

const GameCard = ({ game }) => {

    // Use router to navigate to game if selected
    const router = useRouter()

    const steamUrl = `https://store.steampowered.com/app/${game.steam_appid}`
    const type = game.type === 'dlc' ? 'DLC' : game.type.charAt(0).toUpperCase() + game.type.slice(1)
    const developers = game.developers.join(', ')

    return (
        <Card key={game.steam_appid} style={{ minWidth: '30%', maxWidth: '16rem' }} className="mb-4">
            <Card.Img variant="top" src={game.header_image}/>
            <Card.Body>
                <Card.Title>
                    <a href={steamUrl}>{game.name}</a>&nbsp;
                    <ReviewScoreBadge game={game} showTooltip={true}/>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {type} by {developers} {game.release_date.coming_soon ? 'coming soon' : `released ${game.release_date.date}`}
                </Card.Subtitle>
                <Card.Text className="small">{game.short_description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button block variant={game.total_reviews > 0 ? 'primary' : 'outline-secondary'} className="float-right"
                    disabled={game.total_reviews === 0} onClick={() => router.push(`/game/${game.steam_appid}`)}>
                    Explore
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default GameCard