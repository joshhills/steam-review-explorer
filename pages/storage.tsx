import StorageCardDeck from "components/StorageCardDeck";
import DBUtils from "lib/utils/DBUtils";
import SteamWebApiClient from "lib/utils/SteamWebApiClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Container, ProgressBar, Row, Spinner } from "react-bootstrap";

// 10GB
const CONSERVATIVE_QUOTA = 10737418240

export default function Storage() {

    const [quota, setQuota] = useState(null)
    const [reviewCounts, setReviewCounts] = useState({})
    const [games, setGames] = useState({})
    const [loading, setLoading] = useState(true)
    const [searches, setSearches] = useState({})

    const updateData = () => {
        setLoading(true)

        let promises = []
        
        promises.push(DBUtils.getStorageQuota().then(quota => {
            if (CONSERVATIVE_QUOTA < quota.quota) {
                quota.quota = CONSERVATIVE_QUOTA
            } else {
                quota.quota /= 2
            }
            
            setQuota(quota)
        }))

        promises.push(DBUtils.listReviewsInDatabase().then(reviewCounts => {
            setReviewCounts(reviewCounts)

            let gameRequests = []
            let searchRequests = []
            for (let appid of Object.keys(reviewCounts)) {
                gameRequests.push(SteamWebApiClient.getGame(appid))
                searchRequests.push(DBUtils.getSearch(appid))
            }
            let gamePromise = Promise.all(gameRequests).then(games => {
                let _games = {}
                for (let game of games) {
                    _games[game.steam_appid] = game
                }
                setGames(_games)
            })
            let searchPromise = Promise.all(searchRequests).then((searches) => {
                let _searches = {}
                for (let search of searches) {
                    _searches[search.appid] = search
                }
                setSearches(_searches)
            })

            return Promise.all([gamePromise, searchPromise])
        }))

        Promise.all(promises).then(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        updateData()
    }, [])

    let quotaPercent = null
    if (quota) {
        quotaPercent = Math.round((quota.usage / quota.quota) * 100)
    }

    const handleDelete = async (appid) => {
        await DBUtils.deleteGame(appid)

        delete games[appid]
        delete reviewCounts[appid]

        updateData()
    }

    const handleDeleteAll = async () => {
        
        let deleteRequests = []
        for (let game of Object.keys(games)) {
            deleteRequests.push(DBUtils.deleteGame(game))
        }

        return Promise.all(deleteRequests).then(() => {
            setGames({})
            setReviewCounts({})
            setSearches({})
            updateData()
        })
    }

    let progressBarVariant = 'info'
    if (quotaPercent >= 60) {
        progressBarVariant = 'warning'
    }
    if (quotaPercent >= 80) {
        progressBarVariant = 'danger'
    }

    return (<>
        <div className="bg-light rounded-3 p-3 mb-4">
            <Breadcrumb className="mb-0">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <Breadcrumb.Item active>Storage</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        {!loading && quotaPercent !== null && <>
            <ProgressBar
                className="mb-3"
                variant={progressBarVariant}
                now={quotaPercent}/>
            <p className={`text-center text-${progressBarVariant}`}>{quotaPercent}% estimated available site storage space used{quotaPercent >= 80 && ', consider deleting some games'}{quotaPercent >= 95 && ', site may fail to function properly otherwise'}</p>
            {Object.keys(games).length > 0 && <div className="text-center mb-3"><Button onClick={handleDeleteAll}>Delete All</Button></div>}
        </>}
        {loading && <Row>
            <Spinner className="mx-auto mt-2" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Row>}
        {!loading && Object.keys(games).length === 0 && <p className="text-center text-muted">Scraped games will appear here</p>}
        {!loading && Object.keys(games).length > 0 && <Container><Container><StorageCardDeck games={games} searches={searches} quotaPercent={quotaPercent} reviewCounts={reviewCounts} handleDelete={handleDelete} /></Container></Container>}
    </>)
}