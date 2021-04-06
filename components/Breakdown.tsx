import React, { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import HighlightedReviewList from "./HighlightedReviewList"
import PaginatedReviewTable from "./PaginatedReviewTable"
import ReviewOverview from "./ReviewOverview"
import ReviewTableFilter from "./ReviewTableFilter"
import _ from "lodash"
import LanguagePieChart from "./visualisations/LanguagePieChart"
import ReviewVolumeDistributionBarChart from "./visualisations/ReviewVolumeDistributionBarChart"

const Breakdown = ({ game, reviews, reviewStatistics }) => {

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

        if (rfilters.steamPurchaseYes === false && r.steam_purchase || rfilters.steamPurchaseNo === false && !r.steam_purchase) {
            return false
        }

        if (rfilters.receivedForFreeYes === false && r.received_for_free || rfilters.receivedForFreeNo === false && !r.received_for_free) {
            return false
        }

        if (rfilters.textLength && (r.review.length < rfilters.textLength[0] || r.review.length > rfilters.textLength[1])) {
            return false
        }

        if (rfilters.votesHelpful && (r.votes_up < rfilters.votesHelpful[0] || r.votes_up > rfilters.votesHelpful[1])) {
            return false
        }

        if (rfilters.votesFunny && (r.votes_funny < rfilters.votesFunny[0] || r.votes_funny > rfilters.votesFunny[1])) {
            return false
        }

        if (rfilters.commentCount && (r.comment_count < rfilters.commentCount[0] || r.comment_count > rfilters.commentCount[1])) {
            return false
        }

        if (rfilters.timeCreated && (r.timestamp_created < rfilters.timeCreated[0].getTime() / 1000 || r.timestamp_created > rfilters.timeCreated[1].getTime() / 1000)) {
            return false
        }
 
        return true
    })

    const [filters, setFilters] = useState({
        searchTerm: '',
        languages: ['english'],
        hiddenColumns: ['timeUpdated', 'language', 'earlyAccess', 'steamPurchase', 'receivedForFree'],
        votedUpPositive: true,
        votedUpNegative: true,
        earlyAccessYes: true,
        earlyAccessNo: true,
        steamPurchaseYes: true,
        steamPurchaseNo: true,
        receivedForFreeYes: true,
        receivedForFreeNo: true
    })
    const [filteredReviews, setFilteredReviews] = useState(filterReviews(filters))
    const [index, setIndex] = useState(0)
    
    const [sorting, setSorting] = useState({
        id: 'timestampUpdated',
        direction: 'descending'
    })

    const handleFilterReviews = _.debounce(async (nFilters) => {

        setFilters(nFilters)

        setFilteredReviews((prevReviews) => filterReviews(nFilters).sort((a, b) => sortReviews(a, b, sorting.id, sorting.direction)))
        
        setIndex(0)
    }, 250)

    const sortReviews = (a, b, id, direction) => {
        switch(id) {
            case 'timestampUpdated':
                return direction === 'ascending' ? 
                    a.timestamp_updated - b.timestamp_updated
                    : b.timestamp_updated - a.timestamp_updated
            case 'playtimeAtReview':
                return direction === 'ascending' ? 
                    a.author.playtime_at_review - b.author.playtime_at_review
                    : b.author.playtime_at_review - a.author.playtime_at_review
            case 'playtimeForever':
                return direction === 'ascending' ? 
                    a.author.playtime_forever - b.author.playtime_forever
                    : b.author.playtime_forever - a.author.playtime_forever
            case 'votesUp':
                return direction === 'ascending' ? 
                    a.votes_up - b.votes_up
                    : b.votes_up - a.votes_up
            case 'votesFunny':
                return direction === 'ascending' ? 
                    a.votes_funny - b.votes_funny
                    : b.votes_funny - a.votes_funny
            case 'commentCount':
                return direction === 'ascending' ? 
                    a.comment_count - b.comment_count
                    : b.comment_count - a.comment_count
            case 'textLength':
                return direction === 'ascending' ? 
                    a.review.length - b.review.length
                    : b.review.length - a.review.length
            case 'timestampCreated':
            default:
                return direction === 'ascending' ? 
                    a.timestamp_created - b.timestamp_created
                    : b.timestamp_created - a.timestamp_created
        }
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
        setFilteredReviews((prevReviews) => prevReviews.sort((a, b) => sortReviews(a, b, newId, newDirection)))
    }

    return (<>
        <Tabs defaultActiveKey="reviews" className="mt-1">
            <Tab eventKey="reviews" title="Reviews">
                <ReviewTableFilter filters={filters} reviews={reviews} callback={handleFilterReviews} reviewStatistics={reviewStatistics}/>
                <p className="mt-3">{filteredReviews.length.toLocaleString()} review{filteredReviews.length !== 1 && 's'} matching filters</p>
                <PaginatedReviewTable index={index} filters={filters} game={game} reviews={filteredReviews} sorting={sorting} handleSort={handleSort} handleChangeIndex={setIndex}/>
            </Tab>
            <Tab eventKey="statistics" title="Statistics">
                <ReviewOverview game={game} reviewStatistics={reviewStatistics}/>
            </Tab>
            <Tab eventKey="highlighted" title="Highlighted">
                <HighlightedReviewList game={game} reviewStatistics={reviewStatistics}/>
            </Tab>
            <Tab eventKey="visualisations" title="Visualisations">
                <p className="mt-3">Coming soon...</p>
                {/* <h5 className="mt-3">Language Distribution</h5>
                <LanguagePieChart reviews={filteredReviews} />
                <h5 className="mt-3">Review Volume Distribution</h5>
                <ReviewVolumeDistributionBarChart reviews={filteredReviews} /> */}
            </Tab>
        </Tabs> 
        
        <div>
            <h4>Debug</h4>
            <p>{JSON.stringify(game)}</p>
            <p>{JSON.stringify(reviews[0])}</p>
        </div>
    </>)
}

export default Breakdown