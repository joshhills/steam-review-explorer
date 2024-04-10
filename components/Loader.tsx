import React from "react"
import { Button, Col, Container, ProgressBar, Row } from "react-bootstrap"

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
const Loader = ({ game, update, error, proceedCallback, timeStartedScraping, foreverTime = true }) => {

    if (update.count > game.total_reviews) {
        update.count = game.total_reviews
    }

    let percentCompleted = Math.round(update.count / game.total_reviews * 100)
    const countFormatted = update.count.toLocaleString()
    const checkedFormatted = update.checked.toLocaleString()
    const totalFormatted = game.total_reviews.toLocaleString()
    const kilobytesFormatted = (Math.round(update.bytes / 1000)).toLocaleString()
    const estimatedTimeRemaining = formatMs(((game.total_reviews - update.checked) / 100) * update.averageRequestTime)
    const timeElapsedMs = Date.now() - timeStartedScraping
    const timeElapsed = formatMs(Date.now() - timeStartedScraping)

    const message = update.finished ? <p>Finished loading {countFormatted} review{update.count !== 1 ? 's' : ''} for {game.name}, computing statistics...</p> : <p>Searching backwards in time! Checked <code>{checkedFormatted}</code> of an estimated total <code>{totalFormatted}</code> review{game.total_reviews !== 1 ? 's' : ''} (
        <code>~{kilobytesFormatted}kb</code>) for {game.name}, <code>{timeElapsed}</code> elapsed{foreverTime ? <>, estimated time remaining <code>{estimatedTimeRemaining}</code></> : <>{/*A time estimate cannot be provided for custom searches.*/}</>}</p>

    const loaderContents = update.finished && update.count === 0 ?
        <>
            <p>No reviews were found matching your criteria</p>
            <Row>
                <Col>
                    <div className="d-grid">
                        <Button className="mb-3" variant="secondary" href="/steam-review-explorer/">
                            Go back
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
        :
        <>
            <ProgressBar
                className="mb-3"
                now={percentCompleted}
                label={`${percentCompleted}%`}/>
            {message}
            {error && error.attemptNumber && <p className="text-warning">
                Stopped receiving reviews from Steam, making sure we're at the end (attempt {error.attemptNumber} of {error.attemptNumber + error.triesLeft})
            </p>}
            <p>
                {timeElapsedMs > 20000 ? <span><a href="https://partner.steamgames.com/doc/store/getreviews" target="_blank">Steam's API</a> limits us to requesting 100 reviews at a time, every few seconds...{!foreverTime && <> We also can't start looking from a specific point in time...</>}</span> : <span>&nbsp;</span>}
            </p>
            <Row>
                <Col>
                    <div className="d-grid">
                        <Button className="mb-3" variant="secondary" href="/steam-review-explorer/">
                            Cancel
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div className="d-grid">
                        <Button variant="warning" onClick={proceedCallback}>
                            Proceed {(!error || !error.attemptNumber) && 'Early'}
                        </Button>
                    </div>
                </Col>
            </Row>
        </>

    return (
        <Container>
            {loaderContents}
        </Container>
    )
}

export default Loader