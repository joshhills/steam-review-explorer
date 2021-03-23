import React from "react"
import { Table } from "react-bootstrap"
import dateFormat from "dateformat"

const ReviewOverview = ({ game, reviews }) => {
    
    const dateFormatString = 'mmm d, yyyy'

    // Munge data
    const timestampCreatedSorted = reviews.map(r => r.timestamp_created * 1000).sort((a: number, b: number) => a-b)

    // const playtimeAtReviewTimeSorted = reviews.map(r => r.author.playtime_at_review).sort((a: number, b: number) => a-b)
    const averagePlaytimeAtReviewTimeMinutes = Math.round(reviews.reduce((a, b) => {
        if(isNaN(b.author.playtime_at_review)) {
            // Patch Steam's API missing info
            b.author.playtime_at_review = b.author.playtime_forever
        }
        return a + b.author.playtime_at_review
    }, 0) / reviews.length)
    const averagePlaytimeAtReviewTimeHours = Math.round(averagePlaytimeAtReviewTimeMinutes / 60)
    
    // const playtimeForeverSorted = reviews.map(r => r.author.playtime_forever).sort((a: number, b: number) => a-b)
    const averagePlaytimeForeverMinutes = Math.round(reviews.reduce((a, b) => a + b.author.playtime_forever, 0) / reviews.length)
    const averagePlaytimeForeverHours = Math.round(averagePlaytimeForeverMinutes / 60)

    const numberReviewsUpdated = reviews.reduce((a, b) => a + (b.timestamp_updated > b.timestamp_created ? 1 : 0), 0)

    return (
        <Table className="mt-3">
            <tbody>
            <tr>
                <td style={{borderTop: 'none'}}><strong>Total public reviews retrieved</strong></td>
                <td style={{borderTop: 'none'}}>{reviews.length.toLocaleString()}</td>
            </tr>
            <tr>
                <td><strong>Total positive</strong></td>
                <td>{game.total_positive.toLocaleString()} ({Math.round(game.total_positive / reviews.length * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>Total negative</strong></td>
                <td>{game.total_negative.toLocaleString()} ({Math.round(game.total_negative / reviews.length * 100)}%)</td>
            </tr>
            <tr>
                <td><strong>In date range</strong></td>
                <td>{dateFormat(new Date(timestampCreatedSorted[0]), dateFormatString)} - {dateFormat(new Date(timestampCreatedSorted[timestampCreatedSorted.length - 1]), dateFormatString)}</td>
            </tr>
            <tr>
                <td><strong>Average playtime at review time</strong></td>
                <td>{averagePlaytimeAtReviewTimeMinutes < 60 ? `${averagePlaytimeAtReviewTimeMinutes} minute${averagePlaytimeAtReviewTimeMinutes !== 1 ? 's' : ''}` : `${averagePlaytimeAtReviewTimeHours.toLocaleString()} hour${averagePlaytimeAtReviewTimeHours > 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                    <td><strong>Average playtime forever</strong></td>
                <td>{averagePlaytimeForeverMinutes < 60 ? `${averagePlaytimeForeverMinutes} minute${averagePlaytimeForeverMinutes !== 1 ? 's' : ''}` : `${averagePlaytimeForeverHours.toLocaleString()} hour${averagePlaytimeForeverHours !== 1 ? 's' : ''}`}</td>
            </tr>
            <tr>
                <td><strong>Total reviews updated</strong></td>
                <td>{numberReviewsUpdated.toLocaleString()} ({Math.round(numberReviewsUpdated / reviews.length * 100)}%)</td>
            </tr>
        </tbody>
    </Table>
    )
}

export default ReviewOverview