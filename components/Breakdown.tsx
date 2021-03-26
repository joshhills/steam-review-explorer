import React, { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import PaginatedReviewTable from "./PaginatedReviewTable"
import ReviewOverview from "./ReviewOverview"
import ReviewTableFilter from "./ReviewTableFilter"

const Breakdown = ({ game, reviews }) => {

    const filterReviews = (rfilters) => reviews.filter((r) => {
        // Search term
        if (rfilters.searchTerm) {
            if (r.review.toLowerCase().indexOf(rfilters.searchTerm) === -1) {
                return false
            }
        }

        if (rfilters.languages.indexOf(r.language) === -1) {
            return false
        }

        if (rfilters.votedUpPositive === false && r.voted_up || rfilters.votedUpNegative === false && !r.voted_up) {
            return false
        }

        if (rfilters.earlyAccessYes === false && r.written_during_early_access || rfilters.earlyAccessNo === false && !r.written_during_early_access) {
            return false
        }
 
        return true
    })

    const [filters, setFilters] = useState({
        searchTerm: '',
        languages: ['english'],
        // hiddenColumns: ['timeUpdated', 'language', 'earlyAccess', 'steamPurchase', 'receivedForFree'],
        hiddenColumns: [],
        votedUpPositive: true,
        votedUpNegative: true,
        earlyAccessYes: true,
        earlyAccessNo: true
        // earlyAccess: 'either',
        // steamPurchase: 'either',
        // receivedForFree: 'either'
    })
    const [filteredReviews, setFilteredReviews] = useState(filterReviews(filters))
    
    const [sorting, setSorting] = useState({
        id: 'timestampUpdated',
        direction: 'descending'
    })

    const handleFilterReviews = (nFilters) => {
        setFilters(nFilters)

        setFilteredReviews((prevReviews) => filterReviews(nFilters))
    }

    const handleSort = (id) => {
        let newId, newDirection

        if (id === sorting.id) {
            newId = id
            if (sorting.direction === 'ascending') {
                newDirection = 'descending' 
            } else if (sorting.direction === 'descending') {
                newDirection = 'ascending' 
            }
        } else {
            newId = id
            newDirection = 'descending'
        }

        setSorting((oldSort) => { return { id: newId, direction: newDirection }})
        setFilteredReviews((prevReviews) => reviews.sort((a, b) => {
            switch(newId) {
                case 'timestampUpdated':
                    console.log(a.timestamp_updated)
                    let atu, btu
                    if (a.timestamp_updated === a.timestamp_created) {
                        atu = 0
                    }
                    return newDirection === 'ascending' ? 
                        a.timestamp_updated - b.timestamp_updated
                        : b.timestamp_updated - a.timestamp_updated
                case 'playtimeAtReview':
                    return newDirection === 'ascending' ? 
                        a.author.playtime_at_review - b.author.playtime_at_review
                        : b.author.playtime_at_review - a.author.playtime_at_review
                case 'playtimeForever':
                    return newDirection === 'ascending' ? 
                        a.author.playtime_forever - b.author.playtime_forever
                        : b.author.playtime_forever - a.author.playtime_forever
                case 'votesUp':
                    return newDirection === 'ascending' ? 
                        a.votes_up - b.votes_up
                        : b.votes_up - a.votes_up
                case 'votesFunny':
                    return newDirection === 'ascending' ? 
                        a.votes_funny - b.votes_funny
                        : b.votes_funny - a.votes_funny
                case 'commentCount':
                    return newDirection === 'ascending' ? 
                        a.comment_count - b.comment_count
                        : b.comment_count - a.comment_count
                case 'textLength':
                    return newDirection === 'ascending' ? 
                        a.review.length - b.review.length
                        : b.review.length - a.review.length
                case 'timestampCreated':
                default:
                    return newDirection === 'ascending' ? 
                        a.timestamp_created - b.timestamp_created
                        : b.timestamp_created - a.timestamp_created
            }
        }))
    }

    return (<>
        <Tabs defaultActiveKey="reviews" className="mt-1">
            <Tab eventKey="overview" title="Overview">
                <ReviewOverview game={game} reviews={reviews}/>
            </Tab>
            <Tab eventKey="reviews" title="Reviews">
                <ReviewTableFilter filters={filters} reviews={reviews} callback={handleFilterReviews}/>
                <p className="mt-3">{filteredReviews.length.toLocaleString()} review{filteredReviews.length !== 1 && 's'} matching filters</p>
                <PaginatedReviewTable filters={filters} game={game} reviews={filteredReviews} sorting={sorting} handleSort={handleSort}/>
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
    </>)
}

export default Breakdown