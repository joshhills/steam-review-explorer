import React, { RefObject, useEffect } from "react"
import { useState } from "react"
import { Button, Col, Form, FormSelect, Row } from "react-bootstrap"
import { FaArrowUp } from "react-icons/fa"
import Paginator from "./Paginator"
import ReviewTable from "./ReviewTable"

const useKeyPress = function (targetKey: string) {
    
    const [keyPressed, setKeyPressed] = useState(false)

    function downHandler({ key }: { key: string }) {
        if (key === targetKey) {
            setKeyPressed(true)
        }
    }

    const upHandler = ({ key }: { key: string }) => {
        if (key === targetKey) {
            setKeyPressed(false)
        }
    };

    React.useEffect(() => {
        window.addEventListener("keydown", downHandler)
        window.addEventListener("keyup", upHandler)

        return () => {
            window.removeEventListener("keydown", downHandler)
            window.removeEventListener("keyup", upHandler)
        }
    })

    return keyPressed
}

const PaginatedReviewTable = ({ index, filters, viewOptions, game, reviews, sorting, handleSort, handleChangeIndex, exportComponent, keyNavigationEnabled, reviewTextTruncateLength }) => {

    const [pageSize, setPageSize] = useState(20)

    let lastIndex = Math.ceil(reviews.length / pageSize) - 1

    if (lastIndex < 0) {
        lastIndex = 0
    }

    const ref = React.createRef<HTMLDivElement>()

    const leftPress = useKeyPress("ArrowLeft")
    const rightPress = useKeyPress("ArrowRight")

    useEffect(() => {
        if (!keyNavigationEnabled) {
            return
        }
        
        if (leftPress && index - 1 >= 0) {
            setIndexAndScrollTop(index - 1)
        }
        if (rightPress && index + 1 <= lastIndex) {
            setIndexAndScrollTop(index + 1)
        }
    }, [leftPress, rightPress])

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
                        <FormSelect className="mt-3 mb-3" defaultValue={pageSize} onChange={(e) => { setPageSize(+e.target.value); handleChangeIndex(0)}}>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </FormSelect>    
                    </Col>
                </Row>
            </Col>
            <Col>
                { exportComponent }
            </Col>
        </Row>
        <ReviewTable filters={filters} viewOptions={viewOptions} game={game} reviews={reviews.slice(index * pageSize, index * pageSize + pageSize)} sorting={sorting} handleSort={handleSort} reviewTextTruncateLength={reviewTextTruncateLength} />
        <Row>
            <Col>
                <Row>
                    <Col md="auto">
                        <Paginator pageBuffer={2} currentIndex={index} lastIndex={lastIndex} callback={setIndexAndScrollTop}/>
                    </Col>
                    <Col md="auto">
                        <FormSelect className="mt-3 mb-3" defaultValue={pageSize} onChange={(e) => { setPageSize(+e.target.value); setIndexAndScrollTop(0)}}>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </FormSelect>    
                    </Col>
                    <Col md="auto">
                        <div className="d-grid">
                            <Button className="mt-3 mb-3" variant="light" onClick={() => setIndexAndScrollTop(index)}>
                                Scroll up <FaArrowUp/>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col>
                { exportComponent }
            </Col>
        </Row>
    </>)
}

export default PaginatedReviewTable