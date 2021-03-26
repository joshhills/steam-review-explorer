import React, { useState } from "react"
import { Accordion, Card, Col, Form, Row } from "react-bootstrap"
import _ from "lodash"

const ReviewTableFilter = ({ filters, reviews, callback }) => {

    const languages = _.uniq(reviews.map(r => r.language))

    console.log(reviews[0])

    const updateFilterField = ({ label, value }) => {
        console.log(label, value)

        let newFilters = { ...filters, [label]: value}

        callback(newFilters)
    }

    return (
        <Accordion className="mt-3" defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Filters
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {/* <Form.Label>Contains Text</Form.Label> */}
                        <Form.Control type="text" placeholder="Search reviews" onChange={(e) => updateFilterField({ label: 'searchTerm', value: e.target.value.trim()})}/>
                        
                        <Form.Label className="mt-3">Languages ({filters.languages.length})</Form.Label>
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

                        {/* <div>
                            <Form.Label className="mt-3">Written during early access</Form.Label><br/>
                            <Form.Check inline label="Yes" type="checkbox" checked={filters.earlyAccess === 'true'} onClick={(e: any) => updateFilterField({ label: 'earlyAccess', value: 'true'})}/>
                            <Form.Check inline label="No" type="checkbox" checked={filters.earlyAccess === 'false'} onClick={(e: any) => updateFilterField({ label: 'earlyAccess', value: 'false'})}/>
                        </div>

                        <div>
                            <Form.Label className="mt-3">Marked as received for free</Form.Label><br/>
                            <Form.Check inline label="Yes" type="checkbox" checked={filters.earlyAccess === 'true'} onClick={(e: any) => updateFilterField({ label: 'receivedForFree', value: 'true'})}/>
                            <Form.Check inline label="No" type="checkbox" checked={filters.earlyAccess === 'false'} onClick={(e: any) => updateFilterField({ label: 'receivedForFree', value: 'false'})}/>
                        </div>

                        <div>
                            <Form.Label className="mt-3">Purchased via Steam</Form.Label><br/>
                            <Form.Check inline label="Yes" type="checkbox" checked={filters.earlyAccess === 'true'} onClick={(e: any) => updateFilterField({ label: 'steamPurchase', value: 'true'})}/>
                            <Form.Check inline label="No" type="checkbox" checked={filters.earlyAccess === 'false'} onClick={(e: any) => updateFilterField({ label: 'steamPurchase', value: 'false'})}/>
                        </div> */}

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