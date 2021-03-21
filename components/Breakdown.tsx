import React, { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import PaginatedReviewTable from "./PaginatedReviewTable"
import ReviewOverview from "./ReviewOverview"
import ReviewTableFilter from "./ReviewTableFilter"

const PAGE_SIZE = 20

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
        <Tabs defaultActiveKey="overview" className="mt-1">
            <Tab eventKey="overview" title="Overview">
                <ReviewOverview game={game} reviews={reviews}/>
            </Tab>
            <Tab eventKey="reviews" title="Reviews">
                <ReviewTableFilter callback={handleFilterReviews}/>
                {filteredReviews.length > 0 ? <PaginatedReviewTable game={game} reviews={filteredReviews} pageSize={PAGE_SIZE}/> :
                    <h5 className="mt-3">No reviews found matching filters</h5>}
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