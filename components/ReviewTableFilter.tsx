import React, { useEffect, useState } from "react"
import { Accordion, Badge, Button, Col, Form, Row } from "react-bootstrap"
import Slider, { Handle, SliderTooltip } from "rc-slider"
import "rc-slider/assets/index.css"
import DateRangePicker from "react-bootstrap-daterangepicker"
import "bootstrap-daterangepicker/daterangepicker.css"
import supportedLocales from "lib/utils/SteamLocales"
import { MultiSelect } from "react-multi-select-component"

const { Range } = Slider

const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <SliderTooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}>
            <Handle value={value} {...restProps} />
        </SliderTooltip>
    )
}

const ReviewTableFilter = ({ filteredReviewCount, filters, viewOptions, viewOptionsCallback, updateFiltersCallback, applyFiltersCallback, cancelStagedFilterChangesCallback, reviewStatistics, cachedFilters, dirty, zeroed, resetFiltersCallback }) => {

    const [searchTerm, setSearchTerm] = useState(filters.searchTerm)
    const [timePlayedAtReviewTime, setTimePlayedAtReviewTime] = useState(filters.timePlayedAtReviewTime)
    const [timePlayedForever, setTimePlayedForever] = useState(filters.timePlayedForever)
    const [timePlayedLastTwoWeeks, setTimePlayedLastTwoWeeks] = useState(filters.timePlayedLastTwoWeeks)
    const [textLength, setTextLength] = useState(filters.textLength)
    const [votesHelpful, setVotesHelpful] = useState(filters.votesHelpful)
    const [votesFunny, setVotesFunny] = useState(filters.votesFunny)
    const [authorNumReviews, setAuthorNumReviews] = useState(filters.authorNumReviews)
    const [authorNumGames, setAuthorNumGames] = useState(filters.authorNumGames)
    const [commentCount, setCommentCount] = useState(filters.commentCount)

    const languages = Object.keys(reviewStatistics.totalLanguages).sort((a:any, b:any) => supportedLocales[a].englishName<supportedLocales[b].englishName?-1:1)

    const minReviewTextLength = reviewStatistics.reviewMinTextLength.review.length
    const maxReviewTextLength = reviewStatistics.reviewMaxTextLength.review.length

    const minAuthorNumReviews = reviewStatistics.reviewMinAuthorNumReviews.author_num_reviews
    const maxAuthorNumReviews = reviewStatistics.reviewMaxAuthorNumReviews.author_num_reviews

    const minAuthorNumGames = reviewStatistics.reviewMinAuthorNumGames.author_num_games_owned
    const maxAuthorNumGames = reviewStatistics.reviewMaxAuthorNumGames.author_num_games_owned

    const minCommentCount = reviewStatistics.reviewMinCommentCount.comment_count
    const maxCommentCount = reviewStatistics.reviewMaxCommentCount.comment_count

    const minVotesHelpful = reviewStatistics.reviewMinVotesUp.votes_up
    const maxVotesHelpful = reviewStatistics.reviewMaxVotesUp.votes_up

    const minVotesFunny = reviewStatistics.reviewMinVotesFunny.votes_funny
    const maxVotesFunny = reviewStatistics.reviewMaxVotesFunny.votes_funny

    const minTimeCreated = new Date(reviewStatistics.reviewMinTimestampCreated.timestamp_created * 1000)
    const maxTimeCreated = new Date(reviewStatistics.reviewMaxTimestampCreated.timestamp_created * 1000)

    const minHoursPlayedForever = Math.floor(reviewStatistics.reviewMinTotalMinutesPlayedForever.author_playtime_forever / 60)
    const maxHoursPlayedForever = Math.ceil(reviewStatistics.reviewMaxTotalMinutesPlayedForever.author_playtime_forever / 60)
    
    const minHoursPlayedLastTwoWeeks = Math.floor(reviewStatistics.reviewMinTotalMinutesPlayedLastTwoWeeks.author_playtime_last_two_weeks / 60)
    const maxHoursPlayedLastTwoWeeks = Math.ceil(reviewStatistics.reviewMaxTotalMinutesPlayedLastTwoWeeks.author_playtime_last_two_weeks / 60)

    const minHoursPlayedAtReviewTime = Math.floor(reviewStatistics.reviewMinTotalMinutesPlayedAtReviewTime.author_playtime_at_review / 60)
    const maxHoursPlayedAtReviewTime = Math.ceil(reviewStatistics.reviewMaxTotalMinutesPlayedAtReviewTime.author_playtime_at_review / 60)

    const updateFilterField = ({ label, value }) => {

        let newFilters = { ...filters, [label]: value}

        updateFiltersCallback(newFilters, [label])
    }

    const updateViewOption = ({ label, value }) => {

        let newViewOptions = { ...viewOptions, [label]: value}

        viewOptionsCallback(newViewOptions)
    }

    const applyFilters = () => {
        
        applyFiltersCallback()
    }

    const cancelStagedFilterChanges = () => {
        cancelStagedFilterChangesCallback()

        setTimePlayedAtReviewTime(cachedFilters.timePlayedAtReviewTime)
        setTimePlayedForever(cachedFilters.timePlayedForever)
        setTimePlayedLastTwoWeeks(cachedFilters.timePlayedLastTwoWeeks)
        setTextLength(cachedFilters.textLength)
        setVotesHelpful(cachedFilters.votesHelpful)
        setVotesFunny(cachedFilters.votesFunny)
        setAuthorNumReviews(cachedFilters.authorNumReviews)
        setAuthorNumGames(cachedFilters.authorNumGames)
        setCommentCount(cachedFilters.commentCount)
    }

    const resetFilters = () => {
        resetFiltersCallback()

        setTimePlayedAtReviewTime([minHoursPlayedAtReviewTime, maxHoursPlayedAtReviewTime])
        setTimePlayedForever([minHoursPlayedForever, maxHoursPlayedForever])
        setTimePlayedLastTwoWeeks([minHoursPlayedLastTwoWeeks, maxHoursPlayedLastTwoWeeks])
        setTextLength([minReviewTextLength, maxReviewTextLength])
        setVotesHelpful([minVotesHelpful, maxVotesHelpful])
        setVotesFunny([minVotesFunny, maxVotesFunny])
        setAuthorNumReviews([minAuthorNumReviews, maxAuthorNumReviews])
        setAuthorNumGames([minAuthorNumGames, maxAuthorNumGames])
        setCommentCount([minCommentCount, maxCommentCount])
    }

    useEffect(() => {
        if (!dirty) {
            setSearchTerm(filters.searchTerm)
        }
    }, [filters.searchTerm])
    
    const timeCreatedRef = React.createRef<DateRangePicker>()

    useEffect(() => {
        if (!dirty && timeCreatedRef.current) {
            timeCreatedRef.current.setStartDate(filters.timeCreated[0])
            timeCreatedRef.current.setEndDate(filters.timeCreated[1])
        }
    }, [filters.timeCreated])

    return (
        <Accordion className="mt-4" alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    Search Filters ({filteredReviewCount.toLocaleString()} review{filteredReviewCount !== 1 && 's'} matching) {dirty ? '*' : ''}
                </Accordion.Header>
                <Accordion.Body>
                    <Form.Label>Text Search</Form.Label><br/>
                    <Form.Control className="mt-1" type="text" placeholder="Use words or a single review ID" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); updateFilterField({ label: 'searchTerm', value: e.target.value.trim()})}}/>    
                    
                    <div className="mt-3 binary">
                        <Form.Check inline label="Exact" type="radio" id="exactSearchTermExact" name="exactSearchTerm" checked={filters.exactSearchTerm === 'exact'} onChange={(e: any) => updateFilterField({ label: 'exactSearchTerm', value: 'exact'})}/>
                        <Form.Check inline label="Exact (Ignore Case)" type="radio" id="exactSearchTermIgnoreCase" name="exactSearchTerm" checked={filters.exactSearchTerm === 'exactIgnoreCase'} onChange={(e: any) => updateFilterField({ label: 'exactSearchTerm', value: 'exactIgnoreCase'})}/>
                        <Form.Check inline label="Partial (Ignore Case)" type="radio" id="exactSearchTermPartialIgnoreCase" name="exactSearchTerm" checked={filters.exactSearchTerm === 'partialIgnoreCase'} onChange={(e: any) => updateFilterField({ label: 'exactSearchTerm', value: 'partialIgnoreCase'})}/>
                    </div>

                    <Form.Group className="mt-3">
                        <Form.Label>Time created</Form.Label><br/>
                        <DateRangePicker ref={timeCreatedRef} onCancel={() => {updateFilterField({ label: 'timeCreated', value: [minTimeCreated, maxTimeCreated] })}} onCallback={(start: any, end: any) => { updateFilterField({ label: 'timeCreated', value: [start.toDate(), end.toDate()] }) }} initialSettings={{ minDate: minTimeCreated, maxDate: maxTimeCreated, startDate: filters.timeCreated ? filters.timeCreated[0] : minTimeCreated, endDate: filters.timeCreated ? filters.timeCreated[1] : maxTimeCreated, timePicker: true, locale: { cancelLabel: 'Clear', applyLabel: 'Save' } }}>
                            <Form.Control type="text"/>
                        </DateRangePicker>
                    </Form.Group>

                    <Form.Label className="mt-3">Languages ({filters.languages.length} selected)</Form.Label>

                    <MultiSelect
                        options={languages.map((language: string) => { return { label: supportedLocales[language].englishName, value: language } })}
                        labelledBy="Select"
                        value={filters.languages}
                        onChange={(e: any) => { updateFilterField({ label: 'languages', value: e })}}
                        />

                    <Row>
                        <Form.Group as={Col}>
                            <div className="mt-3 binary">
                                <Form.Label>Voted</Form.Label><br/>
                                <Form.Check inline label="Positive" type="checkbox" checked={filters.votedUpPositive} onChange={(e: any) => updateFilterField({ label: 'votedUpPositive', value: e.target.checked})}/>
                                <Form.Check inline label="Negative" type="checkbox" checked={filters.votedUpNegative} onChange={(e: any) => updateFilterField({ label: 'votedUpNegative', value: e.target.checked})}/>
                            </div>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <div className="mt-3 binary">
                                <Form.Label>Written during early access</Form.Label><br/>
                                <Form.Check inline label="Yes" type="checkbox" checked={filters.earlyAccessYes} onChange={(e: any) => updateFilterField({ label: 'earlyAccessYes', value: e.target.checked})}/>
                                <Form.Check inline label="No" type="checkbox" checked={filters.earlyAccessNo} onChange={(e: any) => updateFilterField({ label: 'earlyAccessNo', value: e.target.checked})}/>
                            </div>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <div className="mt-3 binary">
                                <Form.Label>Marked as received for free</Form.Label><br/>
                                <Form.Check inline label="Yes" type="checkbox" checked={filters.receivedForFreeYes} onChange={(e: any) => updateFilterField({ label: 'receivedForFreeYes', value: e.target.checked})}/>
                                <Form.Check inline label="No" type="checkbox" checked={filters.receivedForFreeNo} onChange={(e: any) => updateFilterField({ label: 'receivedForFreeNo', value: e.target.checked})}/>
                            </div>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <div className="mt-3 binary">
                                <Form.Label>Purchased via Steam</Form.Label><br/>
                                <Form.Check inline label="Yes" type="checkbox" checked={filters.steamPurchaseYes} onChange={(e: any) => updateFilterField({ label: 'steamPurchaseYes', value: e.target.checked})}/>
                                <Form.Check inline label="No" type="checkbox" checked={filters.steamPurchaseNo} onChange={(e: any) => updateFilterField({ label: 'steamPurchaseNo', value: e.target.checked})}/>
                            </div>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <div className="mt-3 binary">
                                <Form.Label>Likely ASCII art <Badge bg="info">Experimental</Badge></Form.Label><br/>
                                <Form.Check inline label="Yes" type="checkbox" checked={filters.containsASCIIArtYes} onChange={(e: any) => updateFilterField({ label: 'containsASCIIArtYes', value: e.target.checked})}/>
                                <Form.Check inline label="No" type="checkbox" checked={filters.containsASCIIArtNo} onChange={(e: any) => updateFilterField({ label: 'containsASCIIArtNo', value: e.target.checked})}/>
                            </div>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <div className="mt-3 binary">
                                <Form.Label>Contains URL</Form.Label><br/>
                                <Form.Check inline label="Yes" type="checkbox" checked={filters.containsUrlYes} onChange={(e: any) => updateFilterField({ label: 'containsUrlYes', value: e.target.checked})}/>
                                <Form.Check inline label="No" type="checkbox" checked={filters.containsUrlNo} onChange={(e: any) => updateFilterField({ label: 'containsUrlNo', value: e.target.checked})}/>
                            </div>
                        </Form.Group>
                    </Row>

                    <Form.Label className="mt-3">Time played at review time ({filters.timePlayedAtReviewTime ? filters.timePlayedAtReviewTime[0].toLocaleString() : minHoursPlayedAtReviewTime.toLocaleString()} - {filters.timePlayedAtReviewTime ? filters.timePlayedAtReviewTime[1].toLocaleString() : maxHoursPlayedAtReviewTime.toLocaleString()} hrs)</Form.Label>
                    <Form.Group className="ms-2 me-2">
                        <Range allowCross={false} value={timePlayedAtReviewTime ? timePlayedAtReviewTime : [minHoursPlayedAtReviewTime, maxHoursPlayedAtReviewTime]} min={minHoursPlayedAtReviewTime} max={maxHoursPlayedAtReviewTime} defaultValue={[minHoursPlayedAtReviewTime, maxHoursPlayedAtReviewTime]} onChange={(value: any) => setTimePlayedAtReviewTime(value)} onAfterChange={(value: any) => updateFilterField({ label: 'timePlayedAtReviewTime', value: value })}/>
                    </Form.Group>

                    <Form.Label>Time played forever ({filters.timePlayedForever ? filters.timePlayedForever[0].toLocaleString() : minHoursPlayedForever.toLocaleString()} - {filters.timePlayedForever ? filters.timePlayedForever[1].toLocaleString() : maxHoursPlayedForever.toLocaleString()} hrs)</Form.Label>
                    <Form.Group className="ms-2 me-2">
                        <Range allowCross={false} handle={handle} value={timePlayedForever ? timePlayedForever : [minHoursPlayedForever, maxHoursPlayedForever]} min={minHoursPlayedForever} max={maxHoursPlayedForever} defaultValue={[minHoursPlayedForever, maxHoursPlayedForever]} onChange={(value: any) => setTimePlayedForever(value)} onAfterChange={(value: any) => updateFilterField({ label: 'timePlayedForever', value: value })}/>
                    </Form.Group>

                    <Form.Label>Time played last two weeks ({filters.timePlayedLastTwoWeeks ? filters.timePlayedLastTwoWeeks[0].toLocaleString() : minHoursPlayedLastTwoWeeks.toLocaleString()} - {filters.timePlayedLastTwoWeeks ? filters.timePlayedLastTwoWeeks[1].toLocaleString() : maxHoursPlayedLastTwoWeeks.toLocaleString()} hrs)</Form.Label>
                    <Form.Group className="ms-2 me-2">
                        <Range allowCross={false} handle={handle} value={timePlayedLastTwoWeeks ? timePlayedLastTwoWeeks : [minHoursPlayedLastTwoWeeks, maxHoursPlayedLastTwoWeeks]} min={minHoursPlayedLastTwoWeeks} max={maxHoursPlayedLastTwoWeeks} defaultValue={[minHoursPlayedLastTwoWeeks, maxHoursPlayedLastTwoWeeks]} onChange={(value: any) => setTimePlayedLastTwoWeeks(value)} onAfterChange={(value: any) => updateFilterField({ label: 'timePlayedLastTwoWeeks', value: value })}/>
                    </Form.Group>

                    <Form.Label>Text length ({filters.textLength ? filters.textLength[0].toLocaleString() : minReviewTextLength.toLocaleString()} - {filters.textLength ? filters.textLength[1].toLocaleString() : maxReviewTextLength.toLocaleString()} characters)</Form.Label>
                    <Form.Group className="ms-2 me-2">
                        <Range allowCross={false} handle={handle} value={textLength ? textLength : [minReviewTextLength, maxReviewTextLength]} min={minReviewTextLength} max={maxReviewTextLength} defaultValue={[minReviewTextLength, maxReviewTextLength]} onChange={(value: any) => setTextLength(value)} onAfterChange={(value: any) => updateFilterField({ label: 'textLength', value: value })}/>
                    </Form.Group>

                    <Form.Label>Author total reviews ({filters.authorNumReviews ? filters.authorNumReviews[0].toLocaleString() : minAuthorNumReviews.toLocaleString()} - {filters.authorNumReviews ? filters.authorNumReviews[1].toLocaleString() : maxAuthorNumReviews.toLocaleString()} reviews)</Form.Label>
                    <Form.Group className="ms-2 me-2">
                        <Range allowCross={false} handle={handle} value={authorNumReviews ? authorNumReviews : [minAuthorNumReviews, maxAuthorNumReviews]} min={minAuthorNumReviews} max={maxAuthorNumReviews} defaultValue={[minAuthorNumReviews, maxAuthorNumReviews]} onChange={(value: any) => setAuthorNumReviews(value)} onAfterChange={(value: any) => updateFilterField({ label: 'authorNumReviews', value: value })}/>
                    </Form.Group>

                    <Form.Label>Author total games owned ({filters.authorNumGames ? filters.authorNumGames[0].toLocaleString() : minAuthorNumGames.toLocaleString()} - {filters.authorNumGames ? filters.authorNumGames[1].toLocaleString() : maxAuthorNumGames.toLocaleString()} games)</Form.Label>
                    <Form.Group className="ms-2 me-2">
                        <Range allowCross={false} handle={handle} value={authorNumGames ? authorNumGames : [minAuthorNumGames, maxAuthorNumGames]} min={minAuthorNumGames} max={maxAuthorNumGames} defaultValue={[minAuthorNumGames, maxAuthorNumGames]} onChange={(value: any) => setAuthorNumGames(value)} onAfterChange={(value: any) => updateFilterField({ label: 'authorNumGames', value: value })}/>
                    </Form.Group>

                    <Form.Label>Votes helpful ({filters.votesHelpful ? filters.votesHelpful[0].toLocaleString() : minVotesHelpful.toLocaleString()} - {filters.votesHelpful ? filters.votesHelpful[1].toLocaleString() : maxVotesHelpful.toLocaleString()} votes)</Form.Label>
                    <Form.Group className="ms-2 me-2">
                        <Range allowCross={false} handle={handle} value={votesHelpful ? votesHelpful : [minVotesHelpful, maxVotesHelpful]} min={minVotesHelpful} max={maxVotesHelpful} defaultValue={[minVotesHelpful, maxVotesHelpful]} onChange={(value: any) => setVotesHelpful(value)} onAfterChange={(value: any) => updateFilterField({ label: 'votesHelpful', value: value })}/>
                    </Form.Group>

                    <Form.Label>Votes funny ({filters.votesFunny ? filters.votesFunny[0].toLocaleString() : minVotesFunny.toLocaleString()} - {filters.votesFunny ? filters.votesFunny[1].toLocaleString() : maxVotesFunny.toLocaleString()} votes)</Form.Label>
                    <Form.Group className="ms-2 me-2">
                        <Range allowCross={false} handle={handle} value={votesFunny ? votesFunny : [minVotesFunny, maxVotesFunny]} min={minVotesFunny} max={maxVotesFunny} defaultValue={[minVotesFunny, maxVotesFunny]} onChange={(value: any) => setVotesFunny(value)} onAfterChange={(value: any) => updateFilterField({ label: 'votesFunny', value: value })}/>
                    </Form.Group>

                    <Form.Label>Comment count ({filters.commentCount ? filters.commentCount[0].toLocaleString() : minCommentCount.toLocaleString()} - {filters.commentCount ? filters.commentCount[1].toLocaleString() : maxCommentCount.toLocaleString()} comments)</Form.Label>
                    <Form.Group className="ms-2 me-2">
                        <Range allowCross={false} handle={handle} value={commentCount ? commentCount : [minCommentCount, maxCommentCount]} min={minCommentCount} max={maxCommentCount} defaultValue={[minCommentCount, maxCommentCount]} onChange={(value: any) => setCommentCount(value)} onAfterChange={(value: any) => updateFilterField({ label: 'commentCount', value: value })}/>
                    </Form.Group>

                    <Form.Group className="mt-4 mb-2">
                        <Row>
                            <Col>
                                <div className="d-grid">
                                    <Button variant="light" onClick={resetFilters} disabled={zeroed}>Reset</Button>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-grid">
                                    <Button variant="light" onClick={cancelStagedFilterChanges} disabled={!dirty}>Cancel</Button>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-grid">
                                    <Button onClick={applyFilters} disabled={!dirty}>Apply</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form.Group>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>
                    Adjust View
                </Accordion.Header>
                <Accordion.Body>
                    <Form.Label>Hidden Columns ({viewOptions.hiddenColumns.length} hidden)</Form.Label>

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

                    <Row>
                        <Form.Group as={Col}>
                            <div className="mt-3">
                                <Form.Check inline label="Truncate long reviews" type="checkbox" checked={viewOptions.truncateLongReviews} onChange={(e: any) => updateViewOption({ label: 'truncateLongReviews', value: e.target.checked})}/>
                            </div>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <div className="mt-3">
                                <Form.Check inline label={<>Censor bad words <Badge bg="info">Experimental</Badge></>} type="checkbox" checked={viewOptions.censorBadWords} onChange={(e: any) => updateViewOption({ label: 'censorBadWords', value: e.target.checked})}/>
                            </div>
                        </Form.Group>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default ReviewTableFilter