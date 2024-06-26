import React from "react"
import { Button, Table } from "react-bootstrap"
import dateFormat from "dateformat"
import supportedLocales from "lib/utils/SteamLocales"

const ReviewOverview = ({ game, reviewStatistics, handleFilterPreset, initialFilterRanges }) => {

    // Format some stats for display
    const dateFormatString = 'mmm d, yyyy'

    const averagePlaytimeAtReviewTimeHours = Math.round(reviewStatistics.averageMinutesPlaytimeAtReviewTime / 60)
    const averageMinutesPlaytimeAfterReviewTimeHours = Math.round(reviewStatistics.averageMinutesPlaytimeAfterReviewTime / 60)
    const averageMinutesPlaytimeAfterPositiveReviewTimeHours = Math.round(reviewStatistics.averageMinutesPlayedAfterReviewTimePositive / 60)
    const averageMinutesPlaytimeAfterNegativeReviewTimeHours = Math.round(reviewStatistics.averageMinutesPlayedAfterReviewTimeNegative / 60)
    const medianMinutesContinuedPlayingAfterPositiveReviewHours = Math.round(reviewStatistics.medianMinutesContinuedPlayingAfterPositiveReview / 60)
    const medianMinutesContinuedPlayingAfterNegativeReviewHours = Math.round(reviewStatistics.medianMinutesContinuedPlayingAfterNegativeReview / 60)
    const averagePlaytimeForeverHours = Math.round(reviewStatistics.averageMinutesPlaytimeForever / 60)
    const averagePlaytimeLastTwoWeeksHours = Math.round(reviewStatistics.averageMinutesPlaytimeLastTwoWeeks / 60)
    const medianPlaytimeAtReviewTimeHours = Math.round(reviewStatistics.medianMinutesPlayedAtReviewTime / 60)
    const medianPlaytimeForeverHours = Math.round(reviewStatistics.medianMinutesPlayedForever / 60)
    const medianPlaytimeLastTwoWeeksHours = Math.round(reviewStatistics.medianMinutesPlayedLastTwoWeeks / 60)
    const totalPlaytimeForeverHours = Math.round(reviewStatistics.totalMinutesPlayedForever / 60)
    const totalPlaytimeLastTwoWeeksHours = Math.round(reviewStatistics.totalMinutesPlayedLastTwoWeeks / 60)

    const navToPositive = () => {
        handleFilterPreset({
            votedUpPositive: true,
            votedUpNegative: false
        })
    }

    const navToNegative = () => {
        handleFilterPreset({
            votedUpPositive: false,
            votedUpNegative: true
        })
    }

    const navToEarlyAccess = () => {
        handleFilterPreset({
            earlyAccessYes: true,
            earlyAccessNo: false
        })
    }

    const navToSteamPurchase = () => {
        handleFilterPreset({
            steamPurchaseYes: true,
            steamPurchaseNo: false
        })
    }

    const navToFree = () => {
        handleFilterPreset({
            receivedForFreeYes: true,
            receivedForFreeNo: false
        })
    }

    const navToComments = () => {
        handleFilterPreset({
            commentCount: [1, initialFilterRanges['commentCount'][1]]
        })
    }

    return (
        <>
        <h5>Totals &amp; Ranges</h5>
        <Table className="mt-3">
            <tbody>
            <tr>
                <td style={{borderTop: 'none'}}><strong>Total public reviews retrieved</strong></td>
                <td style={{borderTop: 'none'}}>{reviewStatistics.totalReviews.toLocaleString()}</td>
            </tr>
            <tr>
                <td><strong>In date range</strong></td>
                <td>{dateFormat(new Date(reviewStatistics.reviewMinTimestampCreated.timestamp_updated * 1000), dateFormatString)} - {dateFormat(new Date(reviewStatistics.reviewMaxTimestampUpdated.timestamp_updated * 1000), dateFormatString)}</td>
            </tr>
            <tr>
                <td><strong>Total positive</strong></td>
                <td><Button className="p-0" variant="link" onClick={navToPositive}>{game.total_positive.toLocaleString()} ({Math.round(game.total_positive / reviewStatistics.totalReviews * 100)}%)</Button></td>
            </tr>
            <tr>
                <td><strong>Total negative</strong></td>
                <td><Button className="p-0" variant="link" onClick={navToNegative}>{game.total_negative.toLocaleString()} ({Math.round(game.total_negative / reviewStatistics.totalReviews * 100)}%)</Button></td>
            </tr>
            <tr>
                <td><strong>Average text length</strong></td>
                <td>{reviewStatistics.averageTextLength.toLocaleString()} character{reviewStatistics.averageTextLength !== 1 ? 's' : ''}</td>
            </tr>
            <tr>
                <td><strong>Median text length</strong></td>
                <td>{reviewStatistics.medianTextLength.toLocaleString()} character{reviewStatistics.medianTextLength !== 1 ? 's' : ''}</td>
            </tr>
            <tr>
                <td><strong>Min playtime at review time</strong></td>
                <td>{reviewStatistics.reviewMinTotalMinutesPlayedAtReviewTime.author_playtime_at_review < 60 ? `${reviewStatistics.reviewMinTotalMinutesPlayedAtReviewTime.author_playtime_at_review} minute${reviewStatistics.reviewMinTotalMinutesPlayedAtReviewTime.author_playtime_at_review !== 1 ? 's' : ''}` : `${(Math.round(reviewStatistics.reviewMinTotalMinutesPlayedAtReviewTime.author_playtime_at_review / 60)).toLocaleString()} hour${(Math.round(reviewStatistics.reviewMinTotalMinutesPlayedAtReviewTime.author_playtime_at_review / 60)) !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Max playtime at review time</strong></td>
                <td>{reviewStatistics.reviewMaxTotalMinutesPlayedAtReviewTime.author_playtime_at_review < 60 ? `${reviewStatistics.reviewMaxTotalMinutesPlayedAtReviewTime.author_playtime_at_review} minute${reviewStatistics.reviewMaxTotalMinutesPlayedAtReviewTime.author_playtime_at_review !== 1 ? 's' : ''}` : `${(Math.round(reviewStatistics.reviewMaxTotalMinutesPlayedAtReviewTime.author_playtime_at_review / 60)).toLocaleString()} hour${(Math.round(reviewStatistics.reviewMaxTotalMinutesPlayedAtReviewTime.author_playtime_at_review / 60)) !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Average playtime at review time</strong></td>
                <td>{reviewStatistics.averageMinutesPlaytimeAtReviewTime < 60 ? `${reviewStatistics.averageMinutesPlaytimeAtReviewTime} minute${reviewStatistics.averageMinutesPlaytimeAtReviewTime !== 1 ? 's' : ''}` : `${averagePlaytimeAtReviewTimeHours.toLocaleString()} hour${averagePlaytimeAtReviewTimeHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Median playtime at review time</strong></td>
                <td>{reviewStatistics.medianMinutesPlaytimeAtReviewTime < 60 ? `${reviewStatistics.medianMinutesPlaytimeAtReviewTime} minute${reviewStatistics.medianMinutesPlaytimeAtReviewTime !== 1 ? 's' : ''}` : `${medianPlaytimeAtReviewTimeHours.toLocaleString()} hour${medianPlaytimeAtReviewTimeHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Min playtime forever</strong></td>
                <td>{reviewStatistics.reviewMinTotalMinutesPlayedForever.author_playtime_forever < 60 ? `${reviewStatistics.reviewMinTotalMinutesPlayedForever.author_playtime_forever} minute${reviewStatistics.reviewMinTotalMinutesPlayedForever.author_playtime_forever !== 1 ? 's' : ''}` : `${(Math.round(reviewStatistics.reviewMinTotalMinutesPlayedForever.author_playtime_forever / 60)).toLocaleString()} hour${(Math.round(reviewStatistics.reviewMinTotalMinutesPlayedForever.author_playtime_forever / 60)) !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Max playtime forever</strong></td>
                <td>{reviewStatistics.reviewMaxTotalMinutesPlayedForever.author_playtime_forever < 60 ? `${reviewStatistics.reviewMaxTotalMinutesPlayedForever.author_playtime_forever} minute${reviewStatistics.reviewMaxTotalMinutesPlayedForever.author_playtime_forever !== 1 ? 's' : ''}` : `${(Math.round(reviewStatistics.reviewMaxTotalMinutesPlayedForever.author_playtime_forever / 60)).toLocaleString()} hour${(Math.round(reviewStatistics.reviewMaxTotalMinutesPlayedForever.author_playtime_forever / 60)) !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Average playtime forever</strong></td>
                <td>{reviewStatistics.averageMinutesPlaytimeForever < 60 ? `${reviewStatistics.averageMinutesPlaytimeForever} minute${reviewStatistics.averageMinutesPlaytimeForever !== 1 ? 's' : ''}` : `${averagePlaytimeForeverHours.toLocaleString()} hour${averagePlaytimeForeverHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Median playtime forever</strong></td>
                <td>{reviewStatistics.medianMinutesPlaytimeForever < 60 ? `${reviewStatistics.medianMinutesPlaytimeForever} minute${reviewStatistics.medianMinutesPlaytimeForever !== 1 ? 's' : ''}` : `${medianPlaytimeForeverHours.toLocaleString()} hour${medianPlaytimeForeverHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Total playtime forever</strong></td>
                <td>{reviewStatistics.totalMinutesPlayedForever < 60 ? `${reviewStatistics.totalMinutesPlayedForever} minute${reviewStatistics.totalMinutesPlayedForever !== 1 ? 's' : ''}` : `${totalPlaytimeForeverHours.toLocaleString()} hour${totalPlaytimeForeverHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Average playtime last two weeks</strong></td>
                <td>{reviewStatistics.averageMinutesPlaytimeLastTwoWeeks < 60 ? `${reviewStatistics.averageMinutesPlaytimeLastTwoWeeks} minute${reviewStatistics.averageMinutesPlaytimeLastTwoWeeks !== 1 ? 's' : ''}` : `${averagePlaytimeLastTwoWeeksHours.toLocaleString()} hour${averagePlaytimeLastTwoWeeksHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Median playtime last two weeks</strong></td>
                <td>{reviewStatistics.medianMinutesPlaytimeLastTwoWeeks < 60 ? `${reviewStatistics.medianMinutesPlaytimeLastTwoWeeks} minute${reviewStatistics.medianMinutesPlaytimeLastTwoWeeks !== 1 ? 's' : ''}` : `${medianPlaytimeLastTwoWeeksHours.toLocaleString()} hour${medianPlaytimeLastTwoWeeksHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Total playtime last two weeks</strong></td>
                <td>{reviewStatistics.totalMinutesPlayedLastTwoWeeks < 60 ? `${reviewStatistics.totalMinutesPlayedLastTwoWeeks} minute${reviewStatistics.totalMinutesPlayedLastTwoWeeks !== 1 ? 's' : ''}` : `${totalPlaytimeLastTwoWeeksHours.toLocaleString()} hour${totalPlaytimeLastTwoWeeksHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Total continued playing after review</strong></td>
                <td>{reviewStatistics.totalContinuedPlayingAfterReviewTime.toLocaleString()} ({Math.round(reviewStatistics.totalContinuedPlayingAfterReviewTime / reviewStatistics.totalReviews * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Total continued playing after positive review</strong></td>
                <td>{reviewStatistics.totalContinuedPlayingAfterReviewTimePositive.toLocaleString()} ({Math.round(reviewStatistics.totalContinuedPlayingAfterReviewTimePositive / reviewStatistics.totalReviews * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Total continued playing after negative review</strong></td>
                <td>{reviewStatistics.totalContinuedPlayingAfterReviewTimeNegative.toLocaleString()} ({Math.round(reviewStatistics.totalContinuedPlayingAfterReviewTimeNegative / reviewStatistics.totalReviews * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Average playtime after review time</strong></td>
                <td>{reviewStatistics.averageMinutesPlaytimeAfterReviewTime < 60 ? `${reviewStatistics.averageMinutesPlaytimeAfterReviewTime} minute${reviewStatistics.averageMinutesPlaytimeAfterReviewTime !== 1 ? 's' : ''}` : `${averageMinutesPlaytimeAfterReviewTimeHours.toLocaleString()} hour${averageMinutesPlaytimeAfterReviewTimeHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Average playtime after positive review time</strong></td>
                <td>{reviewStatistics.averageMinutesPlaytimeAfterReviewTimePositive < 60 ? `${reviewStatistics.averageMinutesPlaytimeAfterReviewTimePositive} minute${reviewStatistics.averageMinutesPlaytimeAfterReviewTimePositive !== 1 ? 's' : ''}` : `${averageMinutesPlaytimeAfterPositiveReviewTimeHours.toLocaleString()} hour${averageMinutesPlaytimeAfterPositiveReviewTimeHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Median playtime after positive review time</strong></td>
                <td>{reviewStatistics.medianMinutesContinuedPlayingAfterPositiveReview < 60 ? `${reviewStatistics.medianMinutesContinuedPlayingAfterPositiveReview} minute${reviewStatistics.medianMinutesContinuedPlayingAfterPositiveReview !== 1 ? 's' : ''}` : `${medianMinutesContinuedPlayingAfterPositiveReviewHours.toLocaleString()} hour${medianMinutesContinuedPlayingAfterPositiveReviewHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Average playtime after negative review time</strong></td>
                <td>{reviewStatistics.averageMinutesPlaytimeAfterReviewTimeNegative < 60 ? `${reviewStatistics.averageMinutesPlaytimeAfterReviewTimeNegative} minute${reviewStatistics.averageMinutesPlaytimeAfterReviewTimeNegative !== 1 ? 's' : ''}` : `${averageMinutesPlaytimeAfterNegativeReviewTimeHours.toLocaleString()} hour${averageMinutesPlaytimeAfterNegativeReviewTimeHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Median playtime after negative review time</strong></td>
                <td>{reviewStatistics.medianMinutesContinuedPlayingAfterNegativeReview < 60 ? `${reviewStatistics.medianMinutesContinuedPlayingAfterNegativeReview} minute${reviewStatistics.medianMinutesContinuedPlayingAfterNegativeReview !== 1 ? 's' : ''}` : `${medianMinutesContinuedPlayingAfterNegativeReviewHours.toLocaleString()} hour${medianMinutesContinuedPlayingAfterNegativeReviewHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Total updated</strong></td>
                <td>{reviewStatistics.totalReviewsUpdated.toLocaleString()} ({Math.round(reviewStatistics.totalReviewsUpdated / reviewStatistics.totalReviews * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Total with comments</strong></td>
                <td><Button className="p-0" variant="link" onClick={navToComments}>{reviewStatistics.totalWithComments.toLocaleString()} ({Math.round(reviewStatistics.totalWithComments / reviewStatistics.totalReviews * 100)}%)</Button></td>
            </tr>
            <tr>
                <td><strong>Total purchased via Steam</strong></td>
                <td><Button className="p-0" variant="link" onClick={navToSteamPurchase}>{reviewStatistics.totalPurchasedViaSteam.toLocaleString()} ({Math.round(reviewStatistics.totalPurchasedViaSteam / reviewStatistics.totalReviews * 100)}%)</Button></td>
            </tr>
            <tr>
                <td><strong>Total marked as received for Free</strong></td>
                <td><Button className="p-0" variant="link" onClick={navToFree}>{reviewStatistics.totalMarkedAsReceivedForFree.toLocaleString()} ({Math.round(reviewStatistics.totalMarkedAsReceivedForFree / reviewStatistics.totalReviews * 100)}%)</Button></td>
            </tr>
            <tr>
                <td><strong>Total written during early access</strong></td>
                <td><Button className="p-0" variant="link" onClick={navToEarlyAccess}>{reviewStatistics.totalWrittenDuringEarlyAccess.toLocaleString()} ({Math.round(reviewStatistics.totalWrittenDuringEarlyAccess / reviewStatistics.totalReviews * 100)}%)</Button></td>
            </tr>
            <tr>
                <td><strong>Total languages</strong></td>
                <td><a target="_blank" href="https://partner.steamgames.com/doc/store/localization/languages">{Object.keys(reviewStatistics.totalLanguages).length.toLocaleString()} / {Object.keys(supportedLocales).length.toLocaleString()}</a></td>
            </tr>
        </tbody>
    </Table>
    </>
    )
}

export default ReviewOverview