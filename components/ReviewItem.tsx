import dateFormat from "dateformat"
import supportedLocales from "lib/utils/SteamLocales"
import React from "react"
import ReviewText from "./ReviewText"

const dateFormatString = 'dd/mm/yy h:MM:ssTT'

const ReviewItem = ({ viewOptions, filters, game, review }) => {

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
            <td><div><a href={review.recommendationurl} target="_blank">{review.recommendationid}</a></div></td>
            {viewOptions.hiddenColumns.indexOf('timeCreated') === -1 && <td><div>{timeCreated}</div></td>}
            {viewOptions.hiddenColumns.indexOf('timeUpdated') === -1 && <td><div>{timeUpdated}</div></td>}
            {viewOptions.hiddenColumns.indexOf('votedUp') === -1 && <td><div>{review.voted_up ? '👍' : '👎'}</div></td>}
            {viewOptions.hiddenColumns.indexOf('language') === -1 && <td><div>{language}</div></td>}
            <td style={{wordBreak: 'break-word', minWidth: '350px', overflow: 'hidden'}}><div>
                <ReviewText review={review} viewOptions={viewOptions} filters={filters} />
            </div></td>
            {viewOptions.hiddenColumns.indexOf('playtimeAtReview') === -1 && <td><div>{playtimeAtReview}</div></td>}
            {viewOptions.hiddenColumns.indexOf('playtimeForever') === -1 && <td><div>{playtimeForever}</div></td>}
            {viewOptions.hiddenColumns.indexOf('earlyAccess') === -1 && <td><div>{review.written_during_early_access && '✅'}</div></td>}
            {viewOptions.hiddenColumns.indexOf('receivedForFree') === -1 && <td><div>{review.received_for_free && '✅'}</div></td>}
            {viewOptions.hiddenColumns.indexOf('steamPurchase') === -1 && <td><div>{review.steam_purchase && '✅'}</div></td>}
            {viewOptions.hiddenColumns.indexOf('votesUp') === -1 && <td><div>{review.votes_up.toLocaleString()}</div></td>}
            {viewOptions.hiddenColumns.indexOf('votesFunny') === -1 && <td><div>{review.votes_funny.toLocaleString()}</div></td>}
            {viewOptions.hiddenColumns.indexOf('commentCount') === -1 && <td><div>{review.comment_count.toLocaleString()}</div></td>}
        </tr>
    )
}

export default ReviewItem