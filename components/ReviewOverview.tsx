import React from "react"
import { Table } from "react-bootstrap"
import dateFormat from "dateformat"

const ReviewOverview = ({ game, reviewStatistics }) => {

    // Format some stats for display
    const dateFormatString = 'mmm d, yyyy'

    const averagePlaytimeAtReviewTimeHours = Math.round(reviewStatistics.averageMinutesPlaytimeAtReviewTime / 60)
    const averagePlaytimeForeverHours = Math.round(reviewStatistics.averageMinutesPlaytimeForever / 60)
    const medianPlaytimeAtReviewTimeHours = Math.round(reviewStatistics.medianMinutesPlayedAtReviewTime / 60)
    const medianPlaytimeForeverHours = Math.round(reviewStatistics.medianMinutesPlayedForever / 60)
    const totalPlaytimeForeverHours = Math.round(reviewStatistics.totalMinutesPlayedForever / 60)

    return (
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
                <td>{game.total_positive.toLocaleString()} ({Math.round(game.total_positive / reviewStatistics.totalReviews * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Total negative</strong></td>
                <td>{game.total_negative.toLocaleString()} ({Math.round(game.total_negative / reviewStatistics.totalReviews * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Average text length</strong></td>
                <td>{reviewStatistics.averageTextLength.toLocaleString()} character{reviewStatistics.averageTextLength !== 1 ? 's' : ''}</td>
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
                <td><strong>Total updated</strong></td>
                <td>{reviewStatistics.totalReviewsUpdated.toLocaleString()} ({Math.round(reviewStatistics.totalReviewsUpdated / reviewStatistics.totalReviews * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Total with comments</strong></td>
                <td>{reviewStatistics.totalWithComments.toLocaleString()} ({Math.round(reviewStatistics.totalWithComments / reviewStatistics.totalReviews * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Total purchased via Steam</strong></td>
                <td>{reviewStatistics.totalPurchasedViaSteam.toLocaleString()} ({Math.round(reviewStatistics.totalPurchasedViaSteam / reviewStatistics.totalReviews * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Total marked as recieved for free</strong></td>
                <td>{reviewStatistics.totalWrittenDuringEarlyAccess.toLocaleString()} ({Math.round(reviewStatistics.totalWrittenDuringEarlyAccess / reviewStatistics.totalReviews * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Total languages</strong></td>
                <td>{Object.keys(reviewStatistics.totalLanguages).length.toLocaleString()}</td>
            </tr>
        </tbody>
    </Table>
    )
}

export default ReviewOverview