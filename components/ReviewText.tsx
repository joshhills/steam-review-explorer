import React, { useState } from "react"
import { Button } from "react-bootstrap"
import Highlighter from "react-highlight-words"
import _ from "lodash"

const REVIEW_TEXT_LENGTH_THRESHOLD = 200

const ReviewText = ({ review, viewOptions, filters }) => {

    const [initialExpanded, setInitialExpanded] = useState(!viewOptions.truncateLongReviews)
    const [expanded, setExpanded] = useState(!viewOptions.truncateLongReviews)

    if (initialExpanded !== !viewOptions.truncateLongReviews) {
        setInitialExpanded(!viewOptions.truncateLongReviews)
        setExpanded(!viewOptions.truncateLongReviews)
    }

    const needsTruncating = review.review.length > REVIEW_TEXT_LENGTH_THRESHOLD

    const truncatedReviewText = viewOptions.censorBadWords && review.censored !== undefined ? _.truncate(review.censored, {length: REVIEW_TEXT_LENGTH_THRESHOLD })
        : _.truncate(review.review, {length: REVIEW_TEXT_LENGTH_THRESHOLD })

    const textToHighlight = viewOptions.censorBadWords && review.censored !== undefined ? review.censored : review.review

    return (<>
        <Highlighter
            highlightClassName="highlighted"
            searchWords={[filters.searchTerm]}
            autoEscape={true}
            textToHighlight={expanded ? textToHighlight : truncatedReviewText}/>
        {needsTruncating && !expanded && <><br/><Button className="p-0" variant="link" onClick={() => setExpanded(true)}>View more</Button></>}
        {needsTruncating && expanded && <><br/><Button className="p-0" variant="link" onClick={() => setExpanded(false)}>View less</Button></>}
    </>)
}

export default ReviewText