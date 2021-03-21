import React from "react"
import { Button, Container, ProgressBar } from "react-bootstrap"

/**
 * Format milliseconds into a more human-readable
 * format
 * 
 * @param ms Milliseconds as a number
 * @returns The value represented as HH:MM:SS
 */
function formatMs(ms: number) {
    let d = new Date(1000 * Math.round(ms / 1000))
    function pad(i: number) { return ('0' + i).slice(-2) }
    return d.getUTCHours() + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds())
}

/**
 * A component to display scraping progress
 * of game reviews
 */
const Loader = ({ game, update, cancelLoading }) => {
    
    const percentCompleted = Math.round(update.count / game.total_reviews * 100)
    const countFormatted = update.count.toLocaleString()
    const totalFormatted = game.total_reviews.toLocaleString()
    const kilobytesFormatted = (Math.round(update.bytes / 1000)).toLocaleString()
    const estimatedTimeRemaining = formatMs(((game.total_reviews - update.count) / 100) * update.averageRequestTime)

    return (
        <Container>
            <ProgressBar
                className="mb-3"
                now={percentCompleted}
                label={`${percentCompleted}%`}/>
            <p>
                Loading <code>{countFormatted}</code> of <code>{totalFormatted}</code> review{game.total_reviews > 1 ? 's' : ''}
                (<code>{kilobytesFormatted}kb</code>) for {game.name},
                estimated time remaining <code>{estimatedTimeRemaining}</code>
            </p>
            <Button variant="secondary" onClick={cancelLoading}>
                Cancel
            </Button>
        </Container>
    )
}

export default Loader