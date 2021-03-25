import React, { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import PaginatedReviewTable from "./PaginatedReviewTable"
import ReviewOverview from "./ReviewOverview"
import ReviewTableFilter from "./ReviewTableFilter"

const Breakdown = ({ game, reviews }) => {

    const [filteredReviews, setFilteredReviews] = useState(reviews)

    const handleFilterReviews = (filters) => {
        setFilteredReviews(reviews.filter((r) => {
            // Search term
            if (filters.searchTerm) {
                if(r.review.toLowerCase().indexOf(filters.searchTerm) === -1) {
                    return false
                }
            }

            return true
        }))
    }

    return (<>
        <Tabs defaultActiveKey="reviews" className="mt-1">
            <Tab eventKey="overview" title="Overview">
                <ReviewOverview game={game} reviews={reviews}/>
            </Tab>
            <Tab eventKey="reviews" title="Reviews">
                <ReviewTableFilter callback={handleFilterReviews}/>
                <p className="mt-3">{reviews.length} review{reviews.length !== 0 && 's'}</p>
                <PaginatedReviewTable game={game} reviews={filteredReviews}/>
            </Tab>
            <Tab eventKey="visualisations" title="Visualisations">
                <p className="mt-3">Coming soon!..</p>
            </Tab>
        </Tabs>
        
        {/* <Container>
            <h4>Debug</h4>
            <p>{JSON.stringify(game)}</p>
            <p>{JSON.stringify(reviews[0])}</p>
        </Container> */}
    </>)
}

export default Breakdown