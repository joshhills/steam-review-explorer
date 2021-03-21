import React, { useState } from "react"
import { Pagination, Tab, Table, Tabs } from "react-bootstrap"
import dateFormat from "dateformat"
import ReviewScoreBadge from "./ReviewScoreBadge"

const PAGE_SIZE = 20
const PAGE_BUFFER = 6

const Breakdown = ({ game, reviews }) => {

    // Pagination
    const scrollTop = (afterFunc) => {
        afterFunc()
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    const [filterPageIndex, setFilterPageIndex] = useState(0)

    const handleFilterIndex = (ix) => {
        setFilterPageIndex(ix)
    }

    const handleFilterFirst = () => {
        setFilterPageIndex(0)
    }

    const handleFilterLast = () => {
        setFilterPageIndex(Math.ceil(reviews.length / PAGE_SIZE) - 1)
    }

    const handleFilterPrevious = () => {
        if (filterPageIndex > 0) {
            setFilterPageIndex(filterPageIndex - 1)
        }
    }

    const handleFilterNext = () => {
        if (filterPageIndex < Math.ceil(reviews.length / PAGE_SIZE - 1)) {
            setFilterPageIndex(filterPageIndex + 1)
        }
    }

    let reviewPaginationItemsTop = []
    let reviewPaginationItemsBottom = []
    let startPaginationBuffer = filterPageIndex - PAGE_BUFFER / 2 < 0 ? 0 : filterPageIndex - PAGE_BUFFER / 2
    if (startPaginationBuffer + PAGE_BUFFER > Math.ceil(reviews.length / PAGE_SIZE - 1)) {
        startPaginationBuffer = Math.ceil(reviews.length / PAGE_SIZE) - PAGE_BUFFER
    }
    startPaginationBuffer = startPaginationBuffer < 0 ? 0 : startPaginationBuffer

    for (let i = 0; i < PAGE_BUFFER && i < Math.ceil(reviews.length / PAGE_SIZE); i++) {
        reviewPaginationItemsTop.push(
            <Pagination.Item key={startPaginationBuffer + i} active={startPaginationBuffer + i === filterPageIndex} onClick={() => handleFilterIndex(startPaginationBuffer + i)}>
              {startPaginationBuffer + i + 1}
            </Pagination.Item>)
        reviewPaginationItemsBottom.push(
            <Pagination.Item key={startPaginationBuffer + i} active={startPaginationBuffer + i === filterPageIndex} onClick={() => scrollTop(() => handleFilterIndex(startPaginationBuffer + i))}>
              {startPaginationBuffer + i + 1}
            </Pagination.Item>)
    }

    // Dates
    const gameDateFormatString = 'mmm d, yyyy'
    const reviewDateFormatString = 'dd/mm/yy h:MM:ss TT'

    // Data Munging
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
        <>
            <Tabs defaultActiveKey="overview" className="mt-1">
                <Tab eventKey="overview" title="Overview">
                    <Table className="mt-3">
                        <tbody>
                            <tr>
                                <td style={{borderTop: 'none'}}><strong>Review Score</strong></td>
                                <td style={{borderTop: 'none'}}><ReviewScoreBadge game={game} showTooltip={false}/></td>
                            </tr>
                            <tr>
                                <td><strong>Total public reviews</strong></td>
                                <td>{reviews.length.toLocaleString()}</td>
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
                                <td>{dateFormat(new Date(timestampCreatedSorted[0]), gameDateFormatString)} - {dateFormat(new Date(timestampCreatedSorted[timestampCreatedSorted.length - 1]), gameDateFormatString)}</td>
                            </tr>
                            <tr>
                                <td><strong>Average playtime at review time</strong></td>
                                <td>{averagePlaytimeAtReviewTimeMinutes < 60 ? `${averagePlaytimeAtReviewTimeMinutes} minute${averagePlaytimeAtReviewTimeMinutes > 1 ? 's' : ''}` : `${averagePlaytimeAtReviewTimeHours.toLocaleString()} hour${averagePlaytimeAtReviewTimeHours > 1 ? 's' : ''}`}</td>
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
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    <Pagination className="mt-3">
                        <Pagination.First disabled={filterPageIndex === 0} onClick={handleFilterFirst} />
                        <Pagination.Prev disabled={filterPageIndex === 0} onClick={handleFilterPrevious} />
                        {reviewPaginationItemsTop}
                        <Pagination.Next disabled={filterPageIndex === Math.ceil(reviews.length / PAGE_SIZE) - 1} onClick={handleFilterNext} />
                        <Pagination.Last disabled={filterPageIndex === Math.ceil(reviews.length / PAGE_SIZE) - 1} onClick={handleFilterLast} />
                    </Pagination>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Time Created</th>
                                <th>Time Updated</th>
                                <th>Voted</th>
                                {/* <th>Language</th> */}
                                <th>Text</th>
                                <th>Playtime at review time</th>
                                <th>Playtime forever</th>
                                <th>Written during early access</th>
                                <th>Votes Up</th>
                                <th>Votes Funny</th>
                                <th>Comment Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.slice(filterPageIndex * PAGE_SIZE, filterPageIndex * PAGE_SIZE + PAGE_SIZE).map(r => {
                            const playtimeAtReviewTimeHours = Math.round(r.author.playtime_at_review / 60)
                            const playtimeForeverHours = Math.round(r.author.playtime_forever / 60)

                            return <tr key={r.recommendationid} className={r.voted_up ? 'table-success' : 'table-danger'}>
                                <td><a href={`https://steamcommunity.com/profiles/${r.author.steamid}/recommended/${game.steam_appid}/`}>{r.recommendationid}</a></td>
                                <td>{dateFormat(new Date(r.timestamp_created * 1000), reviewDateFormatString)}</td>
                                <td>{r.timestamp_updated > r.timestamp_created ? dateFormat(new Date(r.timestamp_updated * 1000), reviewDateFormatString) : ''}</td>
                                <td>{r.voted_up ? '👍' : '👎'}</td>
                                {/* <td>{r.language.charAt(0).toUpperCase() + r.language.slice(1)}</td> */}
                                <td style={{wordBreak: 'break-word', minWidth: '200px'}}>{r.review}</td>
                                <td>{r.author.playtime_at_review < 60 ? `${r.author.playtime_at_review} minute${r.author.playtime_at_review !== 1 ? 's' : ''}` : `${playtimeAtReviewTimeHours.toLocaleString()} hour${playtimeAtReviewTimeHours !== 1 ? 's' : ''}`}</td>
                                <td>{r.author.playtime_forever < 60 ? `${r.author.playtime_forever} minute${r.author.playtime_forever !== 1 ? 's' : ''}` : `${playtimeForeverHours.toLocaleString()} hour${playtimeForeverHours !== 1 ? 's' : ''}`}</td>
                                <td>{r.written_during_early_access ? '☑️' : '☒'}</td>
                                <td>{r.votes_up.toLocaleString()}</td>
                                <td>{r.votes_funny.toLocaleString()}</td>
                                <td>{r.comment_count.toLocaleString()}</td>
                            </tr>})}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.First disabled={filterPageIndex === 0} onClick={() => scrollTop(handleFilterFirst)} />
                        <Pagination.Prev disabled={filterPageIndex === 0} onClick={() => scrollTop(handleFilterPrevious)} />
                        {reviewPaginationItemsBottom}
                        <Pagination.Next disabled={filterPageIndex === Math.ceil(reviews.length / PAGE_SIZE) - 1} onClick={() => scrollTop(handleFilterNext)} />
                        <Pagination.Last disabled={filterPageIndex === Math.ceil(reviews.length / PAGE_SIZE) - 1} onClick={() => scrollTop(handleFilterLast)} />
                    </Pagination>
                </Tab>
                <Tab eventKey="visualisations" title="Visualisations">
                    <p className="mt-3">Coming soon!..</p>
                </Tab>
            </Tabs>
            
            {/* <Container>
                <h4>Debug</h4>
                <p>{JSON.stringify(game)}</p>
                <p>{JSON.stringify(reviews[0])}</p>
            </Container> */}
        </>
    )
}

export default Breakdown