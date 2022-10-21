import React from "react"
import ReactSpoiler from "react-spoiler"

const SwearWords = ({ game, reviewStatistics }) => {

    let totalReviewsWithSwears, percentReviewsWithSwears

    if (reviewStatistics.totalSwearWords.length > 0) {
        totalReviewsWithSwears = reviewStatistics.totalSwearWords.reduce((a:any, b:any) => a + b[1], 0)
        percentReviewsWithSwears = Math.round(totalReviewsWithSwears / reviewStatistics.totalLanguages['english'] * 100)
    }

    return reviewStatistics.totalReviews > 2 && (reviewStatistics.totalSwearWords.length > 1 && reviewStatistics.totalSwearWords[0][1] !== reviewStatistics.totalSwearWords[1][1]) ?
        <div>
            <h5>Total Profanity</h5>
            <ReactSpoiler>
                {totalReviewsWithSwears} / {reviewStatistics.totalLanguages['english']} ({Math.round(percentReviewsWithSwears)}%) English reviews contain curse words,
                the most common being '{reviewStatistics.totalSwearWords[0][0]}' which appears in {reviewStatistics.totalSwearWords[0][1]} review{reviewStatistics.totalSwearWords[0][1] === 1 ? '' : 's'}
            </ReactSpoiler>
        </div> : <></>
        
}

export default SwearWords