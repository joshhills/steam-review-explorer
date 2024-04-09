import Dexie from "dexie"

const REVIEW_STORE_VERSION = 1
const RESERVED_DATABASE_NAMES = [
    'operations'
]

function getReviewStoreForGame(appid: string) {
    const db = new Dexie(appid)
    db.version(REVIEW_STORE_VERSION).stores({
        reviews: 'recommendationid, timestamp_created, timestamp_updated, language, author_playtime_at_review, author_playtime_forever, author_playtime_last_two_weeks, author_playtime_after_review_time, author_num_reviews, author_num_games_owned, votes_up, votes_funny, comment_count, length'
    })
    return db['reviews']
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

function deleteGame(appid: string) {
    return Dexie.delete(appid)
}

export default {
    getStorageQuota: getStorageQuota,
    getReviewStoreForGame: getReviewStoreForGame,
    listReviewsInDatabase: listReviewsInDatabase,
    deleteGame: deleteGame
}