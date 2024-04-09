import StorageCardDeck from "components/StorageCardDeck";
import DBUtils from "lib/utils/DBUtils";
import SteamWebApiClient from "lib/utils/SteamWebApiClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Container, ProgressBar, Row, Spinner } from "react-bootstrap";

export default function Storage() {

    const [quota, setQuota] = useState(null)
    const [reviewCounts, setReviewCounts] = useState({})
    const [games, setGames] = useState({})
    const [loading, setLoading] = useState(true)

    const updateData = () => {
        setLoading(true)

        let promises = []
        
        promises.push(DBUtils.getStorageQuota().then(setQuota))

        promises.push(DBUtils.listReviewsInDatabase().then(reviewCounts => {
            setReviewCounts(reviewCounts)

            let gameRequests = []
            for (let appid of Object.keys(reviewCounts)) {
                gameRequests.push(SteamWebApiClient.getGame(appid))
            }
            return Promise.all(gameRequests).then(games => {
                let _games = {}
                for (let game of games) {
                    _games[game.steam_appid] = game
                }
                setGames(_games)
            })
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
            <p className={`text-center text-${progressBarVariant}`}>{quotaPercent}% available site storage space used{quotaPercent >= 80 && ', consider deleting some games'}{quotaPercent >= 95 && ', site may fail to function properly otherwise'}</p>
        </>}
        {loading && <Row>
            <Spinner className="mx-auto mt-2" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Row>}
        {!loading && <Container><Container><StorageCardDeck games={games} quotaPercent={quotaPercent} reviewCounts={reviewCounts} handleDelete={handleDelete} /></Container></Container>}
    </>)
}