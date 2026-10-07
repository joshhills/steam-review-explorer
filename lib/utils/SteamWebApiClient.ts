import _ from 'lodash'
import pRetry from 'p-retry'
import { CensorSensor } from 'censor-sensor'
import supportedLocales from './SteamLocales'
import Dexie from 'dexie'
import DBUtils from './DBUtils'

const censor = new CensorSensor()

// A sensible max total for funny and helpful counts
const MAX_VALUE = 9999999

const CORS_URL = 'https://joshhills.dev/cors/'
// const CORS_URL = 'https://fair-jade-sparrow-tam.cyclic.app/'
// const CORS_URL = 'https://cors-proxy-teal.vercel.app/'

var re_weburl = new RegExp(
    "^" +
      // protocol identifier (optional)
      // short syntax // still required
      "(?:(?:(?:https?|ftp):)?\\/\\/)" +
      // user:pass BasicAuth (optional)
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broadcast addresses
        // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
        // host & domain names, may end with dot
        // can be replaced by a shortest alternative
        // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
        "(?:" +
          "(?:" +
            "[a-z0-9\\u00a1-\\uffff]" +
            "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
          ")?" +
          "[a-z0-9\\u00a1-\\uffff]\\." +
        ")+" +
        // TLD identifier name, may end with dot
        "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
      ")" +
      // port number (optional)
      "(?::\\d{2,5})?" +
      // resource path (optional)
      "(?:[/?#]\\S*)?" +
    "$", "i"
  );
function hasUrl(text: string) {
    for (let token of text.split(/\s/)) {
        if (re_weburl.test(token)) {
            return true
        }
    }
    return false
}

