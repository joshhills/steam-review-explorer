import React, { useState } from "react"
import { Accordion, Card, Form } from "react-bootstrap"
import _ from "lodash"

const ReviewTableFilter = ({ callback }) => {

    const [filters, setFilters] = useState({
        searchTerm: ''
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
                    Filter
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form.Control type="text" placeholder="Search reviews" onChange={(e) => updateFilterField({ label: 'searchTerm', value: e.target.value.trim()})}/>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default ReviewTableFilter