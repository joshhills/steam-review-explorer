import React from "react"
import HighlightedReview from "./HighlightedReview"

const HighlightedReviewList = ({ game, reviewStatistics }) => {
    
    const reviews = {}

    const addReviewWithTitle = (title, review) => {
        if (reviews[review.recommendationid]) {
            reviews[review.recommendationid].titles.push(title)
        } else {
            reviews[review.recommendationid] = {
                titles: [title],
                review: review
            }
        }
    }

    addReviewWithTitle('highest playtime at review time', reviewStatistics.reviewMaxTotalMinutesPlayedAtReviewTime)
    addReviewWithTitle('highest playtime forever', reviewStatistics.reviewMaxTotalMinutesPlayedForever)
    addReviewWithTitle('most helpful', reviewStatistics.reviewMaxVotesUp)
    addReviewWithTitle('most funny', reviewStatistics.reviewMaxVotesFunny)
    addReviewWithTitle('most comments', reviewStatistics.reviewMaxCommentCount)
    addReviewWithTitle('longest', reviewStatistics.reviewMaxTextLength)
    
    return (<>
        {Object.values(reviews).map((r: any) => <HighlightedReview key={r.review.recommendationid} game={game} titles={r.titles} review={r.review}/>)}
    </>)
}

export default HighlightedReviewList