async function getReviewScore(appId: string, selectedLanguages: Array<string> = []) {

    const inputParams: any = {
        appid: parseInt(appId, 10),
        languages: selectedLanguages.length > 0 ? selectedLanguages : ['all'],
        review_type: 0, // k_EUserReviewsReviewType_All
        purchase_type: 1, // k_EUserReviewsPurchaseType_All
        num_per_page: 0,
        filter_offtopic_activity: false
    }

    const url = `${CORS_URL}api.steampowered.com/IUserReviewsService/GetAppReviews/v1/?input_json=${encodeURIComponent(JSON.stringify(inputParams))}&cacheBust=${Math.random()}`

    return await pRetry(() => fetch(url)
        .then(async res => {
            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}: ${res.statusText}`)
            }
            return res.json()
        }), { retries: 3 })
        .then(res => {
            const data = res?.response || res
            const summary = data?.query_summary || {}
            return {
                review_score: summary.review_score ?? 0,
                review_score_desc: summary.review_score_desc === '1 user reviews' ? '1 user review' : (summary.review_score_desc ?? ''),
                total_positive: summary.total_positive ?? 0,
                total_negative: summary.total_negative ?? 0,
                total_reviews: summary.total_reviews ?? 0,
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

        if (fullGame === null) {
            continue
        }

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

function parseSupportedLanguages(supportedLanguages: string) {

    const regexHTMLRemove = /^[^<]*/

    const languagesTrimmed = supportedLanguages.split(',') // Separate lines
        .map(e => e.trim()) // Remove spacing
        .map(e => e.match(regexHTMLRemove)[0]) // Remove HTML

    let supportedLanguagesFormatted = {}

    for (let parsedLang of languagesTrimmed) {
        for (let supportedLocale in supportedLocales) {
            if (parsedLang === supportedLocales[supportedLocale].englishName) {
                supportedLanguagesFormatted[supportedLocale] = {
                    englishName: parsedLang
                }
            }
        }
    }

    return supportedLanguagesFormatted
}

function getUnsupportedLanguages(supportedLanguages: Object) {

    let unsupportedLanguages = {}

    for (let lang of Object.keys(supportedLocales)) {
        if (Object.keys(supportedLanguages).indexOf(lang) === -1) {
            unsupportedLanguages[lang] = supportedLocales[lang]
        }
    }

    return unsupportedLanguages
}

async function getGame(appId: string, selectedLanguages: Array<string> = []) {
    const appDetails = await fetch(`${CORS_URL}store.steampowered.com/api/appdetails?appids=${appId}`)
        .then(res => res.json())
        .then(res => res[appId].success ? res[appId].data : null)

    if (appDetails === null) {
        return null
    }

    let parsedSupportedLanguages = {}
    if (appDetails['supported_languages']) {
        parsedSupportedLanguages = parseSupportedLanguages(appDetails['supported_languages'])
    }
    const unsupportedLanguages = getUnsupportedLanguages(parsedSupportedLanguages)

    const reviewScore = await getReviewScore(appId, selectedLanguages)
        
    return {
        ...appDetails,
        parsed_supported_languages: parsedSupportedLanguages,
        unsupported_languages: unsupportedLanguages,
        ...reviewScore,
        time_scraped: Math.floor(new Date().getTime() / 1000)
    }
}

async function getReviews(game, appId: string, updateCallback, errorCallback, abortController, startDate: Date, endDate: Date, languages: Array<string>) {
    
    const store = DBUtils.getReviewStoreForGame(appId)
    
    await store.clear()
    await DBUtils.logSearch(appId, startDate, endDate)

    const RETRY_THRESHOLD = 50

    let cursor = null, checked = 0

    const buildReviewsUrl = (appId: string, languages: Array<string>, cursor: string, cacheBust?: number) => {
        const inputParams: any = {
            appid: parseInt(appId, 10),
            filter: 1, // k_EUserReviewsAppReviewsFilter_Recent
            languages: languages.length > 0 ? languages : ['all'],
            review_type: 0, // k_EUserReviewsReviewType_All
            purchase_type: 1, // k_EUserReviewsPurchaseType_All
            num_per_page: 100,
            filter_offtopic_activity: false
        }
        if (cursor && cursor !== '*') {
            inputParams.cursor = cursor
        }
        if (startDate && startDate.getTime() > 0 && endDate) {
            inputParams.date_range_start = Math.floor(startDate.getTime() / 1000)
            inputParams.date_range_end = Math.floor(endDate.getTime() / 1000)
        }

        let requestUrl = `${CORS_URL}api.steampowered.com/IUserReviewsService/GetAppReviews/v1/?input_json=${encodeURIComponent(JSON.stringify(inputParams))}`
        if (cacheBust) {
            requestUrl += `&cacheBust=${cacheBust}`
        }
        return requestUrl
    }

    const getReviewsPage = async (appId: string, languages: Array<string>, cursor: string) => {
        let cacheBust = null
        if (!cursor) {
            cacheBust = Math.random()
        }

        let url = buildReviewsUrl(appId, languages, cursor, cacheBust)

        try {

            return await pRetry(() => fetch(url)
                .then(async res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error ${res.status}: ${res.statusText}`)
                    }

                    let resJson = await res.json()
                    let data = resJson?.response || resJson
                    let querySummary = data?.query_summary || {}
                    let reviews = data?.reviews || []
                    let numReviews = querySummary.num_reviews ?? reviews.length

                    if (reviews.length > 0) {
                        errorCallback({ abortController: abortController })
                        return { reviews: reviews, cursor: data?.cursor, bytes: +(res.headers.get('Content-Length') || 0) }
                    }
                    errorCallback({ abortController: abortController })
                    if (numReviews === 0 && game.total_reviews - checked > RETRY_THRESHOLD) {
                        throw new Error("Expected more reviews but response was empty")
                    }
                    return { reviews: [], cursor: null, bytes: +(res.headers.get('Content-Length') || 0) }
                }), { retries: 4, signal: abortController.signal, onFailedAttempt: (e) => {
                    cacheBust = Math.random()
                    url = buildReviewsUrl(appId, languages, cursor, cacheBust)
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

        if (res && res.reviews && res.reviews.length > 0) {
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

                // Normalise review
                review.author_steamid = review.author?.steamid
                review.author_num_games_owned = review.author?.num_games_owned ?? 0
                review.author_num_reviews = review.author?.num_reviews ?? 0
                review.author_playtime_forever = review.author?.playtime_forever ?? 0
                review.author_playtime_last_two_weeks = review.author?.playtime_last_two_weeks ?? 0
                review.author_playtime_at_review = review.author?.playtime_at_review ?? review.author_playtime_forever
                review.author_deck_playtime_at_review = review.author?.deck_playtime_at_review ?? 0
                review.author_last_played = review.author?.last_played ?? 0
                delete review.author

                if (isNaN(review.author_playtime_at_review)) {
                    review.author_playtime_at_review = review.author_playtime_forever
                }

                review.review = (review.review || '').replace(/"/g, "'")
                if (censor.isProfaneIsh(review.review)) {
                    review.censored = censor.cleanProfanityIsh(review.review)
                }
                
                review.recommendationurl = `https://steamcommunity.com/profiles/${review.author_steamid}/recommended/${game.steam_appid}/`;

                // Sanitize Steam bugs...
                if (review.votes_up > MAX_VALUE || review.votes_up < 0) {
                    review.votes_up = 0
                }
                if (review.votes_funny > MAX_VALUE || review.votes_funny < 0) {
                    review.votes_funny = 0
                }

                // Check if it contains URLs
                review.contains_url = hasUrl(review.review)

                // Ensure weighted_vote_score is a valid float
                review.weighted_vote_score = Number(review.weighted_vote_score) || 0
                review.refunded = !!review.refunded
                review.primarily_steam_deck = !!review.primarily_steam_deck

                // Compute extra fields
                if (review.author_playtime_forever > review.author_playtime_at_review) {
                    review.author_continued_playing = true
                    review.author_playtime_after_review_time = review.author_playtime_forever - review.author_playtime_at_review
                } else {
                    review.author_continued_playing = false
                    review.author_playtime_after_review_time = 0
                }

                review.length = review.review.length

                store.add(review)
            }

            let totalElapsedMs = 0
            for (let ms of accumulativeElapsedMs) {
                totalElapsedMs += ms
            }

            let reviewCount = await store.count()
            updateCallback({ checked: checked, count: reviewCount, averageRequestTime: totalElapsedMs / accumulativeElapsedMs.length, bytes: accumulativeBytesReceived, finished: false })

            cursor = (res.cursor && res.cursor !== '*' && res.cursor !== cursor) ? res.cursor : null
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
    let reviewCount = await store.count()

    updateCallback({ checked: checked, count: reviewCount, averageRequestTime: totalElapsedMs / accumulativeElapsedMs.length, bytes: accumulativeBytesReceived, finished: true })

    // Delete pointless store if there's no reviews
    if (reviewCount === 0) {
        await Dexie.delete(appId)
    }

    return reviewCount
}

const SteamWebApiClient = {
    getFeaturedGames: getFeaturedGames,
    getReviewScore: getReviewScore,
    findGamesBySearchTerm: findGamesBySearchTerm,
    getGame: getGame,
    getReviews: getReviews
}

export default SteamWebApiClient
