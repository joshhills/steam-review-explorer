import _ from 'lodash'
import pRetry from 'p-retry'
import { CensorSensor } from 'censor-sensor'

const censor = new CensorSensor()

// A sensible max total for funny and helpful counts
const MAX_VALUE = 9999999

const CORS_URL = 'https://joshhills.dev/cors/'
// const CORS_URL = 'https://fair-jade-sparrow-tam.cyclic.app/'
// const CORS_URL = 'https://cors-proxy-teal.vercel.app/'
    
async function getReviewScore(appId: string, selectedLanguages: Array<string> = []) {

    let langString = "all"
    if (selectedLanguages.length === 1) {
        langString = selectedLanguages[0]
    }

    return await fetch(`${CORS_URL}store.steampowered.com/appreviews/${appId}?json=1&day_range=9223372036854775807&language=${langString}&review_type=all&purchase_type=all&filter_offtopic_activity=0&num_per_page=0&cacheBust=${Math.random()}`)
        .then(res => res.json())
        .then(res => {
            return {
                review_score: res.query_summary.review_score,
                review_score_desc: res.query_summary.review_score_desc === '1 user reviews' ? '1 user review' : res.query_summary.review_score_desc,
                total_positive: res.query_summary.total_positive,
                total_negative: res.query_summary.total_negative,
                total_reviews: res.query_summary.total_reviews,
            }
        })
}

async function getFeaturedGames() {
    let featuredGames = await fetch(`${CORS_URL}store.steampowered.com/api/featured?cacheBust=${Math.random()}`)
        .then(res => res.json())
        .then(res => res.featured_win)

    let games = []
    for (let game of _.uniqBy(featuredGames, (g: any) => g.id) as any) {
        let fullGame = await getGame(game.id)

        if (fullGame === null) {
            continue
        }

        const isNSFW = fullGame.content_descriptors.ids.indexOf(3) !== -1

        if (!isNSFW) {
            games.push({ ...fullGame, time_scraped: Math.floor(new Date().getTime() / 1000) })
        }
    }

    return games
}

async function findGamesBySearchTerm(searchTerm: string, productTypes: [string]) {
    
    let searchedGames = await fetch(`${CORS_URL}store.steampowered.com/api/storesearch/?term=${searchTerm}&l=english&cc=US`)
        .then(res => res.json())
        .then(res => res.items)

    let games = []
    for (let game of searchedGames) {
        let fullGame = await getGame(game.id)

        const isNSFW = fullGame.content_descriptors.ids.indexOf(3) !== -1

        let askingForAdultGames = productTypes.indexOf('adult_game') !== -1

        try {
            if ((askingForAdultGames && fullGame.type === 'game' && isNSFW) || productTypes.indexOf(fullGame.type) !== -1 && !fullGame.release_date.coming_soon) {
                
                games.push({ ...fullGame, time_scraped: Math.floor(new Date().getTime() / 1000) })
            }
        } catch(e) {}
    }

    return games
}

async function getGame(appId: string, selectedLanguages: Array<string> = []) {
    const appDetails = await fetch(`${CORS_URL}store.steampowered.com/api/appdetails?appids=${appId}`)
        .then(res => res.json())
        .then(res => res[appId].success ? res[appId].data : null)

    if (appDetails === null) {
        return null
    }

    const reviewScore = await getReviewScore(appId, selectedLanguages)
        
    return {
        ...appDetails,
        ...reviewScore,
        time_scraped: Math.floor(new Date().getTime() / 1000)
    }
}

