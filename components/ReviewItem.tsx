import dateFormat from "dateformat"
import supportedLocales from "lib/utils/SteamLocales"
import Highlighter from "react-highlight-words"

const dateFormatString = 'dd/mm/yy h:MM:ssTT'

const ReviewItem = ({ filters, game, review }) => {

    const steamUrl = `https://steamcommunity.com/profiles/${review.author.steamid}/recommended/${game.steam_appid}/`
    const timeCreated = dateFormat(new Date(review.timestamp_created * 1000), dateFormatString)
    const timeUpdated = review.timestamp_updated > review.timestamp_created ? dateFormat(new Date(review.timestamp_updated * 1000), dateFormatString) : ''
    let language = supportedLocales[review.language].englishName
    
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
            {filters.hiddenColumns.indexOf('timeCreated') === -1 && <td><div>{timeCreated}</div></td>}
            {filters.hiddenColumns.indexOf('timeUpdated') === -1 && <td><div>{timeUpdated}</div></td>}
            {filters.hiddenColumns.indexOf('votedUp') === -1 && <td><div>{review.voted_up ? '👍' : '👎'}</div></td>}
            {filters.hiddenColumns.indexOf('language') === -1 && <td><div>{language}</div></td>}
            <td style={{wordBreak: 'break-word', minWidth: '350px'}}><div>
                <Highlighter
                    highlightClassName="highlighted"
                    searchWords={[filters.searchTerm]}
                    autoEscape={true}
                    textToHighlight={review.review}/>
            </div></td>
            {filters.hiddenColumns.indexOf('playtimeAtReview') === -1 && <td><div>{playtimeAtReview}</div></td>}
            {filters.hiddenColumns.indexOf('playtimeForever') === -1 && <td><div>{playtimeForever}</div></td>}
            {filters.hiddenColumns.indexOf('earlyAccess') === -1 && <td><div>{review.written_during_early_access && '✅'}</div></td>}
            {filters.hiddenColumns.indexOf('receivedForFree') === -1 && <td><div>{review.received_for_free && '✅'}</div></td>}
            {filters.hiddenColumns.indexOf('steamPurchase') === -1 && <td><div>{review.steam_purchase && '✅'}</div></td>}
            {filters.hiddenColumns.indexOf('votesUp') === -1 && <td><div>{review.votes_up.toLocaleString()}</div></td>}
            {filters.hiddenColumns.indexOf('votesFunny') === -1 && <td><div>{review.votes_funny.toLocaleString()}</div></td>}
            {filters.hiddenColumns.indexOf('commentCount') === -1 && <td><div>{review.comment_count.toLocaleString()}</div></td>}
        </tr>
    )
}

export default ReviewItem