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
        games.push(fullGame)
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
        if (!fullGame.release_date.coming_soon) {
            games.push(fullGame)
        }
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
        ...reviewScore
    }
}

async function getReviews(appId: string, updateCallback) {
    const getReviewsPage = async (appId: string, cursor: string) => {
        if (cursor) {
            cursor = encodeURIComponent(cursor)
        }
        
        return await pRetry(() => fetch(`${CORS_URL}https://store.steampowered.com/appreviews/${appId}?json=1&day_range=9223372036854775807&language=all&review_type=all&purchase_type=all&filter_offtopic_activity=0&num_per_page=100${cursor ? `&cursor=${cursor}` : ""}`)
        .then(res => res.json())
        .then(res => {
            if (res !== null && res.success && res.query_summary.num_reviews > 0) {
                return { reviews: res.reviews, cursor: res.cursor }
            }
        }), {retries: 5})
    }

    let cursor = null, reviews = []

    let requestCount = 0
    let accumulativeElapsedMs = 0
    do {
        let before = new Date().getTime()

        let res = await getReviewsPage(appId, cursor)
        
        requestCount++
        let elapsedMs = new Date().getTime() - before
        accumulativeElapsedMs += elapsedMs

        if (res) {
            reviews.push(...res.reviews)

            updateCallback({ count: reviews.length, averageRequestTime: accumulativeElapsedMs / requestCount})

            cursor = res.cursor
        } else {
            cursor = null
        }
    } while (cursor)

    return reviews.sort((a, b) => b.timestamp_created - a.timestamp_created)
}

const SteamWebApiClient = {
    getFeaturedGames: getFeaturedGames,
    getReviewScore: getReviewScore,
    findGamesBySearchTerm: findGamesBySearchTerm,
    getGame: getGame,
    getReviews: getReviews
}

export default SteamWebApiClient