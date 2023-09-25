import React, { useState } from "react"
import { Button } from "react-bootstrap"
import Highlighter from "react-highlight-words"
import _ from "lodash"
import { FaArrowDown, FaArrowUp, FaCopy, FaRegCopy } from "react-icons/fa"

const MIN_REVIEW_TEXT_TRUNCATE_LENGTH_THRESHOLD = 256

const ReviewText = ({ review, viewOptions, filters, textLength }) => {

    let textLengthActual = textLength < MIN_REVIEW_TEXT_TRUNCATE_LENGTH_THRESHOLD ? MIN_REVIEW_TEXT_TRUNCATE_LENGTH_THRESHOLD : textLength

    const [initialExpanded, setInitialExpanded] = useState(!viewOptions.truncateLongReviews)
    const [expanded, setExpanded] = useState(!viewOptions.truncateLongReviews)
    const [copied, setCopied] = useState(false)
    const [copiedTimerHandle, setCopiedTimerHandle] = useState(null)

    if (initialExpanded !== !viewOptions.truncateLongReviews) {
        setInitialExpanded(!viewOptions.truncateLongReviews)
        setExpanded(!viewOptions.truncateLongReviews)
    }

    const needsTruncating = review.review.length > textLengthActual

    const truncatedReviewText = viewOptions.censorBadWords && review.censored !== undefined ? _.truncate(review.censored, {length: textLengthActual })
        : _.truncate(review.review, {length: textLengthActual })

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
            searchWords={filters.exactSearchTerm === 'partialIgnoreCase' ? [filters.searchTerm].concat(filters.searchTerm.split(' ')) : [filters.searchTerm]}
            autoEscape={true}
            textToHighlight={expanded ? textToHighlight : truncatedReviewText}/>
        <br/>
        {needsTruncating && !expanded && <><Button className="p-0" variant="link" onClick={() => setExpanded(true)}><FaArrowDown/> View more</Button>&nbsp;&nbsp;</>}
        {needsTruncating && expanded && <><Button className="p-0" variant="link" onClick={() => setExpanded(false)}><FaArrowUp/> View less</Button>&nbsp;&nbsp;</>}
        <Button className="p-0" variant="link" onClick={copyTextToClipboard}>{copied ? <><FaCopy/> Copied</> : <><FaRegCopy/> Copy</>}</Button>
    </>)
}

export default ReviewText