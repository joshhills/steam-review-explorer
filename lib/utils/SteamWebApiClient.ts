import _ from 'lodash'
import pRetry from 'p-retry'
import { CensorSensor } from 'censor-sensor'
 
const censor = new CensorSensor()

const CORS_URL = 'https://guarded-waters-40555.herokuapp.com/'
    
async function getReviewScore(appId: string) {
    return await fetch(`${CORS_URL}https://store.steampowered.com/appreviews/${appId}?json=1&day_range=9223372036854775807&language=all&review_type=all&purchase_type=all&filter_offtopic_activity=0&num_per_page=0&cacheBust=${Math.random()}`)
        .then(res => res.json())
        .then(res => {
            return {
                review_score: res.query_summary.review_score,
                review_score_desc: res.query_summary.review_score_desc,
                total_positive: res.query_summary.total_positive,
                total_negative: res.query_summary.total_negative,
                total_reviews: res.query_summary.total_reviews,
            }
        })
}

async function getFeaturedGames() {
    let featuredGames = await fetch(`${CORS_URL}https://store.steampowered.com/api/featured?cacheBust=${Math.random()}`)
        .then(res => res.json())
        .then(res => res.featured_win)

    let games = []
    for (let game of _.uniqBy(featuredGames, (g: any) => g.id) as any) {
        let fullGame = await getGame(game.id)

        if (fullGame === null) {
            continue
        }

        games.push({ ...fullGame, time_scraped: Math.floor(new Date().getTime() / 1000) })
    }

    return games
}

async function findGamesBySearchTerm(searchTerm: string) {
    let searchedGames = await fetch(`${CORS_URL}https://store.steampowered.com/api/storesearch/?term=${searchTerm}&l=english&cc=US`)
        .then(res => res.json())
        .then(res => res.items)

    let games = []
    for (let game of searchedGames) {
        let fullGame = await getGame(game.id)

        try {
            if (fullGame.type !== 'sub' && fullGame.type !== 'hardware' && !fullGame.release_date.coming_soon) {
                games.push({ ...fullGame, time_scraped: Math.floor(new Date().getTime() / 1000) })
            }
        } catch(e) {}
    }

    return games
}

async function getGame(appId: string) {
    const appDetails = await fetch(`${CORS_URL}https://store.steampowered.com/api/appdetails?appids=${appId}`)
        .then(res => res.json())
        .then(res => res[appId].success ? res[appId].data : null)

    if (appDetails === null) {
        return null
    }

    const reviewScore = await getReviewScore(appId)
        
    return {
        ...appDetails,
        ...reviewScore,
        time_scraped: Math.floor(new Date().getTime() / 1000)
    }
}

async function getReviews(game, appId: string, updateCallback, errorCallback) {

    const RETRY_THRESHOLD = 50

    let cursor = null, reviews = []

    const getReviewsPage = async (appId: string, cursor: string) => {
        if (cursor) {
            cursor = encodeURIComponent(cursor)
        }

        let cacheBust = null
        if (!cursor) {
            cacheBust = Math.random()
        }
        
        // const url = `${CORS_URL}https://store.steampowered.com/appreviews/${appId}?json=1&day_range=9223372036854775807&language=all&review_type=all&purchase_type=all&filter_offtopic_activity=0&num_per_page=100${cursor ? `&cursor=${cursor}` : ''}`
        let url = `${CORS_URL}https://store.steampowered.com/appreviews/${appId}?json=1&filter=recent&language=all&review_type=all&purchase_type=all&num_per_page=100&filter_offtopic_activity=0${cursor ? `&cursor=${cursor}` : ''}${cacheBust ? `&cacheBust=${cacheBust}` : ''}`

        try {
            return await pRetry(() => fetch(url)
                .then(async res => {
                    let resJson = await res.json()
        
                    if (resJson !== null && resJson.success && resJson.query_summary.num_reviews > 0) {
                        errorCallback(null)
                        return { reviews: resJson.reviews, cursor: resJson.cursor, bytes: +res.headers.get('Content-Length') }
                    }
                    errorCallback(null)
                    if (resJson.query_summary.num_reviews === 0 && game.total_reviews - reviews.length > RETRY_THRESHOLD) {
                        throw new Error("Expected more reviews but response was empty")
                    }
                }), { retries: 9, onFailedAttempt: (e) => {
                    cacheBust = Math.random()
                    url = `${CORS_URL}https://store.steampowered.com/appreviews/${appId}?json=1&filter=recent&language=all&review_type=all&purchase_type=all&num_per_page=100&filter_offtopic_activity=0${cursor ? `&cursor=${cursor}` : ''}${cacheBust ? `&cacheBust=${cacheBust}` : ''}`
                    errorCallback({ triesLeft: e.retriesLeft, attemptNumber: e.attemptNumber, goal: game.total_reviews})}
                })
        } catch (e) {
            return
        }
    }

    let accumulativeElapsedMs = []
    let accumulativeBytesReceived = 0
    do {
        let before = new Date().getTime()

        let res = await getReviewsPage(appId, cursor)

        let elapsedMs = new Date().getTime() - before
        if (accumulativeElapsedMs.length === 3) {
            accumulativeElapsedMs.shift()
        }
        accumulativeElapsedMs.push(elapsedMs)

        if (res) {
            accumulativeBytesReceived += res.bytes

            for (let review of res.reviews) {
                if (isNaN(review.author.playtime_at_review)) {
                    review.author.playtime_at_review = review.author.playtime_forever
                }

                review.review = review.review.replace(/"/g, "'")
                if (censor.isProfaneIsh(review.review)) {
                    review.censored = censor.cleanProfanityIsh(review.review)
                }
                reviews.push(review)
            }

            let totalElapsedMs = 0
            for (let ms of accumulativeElapsedMs) {
                totalElapsedMs += ms
            }
            updateCallback({ count: reviews.length, averageRequestTime: totalElapsedMs / accumulativeElapsedMs.length, bytes: accumulativeBytesReceived, finished: false })

            cursor = res.cursor
        } else {
            cursor = null
        }
    } while (cursor)

    let totalElapsedMs = 0
    for (let ms of accumulativeElapsedMs) {
        totalElapsedMs += ms
    }
    updateCallback({ count: reviews.length, averageRequestTime: totalElapsedMs / accumulativeElapsedMs.length, bytes: accumulativeBytesReceived, finished: true })
    
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