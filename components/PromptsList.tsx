import supportedLocales from "lib/utils/SteamLocales"
import React from "react"
import { Button, Card, Container } from "react-bootstrap"

const PromptsList = ({ handleFilterPreset, initialFilterRanges, reviewStatistics }) => {

    const availableLanguages = Object.keys(reviewStatistics.totalLanguages).sort((a:any, b:any) => supportedLocales[a].englishName<supportedLocales[b].englishName?-1:1).map((l) => {
        return {
            label: supportedLocales[l].englishName,
            value: l
        }
    })

    const navToCreators = () => {
        handleFilterPreset({
            languages: availableLanguages,
            votedUpPositive: true,
            votedUpNegative: false,
            containsUrlYes: true,
            containsUrlNo: false
        })
    }

    const navToASCIIArt = () => {
        handleFilterPreset({
            languages: availableLanguages,
            containsASCIIArtYes: true,
            containsASCIIArtNo: false
        })
    }

    const navToHoldouts = () => {
        const maxHoursPlayedForever = Math.ceil(reviewStatistics.reviewMaxTotalMinutesPlayedForever.author.playtime_forever / 60)
        const averagePlaytimeAtReviewTimeHours = Math.round(reviewStatistics.averageMinutesPlaytimeAtReviewTime / 60)

        handleFilterPreset({
            votedUpNegative: true,
            votedUpPositive: false,
            timePlayedForever: [averagePlaytimeAtReviewTimeHours + 1, maxHoursPlayedForever]
        })
    }

    const navToTechnicalIssues = () => {
        const dNow = new Date()
        let d24HoursAgo = new Date()
        d24HoursAgo.setHours(d24HoursAgo.getHours() - 24)

        handleFilterPreset({
            searchTerm: 'crash bug issue performance lag',
            exactSearchTerm: 'partialIgnoreCase',
            timeCreated: [d24HoursAgo, dNow]
        })
    }

    const navToConversationStarters = () => {
        handleFilterPreset({
            commentCount: [2, reviewStatistics.reviewMaxCommentCount.comment_count]
        })
    }

    const navToNovellists = () => {
        handleFilterPreset({
            textLength: [reviewStatistics.averageTextLength + 1, reviewStatistics.reviewMaxTextLength.review.length]
        })
    }

    return (<Container>
        <div className="row mt-4">
            <div className="col-auto mb-3">
                <Card className="mb-4 prompt-card">
                    <Card.Img variant="top" src="/steam-review-explorer/prompt-images/happy-content-creators.jpg"/>
                    <Card.Body>
                        <Card.Title className="mb-3">
                            Find happy content creators
                        </Card.Title>
                        <Card.Text className="small">Show positive reviews containing URLs that may point to videos, blogs</Card.Text>
                    </Card.Body>          
                    <Card.Footer>
                        <div className="d-grid gap-2">
                            <Button variant="primary"
                                onClick={navToCreators}>
                                Apply filters
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>

            <div className="col-auto mb-3">
                <Card className="mb-4 prompt-card">
                    <Card.Img variant="top" src="/steam-review-explorer/prompt-images/new-technical-issues.jpg"/>
                    <Card.Body>
                        <Card.Title className="mb-3">
                            Find new technical issues
                        </Card.Title>
                        <Card.Text className="small">Show reviews from the last 24 hours containing key words related to bugs</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-grid gap-2">
                            <Button variant="primary"
                                onClick={navToTechnicalIssues}>
                                Apply filters
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>

            <div className="col-auto mb-3">
                <Card className="mb-4 prompt-card">
                    <Card.Img variant="top" src="/steam-review-explorer/prompt-images/conversation-starters.jpg"/>
                    <Card.Body>
                        <Card.Title className="mb-3">
                            Find conversation starters
                        </Card.Title>
                        <Card.Text className="small">Show reviews with more than one comment</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-grid gap-2">
                            <Button variant="primary"
                                onClick={navToConversationStarters}>
                                Apply filters
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
            
            <div className="col-auto mb-3">
                <Card className="mb-4 prompt-card">
                    <Card.Img variant="top" src="/steam-review-explorer/prompt-images/critical-holdouts.jpg"/>
                    <Card.Body>
                        <Card.Title className="mb-3">
                            Find critical holdouts
                        </Card.Title>
                        <Card.Text className="small">Show negative reviews that have more than average playtime</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-grid gap-2">
                            <Button variant="primary"
                                onClick={navToHoldouts}>
                                Apply filters
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>

            <div className="col-auto mb-3">
                <Card className="mb-4 prompt-card">
                    <Card.Img variant="top" src="/steam-review-explorer/prompt-images/novellists.jpg"/>
                    <Card.Body>
                        <Card.Title className="mb-3">
                            Find the novellists
                        </Card.Title>
                        <Card.Text className="small">Show reviews that are longer than average length</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-grid gap-2">
                            <Button variant="primary"
                                onClick={navToNovellists}>
                                Apply filters
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>

            <div className="col-auto mb-3">
                <Card className="mb-4 prompt-card">
                    <Card.Img variant="top" src="/steam-review-explorer/prompt-images/keyboard-artists.jpg"/>
                    <Card.Body>
                        <Card.Title className="mb-3">
                            Find the keyboard artists
                        </Card.Title>
                        <Card.Text className="small">Show reviews that are primarily ASCII art</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-grid gap-2">
                            <Button variant="primary"
                                onClick={navToASCIIArt}>
                                Apply filters
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        </div>
    </Container>)
}

export default PromptsList