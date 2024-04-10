import Dexie from "dexie"

const REVIEW_STORE_VERSION = 1
const OPERATION_STORE_VERSION = 1
const RESERVED_DATABASE_NAMES = [
    'operation'
]

function getReviewStoreForGame(appid: string) {
    const db = new Dexie(appid)
    db.version(REVIEW_STORE_VERSION).stores({
        reviews: 'recommendationid, timestamp_created, timestamp_updated, language, author_playtime_at_review, author_playtime_forever, author_playtime_last_two_weeks, author_playtime_after_review_time, author_num_reviews, author_num_games_owned, votes_up, votes_funny, comment_count, length'
    })
    return db['reviews']
}

function getOperationStore() {
    const db = new Dexie('operation')
    db.version(OPERATION_STORE_VERSION).stores({
        operations: 'appid'
    })
    return db['operations']
}

async function listReviewsInDatabase() {
    const games = (await Dexie.getDatabaseNames()).filter(n => RESERVED_DATABASE_NAMES.indexOf(n) === -1)

    let result = {}
    for (let game of games) {
        result[game] = await getReviewStoreForGame(game).count()
    }

    return result
}

function getStorageQuota() {
    if (navigator.storage && navigator.storage.estimate) {
        return navigator.storage.estimate()
    } else {
        throw new Error('StorageManager not found')
    }
}

async function deleteGame(appid: string) {
    await Dexie.delete(appid)
    await getOperationStore().delete(appid)
}

function logSearch(appid: string, start: Date, end: Date) {
    
    return getOperationStore().put({
        appid: appid,
        start: start.getTime(),
        end: end.getTime(),
        when: Date.now()
    })
}

function getSearch(appid: string) {
    return getOperationStore().get(appid.toString())
}

export default {
    logSearch: logSearch,
    getSearch: getSearch,
    getStorageQuota: getStorageQuota,
    getReviewStoreForGame: getReviewStoreForGame,
    listReviewsInDatabase: listReviewsInDatabase,
    deleteGame: deleteGame,
}