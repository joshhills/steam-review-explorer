/**
 * Example review:
 * {
 *     "recommendationid":"0987654321",
 *     "author":{
 *         "steamid":"1234567890",
 *          "num_games_owned":321,
 *          "num_reviews":30,
 *          "playtime_forever":90,
 *          "playtime_last_two_weeks":90,
 *          "playtime_at_review":90,
 *          "last_played":1617640020
 *     },
 *     "language":"english",
 *     "review":"noice",
 *     "timestamp_created":1617640034,
 *     "timestamp_updated":1617640034,
 *     "voted_up":true,
 *     "votes_up":0,
 *     "votes_funny":0,
 *     "weighted_vote_score":0,
 *     "comment_count":0,
 *     "steam_purchase":false,
 *     "received_for_free":false,
 *     "written_during_early_access":true
 * }
 */

import dateFormat from "dateformat"
import commonWords from "./CommonWords"
import curseWords from "./curseWords"
const dateFormatString = 'dd/mm/yyyy'

const roundDate = (timeStamp: number) => {
    timeStamp -= timeStamp % (24 * 60 * 60 * 1000)
    return new Date(timeStamp)
}

/**
 * Check if a word meets the criteria to be included
 * in the word frequency graph
 * 
 * @param word The word to check
 */
function wordMeetsCriteria(word: string, badwords: string[]) {
    return word.length > 2 && !badwords.includes(word.toLowerCase())
}

/**
 * Process descriptive statistics for an array of reviews to be
 * used to further derive insights - more efficient than allowing
 * components to invidually compute their own statistics and searches
 * 
 * @param reviews An array of review objects from Steam
 */
