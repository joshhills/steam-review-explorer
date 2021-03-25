import React from "react"
import { useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import Export from "./Export"
import Paginator from "./Paginator"
import ReviewTable from "./ReviewTable"

const PaginatedReviewTable = ({ game, reviews, sorting, handleSort }) => {

    const [index, setIndex] = useState(0)
    const [pageSize, setPageSize] = useState(20)

    let lastIndex = Math.ceil(reviews.length / pageSize) - 1

    if (lastIndex < 0) {
        lastIndex = 0
    }

    const ref = React.createRef<HTMLDivElement>()

    const setIndexAndScrollTop = (i: number) => {
        setIndex(i)
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }

    return (<><div ref={ref}/>
        <Row>
            <Col>
                <Row>
                    <Col md="auto">
                        <Paginator pageBuffer={2} currentIndex={index} lastIndex={lastIndex} callback={setIndex}/>
                    </Col>
                    <Col md="auto">
                        <Form.Control className="mt-3 mb-3" as="select" defaultValue={pageSize} onChange={(e) => { setPageSize(+e.target.value); setIndex(0)}}>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </Form.Control>    
                    </Col>
                </Row>
            </Col>
            <Col>
                <Export game={game} reviews={reviews}/>
            </Col>
        </Row>
        <ReviewTable game={game} reviews={reviews.slice(index * pageSize, index * pageSize + pageSize)} sorting={sorting} handleSort={handleSort} />
        <Row>
            <Col>
                <Paginator pageBuffer={2} currentIndex={index} lastIndex={lastIndex} callback={setIndexAndScrollTop}/>
            </Col>
            <Col>
                <Export game={game} reviews={reviews}/>
            </Col>
        </Row>
    </>)
}

export default PaginatedReviewTable