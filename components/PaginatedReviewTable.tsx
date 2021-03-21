import React from "react"
import { useState } from "react"
import { Col, Row } from "react-bootstrap"
import Export from "./Export"
import Paginator from "./Paginator"
import ReviewTable from "./ReviewTable"

const PaginatedReviewTable = ({ game, reviews, pageSize }) => {

    const [index, setIndex] = useState(0)

    const lastIndex = Math.ceil(reviews.length / pageSize) - 1

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
                <Paginator pageBuffer={2} currentIndex={index} lastIndex={lastIndex} callback={setIndex}/>    
            </Col>
            <Col>
                <Export game={game} reviews={reviews}/>
            </Col>
        </Row>
        <ReviewTable game={game} reviews={reviews.slice(index * pageSize, index * pageSize + pageSize)}/>
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