async function getReviews(game, appId: string, updateCallback, errorCallback, abortController, startDate: Date, endDate: Date, languages: Array<string>) {

    const RETRY_THRESHOLD = 50

    let cursor = null, reviews = [], checked = 0

    const getReviewsPage = async (appId: string, languages: Array<string>, cursor: string) => {
        if (cursor) {
            cursor = encodeURIComponent(cursor)
        }

        let cacheBust = null
        if (!cursor) {
            cacheBust = Math.random()
        }
        
        let langString = "all"
        if (languages.length === 1) {
            langString = languages[0]
        }

        // const url = `${CORS_URL}https://store.steampowered.com/appreviews/${appId}?json=1&day_range=9223372036854775807&language=all&review_type=all&purchase_type=all&filter_offtopic_activity=0&num_per_page=100${cursor ? `&cursor=${cursor}` : ''}`
        let url = `${CORS_URL}store.steampowered.com/appreviews/${appId}?json=1&filter=recent&language=${langString}&review_type=all&purchase_type=all&num_per_page=100&filter_offtopic_activity=0${cursor ? `&cursor=${cursor}` : ''}${cacheBust ? `&cacheBust=${cacheBust}` : ''}`

        try {

            return await pRetry(() => fetch(url)
                .then(async res => {
                    let resJson = await res.json()
        
                    if (resJson !== null && resJson.success && resJson.query_summary.num_reviews > 0) {
                        errorCallback({ abortController: abortController })
                        return { reviews: resJson.reviews, cursor: resJson.cursor, bytes: +res.headers.get('Content-Length') }
                    }
                    errorCallback({ abortController: abortController })
                    if (resJson.query_summary.num_reviews === 0 && game.total_reviews - checked > RETRY_THRESHOLD) {
                        throw new Error("Expected more reviews but response was empty")
                    }
                }), { retries: 4, signal: abortController.signal, onFailedAttempt: (e) => {
                    cacheBust = Math.random()
                    url = `${CORS_URL}store.steampowered.com/appreviews/${appId}?json=1&filter=recent&language=${langString}&review_type=all&purchase_type=all&num_per_page=100&filter_offtopic_activity=0${cursor ? `&cursor=${cursor}` : ''}${cacheBust ? `&cacheBust=${cacheBust}` : ''}`
                    errorCallback({ triesLeft: e.retriesLeft, attemptNumber: e.attemptNumber, goal: game.total_reviews, abortController: abortController})}
                })
        } catch (e) {
            return
        }
    }

    let accumulativeElapsedMs = []
    let accumulativeBytesReceived = 0
    let stop = false
    do {
        let before = new Date().getTime()

        let res = await getReviewsPage(appId, languages, cursor)

        let elapsedMs = new Date().getTime() - before
        if (accumulativeElapsedMs.length === 3) {
            accumulativeElapsedMs.shift()
        }
        accumulativeElapsedMs.push(elapsedMs)

        if (res) {
            accumulativeBytesReceived += res.bytes

            for (let review of res.reviews) {

                checked++

                // Check language
                if (languages.length > 0 && languages.indexOf(review.language) === -1) {
                    continue
                }

                // Check timespan
                let timestamp = review.timestamp_created * 1000
                
                if (timestamp > endDate.getTime()) {
                    // Skip as it's more recent than we care about
                    continue
                }
                if (timestamp < startDate.getTime()) {
                    // Stop at this point
                    stop = true
                    break
                }

                if (isNaN(review.author.playtime_at_review)) {
                    review.author.playtime_at_review = review.author.playtime_forever
                }

                review.review = review.review.replace(/"/g, "'")
                if (censor.isProfaneIsh(review.review)) {
                    review.censored = censor.cleanProfanityIsh(review.review)
                }
                
                review.recommendationurl = `https://steamcommunity.com/profiles/${review.author.steamid}/recommended/${game.steam_appid}/`;

                // Sanitize Steam bugs...
                if (review.votes_up > MAX_VALUE || review.votes_up < 0) {
                    review.votes_up = 0
                }
                if (review.votes_funny > MAX_VALUE || review.votes_funny < 0) {
                    review.votes_funny = 0
                }

                reviews.push(review)
            }

            let totalElapsedMs = 0
            for (let ms of accumulativeElapsedMs) {
                totalElapsedMs += ms
            }
            updateCallback({ checked: checked, count: reviews.length, averageRequestTime: totalElapsedMs / accumulativeElapsedMs.length, bytes: accumulativeBytesReceived, finished: false })

            cursor = res.cursor
        } else {
            cursor = null
        }

        if (stop) {
            break
        }
    } while (cursor)

    let totalElapsedMs = 0
    for (let ms of accumulativeElapsedMs) {
        totalElapsedMs += ms
    }
    updateCallback({ checked: checked, count: reviews.length, averageRequestTime: totalElapsedMs / accumulativeElapsedMs.length, bytes: accumulativeBytesReceived, finished: true })
    
    return reviews
}

const SteamWebApiClient = {
    getFeaturedGames: getFeaturedGames,
    getReviewScore: getReviewScore,
    findGamesBySearchTerm: findGamesBySearchTerm,
    getGame: getGame,
    getReviews: getReviews
}

export default SteamWebApiClient
