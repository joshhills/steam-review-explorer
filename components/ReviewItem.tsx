import dateFormat from "dateformat"
import supportedLocales from "lib/utils/SteamLocales"
import React from "react"
import { FaCheck, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa"
import ReviewText from "./ReviewText"

const dateFormatString = 'dd/mm/yyyy h:MM:sstt'

const ReviewItem = ({ viewOptions, filters, game, review, reviewTextTruncateLength }) => {

    const timeCreated = dateFormat(new Date(review.timestamp_created * 1000), dateFormatString)
    const timeUpdated = review.timestamp_updated > review.timestamp_created ? dateFormat(new Date(review.timestamp_updated * 1000), dateFormatString) : ''
    const timeLastPlayed = review.author_last_played > 0 ? dateFormat(new Date(review.author_last_played * 1000), dateFormatString): ''
    let language = supportedLocales[review.language].englishName
    
    const playtimeAtReviewTimeHours = Math.round(review.author_playtime_at_review / 60)
    const playtimeForeverHours = Math.round(review.author_playtime_forever / 60)
    const playtime2WeeksHours = Math.round(review.author_playtime_last_two_weeks / 60)

    const playtimeAtReview = review.author_playtime_at_review < 60 ?
        `${review.author_playtime_at_review} minute${review.author_playtime_at_review !== 1 ? 's' : ''}`
        : `${playtimeAtReviewTimeHours.toLocaleString()} hour${playtimeAtReviewTimeHours !== 1 ? 's' : ''}`

    const playtimeForever = review.author_playtime_forever < 60 ?
        `${review.author_playtime_forever} minute${review.author_playtime_forever !== 1 ? 's' : ''}`
        : `${playtimeForeverHours.toLocaleString()} hour${playtimeForeverHours !== 1 ? 's' : ''}`

    const playtime2Weeks = review.author_playtime_last_two_weeks < 60 ?
        `${review.author_playtime_last_two_weeks} minute${review.author_playtime_last_two_weeks !== 1 ? 's' : ''}`
        : `${playtime2WeeksHours.toLocaleString()} hour${playtime2WeeksHours !== 1 ? 's' : ''}`

    const hiddenColumnsFormatted = viewOptions.hiddenColumns.map((v: { value: string }) => v.value)

    return (
        <tr key={review.recommendationid} className={review.voted_up ? 'table-success' : 'table-danger'}>
            <style jsx>{`
                div {
                    padding-left: 12px;
                    padding-right: 12px;
                }
            `}</style>
            <td><div><a href={review.recommendationurl} target="_blank">{review.recommendationid}</a></div></td>
            {hiddenColumnsFormatted.indexOf('timeCreated') === -1 && <td><div>{timeCreated}</div></td>}
            {hiddenColumnsFormatted.indexOf('timeUpdated') === -1 && <td><div>{timeUpdated}</div></td>}
            {hiddenColumnsFormatted.indexOf('votedUp') === -1 && <td><div>{review.voted_up ? <FaRegThumbsUp/> : <FaRegThumbsDown/>}</div></td>}
            {hiddenColumnsFormatted.indexOf('language') === -1 && <td><div>{language}</div></td>}
            <td style={{wordBreak: 'break-word', minWidth: '350px', overflow: 'hidden'}}><div>
                <ReviewText review={review} viewOptions={viewOptions} filters={filters} textLength={reviewTextTruncateLength} />
            </div></td>
            {hiddenColumnsFormatted.indexOf('playtimeAtReview') === -1 && <td><div>{playtimeAtReview}</div></td>}
            {hiddenColumnsFormatted.indexOf('playtimeForever') === -1 && <td><div>{playtimeForever}</div></td>}
            {hiddenColumnsFormatted.indexOf('playtime2Weeks') === -1 && <td><div>{playtime2Weeks}</div></td>}
            {hiddenColumnsFormatted.indexOf('earlyAccess') === -1 && <td><div>{review.written_during_early_access && <FaCheck/>}</div></td>}
            {hiddenColumnsFormatted.indexOf('receivedForFree') === -1 && <td><div>{review.received_for_free && <FaCheck/>}</div></td>}
            {hiddenColumnsFormatted.indexOf('steamPurchase') === -1 && <td><div>{review.steam_purchase && <FaCheck/>}</div></td>}
            {hiddenColumnsFormatted.indexOf('authorNumReviews') === -1 && <td><div>{review.author_num_reviews.toLocaleString()}</div></td>}
            {hiddenColumnsFormatted.indexOf('authorNumGames') === -1 && <td><div>{review.author_num_games_owned.toLocaleString()}</div></td>}
            {hiddenColumnsFormatted.indexOf('authorContinuedPlaying') === -1 && <td><div>{review.author_continued_playing && <FaCheck/>}</div></td>}
            {hiddenColumnsFormatted.indexOf('authorLastPlayed') === -1 && <td><div>{timeLastPlayed}</div></td>}
            {hiddenColumnsFormatted.indexOf('votesUp') === -1 && <td><div>{review.votes_up.toLocaleString()}</div></td>}
            {hiddenColumnsFormatted.indexOf('votesFunny') === -1 && <td><div>{review.votes_funny.toLocaleString()}</div></td>}
            {hiddenColumnsFormatted.indexOf('commentCount') === -1 && <td><div>{review.comment_count.toLocaleString()}</div></td>}
        </tr>
    )
}

export default ReviewItem