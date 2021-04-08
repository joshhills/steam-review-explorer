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

    if (reviewStatistics.totalReviews > 1) {
        addReviewWithTitle('highest playtime at review time', reviewStatistics.reviewMaxTotalMinutesPlayedAtReviewTime)
        addReviewWithTitle('highest playtime forever', reviewStatistics.reviewMaxTotalMinutesPlayedForever)
        addReviewWithTitle('longest', reviewStatistics.reviewMaxTextLength)
    
        if (reviewStatistics.reviewMaxVotesUp.votes_up > 0) {
            addReviewWithTitle('most helpful', reviewStatistics.reviewMaxVotesUp)
        }
        if (reviewStatistics.reviewMaxVotesFunny.votes_funny > 0) {
            addReviewWithTitle('most funny', reviewStatistics.reviewMaxVotesFunny)
        }
        if (reviewStatistics.reviewMaxCommentCount.comment_count > 0) {
            addReviewWithTitle('most comments', reviewStatistics.reviewMaxCommentCount)
        }
    }
    
    
    return (<>
        {Object.values(reviews).map((r: any) => <HighlightedReview key={r.review.recommendationid} game={game} titles={r.titles} review={r.review}/>)}
        {Object.values(reviews).length === 0 && <p className="mt-3">This product has too few reviews to determine highlighted reviews</p>}
    </>)
}

export default HighlightedReviewList