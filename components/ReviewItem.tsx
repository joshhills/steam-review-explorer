import dateFormat from "dateformat"

const dateFormatString = 'dd/mm/yy h:MM:ssTT'

const ReviewItem = ({ game, review }) => {

    const steamUrl = `https://steamcommunity.com/profiles/${review.author.steamid}/recommended/${game.steam_appid}/`
    const timeCreated = dateFormat(new Date(review.timestamp_created * 1000), dateFormatString)
    const timeUpdated = review.timestamp_updated > review.timestamp_created ? dateFormat(new Date(review.timestamp_updated * 1000), dateFormatString) : ''
    let language
    if (review.language === 'schinese') {
        language = 'Chinese (Simplified)'
    } else if (language === 'tchinese') {
        review.language = 'Chinese (Traditional)'
    } else {
        language = review.language.charAt(0).toUpperCase() + review.language.slice(1)
    }
    
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
            <style jsx>{`
                div {
                    padding-left: 12px;
                    padding-right: 12px;
                }
            `}</style>
            <td><div><a href={steamUrl} target="_blank">{review.recommendationid}</a></div></td>
            <td><div>{timeCreated}</div></td>
            <td><div>{timeUpdated}</div></td>
            <td><div>{review.voted_up ? '👍' : '👎'}</div></td>
            <td><div>{language}</div></td>
            <td style={{wordBreak: 'break-word', minWidth: '350px'}}><div>{review.review}</div></td>
            <td><div>{playtimeAtReview}</div></td>
            <td><div>{playtimeForever}</div></td>
            <td><div>{review.written_during_early_access && '✅'}</div></td>
            <td><div>{review.votes_up.toLocaleString()}</div></td>
            <td><div>{review.votes_funny.toLocaleString()}</div></td>
            <td><div>{review.comment_count.toLocaleString()}</div></td>
        </tr>
    )
}

export default ReviewItem