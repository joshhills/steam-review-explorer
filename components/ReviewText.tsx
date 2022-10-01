import React, { useState } from "react"
import { Button } from "react-bootstrap"
import Highlighter from "react-highlight-words"
import _ from "lodash"
import { FaArrowDown, FaArrowUp, FaClipboard, FaClipboardCheck, FaCopy, FaRegCopy } from "react-icons/fa"

const REVIEW_TEXT_LENGTH_THRESHOLD = 200

const ReviewText = ({ review, viewOptions, filters }) => {

    const [initialExpanded, setInitialExpanded] = useState(!viewOptions.truncateLongReviews)
    const [expanded, setExpanded] = useState(!viewOptions.truncateLongReviews)
    const [copied, setCopied] = useState(false)
    const [copiedTimerHandle, setCopiedTimerHandle] = useState(null)

    if (initialExpanded !== !viewOptions.truncateLongReviews) {
        setInitialExpanded(!viewOptions.truncateLongReviews)
        setExpanded(!viewOptions.truncateLongReviews)
    }

    const needsTruncating = review.review.length > REVIEW_TEXT_LENGTH_THRESHOLD

    const truncatedReviewText = viewOptions.censorBadWords && review.censored !== undefined ? _.truncate(review.censored, {length: REVIEW_TEXT_LENGTH_THRESHOLD })
        : _.truncate(review.review, {length: REVIEW_TEXT_LENGTH_THRESHOLD })

    const textToHighlight = viewOptions.censorBadWords && review.censored !== undefined ? review.censored : review.review

    const copyTextToClipboard = () => {

        clearTimeout(copiedTimerHandle)

        navigator.clipboard.writeText(textToHighlight)

        setCopied(true)
        
        const timerHandle = setTimeout(() => {
            setCopied(false)
        }, 3000)

        setCopiedTimerHandle(timerHandle)
    }

    return (<>
        <Highlighter
            highlightClassName="highlighted"
            searchWords={[filters.searchTerm]}
            autoEscape={true}
            textToHighlight={expanded ? textToHighlight : truncatedReviewText}/>
        <br/>
        {needsTruncating && !expanded && <><Button className="p-0" variant="link" onClick={() => setExpanded(true)}><FaArrowDown/> View more</Button>&nbsp;&nbsp;</>}
        {needsTruncating && expanded && <><Button className="p-0" variant="link" onClick={() => setExpanded(false)}><FaArrowUp/> View less</Button>&nbsp;&nbsp;</>}
        <Button className="p-0" variant="link" onClick={copyTextToClipboard}>{copied ? <><FaCopy/> Copied</> : <><FaRegCopy/> Copy</>}</Button>
    </>)
}

export default ReviewText