function processReviewsForGame(game: any, reviews: Array<any>) {
    
    const median = function(array, valueFunction) {
        if (array.length === 0) {
            return 0
        }

        array.sort((a: any, b: any) => valueFunction(a) - valueFunction(b))

        if (array.length % 2 === 0) {
          return (valueFunction(array[array.length/2]) + valueFunction(array[(array.length / 2) - 1])) / 2
        }
        else {
          return valueFunction(array[(array.length - 1) / 2])
        }
    }

    // Totals
    const totalReviews = reviews.length
    let totalReviewsPositive = 0
    let totalReviewsNegative = 0
    let totalContinuedPlayingAfterReviewTime = 0
    let totalContinuedPlayingAfterReviewTimePositive = 0
    let totalContinuedPlayingAfterReviewTimeNegative = 0
    let totalMinutesPlayedForever = 0
    let totalMinutesPlayedAtReviewTime = 0
    let totalMinutesPlayedAfterReviewTime = 0
    let totalMinutesPlayedAfterReviewTimePositive = 0
    let totalMinutesPlayedAfterReviewTimeNegative = 0
    let totalReviewsUpdated = 0
    let totalTextLength = 0
    let totalTextLengths = []

    let totalWithComments = 0
    let totalPurchasedViaSteam = 0
    let totalMarkedAsReceivedForFree = 0
    let totalWrittenDuringEarlyAccess = 0

    const totalLanguages = {}

    let continuedPlayingAfterReviewTimesPositive = []
    let continuedPlayingAfterReviewTimesNegative = []

    // Individual reviews
    let reviewMinTimestampCreated = null
    let reviewMaxTimestampCreated = null
    let reviewMinTimestampUpdated = null
    let reviewMaxTimestampUpdated = null

    let reviewMinTotalMinutesPlayedForever = null
    let reviewMaxTotalMinutesPlayedForever = null
    let reviewMinTotalMinutesPlayedAtReviewTime = null
    let reviewMaxTotalMinutesPlayedAtReviewTime = null
    
    let reviewMinCommentCount = null
    let reviewMaxCommentCount = null

    let reviewMinVotesUp = null
    let reviewMaxVotesUp = null

    let reviewMinVotesFunny = null
    let reviewMaxVotesFunny = null

    let reviewMinTextLength = null
    let reviewMaxTextLength = null

    // For visualizations
    let reviewVolumeOverTime = {} as any

    // For word cloud
    let positiveWordFrequencyMap = new Map()
    let negativeWordFrequencyMap = new Map()
    const nameWords = game.name.match(/\b(\w+)\b/g)
    let badWords
    if (nameWords !== null) {
        badWords = commonWords.concat(...nameWords).map(w => w.toLowerCase())
    } else {
        badWords = commonWords.map(w => w.toLowerCase())
    }

    const swearWords = {}

    // Perform iteration over the reviews
    for (let review of reviews) {

        if (review.language === 'english') {
            // Process review text for word frequency
            let words: string[] = review.review.match(/\b(\w+)\b/g)
            if (words !== null) {
                words = [...new Set(words)].map(w => w.toLowerCase())
            }
    
            if (words !== null) {
                for (let word of words) {

                    // Frequency
                    if (wordMeetsCriteria(word, badWords)) {
                        if (review.voted_up) {
                            if (positiveWordFrequencyMap.has(word)) {
                                positiveWordFrequencyMap.set(word, positiveWordFrequencyMap.get(word) + 1)
                            } else {
                                positiveWordFrequencyMap.set(word, 1)
                            }
                        } else {
                            if (negativeWordFrequencyMap.has(word)) {
                                negativeWordFrequencyMap.set(word, negativeWordFrequencyMap.get(word) + 1)
                            } else {
                                negativeWordFrequencyMap.set(word, 1)
                            }
                        }
                    }

                    // Swears
                    if (curseWords[word]) {
                        const likeSwear = curseWords[word]
                        if (swearWords[likeSwear]) {
                            swearWords[likeSwear] += 1
                        } else {
                            swearWords[likeSwear] = 1
                        }
                    }
                }
            }
        }

        totalTextLength += review.review.length
        totalTextLengths.push(review.review.length)

        if (totalLanguages[review.language] === undefined) {
            totalLanguages[review.language] = 1
        } else {
            totalLanguages[review.language]++
        }

        if (review.voted_up) {
            totalReviewsPositive++
        } else {
            totalReviewsNegative++
        }

        if (review.steam_purchase) {
            totalPurchasedViaSteam++
        }

        if (review.received_for_free) {
            totalMarkedAsReceivedForFree++
        }
        
        if (review.written_during_early_access) {
            totalWrittenDuringEarlyAccess++
        }

        if (review.comment_count > 0) {
            totalWithComments++
        }

        if (reviewMinCommentCount === null || review.comment_count < reviewMinCommentCount.comment_count) {
            reviewMinCommentCount = review
        }
        if (reviewMaxCommentCount === null || review.comment_count > reviewMaxCommentCount.comment_count) {
            reviewMaxCommentCount = review
        }
        
        if (reviewMinVotesUp === null || review.votes_up < reviewMinVotesUp.votes_up) {
            reviewMinVotesUp = review
        }
        if (reviewMaxVotesUp === null || review.votes_up > reviewMaxVotesUp.votes_up) {
            reviewMaxVotesUp = review
        }

        if (reviewMinVotesFunny === null || review.votes_funny < reviewMinVotesFunny.votes_funny) {
            reviewMinVotesFunny = review
        }
        if (reviewMaxVotesFunny === null || review.votes_funny > reviewMaxVotesFunny.votes_funny) {
            reviewMaxVotesFunny = review
        }

        if (reviewMinTextLength === null || review.review.length < reviewMinTextLength.review.length) {
            reviewMinTextLength = review
        }
        if (reviewMaxTextLength === null || review.review.length > reviewMaxTextLength.review.length) {
            reviewMaxTextLength = review
        }

        if (review.timestamp_updated !== review.timestamp_created) {
            totalReviewsUpdated++
            // TODO: Factor this into views
            review.was_updated = true
            if (reviewMinTimestampUpdated === null || review.timestamp_updated < reviewMinTimestampUpdated.timestamp_updated) {
                reviewMinTimestampUpdated = review
            }
            if (reviewMaxTimestampUpdated === null || review.timestamp_updated > reviewMaxTimestampUpdated.timestamp_updated) {
                reviewMaxTimestampUpdated = review
            }
        }

        if (review.author.playtime_forever > review.author.playtime_at_review) {
            // TODO: Factor this into views
            totalContinuedPlayingAfterReviewTime++
            review.continued_playing = true

            let mPlayedAfterReview = (review.author.playtime_forever - review.author.playtime_at_review)
            totalMinutesPlayedAfterReviewTime += mPlayedAfterReview

            if (review.voted_up) {
                totalContinuedPlayingAfterReviewTimePositive++
                totalMinutesPlayedAfterReviewTimePositive += mPlayedAfterReview
                continuedPlayingAfterReviewTimesPositive.push(mPlayedAfterReview)
            } else {
                totalContinuedPlayingAfterReviewTimeNegative++
                totalMinutesPlayedAfterReviewTimeNegative += mPlayedAfterReview
                continuedPlayingAfterReviewTimesNegative.push(mPlayedAfterReview)
            }
        }

        totalMinutesPlayedForever += review.author.playtime_forever        
        totalMinutesPlayedAtReviewTime += review.author.playtime_at_review     
        
        if (reviewMinTotalMinutesPlayedForever === null || review.author.playtime_forever < reviewMinTotalMinutesPlayedForever.author.playtime_forever) {
            reviewMinTotalMinutesPlayedForever = review
        }
        if (reviewMaxTotalMinutesPlayedForever === null || review.author.playtime_forever > reviewMaxTotalMinutesPlayedForever.author.playtime_forever) {
            reviewMaxTotalMinutesPlayedForever = review
        }

        if (reviewMinTotalMinutesPlayedAtReviewTime === null || review.author.playtime_at_review < reviewMinTotalMinutesPlayedAtReviewTime.author.playtime_at_review) {
            reviewMinTotalMinutesPlayedAtReviewTime = review
        }
        if (reviewMaxTotalMinutesPlayedAtReviewTime === null || review.author.playtime_at_review > reviewMaxTotalMinutesPlayedAtReviewTime.author.playtime_at_review) {
            reviewMaxTotalMinutesPlayedAtReviewTime = review
        }

        if (reviewMinTimestampCreated === null || review.timestamp_created < reviewMinTimestampCreated.timestamp_created) {
            reviewMinTimestampCreated = review
        }
        if (reviewMaxTimestampCreated === null || review.timestamp_created > reviewMaxTimestampCreated.timestamp_created) {
            reviewMaxTimestampCreated = review
        }

        var roundedCreatedTimestamp = roundDate(review.timestamp_created * 1000).getTime() / 1000

        if (reviewVolumeOverTime[roundedCreatedTimestamp] !== undefined) {
            if (review.voted_up) {
                reviewVolumeOverTime[roundedCreatedTimestamp]["Total Positive"]++
            } else {
                reviewVolumeOverTime[roundedCreatedTimestamp]["Total Negative"]--
            }
        } else {
            if (review.voted_up) {
                reviewVolumeOverTime[roundedCreatedTimestamp] = { name: dateFormat(new Date(roundedCreatedTimestamp * 1000), dateFormatString), "Total Positive": 1, "Total Negative": 0, asEpoch: roundedCreatedTimestamp }
            } else {
                reviewVolumeOverTime[roundedCreatedTimestamp] = { name: dateFormat(new Date(roundedCreatedTimestamp * 1000), dateFormatString), "Total Positive": 0, "Total Negative": -1, asEpoch: roundedCreatedTimestamp }
            }
        }
    }

    // Word frequency
    const positiveWordFrequencyList = [...positiveWordFrequencyMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)
    const negativeWordFrequencyList = [...negativeWordFrequencyMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)

    // Swear words
    const swearWordsSorted = Object.entries(swearWords).sort((a: any, b: any) => b[1] - a[1])

    // Compute remaining stats
    const averageMinutesPlaytimeAfterReviewTime = Math.floor(totalMinutesPlayedAfterReviewTime / totalReviews)
    const averageMinutesPlaytimeAfterReviewTimePositive = totalContinuedPlayingAfterReviewTimePositive === 0 ? 0 : Math.floor(totalMinutesPlayedAfterReviewTimePositive / totalContinuedPlayingAfterReviewTimePositive)
    const averageMinutesPlaytimeAfterReviewTimeNegative = totalContinuedPlayingAfterReviewTimeNegative === 0 ? 0 : Math.floor(totalMinutesPlayedAfterReviewTimeNegative / totalContinuedPlayingAfterReviewTimeNegative)
    const averageMinutesPlaytimeAtReviewTime = Math.floor(totalMinutesPlayedAtReviewTime / totalReviews)
    const averageMinutesPlaytimeForever = Math.floor(totalMinutesPlayedForever / totalReviews)
    const medianMinutesPlayedForever = Math.floor(median(reviews, (r: any) => r.author.playtime_forever))
    const medianMinutesPlayedAtReviewTime = Math.floor(median(reviews, (r: any) => r.author.playtime_at_review))
    const medianMinutesContinuedPlayingAfterPositiveReview = Math.floor(median(continuedPlayingAfterReviewTimesPositive, t => t))
    const medianMinutesContinuedPlayingAfterNegativeReview = Math.floor(median(continuedPlayingAfterReviewTimesNegative, t => t))
    const averageTextLength = Math.floor(totalTextLength / totalReviews)
    const medianTextLength = Math.floor(median(totalTextLengths, t => t))

    if (reviewMaxTimestampUpdated === null) {
        reviewMaxTimestampUpdated = reviewMaxTimestampCreated
    }

    const firstCreatedTimestamp = roundDate(reviewMinTimestampCreated.timestamp_created * 1000).getTime() / 1000

    for (let i = firstCreatedTimestamp; i < reviewMaxTimestampCreated.timestamp_created; i += 86400) {
        if (reviewVolumeOverTime[i] === undefined) {
            reviewVolumeOverTime[i] = { name: dateFormat(new Date(i * 1000), dateFormatString), "Total Positive": 0, "Total Negative": 0, asEpoch: i}
        }
    }

    reviewVolumeOverTime = Object.values(reviewVolumeOverTime).sort((a: any, b: any) => a.asEpoch - b.asEpoch)

    let totalPositiveSoFar = 0
    let totalNegativeSoFar = 0

    for (let item of reviewVolumeOverTime) {
        totalPositiveSoFar += item["Total Positive"]
        totalNegativeSoFar += Math.abs(item["Total Negative"])

        item["Review Score"] = Math.round((totalPositiveSoFar / (totalPositiveSoFar + totalNegativeSoFar)) * 100)
    }

    reviews.sort((a, b) => b.timestamp_updated - a.timestamp_updated)

    const result = {
        totalReviews: totalReviews,
        totalReviewsPositive: totalReviewsPositive,
        totalReviewsNegative: totalReviewsNegative,
        totalContinuedPlayingAfterReviewTime: totalContinuedPlayingAfterReviewTime,
        totalContinuedPlayingAfterReviewTimePositive: totalContinuedPlayingAfterReviewTimePositive,
        totalContinuedPlayingAfterReviewTimeNegative: totalContinuedPlayingAfterReviewTimeNegative,
        averageMinutesPlaytimeAfterReviewTime: averageMinutesPlaytimeAfterReviewTime,
        averageMinutesPlayedAfterReviewTimePositive: averageMinutesPlaytimeAfterReviewTimePositive,
        averageMinutesPlayedAfterReviewTimeNegative: averageMinutesPlaytimeAfterReviewTimeNegative,
        medianMinutesContinuedPlayingAfterPositiveReview: medianMinutesContinuedPlayingAfterPositiveReview,
        medianMinutesContinuedPlayingAfterNegativeReview: medianMinutesContinuedPlayingAfterNegativeReview,
        totalMinutesPlayedForever: totalMinutesPlayedForever,
        totalMinutesPlayedAtReviewTime: totalMinutesPlayedAtReviewTime,
        totalReviewsUpdated: totalReviewsUpdated,
        totalWithComments: totalWithComments,
        totalPurchasedViaSteam: totalPurchasedViaSteam,
        totalMarkedAsReceivedForFree: totalMarkedAsReceivedForFree,
        totalWrittenDuringEarlyAccess: totalWrittenDuringEarlyAccess,
        totalLanguages: totalLanguages,
        averageMinutesPlaytimeAtReviewTime: averageMinutesPlaytimeAtReviewTime,
        averageMinutesPlaytimeForever: averageMinutesPlaytimeForever,
        medianMinutesPlayedForever: medianMinutesPlayedForever,
        medianMinutesPlayedAtReviewTime: medianMinutesPlayedAtReviewTime,
        reviewMinTimestampCreated: reviewMinTimestampCreated,
        reviewMaxTimestampCreated: reviewMaxTimestampCreated,
        reviewMinTimestampUpdated: reviewMinTimestampUpdated,
        reviewMaxTimestampUpdated: reviewMaxTimestampUpdated,
        reviewMinTotalMinutesPlayedForever: reviewMinTotalMinutesPlayedForever,
        reviewMaxTotalMinutesPlayedForever: reviewMaxTotalMinutesPlayedForever,
        reviewMinTotalMinutesPlayedAtReviewTime: reviewMinTotalMinutesPlayedAtReviewTime,
        reviewMaxTotalMinutesPlayedAtReviewTime: reviewMaxTotalMinutesPlayedAtReviewTime,
        reviewMinCommentCount: reviewMinCommentCount,
        reviewMaxCommentCount: reviewMaxCommentCount,
        reviewMinVotesUp: reviewMinVotesUp,
        reviewMaxVotesUp: reviewMaxVotesUp,
        reviewMinVotesFunny: reviewMinVotesFunny,
        reviewMaxVotesFunny: reviewMaxVotesFunny,
        reviewMinTextLength: reviewMinTextLength,
        reviewMaxTextLength: reviewMaxTextLength,
        averageTextLength: averageTextLength,
        medianTextLength: medianTextLength,
        reviewVolumeOverTime: reviewVolumeOverTime,
        positiveWordFrequencyList: positiveWordFrequencyList,
        negativeWordFrequencyList: negativeWordFrequencyList,
        totalSwearWords: swearWordsSorted
    }

    return result
}

/**
 * Longest review
 * Review with highest playtime at review time
 * Review with highest playtime forever
 * Review with most comments
 * Review voted most helpful
 * Review voted most funny
 */

export default {
    processReviewsForGame: processReviewsForGame,
    sortReviews: null,
    filterReviews: null
}