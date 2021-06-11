import React, { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import HighlightedReviewList from "./HighlightedReviewList"
import PaginatedReviewTable from "./PaginatedReviewTable"
import ReviewOverview from "./ReviewOverview"
import ReviewTableFilter from "./ReviewTableFilter"
import _ from "lodash"
// import LanguagePieChart from "./visualisations/LanguagePieChart"
import ReviewVolumeDistributionBarChart from "./visualisations/ReviewVolumeDistributionBarChart"
import Export from "./Export"
import WordFrequency from "./WordFrequency"
import getUrls from "get-urls"
import SwearWords from "./SwearWords"

const regex = new RegExp('[\\p{L}0-9\\s]*', 'gmu')

const Breakdown = ({ game, reviews, reviewStatistics }) => {

    const filterReviews = (rfilters) => reviews.filter((r) => {
        // Search term
        if (rfilters.searchTerm) {
            if (r.review.toLowerCase().indexOf(rfilters.searchTerm) === -1 && r.recommendationid != rfilters.searchTerm) {
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

        if (rfilters.timePlayedForever && (r.author.playtime_forever / 60 < rfilters.timePlayedForever[0] || r.author.playtime_forever / 60 > rfilters.timePlayedForever[1])) {
            return false
        }

        if (rfilters.timePlayedAtReviewTime && (r.author.playtime_at_review / 60 < rfilters.timePlayedAtReviewTime[0] || r.author.playtime_at_review / 60 > rfilters.timePlayedAtReviewTime[1])) {
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

        const containsUrl = getUrls(r.review).size > 0
        if (rfilters.containsUrlYes === false && containsUrl || rfilters.containsUrlNo === false && !containsUrl) {
            return false
        }

        const reviewContainsASCIIArt = r.review.length > 1 && r.review.replace(regex, '').length > r.review.length / 1.25
        if (rfilters.containsASCIIArtYes === false && reviewContainsASCIIArt || rfilters.containsASCIIArtNo === false && !reviewContainsASCIIArt) {
            return false
        }

        return true
    })

    const [filters, setFilters] = useState({
        searchTerm: '',
        languages: ['english'],
        votedUpPositive: true,
        votedUpNegative: true,
        earlyAccessYes: true,
        earlyAccessNo: true,
        steamPurchaseYes: true,
        steamPurchaseNo: true,
        receivedForFreeYes: true,
        receivedForFreeNo: true,
        containsASCIIArtYes: false,
        containsASCIIArtNo: true,
        containsUrlYes: true,
        containsUrlNo: true
    })
    const [viewOptions, setViewOptions] = useState({
        hiddenColumns: ['timeUpdated', 'language', 'earlyAccess', 'steamPurchase', 'receivedForFree'],
        truncateLongReviews: true,
        censorBadWords: true
    })
    const [filteredReviews, setFilteredReviews] = useState(filterReviews(filters))
    const [index, setIndex] = useState(0)
    
    const [sorting, setSorting] = useState({
        id: 'timestampUpdated',
        direction: 'descending'
    })

    const handleViewOptions = (nViewOptions) => {
        setViewOptions(nViewOptions)
    }

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

    const exportComponent = <Export game={game} reviews={reviews} filteredReviews={filteredReviews} viewOptions={viewOptions} viewOptionsCallback={handleViewOptions}/>;

    return (<>
        <Tabs defaultActiveKey="reviews" className="mt-1">
            <Tab eventKey="reviews" title="Reviews">
                <ReviewTableFilter filters={filters} viewOptions={viewOptions} viewOptionsCallback={handleViewOptions} reviews={filteredReviews} callback={handleFilterReviews} reviewStatistics={reviewStatistics}/>
                <PaginatedReviewTable exportComponent={exportComponent} index={index} filters={filters} viewOptions={viewOptions} game={game} reviews={filteredReviews} sorting={sorting} handleSort={handleSort} handleChangeIndex={setIndex}/>
            </Tab>
            <Tab eventKey="statistics" title="Statistics" className="pb-3 pt-3">
                <ReviewVolumeDistributionBarChart reviewStatistics={reviewStatistics} />
                <ReviewOverview game={game} reviewStatistics={reviewStatistics}/>
                <WordFrequency game={game} reviewStatistics={reviewStatistics} />
                <SwearWords game={game} reviewStatistics={reviewStatistics} />
                {/* <h5 className="mt-3">Language Distribution</h5>
                <LanguagePieChart reviews={filteredReviews} /> */}
            </Tab>
            <Tab eventKey="highlighted" title="Highlighted">
                <HighlightedReviewList game={game} reviewStatistics={reviewStatistics}/>
            </Tab>
        </Tabs> 
    </>)
}

export default Breakdown