import pRetry from 'p-retry'

const CORS_URL = 'https://desolate-refuge-02398.herokuapp.com/'
    
async function getReviewScore(appId: string) {
    return await fetch(`${CORS_URL}https://store.steampowered.com/appreviews/${appId}?json=1&day_range=9223372036854775807&language=all&review_type=all&purchase_type=all&filter_offtopic_activity=0&num_per_page=0`)
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
    let featuredGames = await fetch(`${CORS_URL}https://store.steampowered.com/api/featured/`)
        .then(res => res.json())
        .then(res => res.featured_win)

    let games = []
    for (let game of featuredGames) {
        let fullGame = await getGame(game.id)
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
        .then(res => res[appId].data)

    const reviewScore = await getReviewScore(appId)
        
    return {
        ...appDetails,
        ...reviewScore,
        time_scraped: Math.floor(new Date().getTime() / 1000)
    }
}

async function getReviews(game, appId: string, updateCallback, errorCallback) {

    let cursor = null, reviews = []

    const getReviewsPage = async (appId: string, cursor: string) => {
        if (cursor) {
            cursor = encodeURIComponent(cursor)
        }
        
        // const url = `${CORS_URL}https://store.steampowered.com/appreviews/${appId}?json=1&day_range=9223372036854775807&language=all&review_type=all&purchase_type=all&filter_offtopic_activity=0&num_per_page=100${cursor ? `&cursor=${cursor}` : ''}`
        const url = `${CORS_URL}https://store.steampowered.com/appreviews/${appId}?json=1&filter=recent&language=all&review_type=all&purchase_type=all&num_per_page=100&filter_offtopic_activity=0${cursor ? `&cursor=${cursor}` : ''}`

        try {
            return await pRetry(() => fetch(url)
                .then(async res => {
                    let resJson = await res.json() 
        
                    if (resJson !== null && resJson.success && resJson.query_summary.num_reviews > 0) {
                        errorCallback(null)
                        return { reviews: resJson.reviews, cursor: resJson.cursor, bytes: +res.headers.get('Content-Length') }
                    }
                    errorCallback(null)
                }), { retries: 4, onFailedAttempt: (e) => { errorCallback({ triesLeft: e.retriesLeft, attemptNumber: e.attemptNumber, goal: game.total_reviews})} })
        } catch (e) {
            return
        }
    }

    let requestCount = 0
    let accumulativeElapsedMs = 0
    let accumulativeBytesReceived = 0
    do {
        let before = new Date().getTime()

        let res = await getReviewsPage(appId, cursor)

        requestCount++
        let elapsedMs = new Date().getTime() - before
        accumulativeElapsedMs += elapsedMs

        if (res) {
            accumulativeBytesReceived += res.bytes
            reviews.push(...res.reviews)

            updateCallback({ count: reviews.length, averageRequestTime: accumulativeElapsedMs / requestCount, bytes: accumulativeBytesReceived })

            cursor = res.cursor
        } else {
            cursor = null
        }
    } while (cursor)

    reviews.sort((a, b) => b.timestamp_created - a.timestamp_created)
    return reviews.filter(r => {
        return r.timestamp_created < game.time_scraped})
}

const SteamWebApiClient = {
    getFeaturedGames: getFeaturedGames,
    getReviewScore: getReviewScore,
    findGamesBySearchTerm: findGamesBySearchTerm,
    getGame: getGame,
    getReviews: getReviews
}

export default SteamWebApiClient