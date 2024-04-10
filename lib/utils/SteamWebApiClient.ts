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

                // Normalise review
                review.author_steamid = review.author.steamid
                review.author_num_games_owned = review.author.num_games_owned
                review.author_num_reviews = review.author.num_reviews
                review.author_playtime_forever = review.author.playtime_forever
                review.author_playtime_last_two_weeks = review.author.playtime_last_two_weeks
                review.author_playtime_at_review = review.author.playtime_at_review
                review.author_last_played = review.author.last_played
                delete review.author

                if (isNaN(review.author_playtime_at_review)) {
                    review.author_playtime_at_review = review.author_playtime_forever
                }

                review.review = review.review.replace(/"/g, "'")
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
