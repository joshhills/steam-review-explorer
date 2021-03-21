import dateFormat from "dateformat"

const dateFormatString = 'dd/mm/yy h:MM:ss TT'

const ReviewItem = ({ game, review }) => {

    const steamUrl = `https://steamcommunity.com/profiles/${review.author.steamid}/recommended/${game.steam_appid}/`
    const timeCreated = dateFormat(new Date(review.timestamp_created * 1000), dateFormatString)
    const timeUpdated = review.timestamp_updated > review.timestamp_created ? dateFormat(new Date(review.timestamp_updated * 1000), dateFormatString) : ''
    const language = review.language.charAt(0).toUpperCase() + review.language.slice(1)
    
    const playtimeAtReviewTimeHours = Math.round(review.author.playtime_at_review / 60)
    const playtimeForeverHours = Math.round(review.author.playtime_forever / 60)

    const playtimeAtReview = review.author.playtime_at_review < 60 ?
        `${review.author.playtime_at_review} minute${review.author.playtime_at_review !== 1 ? 's' : ''}`
        : `${playtimeAtReviewTimeHours.toLocaleString()} hour${playtimeAtReviewTimeHours !== 1 ? 's' : ''}`

    const playtimeForever = review.author.playtime_forever < 60 ?
        `${review.author.playtime_forever} minute${review.author.playtime_forever !== 1 ? 's' : ''}`
        : `${playtimeForeverHours.toLocaleString()} hour${playtimeForeverHours !== 1 ? 's' : ''}`

    return (
        <tr key={review.recommendationid} className={review.voted_up ? 'table-success' : 'table-danger'}>
            <td><a href={steamUrl}>{review.recommendationid}</a></td>
            <td>{timeCreated}</td>
            <td>{timeUpdated}</td>
            <td>{review.voted_up ? '👍' : '👎'}</td>
            <td>{language}</td>
            <td style={{wordBreak: 'break-word', minWidth: '400px'}}>{review.review}</td>
            <td>{playtimeAtReview}</td>
            <td>{playtimeForever}</td>
            <td>{review.written_during_early_access && '✅'}</td>
            <td>{review.votes_up.toLocaleString()}</td>
            <td>{review.votes_funny.toLocaleString()}</td>
            <td>{review.comment_count.toLocaleString()}</td>
        </tr>
    )
}

export default ReviewItem