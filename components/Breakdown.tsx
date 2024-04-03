import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Tab, Tabs } from "react-bootstrap"
import HighlightedReviewList from "./HighlightedReviewList"
import PromptsList from "./PromptsList"
import PaginatedReviewTable from "./PaginatedReviewTable"
import ReviewOverview from "./ReviewOverview"
import ReviewTableFilter from "./ReviewTableFilter"
import _ from "lodash"
import ReviewVolumeDistributionBarChart from "./visualisations/ReviewVolumeDistributionBarChart"
import Export from "./Export"
import WordFrequency from "./visualisations/WordFrequency"
import SwearWords from "./visualisations/SwearWords"
import LanguagePieChart from "./visualisations/LanguagePieChart"
import ReviewScoreOverTimeChart from "./visualisations/ReviewScoreOverTimeChart"
import { useCookies } from "react-cookie"

const regex = new RegExp('[\\p{L}0-9\\s]*', 'gmu')

const Breakdown = ({ game, reviews, reviewStatistics, selectedLanguages }) => {

    const router = useRouter()

    // TODO: Reduce copy-pasting of this getInitialFilterRanges
    const getInitialFilterRanges = (reviews) => {

        const minReviewTextLength = reviewStatistics.reviewMinTextLength.review.length
        const maxReviewTextLength = reviewStatistics.reviewMaxTextLength.review.length
    
        const minCommentCount = reviewStatistics.reviewMinCommentCount.comment_count
        const maxCommentCount = reviewStatistics.reviewMaxCommentCount.comment_count
    
        const minVotesHelpful = reviewStatistics.reviewMinVotesUp.votes_up
        const maxVotesHelpful = reviewStatistics.reviewMaxVotesUp.votes_up
    
        const minVotesFunny = reviewStatistics.reviewMinVotesFunny.votes_funny
        const maxVotesFunny = reviewStatistics.reviewMaxVotesFunny.votes_funny
    
        const minTimeCreated = new Date(reviewStatistics.reviewMinTimestampCreated.timestamp_created * 1000)
        const maxTimeCreated = new Date(reviewStatistics.reviewMaxTimestampCreated.timestamp_created * 1000)
    
        const minHoursPlayedForever = Math.floor(reviewStatistics.reviewMinTotalMinutesPlayedForever.author.playtime_forever / 60)
        const maxHoursPlayedForever = Math.ceil(reviewStatistics.reviewMaxTotalMinutesPlayedForever.author.playtime_forever / 60)

        const minHoursPlayedAtReviewTime = Math.floor(reviewStatistics.reviewMinTotalMinutesPlayedAtReviewTime.author.playtime_at_review / 60)
        const maxHoursPlayedAtReviewTime = Math.ceil(reviewStatistics.reviewMaxTotalMinutesPlayedAtReviewTime.author.playtime_at_review / 60)

        return {
            searchTerm: '',
            languages: selectedLanguages.length > 0 ? selectedLanguages : [{label: 'English', value: 'english'}],
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
            textLength: [minReviewTextLength, maxReviewTextLength],
            commentCount: [minCommentCount, maxCommentCount],
            votesHelpful: [minVotesHelpful, maxVotesHelpful],
            votesFunny: [minVotesFunny, maxVotesFunny],
            timeCreated: [minTimeCreated, maxTimeCreated],
            timePlayedForever: [minHoursPlayedForever, maxHoursPlayedForever],
            timePlayedAtReviewTime: [minHoursPlayedAtReviewTime, maxHoursPlayedAtReviewTime],
            exactSearchTerm: 'exactIgnoreCase',
            containsUrlYes: true,
            containsUrlNo: true
        }
    }

    // Early out at each check step
    const filterReviews = (rfilters) => reviews.filter((r) => {
        
        // Search term
        if (rfilters.searchTerm) {
            
            let termMatchesReviewID = r.recommendationid === rfilters.searchTerm
            
            // Check how stringent of a check is necessary
            if (rfilters.exactSearchTerm === 'exact')
            {
                // If there is no exact text match, and the term doesn't match the review ID, early-out
                if (r.review.indexOf(rfilters.searchTerm) === -1 && !termMatchesReviewID) {
                    return false
                }
            } else if (rfilters.exactSearchTerm === 'exactIgnoreCase') {
                // If there is no exact text match (ignoring case), and the term doesn't match the review ID, early-out
                if (r.review.toLowerCase().indexOf(rfilters.searchTerm.toLowerCase()) === -1 && !termMatchesReviewID) {
                    return false
                }
            } else {
                // Split the search term into chunks
                let searchTerms = rfilters.searchTerm.split(' ')
                let reviewTextSimplified = r.review.toLowerCase()
                let termMatchFound = false
                for (let term of searchTerms) {
                    if (reviewTextSimplified.indexOf(term.toLowerCase()) !== -1) {
                        termMatchFound = true
                        break
                    }
                }
                if (!termMatchFound && !termMatchesReviewID) {
                    return false
                }
            }
        }

        if (rfilters.languages.map((language: any) => language.value).indexOf(r.language) === -1) {
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

        if (rfilters.containsUrlYes === false && r.contains_url || rfilters.containsUrlNo === false && !r.contains_url) {
            return false
        }

        const reviewContainsASCIIArt = r.review.length > 1 && r.review.replace(regex, '').length > r.review.length / 1.25
        if (rfilters.containsASCIIArtYes === false && reviewContainsASCIIArt || rfilters.containsASCIIArtNo === false && !reviewContainsASCIIArt) {
            return false
        }

        return true
    })

    const [dirty, setDirty] = useState(false)
    const [zeroed, setZeroed] = useState(true)

    const [filters, setFilters] = useState(getInitialFilterRanges(reviews))

    const [cachedFilters, setCachedFilters] = useState(filters)

    const [cookies, setCookie] = useCookies(['viewOptions', 'filters', 'sorting'])
    const [viewOptions, setViewOptions] = useState({
        hiddenColumns: [
            {label: 'Time updated', value: 'timeUpdated'},
            {label: 'Language', value: 'language'},
            {label: 'Written during early access', value: 'earlyAccess'},
            {label: 'Purchased via Steam', value: 'steamPurchase'},
            {label: 'Marked as received for free', value: 'receivedForFree'}
        ],
        truncateLongReviews: true,
        censorBadWords: true
    })

    useEffect(() => {

        // Read view options from the cache
        if (cookies.viewOptions) {
            setViewOptions(cookies.viewOptions)
        }

        // Read relevant filters from the cache
        // Attempt to read language
        if (cookies.filters?.languages) {

            const availableLanguages = Object.keys(reviewStatistics.totalLanguages)

            let langsFound = []

            for (let cookieLang of cookies.filters.languages) {

                if (availableLanguages.indexOf(cookieLang.value) !== -1) {
                    langsFound.push(cookieLang)
                }
            }

            if (langsFound.length > 0) {
                filters.languages = langsFound
            }
        }
        // Read filters from query params if they exist
        let labels = []
        for (let filterKey of Object.keys(filters)) {

            let v = router.query[`f${filterKey}`]

            if (v !== undefined) {

                let vv = JSON.parse(v as string)

                // Perform sanity-checking on query param filters before applying them
                // TODO: Make clearer
                switch(filterKey) {
                    case 'timeCreated': 
                        vv[0] = new Date(vv[0])
                        vv[1] = new Date(vv[1])
                    case 'textLength':
                    case 'commentCount':
                    case 'votesHelpful':
                    case 'votesFunny':
                    case 'timePlayedForever':
                    case 'timePlayedAtReviewTime':
                        if (vv[0] < filters[filterKey][0]) {
                            vv[0] = filters[filterKey][0]
                        }
                        if (vv[1] > filters[filterKey][1]) {
                            vv[1] = filters[filterKey][1]
                        }
                        filters[filterKey] = vv
                        labels.push(filterKey)
                        break
                    case 'exactSearchTerm':
                        if (['exact', 'exactIgnoreCase', 'partialIgnoreCase'].indexOf(vv) !== -1) {
                            filters[filterKey] = vv
                            labels.push(filterKey)
                        }
                        break
                    case 'votedUpPositive':
                    case 'votedUpNegative':
                    case 'earlyAccessYes':
                    case 'earlyAccessNo':
                    case 'steamPurchaseYes':
                    case 'steamPurchaseNo':
                    case 'receivedForFreeYes':
                    case 'receivedForFreeNo':
                    case 'containsASCIIArtYes':
                    case 'containsASCIIArtNo':
                    case 'containsUrlYes':
                    case 'containsUrlNo':
                        if (typeof vv === 'boolean') {
                            filters[filterKey] = vv
                            labels.push(filterKey)
                        }
                        break
                }
            }
        }
        setFilters(filters)
        setUpdatedFilters(labels)

        // Read cookies from the cache
        if (cookies.sorting) {
            sorting.id = cookies.sorting.id
            sorting.direction = cookies.sorting.direction
            setSorting(cookies.sorting)
        }

        updateQueryParamsFilters(labels, filters)
        
        setFilteredReviews((prevReviews) => filterReviews(filters).sort((a, b) => sortReviews(a, b, sorting.id, sorting.direction)))
        setIndex(0)
        setCachedFilters(filters)
        setDirty(false)

        let isTechnicallyZeroed = _.isEqual(filters, getInitialFilterRanges(reviews))

        setZeroed(isTechnicallyZeroed)

        setHasLoaded(true)
    }, [])

    const [hasLoaded, setHasLoaded] = useState(false)
    const [filteredReviews, setFilteredReviews] = useState([])
    const [index, setIndex] = useState(0)
    const [updatedFilters, setUpdatedFilters] = useState([])
    
    const [sorting, setSorting] = useState({
        id: 'timestampUpdated',
        direction: 'descending'
    })

    const handleViewOptions = (nViewOptions) => {
        setViewOptions(nViewOptions)
        setCookie('viewOptions', nViewOptions, { path: '/' })
    }

    const handleUpdateFilters = (nFilters, labels = []) => {
        setDirty(!_.isEqual(nFilters, cachedFilters))
        setFilters(nFilters)
        setCookie('filters', nFilters, { path: '/' })

        // Keep track of what filters have been updated by the user since loading the page
        for (let label of labels) {
            if (updatedFilters.indexOf(label) === -1) {
                updatedFilters.push(label)
            }
        }
        setUpdatedFilters(updatedFilters)
    }

    const updateQueryParamsFilters = (_updatedFilters, _filters, reset = false) => {

        let queryObj = {
            appId: router.query.appId
        }
        if (router.query.start !== undefined) {
            queryObj['start'] = router.query.start
        }
        if (router.query.end !== undefined) {
            queryObj['end'] = router.query.end
        }
        if (router.query.languages !== undefined) {
            queryObj['languages'] = router.query.languages
        }
        if (!reset) {

            queryObj = {
                ...queryObj,
                ...Object.assign({},
                    ..._updatedFilters.map(e => { return { [`f${e}`] : JSON.stringify(_filters[e]) } }) )
            }
        }

        router.push({
            pathname: router.pathname,
            query: {
                ...queryObj
            }
        }, undefined, { shallow: true })
        
    }

    const handleApplyFilters = _.debounce(async () => {
        
        // Update query params based on filters
        updateQueryParamsFilters(updatedFilters, filters)
        
        setFilteredReviews((prevReviews) => filterReviews(filters).sort((a, b) => sortReviews(a, b, sorting.id, sorting.direction)))
        setIndex(0)
        setCachedFilters(filters)
        setDirty(false)

        let isTechnicallyZeroed = _.isEqual(filters, getInitialFilterRanges(reviews))

        setZeroed(isTechnicallyZeroed)
    }, 250)

    const handleCancelStagedFilterChanges = () => {
        setFilters(cachedFilters)
        setDirty(false)
    }

    const handleResetFilters = () => {
        const initialFilterRanges = getInitialFilterRanges(reviews)
        setUpdatedFilters([])
        setFilters(initialFilterRanges)
        updateQueryParamsFilters(initialFilterRanges, [], true)
        setFilteredReviews((prevReviews) => filterReviews(initialFilterRanges).sort((a, b) => sortReviews(a, b, sorting.id, sorting.direction)))
        setIndex(0)
        setCachedFilters(initialFilterRanges)
        setDirty(false)
        setZeroed(true)
    }

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

        let newSort = { id: newId, direction: newDirection }
        setSorting((oldSort) => newSort)
        setCookie('sorting', newSort, { path: '/' })
        setFilteredReviews((prevReviews) => prevReviews.sort((a, b) => sortReviews(a, b, newId, newDirection)))
        setIndex(0)
    }

    const [activeTab, setActiveTab] = useState('reviews')

    const handleTabSelect = (e) => {
        setActiveTab(e)
    }

    const handleFilterPreset = (filterSubset) => {
        
        setActiveTab('reviews')

        let initialFilterRanges = getInitialFilterRanges(reviews)
        for (const [key, value] of Object.entries(filterSubset)) {
            initialFilterRanges[key] = value
        }
        
        // Keep track of what filters have been updated by the user since loading the page
        for (let label of Object.keys(filterSubset)) {
            if (updatedFilters.indexOf(label) === -1) {
                updatedFilters.push(label)
            }
        }
        setUpdatedFilters(updatedFilters)

        setFilters(initialFilterRanges)
        setCookie('filters', initialFilterRanges, { path: '/' })

        updateQueryParamsFilters(updatedFilters, initialFilterRanges)
        setFilteredReviews((prevReviews) => filterReviews(initialFilterRanges).sort((a, b) => sortReviews(a, b, sorting.id, sorting.direction)))
        setIndex(0)
        setCachedFilters(initialFilterRanges)
        setDirty(false)
        setZeroed(false)

        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }

    const exportComponent = <Export game={game} reviews={reviews} filteredReviews={filteredReviews} viewOptions={viewOptions} viewOptionsCallback={handleViewOptions}/>
    const ref = React.createRef<HTMLDivElement>()

    return (hasLoaded && <>
        <div ref={ref}></div>
        <Tabs  defaultActiveKey="reviews" className="mt-1" onSelect={handleTabSelect} activeKey={activeTab}>
            <Tab eventKey="reviews" title="Reviews">
                <ReviewTableFilter filters={filters} viewOptions={viewOptions} viewOptionsCallback={handleViewOptions} reviews={filteredReviews} updateFiltersCallback={handleUpdateFilters} applyFiltersCallback={handleApplyFilters} cancelStagedFilterChangesCallback={handleCancelStagedFilterChanges} reviewStatistics={reviewStatistics} cachedFilters={cachedFilters} dirty={dirty} zeroed={zeroed} resetFiltersCallback={handleResetFilters}/>
                <PaginatedReviewTable exportComponent={exportComponent} index={index} filters={filters} viewOptions={viewOptions} game={game} reviews={filteredReviews} sorting={sorting} handleSort={handleSort} handleChangeIndex={setIndex} keyNavigationEnabled={activeTab === 'reviews'} reviewTextTruncateLength={reviewStatistics.medianTextLength}/>
            </Tab>
            <Tab eventKey="statistics" title="Statistics" className="pb-3 pt-3">
                <ReviewVolumeDistributionBarChart reviewStatistics={reviewStatistics} />
                <ReviewScoreOverTimeChart reviewStatistics={reviewStatistics} />
                <ReviewOverview game={game} reviewStatistics={reviewStatistics} handleFilterPreset={handleFilterPreset} initialFilterRanges={getInitialFilterRanges(reviews)}/>
                <LanguagePieChart game={game} reviewStatistics={reviewStatistics} handleFilterPreset={handleFilterPreset} />
                <WordFrequency game={game} reviewStatistics={reviewStatistics} handleFilterPreset={handleFilterPreset} />
                <SwearWords game={game} reviewStatistics={reviewStatistics} />
            </Tab>
            <Tab eventKey="highlighted" title="Highlighted">
                <HighlightedReviewList game={game} reviewStatistics={reviewStatistics}/>
            </Tab>
            <Tab eventKey="prompts" title={<>Prompts</>}>
                <PromptsList handleFilterPreset={handleFilterPreset} initialFilterRanges={getInitialFilterRanges(reviews)} reviewStatistics={reviewStatistics} game={game} />
            </Tab>
        </Tabs> 
    </>)
}

export default Breakdown