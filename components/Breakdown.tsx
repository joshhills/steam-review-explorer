import React, { useState } from "react"
import { Breadcrumb, Container, Pagination, Row, Tab, Table, Tabs } from "react-bootstrap"
import dateFormat from "dateformat"

const PAGE_SIZE = 20
const PAGE_BUFFER = 6

const Breakdown = ({ game, reviews, onExit }) => {

    // Pagination
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

    let reviewPaginationItems = []
    let startPaginationBuffer = filterPageIndex - PAGE_BUFFER / 2 < 0 ? 0 : filterPageIndex - PAGE_BUFFER / 2
    if (startPaginationBuffer + PAGE_BUFFER > Math.ceil(reviews.length / PAGE_SIZE - 1)) {
        startPaginationBuffer = Math.ceil(reviews.length / PAGE_SIZE) - PAGE_BUFFER
    }

    for (let i = 0; i < PAGE_BUFFER; i++) {
        reviewPaginationItems.push(
            <Pagination.Item key={startPaginationBuffer + i} active={startPaginationBuffer + i === filterPageIndex} onClick={() => handleFilterIndex(startPaginationBuffer + i)}>
              {startPaginationBuffer + i + 1}
            </Pagination.Item>)
    }

    // Dates
    const gameDateFormatString = 'mmm d, yyyy'
    const reviewDateFormatString = 'dd/mm/yy h:MM:ss TT'

    // Data Munging
    const timestampCreatedSorted = reviews.map(r => r.timestamp_created * 1000).sort((a: number, b: number) => a-b)

    const playtimeAtReviewTimeSorted = reviews.map(r => r.author.playtime_at_review).sort((a: number, b: number) => a-b)
    const averagePlaytimeAtReviewTimeMinutes = Math.round(reviews.reduce((a, b) => a + b.author.playtime_at_review, 0) / reviews.length)
    const averagePlaytimeAtReviewTimeHours = Math.round(averagePlaytimeAtReviewTimeMinutes / 60)
    
    const playtimeForeverSorted = reviews.map(r => r.author.playtime_forever).sort((a: number, b: number) => a-b)
    const averagePlaytimeForeverMinutes = Math.round(reviews.reduce((a, b) => a + b.author.playtime_forever, 0) / reviews.length)
    const averagePlaytimeForeverHours = Math.round(averagePlaytimeForeverMinutes / 60)

    const numberReviewsUpdated = reviews.reduce((a, b) => a + (b.timestamp_updated > b.timestamp_created ? 1 : 0), 0)
    const numberReviewsPositive = reviews.reduce((a, b) => a + (b.voted_up ? 1 : 0), 0)
    const numberReviewsNegative = reviews.length - numberReviewsPositive

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="#" onClick={onExit}>Search</Breadcrumb.Item>
                <Breadcrumb.Item active>{game.name}</Breadcrumb.Item>
            </Breadcrumb>

            <Tabs defaultActiveKey="overview">
                <Tab eventKey="overview" title="Overview">
                    <Table className="mt-3">
                        <tbody>
                            <tr>
                                <td><strong>App ID</strong></td>
                                <td>{game.steam_appid}</td>
                            </tr>
                            <tr>
                                <td><strong>Developers</strong></td>
                                <td>{game.developers.join(',')}</td>
                            </tr>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td><a href={`https://store.steampowered.com/app/${game.steam_appid}/`}>{game.name}</a></td>
                            </tr>
                            <tr>
                                <td><strong>Release Date</strong></td>
                                <td>{game.release_date.date}</td>
                            </tr>
                            <tr>
                                <td><strong>Total public reviews</strong></td>
                                <td>{reviews.length.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td><strong>Total positive</strong></td>
                                <td>{numberReviewsPositive} ({Math.round(numberReviewsPositive / reviews.length * 100)}%)</td>
                            </tr>
                            <tr>
                                <td><strong>Total negative</strong></td>
                                <td>{numberReviewsNegative} ({Math.round(numberReviewsNegative / reviews.length * 100)}%)</td>
                            </tr>
                            <tr>
                                <td><strong>Date range</strong></td>
                                <td>{dateFormat(new Date(timestampCreatedSorted[0]), gameDateFormatString)} - {dateFormat(new Date(timestampCreatedSorted[timestampCreatedSorted.length - 1]), gameDateFormatString)}</td>
                            </tr>
                            <tr>
                                <td><strong>Average playtime at review time</strong></td>
                                <td>{averagePlaytimeAtReviewTimeMinutes < 60 ? `${averagePlaytimeAtReviewTimeMinutes} minute${averagePlaytimeAtReviewTimeMinutes > 1 ? 's' : ''}` : `${averagePlaytimeAtReviewTimeHours} hour${averagePlaytimeAtReviewTimeHours > 1 ? 's' : ''}`}</td>
                            </tr>
                            <tr>
                                <td><strong>Average playtime forever</strong></td>
                                <td>{averagePlaytimeForeverMinutes < 60 ? `${averagePlaytimeForeverMinutes} minute${averagePlaytimeForeverMinutes !== 1 ? 's' : ''}` : `${averagePlaytimeForeverHours} hour${averagePlaytimeForeverHours !== 1 ? 's' : ''}`}</td>
                            </tr>
                            <tr>
                                <td><strong>Total reviews updated</strong></td>
                                <td>{numberReviewsUpdated} ({Math.round(numberReviewsUpdated / reviews.length * 100)}%)</td>
                            </tr>
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="filter" title="Filter">
                    <Pagination className="mt-3">
                        <Pagination.First disabled={filterPageIndex === 0} onClick={handleFilterFirst} />
                        <Pagination.Prev disabled={filterPageIndex === 0} onClick={handleFilterPrevious} />
                        {reviewPaginationItems}
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

                            return <tr>
                                <td><a href={`https://steamcommunity.com/profiles/${r.author.steamid}/recommended/${game.steam_appid}/`}>{r.recommendationid}</a></td>
                                <td>{dateFormat(new Date(r.timestamp_created * 1000), reviewDateFormatString)}</td>
                                <td>{r.timestamp_updated > r.timestamp_created ? dateFormat(new Date(r.timestamp_updated * 1000), reviewDateFormatString) : ''}</td>
                                <td>{r.voted_up ? '👍' : '👎'}</td>
                                {/* <td>{r.language.charAt(0).toUpperCase() + r.language.slice(1)}</td> */}
                                <td>{r.review}</td>
                                <td>{r.author.playtime_at_review < 60 ? `${r.author.playtime_at_review} minute${r.author.playtime_at_review !== 1 ? 's' : ''}` : `${playtimeAtReviewTimeHours} hour${playtimeAtReviewTimeHours !== 1 ? 's' : ''}`}</td>
                                <td>{r.author.playtime_forever < 60 ? `${r.author.playtime_forever} minute${r.author.playtime_forever !== 1 ? 's' : ''}` : `${playtimeForeverHours} hour${playtimeForeverHours !== 1 ? 's' : ''}`}</td>
                                <td>{r.written_during_early_access ? '☑️' : '☒'}</td>
                                <td>{r.votes_up}</td>
                                <td>{r.votes_funny}</td>
                                <td>{r.comment_count}</td>
                            </tr>})}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.First disabled={filterPageIndex === 0} onClick={handleFilterFirst} />
                        <Pagination.Prev disabled={filterPageIndex === 0} onClick={handleFilterPrevious} />
                        {reviewPaginationItems}
                        <Pagination.Next disabled={filterPageIndex === Math.ceil(reviews.length / PAGE_SIZE) - 1} onClick={handleFilterNext} />
                        <Pagination.Last disabled={filterPageIndex === Math.ceil(reviews.length / PAGE_SIZE) - 1} onClick={handleFilterLast} />
                    </Pagination>
                </Tab>
                <Tab eventKey="insights" title="Insights">
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