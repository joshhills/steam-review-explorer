import React from "react"
import { Badge, Card } from "react-bootstrap"
import dateFormat from "dateformat"
import supportedLocales from "lib/utils/SteamLocales"

const dateFormatString = 'dd/mm/yyyy h:MM:sstt'

const HighlightedReview = ({ game, titles, review }) => {

    let title = titles.join(', ')
    title = title.charAt(0).toUpperCase() + title.slice(1)

    const hoursPlaytimeForever = Math.round(review.author_playtime_forever / 60)
    const hoursPlaytimeAtReview = Math.round(review.author_playtime_at_review / 60)
    
    const steamUrl = `https://steamcommunity.com/profiles/${review.author_steamid}/recommended/${game.steam_appid}/`

    return (
        <Card className="mb-4 mt-4" border={review.voted_up ? 'success' : 'danger'}>
            <Card.Body>
                <Card.Title className="mb-3">{title}</Card.Title>
                <Card.Subtitle className="mb-2">
                    {review.voted_up ? '👍 Recommended' : '👎 Not recommended'} with {review.author_playtime_forever < 60 ? `${review.author_playtime_forever} minute${review.author_playtime_forever !== 1 ? 's' : ''}` : `${hoursPlaytimeForever.toLocaleString()} hour${hoursPlaytimeForever !== 1 ? 's' : ''}`} recorded {review.author_playtime_at_review !== review.author_playtime_forever ?
                        review.author_playtime_at_review < 60 ? `(${review.author_playtime_at_review} minute${review.author_playtime_at_review !== 1 ? 's at review time)' : ' at review time)'}` : `(${hoursPlaytimeAtReview.toLocaleString()} hour${hoursPlaytimeAtReview !== 1 ? 's at review time)' : ' at review time)'}` : ''}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                    <a href={steamUrl} target="_blank">Posted in {supportedLocales[review.language].englishName} @ {dateFormat(new Date(review.timestamp_created * 1000), dateFormatString)} {review.timestamp_created !== review.timestamp_updated && `(Updated ${dateFormat(new Date(review.timestamp_updated * 1000), dateFormatString)})`}</a>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                    {review.written_during_early_access && <Badge className="mr-1" bg="primary">Written during early access</Badge>}
                    {review.received_for_free && <Badge bg="primary">Marked as received for free</Badge>}                    
                </Card.Subtitle>
                <Card.Text style={{ overflow: 'hidden' }}>
                    {review.review}
                </Card.Text>
                {review.author_num_reviews > 1 && <Card.Subtitle className="mb-2 text-muted small">
                    {review.author_num_reviews.toLocaleString()} reviews written
                </Card.Subtitle>}
                {review.votes_up > 0 && <Card.Subtitle className="mb-2 text-muted small">
                    {review.votes_up.toLocaleString()} {review.votes_up === 1 ? 'person' : 'people'} found this review helpful
                </Card.Subtitle>}
                {review.votes_funny > 0 && <Card.Subtitle className="mb-2 text-muted small">
                    {review.votes_funny.toLocaleString()} {review.votes_funny === 1 ? 'person' : 'people'} found this review funny
                </Card.Subtitle>}
                {review.comment_count > 0 && <Card.Subtitle className="mb-2 text-muted small">
                    There {review.comment_count === 1 ? 'is' : 'are'} {review.comment_count.toLocaleString()} {review.comment_count === 1 ? 'comment' : 'comments'} on this review
                </Card.Subtitle>}
            </Card.Body>
        </Card>
    )
}

export default HighlightedReview