import React from "react"
import { useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import Paginator from "./Paginator"
import ReviewTable from "./ReviewTable"

const PaginatedReviewTable = ({ index, filters, viewOptions, game, reviews, sorting, handleSort, handleChangeIndex, exportComponent }) => {

    const [pageSize, setPageSize] = useState(20)

    let lastIndex = Math.ceil(reviews.length / pageSize) - 1

    if (lastIndex < 0) {
        lastIndex = 0
    }

    const ref = React.createRef<HTMLDivElement>()

    const setIndexAndScrollTop = (i: number) => {
        handleChangeIndex(i)
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
                        <Paginator pageBuffer={2} currentIndex={index} lastIndex={lastIndex} callback={handleChangeIndex}/>
                    </Col>
                    <Col md="auto">
                        <Form.Control className="mt-3 mb-3" as="select" defaultValue={pageSize} onChange={(e) => { setPageSize(+e.target.value); handleChangeIndex(0)}}>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </Form.Control>    
                    </Col>
                </Row>
            </Col>
            <Col>
                { exportComponent }
            </Col>
        </Row>
        <ReviewTable filters={filters} viewOptions={viewOptions} game={game} reviews={reviews.slice(index * pageSize, index * pageSize + pageSize)} sorting={sorting} handleSort={handleSort} />
        <Row>
            <Col>
                <Paginator pageBuffer={2} currentIndex={index} lastIndex={lastIndex} callback={setIndexAndScrollTop}/>
            </Col>
            <Col>
                { exportComponent }
            </Col>
        </Row>
    </>)
}

export default PaginatedReviewTable