import React from "react"
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap"

const ReviewScoreBadge = ({ game, showTooltip }) => {
    
    let variant

    switch (game.review_score_desc.toLowerCase()) {
        case 'overwhelmingly positive':
        case 'very positive':
        case 'positive':
        case 'mostly positive':
            variant = 'success'
            break
        case 'mixed':
            variant = 'warning'
            break
        case 'mostly negative':
        case 'negative':
        case 'very negative':
        case 'overwhelmingly negative':
            variant = 'danger'
            break
        default:
            variant = 'secondary'
    }

    const badge = <Badge className="mb-1 mr-1" variant={variant}>
        {game.review_score_desc}
    </Badge>

    return (
        showTooltip ? <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={(props) =>
            game.total_reviews > 0 ? <Tooltip id={`score-${game.steamp_appid}`} {...props}>
                {Math.round(game.total_positive / game.total_reviews * 100)}% of the {game.total_reviews.toLocaleString()} reviews for this {game.type === 'dlc' ? 'DLC' : game.type} are positive
            </Tooltip> : <p></p>}>
            {badge}
        </OverlayTrigger> :
        badge
    )
}

export default ReviewScoreBadge