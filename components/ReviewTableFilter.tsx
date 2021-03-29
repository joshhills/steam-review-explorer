import React, { useContext } from "react"
import { Accordion, AccordionContext, Button, Card, Form, useAccordionToggle } from "react-bootstrap"
import _ from "lodash"
import Slider, { Handle, SliderTooltip } from "rc-slider"
import "rc-slider/assets/index.css"
import { FaCaretRight, FaCaretDown } from "react-icons/fa"
import DateRangePicker from "react-bootstrap-daterangepicker"
import "bootstrap-daterangepicker/daterangepicker.css"

function ContextAwareToggle({ children, eventKey }) {
    const currentEventKey = useContext(AccordionContext)

    const decoratedOnClick = useAccordionToggle(eventKey)

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
        <Button className="p-0" variant="link" onClick={decoratedOnClick}>
            {children} {isCurrentEventKey ? <FaCaretDown className="pb-1"/> : <FaCaretRight className="pb-1"/> }
        </Button>
    )
}

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

const ReviewTableFilter = ({ filters, reviews, callback }) => {

    const languages = _.uniq(reviews.map(r => r.language))

    const minReviewTextLength = _.minBy(reviews, (r: any) => r.review.length).review.length
    const maxReviewTextLength = _.maxBy(reviews, (r: any) => r.review.length).review.length

    const minCommentCount = _.minBy(reviews, (r: any) => r.comment_count).comment_count
    const maxCommentCount = _.maxBy(reviews, (r: any) => r.comment_count).comment_count

    const minVotesHelpful = _.minBy(reviews, (r: any) => r.votes_up).votes_up
    const maxVotesHelpful = _.maxBy(reviews, (r: any) => r.votes_up).votes_up

    const minVotesFunny = _.minBy(reviews, (r: any) => r.votes_funny).votes_funny
    const maxVotesFunny = _.maxBy(reviews, (r: any) => r.votes_funny).votes_funny

    const minTimeCreated = new Date(_.minBy(reviews, (r: any) => r.timestamp_created).timestamp_created * 1000)
    const maxTimeCreated = new Date(_.maxBy(reviews, (r: any) => r.timestamp_created).timestamp_created * 1000)

    const updateFilterField = ({ label, value }) => {
        console.log(label, value)

        let newFilters = { ...filters, [label]: value}

        callback(newFilters)
    }

    return (
        <Accordion className="mt-4" defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <ContextAwareToggle eventKey="0">Filters</ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {/* <Form.Label>Contains Text</Form.Label> */}
                        <Form.Control type="text" placeholder="Search reviews" onChange={(e) => updateFilterField({ label: 'searchTerm', value: e.target.value.trim()})}/>
                        
                        <Form.Group className="mt-3">
                            <Form.Label>Time created</Form.Label><br/>
                            <DateRangePicker onCancel={() => {updateFilterField({ label: 'timeCreated', value: [minTimeCreated, maxTimeCreated] })}} onCallback={(start: any, end: any) => { updateFilterField({ label: 'timeCreated', value: [start.toDate(), end.toDate()] }) }} initialSettings={{ minDate: minTimeCreated, maxDate: maxTimeCreated, startDate: filters.timeCreated ? filters.timeCreated[0] : minTimeCreated, endDate: filters.timeCreated ? filters.timeCreated[1] : maxTimeCreated, timePicker: true, locale: { cancelLabel: 'Clear' } }}>
                                <Form.Control type="text"/>
                            </DateRangePicker>
                        </Form.Group>

                        <Form.Label>Languages ({filters.languages.length})</Form.Label>
                        <Form.Control as="select" value={filters.languages} multiple onChange={(e: any) => updateFilterField({ label: 'languages', value: Array.from(e.target.selectedOptions, (option: any) => option.value)})}>
                            {languages.map((language: string) => {
                                let languageFormatted
                                if (language === 'schinese') {
                                    languageFormatted = 'Chinese (Simplified)'
                                } else if (language === 'tchinese') {
                                    languageFormatted = 'Chinese (Traditional)'
                                } else {
                                    languageFormatted = language.charAt(0).toUpperCase() + language.slice(1)
                                }
                                
                                return <option key={language} value={language}>{languageFormatted}</option>
                            })}
                        </Form.Control>
                        
                        <div className="mt-3">
                            <Form.Label>Voted</Form.Label><br/>
                            <Form.Check inline label="Positive" type="checkbox" checked={filters.votedUpPositive} onChange={(e: any) => updateFilterField({ label: 'votedUpPositive', value: e.target.checked})}/>
                            <Form.Check inline label="Negative" type="checkbox" checked={filters.votedUpNegative} onChange={(e: any) => updateFilterField({ label: 'votedUpNegative', value: e.target.checked})}/>
                        </div>

                        <div className="mt-3">
                            <Form.Label>Written during early access</Form.Label><br/>
                            <Form.Check inline label="Yes" type="checkbox" checked={filters.earlyAccessYes} onChange={(e: any) => updateFilterField({ label: 'earlyAccessYes', value: e.target.checked})}/>
                            <Form.Check inline label="No" type="checkbox" checked={filters.earlyAccessNo} onChange={(e: any) => updateFilterField({ label: 'earlyAccessNo', value: e.target.checked})}/>
                        </div>

                        <div className="mt-3">
                            <Form.Label>Marked as received for free</Form.Label><br/>
                            <Form.Check inline label="Yes" type="checkbox" checked={filters.receivedForFreeYes} onChange={(e: any) => updateFilterField({ label: 'receivedForFreeYes', value: e.target.checked})}/>
                            <Form.Check inline label="No" type="checkbox" checked={filters.receivedForFreeNo} onChange={(e: any) => updateFilterField({ label: 'receivedForFreeNo', value: e.target.checked})}/>
                        </div>

                        <div className="mt-3">
                            <Form.Label>Purchased via Steam</Form.Label><br/>
                            <Form.Check inline label="Yes" type="checkbox" checked={filters.steamPurchaseYes} onChange={(e: any) => updateFilterField({ label: 'steamPurchaseYes', value: e.target.checked})}/>
                            <Form.Check inline label="No" type="checkbox" checked={filters.steamPurchaseNo} onChange={(e: any) => updateFilterField({ label: 'steamPurchaseNo', value: e.target.checked})}/>
                        </div>

                        <Form.Label className="mt-3">Text length ({filters.textLength ? filters.textLength[0] : minReviewTextLength} - {filters.textLength ? filters.textLength[1] : maxReviewTextLength} characters)</Form.Label>
                        <Form.Group className="ml-2 mr-2">
                            <Range allowCross={false} handle={handle} value={filters.textLength ? filters.textLength : [minReviewTextLength, maxReviewTextLength]} min={minReviewTextLength} max={maxReviewTextLength} defaultValue={[minReviewTextLength, maxReviewTextLength]} onChange={(value: any) => updateFilterField({ label: 'textLength', value: value })}/>
                        </Form.Group>

                        <Form.Label>Votes helpful ({filters.votesHelpful ? filters.votesHelpful[0] : minVotesHelpful} - {filters.votesHelpful ? filters.votesHelpful[1] : maxVotesHelpful} votes)</Form.Label>
                        <Form.Group className="ml-2 mr-2">
                            <Range allowCross={false} handle={handle} value={filters.votesHelpful ? filters.votesHelpful : [minVotesHelpful, maxVotesHelpful]} min={minVotesHelpful} max={maxVotesHelpful} defaultValue={[minVotesHelpful, maxVotesHelpful]} onChange={(value: any) => updateFilterField({ label: 'votesHelpful', value: value })}/>
                        </Form.Group>

                        <Form.Label>Votes funny ({filters.votesFunny ? filters.votesFunny[0] : minVotesFunny} - {filters.votesFunny ? filters.votesFunny[1] : maxVotesFunny} votes)</Form.Label>
                        <Form.Group className="ml-2 mr-2">
                            <Range allowCross={false} handle={handle} value={filters.votesFunny ? filters.votesFunny : [minVotesFunny, maxVotesFunny]} min={minVotesFunny} max={maxVotesFunny} defaultValue={[minVotesFunny, maxVotesFunny]} onChange={(value: any) => updateFilterField({ label: 'votesFunny', value: value })}/>
                        </Form.Group>

                        <Form.Label>Comment count ({filters.commentCount ? filters.commentCount[0] : minCommentCount} - {filters.commentCount ? filters.commentCount[1] : maxCommentCount} comments)</Form.Label>
                        <Form.Group className="ml-2 mr-2">
                            <Range allowCross={false} handle={handle} value={filters.commentCount ? filters.commentCount : [minCommentCount, maxCommentCount]} min={minCommentCount} max={maxCommentCount} defaultValue={[minCommentCount, maxCommentCount]} onChange={(value: any) => updateFilterField({ label: 'commentCount', value: value })}/>
                        </Form.Group>

                        <hr className="mt-4"/>
                        
                        <Form.Label>Hidden Columns ({filters.hiddenColumns.length})</Form.Label>
                        <Form.Control as="select" value={filters.hiddenColumns} multiple onChange={(e: any) => updateFilterField({ label: 'hiddenColumns', value: Array.from(e.target.selectedOptions, (option: any) => option.value)})}>
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
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default ReviewTableFilter