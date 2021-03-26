import React, { useState } from "react"
import { Accordion, Card, Col, Form, Row } from "react-bootstrap"
import _ from "lodash"

const ReviewTableFilter = ({ reviews, callback }) => {

    const languages = _.uniq(reviews.map(r => r.language))

    const [filters, setFilters] = useState({
        searchTerm: '',
        languages: ['english']
    })
    
    const updateFilterField = _.debounce(async ({ label, value }) => {
        let newFilters = { ...filters, [label]: value}

        setFilters(newFilters)
        callback(newFilters)
    }, 300)

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
                        <Form.Control as="select" multiple onChange={(e: any) => updateFilterField({ label: 'languages', value: Array.from(e.target.selectedOptions, (option: any) => option.value)})}>
                            {languages.map((language: string) => {
                                let languageFormatted
                                if (language === 'schinese') {
                                    languageFormatted = 'Chinese (Simplified)'
                                } else if (language === 'tchinese') {
                                    languageFormatted = 'Chinese (Traditional)'
                                } else {
                                    languageFormatted = language.charAt(0).toUpperCase() + language.slice(1)
                                }
                                
                                return <option key={language} selected={filters.languages.indexOf(language) !== -1} value={language}>{languageFormatted}</option>
                            })}
                        </Form.Control>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default ReviewTableFilter