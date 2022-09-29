import React, { useState } from "react"
import { Badge, Button, Form, Modal } from "react-bootstrap"
import { CSVLink } from "react-csv"
import sanitize from "sanitize-filename"

const Export = ({ game, reviews, filteredReviews, viewOptions, viewOptionsCallback }) => {

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

        if (viewOptions.hiddenColumns.indexOf('timeCreated') === -1 ) {
            headers.push({ label: 'created_timestamp', key: 'timestamp_created'})
        }
        if (viewOptions.hiddenColumns.indexOf('timeUpdated') === -1 ) {
            headers.push({ label: 'updated_timestamp', key: 'timestamp_updated'})
        }
        if (viewOptions.hiddenColumns.indexOf('votedUp') === -1 ) {
            headers.push({ label: 'voted_up', key: 'voted_up'})
        }
        if (viewOptions.hiddenColumns.indexOf('language') === -1 ) {
            headers.push({ label: 'language', key: 'language'})
        }
        if (viewOptions.hiddenColumns.indexOf('playtimeAtReview') === -1 ) {
            headers.push({ label: 'author_minutes_playtime_at_review_time', key: 'author.playtime_at_review'})
        }
        if (viewOptions.hiddenColumns.indexOf('playtimeForever') === -1 ) {
            headers.push({ label: 'author_minutes_playtime_forever', key: 'author.playtime_forever'})
        }
        if (viewOptions.hiddenColumns.indexOf('earlyAccess') === -1 ) {
            headers.push({ label: 'written_during_early_access', key: 'written_during_early_access'})
        }
        if (viewOptions.hiddenColumns.indexOf('receivedForFree') === -1 ) {
            headers.push({ label: 'marked_as_received_for_free', key: 'received_for_free'})
        }
        if (viewOptions.hiddenColumns.indexOf('steamPurchase') === -1 ) {
            headers.push({ label: 'steam_purchase', key: 'steam_purchase'})
        }
        if (viewOptions.hiddenColumns.indexOf('votesUp') === -1 ) {
            headers.push({ label: 'voted_up', key: 'voted_up'})
        }
        if (viewOptions.hiddenColumns.indexOf('votesFunny') === -1 ) {
            headers.push({ label: 'votes_funny', key: 'votes_funny'})
        }
        if (viewOptions.hiddenColumns.indexOf('commentCount') === -1 ) {
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
        <Button className="mt-3 mb-3" disabled={reviews.length === 0} block onClick={() => setShowModal(true)}>Export</Button>

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
                <Form.Label>Exclude Columns ({viewOptions.hiddenColumns.indexOf('none') === -1  ? viewOptions.hiddenColumns.length : viewOptions.hiddenColumns.length - 1} excluded)</Form.Label>
                <Form.Control as="select" value={viewOptions.hiddenColumns} multiple onChange={(e: any) => updateViewOption({ label: 'hiddenColumns', value: Array.from(e.target.selectedOptions, (option: any) => option.value)})}>
                    <option value="none">---</option>
                    <option value="timeCreated">Time created</option>
                    <option value="timeUpdated">Time updated</option>
                    <option value="votedUp">Voted</option>
                    <option value="language">Language</option>
                    <option value="playtimeAtReview">Playtime at review time</option>
                    <option value="playtimeForever">Playtime forever</option>
                    <option value="earlyAccess">Written during early access</option>
                    <option value="receivedForFree">Marked as received for free</option>
                    <option value="steamPurchase">Purchased via Steam</option>
                    <option value="votesUp">Votes Helpful</option>
                    <option value="votesFunny">Votes funny</option>
                    <option value="commentCount">Comment count</option>
                </Form.Control>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
      </Modal>
    </>)
}

export default Export