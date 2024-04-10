import React, { useState } from "react"
import { Button, Col, Form, Modal } from "react-bootstrap"
import sanitize from "sanitize-filename"
import { MultiSelect } from "react-multi-select-component"
import CsvDownload from "react-csv-downloader"
import { FaDownload } from "react-icons/fa"

const Export = ({ game, reviewCount, filteredReviewCount, viewOptions, viewOptionsCallback, handleGetData }) => {

    const hiddenColumnsFormatted = viewOptions.hiddenColumns.map((v: { value: string }) => v.value)

    const computeHeaders = () => {
        const headers = [
            { displayName: 'recommendation_id', id: 'recommendationid'},
            { displayName: 'recommendation_url', id: 'recommendationurl'},
            { displayName: 'author_steam_id', id: 'author_steamid'},
            { displayName: 'author_number_games_owned', id: 'author_num_games_owned'},
            { displayName: 'author_number_reviews', id: 'author_num_reviews'},
            { displayName: 'author_minutes_playtime_last_two_weeks', id: 'author_playtime_last_two_weeks'},
            { displayName: 'author_last_played_timestamp', id: 'author_last_played'},
            { displayName: 'review', id: 'review'},
            { displayName: 'weighted_review_score', id: 'weighted_vote_score'}
        ]

        if (hiddenColumnsFormatted.indexOf('timeCreated') === -1 ) {
            headers.push({ displayName: 'created_timestamp', id: 'timestamp_created'})
        }
        if (hiddenColumnsFormatted.indexOf('timeUpdated') === -1 ) {
            headers.push({ displayName: 'updated_timestamp', id: 'timestamp_updated'})
        }
        if (hiddenColumnsFormatted.indexOf('votedUp') === -1 ) {
            headers.push({ displayName: 'voted_up', id: 'voted_up'})
        }
        if (hiddenColumnsFormatted.indexOf('language') === -1 ) {
            headers.push({ displayName: 'language', id: 'language'})
        }
        if (hiddenColumnsFormatted.indexOf('playtimeAtReview') === -1 ) {
            headers.push({ displayName: 'author_minutes_playtime_at_review_time', id: 'author_playtime_at_review'})
        }
        if (hiddenColumnsFormatted.indexOf('playtimeForever') === -1 ) {
            headers.push({ displayName: 'author_minutes_playtime_forever', id: 'author_playtime_forever'})
        }
        if (hiddenColumnsFormatted.indexOf('playtime2Weeks') === -1 ) {
            headers.push({ displayName: 'author_minutes_playtime_last_two_weeks', id: 'author_playtime_last_two_weeks'})
        }
        if (hiddenColumnsFormatted.indexOf('earlyAccess') === -1 ) {
            headers.push({ displayName: 'written_during_early_access', id: 'written_during_early_access'})
        }
        if (hiddenColumnsFormatted.indexOf('receivedForFree') === -1 ) {
            headers.push({ displayName: 'marked_as_received_for_free', id: 'received_for_free'})
        }
        if (hiddenColumnsFormatted.indexOf('authorNumReviews') === -1 ) {
            headers.push({ displayName: 'author_num_reviews', id: 'author_num_reviews'})
        }
        if (hiddenColumnsFormatted.indexOf('authorNumGames') === -1 ) {
            headers.push({ displayName: 'author_num_games', id: 'author_num_games_owned'})
        }
        if (hiddenColumnsFormatted.indexOf('steamPurchase') === -1 ) {
            headers.push({ displayName: 'steam_purchase', id: 'steam_purchase'})
        }
        if (hiddenColumnsFormatted.indexOf('votesUp') === -1 ) {
            headers.push({ displayName: 'votes_up', id: 'votes_up'})
        }
        if (hiddenColumnsFormatted.indexOf('votesFunny') === -1 ) {
            headers.push({ displayName: 'votes_funny', id: 'votes_funny'})
        }
        if (hiddenColumnsFormatted.indexOf('commentCount') === -1 ) {
            headers.push({ displayName: 'comment_count', id: 'comment_count'})
        }

        return headers
    }

    const defaultFileName = sanitize(`${game.steam_appid} ${game.name} Reviews`).replace(/[^a-z0-9]/gi, '_')

    const [showModal, setShowModal] = useState(false)
    const [fileName, setFileName] = useState(defaultFileName)
    const [selectionAll, setSelectionAll] = useState(true)
    const [selectionFiltered, setSelectionFiltered] = useState(false)
    const [selectedData, setSelectedData] = useState('reviews')
    const [isLoading, setIsLoading] = useState(false)

    const columns = computeHeaders()

    const getData = () => {
        if (isLoading) {
            return
        }
        
        setIsLoading(true)

        return handleGetData(selectedData).then(data => {
            setIsLoading(false)
            return data
        })
    }

    const updateViewOption = ({ label, value }) => {

        let newViewOptions = { ...viewOptions, [label]: value}

        viewOptionsCallback(newViewOptions)
    }

    let countToUse = selectedData === 'reviews' ? reviewCount : filteredReviewCount

    return (<>
        <div className="d-grid">
            <Button className="mt-3 mb-3" disabled={reviewCount === 0} onClick={() => setShowModal(true)}><FaDownload/> Export</Button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Export Reviews
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Filename</Form.Label>
                <Form.Control type="text" placeholder={defaultFileName} value={fileName} onChange={(e: any) => { setFileName(e.target.value) }}/><br/>
                <Form.Label>Selection</Form.Label><br/>
                <Form.Check inline label="All" type="radio" checked={selectionAll} onChange={(e: any) => { setSelectionAll(e.target.checked); setSelectionFiltered(!e.target.checked); setSelectedData('reviews') }}/>
                <Form.Check inline label="Filtered" type="radio" checked={selectionFiltered} onChange={(e: any) => { setSelectionFiltered(e.target.checked); setSelectionAll(!e.target.checked); setSelectedData('filteredReviews') }}/>
                <p>{countToUse.toLocaleString()} review{countToUse !== 1 ? 's' : ''} will be exported</p>
                <Form.Label>Exclude Columns ({hiddenColumnsFormatted.length.toLocaleString()} excluded)</Form.Label>
                <MultiSelect
                    options={[
                        {
                            label: 'Time created',
                            value: 'timeCreated'
                        },
                        {
                            label: 'Time updated',
                            value: 'timeUpdated'
                        },
                        {
                            label: 'Voted',
                            value: 'votedUp'
                        },
                        {
                            label: 'Language',
                            value: 'language'
                        },
                        {
                            label: 'Playtime at review time',
                            value: 'playtimeAtReview'
                        },
                        {
                            label: 'Playtime forever',
                            value: 'playtimeForever'
                        },
                        {
                            label: 'Playtime last two weeks',
                            value: 'playtime2Weeks'
                        },
                        {
                            label: 'Written during early access',
                            value: 'earlyAccess'
                        },
                        {
                            label: 'Marked as received for free',
                            value: 'receivedForFree'
                        },
                        {
                            label: 'Author total reviews',
                            value: 'authorNumReviews'
                        },
                        {
                            label: 'Author total games owned',
                            value: 'authorNumGames'
                        },
                        {
                            label: 'Author continued playing',
                            value: 'authorContinuedPlaying'
                        },
                        {
                            label: 'Author last played',
                            value: 'authorLastPlayed'
                        },
                        {
                            label: 'Purchased via Steam',
                            value: 'steamPurchase'
                        },
                        {
                            label: 'Votes Helpful',
                            value: 'votesUp'
                        },
                        {
                            label: 'Votes funny',
                            value: 'votesFunny'
                        },
                        {
                            label: 'Comment count',
                            value: 'commentCount'
                        }
                    ]}
                    labelledBy="Select"
                    value={viewOptions.hiddenColumns}
                    onChange={(e: any) => { updateViewOption({ label: 'hiddenColumns', value: e })}}
                    />
            </Modal.Body>
            <Modal.Footer>
                <Col>
                    <div className="d-grid">
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div className="d-grid">
                        <CsvDownload className="d-grid" columns={columns} datas={getData} filename={fileName} wrapColumnChar={'"'}>
                            <Button variant="primary">
                                {isLoading ? 'Loading...' : 'Save'}
                            </Button>
                        </CsvDownload>
                    </div>
                </Col>
            </Modal.Footer>
      </Modal>
    </>)
}

export default Export