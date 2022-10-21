import React, { useState } from "react"
import { Button, Col, Form, Modal } from "react-bootstrap"
import { CSVLink } from "react-csv"
import sanitize from "sanitize-filename"
import { MultiSelect } from "react-multi-select-component"

const Export = ({ game, reviews, filteredReviews, viewOptions, viewOptionsCallback }) => {

    const hiddenColumnsFormatted = viewOptions.hiddenColumns.map((v: { value: string }) => v.value)

    const computeHeaders = () => {
        const headers = [
            { label: 'recommendation_id', key: 'recommendationid'},
            { label: 'recommendation_url', key: 'recommendationurl'},
            { label: 'author_steam_id', key: 'author.steamid'},
            { label: 'author_number_games_owned', key: 'author.num_games_owned'},
            { label: 'author_number_reviews', key: 'author.num_reviews'},
            { label: 'author_minutes_playtime_last_two_weeks', key: 'author.playtime_last_two_weeks'},
            { label: 'author_last_played_timestamp', key: 'author.last_played'},
            { label: 'review', key: 'review'},
            { label: 'weighted_review_score', key: 'weighted_vote_score'}
        ]

        if (hiddenColumnsFormatted.indexOf('timeCreated') === -1 ) {
            headers.push({ label: 'created_timestamp', key: 'timestamp_created'})
        }
        if (hiddenColumnsFormatted.indexOf('timeUpdated') === -1 ) {
            headers.push({ label: 'updated_timestamp', key: 'timestamp_updated'})
        }
        if (hiddenColumnsFormatted.indexOf('votedUp') === -1 ) {
            headers.push({ label: 'voted_up', key: 'voted_up'})
        }
        if (hiddenColumnsFormatted.indexOf('language') === -1 ) {
            headers.push({ label: 'language', key: 'language'})
        }
        if (hiddenColumnsFormatted.indexOf('playtimeAtReview') === -1 ) {
            headers.push({ label: 'author_minutes_playtime_at_review_time', key: 'author.playtime_at_review'})
        }
        if (hiddenColumnsFormatted.indexOf('playtimeForever') === -1 ) {
            headers.push({ label: 'author_minutes_playtime_forever', key: 'author.playtime_forever'})
        }
        if (hiddenColumnsFormatted.indexOf('earlyAccess') === -1 ) {
            headers.push({ label: 'written_during_early_access', key: 'written_during_early_access'})
        }
        if (hiddenColumnsFormatted.indexOf('receivedForFree') === -1 ) {
            headers.push({ label: 'marked_as_received_for_free', key: 'received_for_free'})
        }
        if (hiddenColumnsFormatted.indexOf('steamPurchase') === -1 ) {
            headers.push({ label: 'steam_purchase', key: 'steam_purchase'})
        }
        if (hiddenColumnsFormatted.indexOf('votesUp') === -1 ) {
            headers.push({ label: 'votes_up', key: 'votes_up'})
        }
        if (hiddenColumnsFormatted.indexOf('votesFunny') === -1 ) {
            headers.push({ label: 'votes_funny', key: 'votes_funny'})
        }
        if (hiddenColumnsFormatted.indexOf('commentCount') === -1 ) {
            headers.push({ label: 'comment_count', key: 'comment_count'})
        }

        return headers
    }

    const defaultFileName = sanitize(`${game.steam_appid} ${game.name} Reviews`).replace(/[^a-z0-9]/gi, '_')

    const [showModal, setShowModal] = useState(false)
    const [fileName, setFileName] = useState(defaultFileName)
    const [selectionAll, setSelectionAll] = useState(true)
    const [selectionFiltered, setSelectionFiltered] = useState(false)
    const [selectedData, setSelectedData] = useState(reviews)

    let ref

    const report = {
        className: 'hidden',
        target: '_blank',
        headers: computeHeaders()
    }

    const handleSave = () => {
        // Sanitize the review text
        // ...
        
        ref.link.click()
        setShowModal(false)
    }

    const updateViewOption = ({ label, value }) => {

        let newViewOptions = { ...viewOptions, [label]: value}

        viewOptionsCallback(newViewOptions)
    }

    return (<>
        <CSVLink {...report} data={selectedData} filename={fileName} ref={(r) => ref = r}/>
        <div className="d-grid">
            <Button className="mt-3 mb-3" disabled={reviews.length === 0} onClick={() => setShowModal(true)}>Export</Button>
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
                <Form.Check inline label="All" type="radio" checked={selectionAll} onChange={(e: any) => { setSelectionAll(e.target.checked); setSelectionFiltered(!e.target.checked); setSelectedData(reviews) }}/>
                <Form.Check inline label="Filtered" type="radio" checked={selectionFiltered} onChange={(e: any) => { setSelectionFiltered(e.target.checked); setSelectionAll(!e.target.checked); setSelectedData(filteredReviews) }}/>
                <p>{selectedData.length} review{selectedData.length !== 1 ? 's' : ''} will be exported</p>
                <Form.Label>Exclude Columns ({hiddenColumnsFormatted.length} excluded)</Form.Label>
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
                            label: 'Written during early access',
                            value: 'earlyAccess'
                        },
                        {
                            label: 'Marked as received for free',
                            value: 'receivedForFree'
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
                        <Button variant="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </Col>
            </Modal.Footer>
      </Modal>
    </>)
}

export default Export