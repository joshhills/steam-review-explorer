import React from "react"
import { Table } from "react-bootstrap"
import ReviewItem from "./ReviewItem"

const ReviewTable = ({ game, reviews }) => {

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Time Created</th>
                    <th>Time Updated</th>
                    <th>Voted</th>
                    <th>Language</th>
                    <th>Text</th>
                    <th>Playtime at review time</th>
                    <th>Playtime forever</th>
                    <th>Written during early access</th>
                    <th>Votes Up</th>
                    <th>Votes Funny</th>
                    <th>Comment Count</th>
                </tr>
            </thead>
            <tbody>
                {reviews.map(r => <ReviewItem key={r.recommendationid} game={game} review={r}/>)}
            </tbody>
        </Table>
    )
}

export default ReviewTable