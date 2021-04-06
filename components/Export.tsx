import React from "react"
import { Badge, Button } from "react-bootstrap"
import { CSVLink } from "react-csv"
import sanitize from "sanitize-filename"

const Export = ({ game, reviews }) => {

    let ref

    const headers = [
        { label: 'recommendation_id', key: 'recommendationid'},
        { label: 'author_steam_id', key: 'author.steamid'},
        { label: 'author_number_games_owned', key: 'author.num_games_owned'},
        { label: 'author_number_reviews', key: 'author.num_reviews'},
        { label: 'author_minutes_playtime_forever', key: 'author.playtime_forever'},
        { label: 'author_minutes_playtime_last_two_weeks', key: 'author.playtime_last_two_weeks'},
        { label: 'author_minutes_playtime_at_review_time', key: 'author.playtime_at_review'},
        { label: 'author_last_played_timestamp', key: 'author.last_played'},
        { label: 'language', key: 'language'},
        { label: 'review', key: 'review'},
        { label: 'created_timestamp', key: 'timestamp_created'},
        { label: 'updated_timestamp', key: 'timestamp_updated'},
        { label: 'voted_up', key: 'voted_up'},
        { label: 'votes_up', key: 'votes_up'},
        { label: 'votes_funny', key: 'votes_funny'},
        { label: 'weighted_review_score', key: 'weighted_vote_score'},
        { label: 'comment_count', key: 'comment_count'},
        { label: 'steam_purchase', key: 'weightesteam_purchased_vote_score'},
        { label: 'marked_as_received_for_free', key: 'received_for_free'},
        { label: 'written_during_early_access', key: 'written_during_early_access'}
    ]

    const report = {
        headers: headers,
        data: reviews,
        filename: sanitize(`${game.steam_appid} ${game.name} Reviews`).replace(/[^a-z0-9]/gi, '_'),
        className: 'hidden',
        target: '_blank' 
    }

    const handleClick = () => {
        ref.link.click()
    }

    return (<>
        <CSVLink {...report} ref={(r) => ref = r}/>
        <Button className="mt-3 mb-3" disabled={reviews.length === 0} block onClick={handleClick}>Export { reviews.length > 0 && <Badge variant="light">{reviews.length.toLocaleString()} review{reviews.length !== 1 && 's'}</Badge>}</Button>
    </>)
}

export default Export