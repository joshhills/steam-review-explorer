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
// import SwearWords from "./visualisations/SwearWords"
import LanguageDistribution from "./visualisations/LanguageDistribution"
import ReviewScoreOverTimeChart from "./visualisations/ReviewScoreOverTimeChart"
import { useCookies } from "react-cookie"
import Dexie from "dexie"
import DBUtils from "lib/utils/DBUtils"

const regex = new RegExp('[\\p{L}0-9\\s]*', 'gmu')

const Breakdown = ({ game, reviewStatistics, selectedLanguages }) => {

    const router = useRouter()

    // TODO: Pass this in!
    const store = DBUtils.getReviewStoreForGame(game.steam_appid)

    // TODO: Reduce copy-pasting of this getInitialFilterRanges
    const getInitialFilterRanges = () => {

        const minReviewTextLength = reviewStatistics.reviewMinTextLength.review.length
        const maxReviewTextLength = reviewStatistics.reviewMaxTextLength.review.length

        const minAuthorNumReviews = reviewStatistics.reviewMinAuthorNumReviews.author_num_reviews
        const maxAuthorNumReviews = reviewStatistics.reviewMaxAuthorNumReviews.author_num_reviews

        const minAuthorNumGames = reviewStatistics.reviewMinAuthorNumGames.author_num_games_owned
        const maxAuthorNumGames = reviewStatistics.reviewMaxAuthorNumGames.author_num_games_owned

        const minCommentCount = reviewStatistics.reviewMinCommentCount.comment_count
        const maxCommentCount = reviewStatistics.reviewMaxCommentCount.comment_count
    
        const minVotesHelpful = reviewStatistics.reviewMinVotesUp.votes_up
        const maxVotesHelpful = reviewStatistics.reviewMaxVotesUp.votes_up
    
        const minVotesFunny = reviewStatistics.reviewMinVotesFunny.votes_funny
        const maxVotesFunny = reviewStatistics.reviewMaxVotesFunny.votes_funny
    
        const minTimeCreated = new Date(reviewStatistics.reviewMinTimestampCreated.timestamp_created * 1000)
        const maxTimeCreated = new Date(reviewStatistics.reviewMaxTimestampCreated.timestamp_created * 1000)
    
        const minHoursPlayedForever = Math.floor(reviewStatistics.reviewMinTotalMinutesPlayedForever.author_playtime_forever / 60)
        const maxHoursPlayedForever = Math.ceil(reviewStatistics.reviewMaxTotalMinutesPlayedForever.author_playtime_forever / 60)
        
        const minHoursPlayedLastTwoWeeks = Math.floor(reviewStatistics.reviewMinTotalMinutesPlayedLastTwoWeeks.author_playtime_last_two_weeks / 60)
        const maxHoursPlayedLastTwoWeeks = Math.ceil(reviewStatistics.reviewMaxTotalMinutesPlayedLastTwoWeeks.author_playtime_last_two_weeks / 60)
        
        const minHoursPlayedAtReviewTime = Math.floor(reviewStatistics.reviewMinTotalMinutesPlayedAtReviewTime.author_playtime_at_review / 60)
        const maxHoursPlayedAtReviewTime = Math.ceil(reviewStatistics.reviewMaxTotalMinutesPlayedAtReviewTime.author_playtime_at_review / 60)

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
            authorNumReviews: [minAuthorNumReviews, maxAuthorNumReviews],
            authorNumGames: [minAuthorNumGames, maxAuthorNumGames],
            commentCount: [minCommentCount, maxCommentCount],
            votesHelpful: [minVotesHelpful, maxVotesHelpful],
            votesFunny: [minVotesFunny, maxVotesFunny],
            timeCreated: [minTimeCreated, maxTimeCreated],
            timePlayedForever: [minHoursPlayedForever, maxHoursPlayedForever],
            timePlayedLastTwoWeeks: [minHoursPlayedLastTwoWeeks, maxHoursPlayedLastTwoWeeks],
            timePlayedAtReviewTime: [minHoursPlayedAtReviewTime, maxHoursPlayedAtReviewTime],
            exactSearchTerm: 'exactIgnoreCase',
            containsUrlYes: true,
            containsUrlNo: true
        }
    }

    // Early out at each check step
    const filterReview = (rfilters, r) => {
        
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

        if (rfilters.timePlayedForever && (r.author_playtime_forever / 60 < rfilters.timePlayedForever[0] || r.author_playtime_forever / 60 > rfilters.timePlayedForever[1])) {
            return false
        }

        if (rfilters.timePlayedLastTwoWeeks && (r.author_playtime_last_two_weeks / 60 < rfilters.timePlayedLastTwoWeeks[0] || r.author_playtime_last_two_weeks / 60 > rfilters.timePlayedLastTwoWeeks[1])) {
            return false
        }

        if (rfilters.timePlayedAtReviewTime && (r.author_playtime_at_review / 60 < rfilters.timePlayedAtReviewTime[0] || r.author_playtime_at_review / 60 > rfilters.timePlayedAtReviewTime[1])) {
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

        if (rfilters.authorNumReviews && (r.author_num_reviews < rfilters.authorNumReviews[0] || r.author_num_reviews > rfilters.authorNumReviews[1])) {
            return false
        }

        if (rfilters.authorNumGames && (r.author_num_games < rfilters.authorNumGames[0] || r.author_num_games > rfilters.authorNumGames[1])) {
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
    }

    const [dirty, setDirty] = useState(false)
    const [zeroed, setZeroed] = useState(true)

    const [filters, setFilters] = useState(getInitialFilterRanges())
    const [pageSize, setPageSize] = useState(20) // A kind of filter, but kept separate as it's important enough

    const [cachedFilters, setCachedFilters] = useState(filters)

    const [cookies, setCookie] = useCookies(['viewOptions', 'filters', 'sorting'])
    const [viewOptions, setViewOptions] = useState({
        hiddenColumns: [
            {label: 'Time updated', value: 'timeUpdated'},
            {label: 'Language', value: 'language'},
            {label: 'Written during early access', value: 'earlyAccess'},
            {label: 'Purchased via Steam', value: 'steamPurchase'},
            {label: 'Marked as received for free', value: 'receivedForFree'},
            {label: 'Author continued playing', value: 'authorContinuedPlaying'},
            {label: 'Author last played', value: 'authorLastPlayed'},
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
                    case 'authorNumReviews':
                    case 'authorNumGames':
                    case 'commentCount':
                    case 'votesHelpful':
                    case 'votesFunny':
                    case 'timePlayedForever':
                    case 'timePlayedLastTwoWeeks':
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
                    case 'searchTerm':
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
        
        getDBPageAtIndex(store, 0, filters, sorting).then(result => {
            setFilteredReviewCount(result.count)
            setFilteredReviews(result.results)
            setIndex(0)
    
            setCachedFilters(filters)
            setDirty(false)
    
            let isTechnicallyZeroed = _.isEqual(filters, getInitialFilterRanges())
    
            setZeroed(isTechnicallyZeroed)
    
            setHasLoaded(true)
        })
    }, [])

    const [hasLoaded, setHasLoaded] = useState(false)
    const [filteredReviews, setFilteredReviews] = useState([])
    const [filteredReviewCount, setFilteredReviewCount] = useState(0)
    const [index, setIndex] = useState(0)
    const [updatedFilters, setUpdatedFilters] = useState([])
    
    const handleSetIndex = (newIndex) => {
        // Set the latest page
        getDBPageAtIndex(store, newIndex, filters, sorting).then(result => {
            setFilteredReviewCount(result.count)
            setFilteredReviews(result.results)
            setIndex(newIndex)
        })
    }

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

        getDBPageAtIndex(store, 0, filters, sorting).then(result => {
            setFilteredReviewCount(result.count)
            setFilteredReviews(result.results)
            setIndex(0)
    
            setCachedFilters(filters)
            setDirty(false)
    
            let isTechnicallyZeroed = _.isEqual(filters, getInitialFilterRanges())
    
            setZeroed(isTechnicallyZeroed)
        })
    }, 250)

    const handleCancelStagedFilterChanges = () => {
        setFilters(cachedFilters)
        setDirty(false)
    }

    const handleResetFilters = () => {
        const initialFilterRanges = getInitialFilterRanges()
        setUpdatedFilters([])
        setFilters(initialFilterRanges)
        updateQueryParamsFilters(initialFilterRanges, [], true)

        getDBPageAtIndex(store, 0, initialFilterRanges, sorting).then(result => {
            setFilteredReviewCount(result.count)
            setFilteredReviews(result.results)
            setIndex(0)
            
            setCachedFilters(initialFilterRanges)
            setDirty(false)
            setZeroed(true)
        })
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

        getDBPageAtIndex(store, 0, filters, newSort).then(result => {
            setFilteredReviewCount(result.count)
            setFilteredReviews(result.results)
            setIndex(0)
        })
    }

    const [activeTab, setActiveTab] = useState('reviews')

    const handleTabSelect = (e) => {
        setActiveTab(e)
    }

    const ref = React.createRef<HTMLDivElement>()

    const handleFilterPreset = (filterSubset) => {
        
        setActiveTab('reviews')

        let initialFilterRanges = getInitialFilterRanges()
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

        getDBPageAtIndex(store, 0, initialFilterRanges, sorting).then(result => {
            setFilteredReviewCount(result.count)
            setFilteredReviews(result.results)
            setIndex(0)

            setCachedFilters(initialFilterRanges)
            setDirty(false)
            setZeroed(false)

            if (ref.current) {
                ref.current.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        })
        
        // setFilteredReviews(() => await getDBPageAtIndex(db['reviews'], 0, initialFilterRanges, sorting)[1])
    }

    const getDBPageAtIndex = async (store: Dexie.Table, index: any, filters: any, sorting: any) => {
        
        let collection = null

        // Apply sorting
        switch(sorting.id) {
            case 'timestampUpdated':
                collection = store.orderBy('timestamp_updated')
                break
            case 'playtimeAtReview':
                collection = store.orderBy('author_playtime_at_review')
                break
            case 'playtimeForever':
                collection = store.orderBy('author_playtime_forever')
                break
            case 'playtime2Weeks':
                collection = store.orderBy('author_playtime_last_two_weeks')
                break
            case 'votesUp':
                collection = store.orderBy('votes_up')
                break
            case 'votesFunny':
                collection = store.orderBy('votes_funny')
                break
            case 'authorNumReviews':
                collection = store.orderBy('author_num_reviews')
                break
            case 'authorNumGames':
                collection = store.orderBy('author_num_games_owned')
                break
            case 'commentCount':
                collection = store.orderBy('comment_count')
                break
            case 'textLength':
                collection = store.orderBy('length')
                break
            case 'authorNumReviews':
                collection = store.orderBy('author_num_reviews')
                break
            case 'authorNumGames':
                collection = store.orderBy('author_num_games_owned')
                break
            case 'timestampCreated':
            default:
                collection = store.orderBy('timestamp_created')
        }

        if (sorting.direction === 'descending') {
            collection = collection.reverse()
        }

        // Apply filters
        collection = collection.filter(r => filterReview(filters, r))

        // Calculate the offset
        const collectionCount = await collection.count()
        const offset = pageSize * index

        // Limit to page size
        return { count: collectionCount, results: await collection.offset(offset).limit(pageSize).toArray()}
    }

    const getAllDBPages = async (store: Dexie.Table, filters: any, sorting: any) => {
        
        let collection = null

        // Apply sorting
        switch(sorting.id) {
            case 'timestampUpdated':
                collection = store.orderBy('timestamp_updated')
                break
            case 'playtimeAtReview':
                collection = store.orderBy('author_playtime_at_review')
                break
            case 'playtimeForever':
                collection = store.orderBy('author_playtime_forever')
                break
            case 'playtime2Weeks':
                collection = store.orderBy('author_playtime_last_two_weeks')
                break
            case 'votesUp':
                collection = store.orderBy('votes_up')
                break
            case 'votesFunny':
                collection = store.orderBy('votes_funny')
                break
            case 'authorNumReviews':
                collection = store.orderBy('author_num_reviews')
                break
            case 'authorNumGames':
                collection = store.orderBy('author_num_games_owned')
                break
            case 'commentCount':
                collection = store.orderBy('comment_count')
                break
            case 'textLength':
                collection = store.orderBy('length')
                break
            case 'authorNumReviews':
                collection = store.orderBy('author_num_reviews')
                break
            case 'authorNumGames':
                collection = store.orderBy('author_num_games_owned')
                break
            case 'timestampCreated':
            default:
                collection = store.orderBy('timestamp_created')
        }

        if (sorting.direction === 'descending') {
            collection = collection.reverse()
        }

        // Apply filters
        collection = collection.filter(r => filterReview(filters, r))

        // Limit to page size
        return collection.toArray()
    }

    const handleExportData = (option: 'reviews' | 'filteredReviews') => {
        if (option === 'reviews') {
            return store.toArray()
        } else {
            return getAllDBPages(store, filters, sorting)
        }
    }

    const exportComponent = <Export game={game} handleGetData={handleExportData} reviewCount={reviewStatistics.totalReviews} filteredReviewCount={filteredReviewCount} viewOptions={viewOptions} viewOptionsCallback={handleViewOptions}/>

    return (hasLoaded && <>
        <div ref={ref}></div>
        <Tabs defaultActiveKey="reviews" className="mt-1" onSelect={handleTabSelect} activeKey={activeTab}>
            <Tab eventKey="reviews" title="Reviews">
                <ReviewTableFilter filteredReviewCount={filteredReviewCount} filters={filters} viewOptions={viewOptions} viewOptionsCallback={handleViewOptions} updateFiltersCallback={handleUpdateFilters} applyFiltersCallback={handleApplyFilters} cancelStagedFilterChangesCallback={handleCancelStagedFilterChanges} reviewStatistics={reviewStatistics} cachedFilters={cachedFilters} dirty={dirty} zeroed={zeroed} resetFiltersCallback={handleResetFilters}/>
                <PaginatedReviewTable filteredReviewCount={filteredReviewCount} exportComponent={exportComponent} index={index} filters={filters} viewOptions={viewOptions} game={game} reviews={filteredReviews} sorting={sorting} handleSort={handleSort} handleChangeIndex={handleSetIndex} keyNavigationEnabled={activeTab === 'reviews'} reviewTextTruncateLength={reviewStatistics.medianTextLength} pageSize={pageSize} setPageSize={setPageSize}/>
            </Tab>
            <Tab eventKey="statistics" title="Statistics" className="pb-3 pt-3">
                <ReviewVolumeDistributionBarChart reviewStatistics={reviewStatistics} />
                <ReviewScoreOverTimeChart reviewStatistics={reviewStatistics} />
                <ReviewOverview game={game} reviewStatistics={reviewStatistics} handleFilterPreset={handleFilterPreset} initialFilterRanges={getInitialFilterRanges()}/>
                {/* <SwearWords game={game} reviewStatistics={reviewStatistics} /> */}
            </Tab>
            <Tab eventKey="languages" title="Languages" className="pb-3 pt-3">
                <LanguageDistribution game={game} reviewStatistics={reviewStatistics} handleFilterPreset={handleFilterPreset} />
            </Tab>
            <Tab eventKey="words" title="Words" className="pb-3 pt-3">
                <WordFrequency game={game} reviewStatistics={reviewStatistics} handleFilterPreset={handleFilterPreset} />
            </Tab>
            <Tab eventKey="highlights" title="Highlights">
                <HighlightedReviewList game={game} reviewStatistics={reviewStatistics}/>
            </Tab>
            <Tab eventKey="presets" title="Presets">
                <PromptsList handleFilterPreset={handleFilterPreset} initialFilterRanges={getInitialFilterRanges()} reviewStatistics={reviewStatistics} game={game} />
            </Tab>
        </Tabs> 
    </>)
}

export default Breakdown