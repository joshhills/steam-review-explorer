import React from "react"
import { Table } from "react-bootstrap"
import ReviewItem from "./ReviewItem"
import ColumnResizer from "column-resizer"
import SortControl from "./SortControl"

interface ReviewTableProps {
    game: any,
    reviews: any,
    sorting: any,
    handleSort: any,
    filters: any,
    viewOptions: any,
    reviewTextTruncateLength: number
}

class ReviewTable extends React.Component<ReviewTableProps> {
    
    resizer: any
    table: any

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.enableResize()
    }

    componentWillUnmount() {
        this.disableResize()
    }
    
    componentDidUpdate() {
        this.enableResize()
    }
    
    componentWillUpdate() {
        this.disableResize();
    }

    enableResize() {

        let options = {
            resizeMode: 'overflow',
            minWidth: 50,
            draggingClass: 'customDrag'
        }

        if (!this.resizer) {
            if (this.table) {
                this.resizer = new ColumnResizer(
                    this.table,
                    options
                )
            }
        } else {
            this.resizer.reset(options)
        }
    }
    
    disableResize() {
        if (this.resizer) {
          this.resizer.reset({ disable: true })
        }
    }
    
    
    render() {
        
        const hiddenColumnsFormatted = this.props.viewOptions.hiddenColumns.map((v: { value: string }) => v.value)

        return (
            <Table style={{ minWidth: '100%', width: '100%' }} id="rtable" bordered hover responsive ref={(table) => { this.table = table }}>
                <style global jsx>{`
                    .customDrag {
                        border-left: 1px dotted black;
                        margin-left: -1px !important;
                    }
                `}</style>
                <thead>
                    <tr>
                        <th>ID</th>
                        {hiddenColumnsFormatted.indexOf('timeCreated') === -1 && <th>Time created <SortControl sortId={'timestampCreated'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {hiddenColumnsFormatted.indexOf('timeUpdated') === -1 && <th>Time updated <SortControl sortId={'timestampUpdated'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {hiddenColumnsFormatted.indexOf('votedUp') === -1 && <th>Voted</th>}
                        {hiddenColumnsFormatted.indexOf('language') === -1 && <th>Language</th>}
                        <th>Text <SortControl sortId={'textLength'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>
                        {hiddenColumnsFormatted.indexOf('playtimeAtReview') === -1 && <th>Playtime at review time <SortControl sortId={'playtimeAtReview'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {hiddenColumnsFormatted.indexOf('playtimeForever') === -1 && <th>Playtime forever <SortControl sortId={'playtimeForever'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {hiddenColumnsFormatted.indexOf('playtime2Weeks') === -1 && <th>Playtime last two weeks <SortControl sortId={'playtime2Weeks'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {hiddenColumnsFormatted.indexOf('earlyAccess') === -1 && <th>Written during early access</th>}
                        {hiddenColumnsFormatted.indexOf('receivedForFree') === -1 && <th>Marked as received for free</th>}
                        {hiddenColumnsFormatted.indexOf('steamPurchase') === -1 && <th>Purchased via Steam</th>}
                        {hiddenColumnsFormatted.indexOf('authorNumReviews') === -1 && <th>Author total reviews <SortControl sortId={'authorNumReviews'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {hiddenColumnsFormatted.indexOf('authorNumGames') === -1 && <th>Author total games owned <SortControl sortId={'authorNumGames'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {hiddenColumnsFormatted.indexOf('authorContinuedPlaying') === -1 && <th>Author continued playing</th>}
                        {hiddenColumnsFormatted.indexOf('authorLastPlayed') === -1 && <th>Author last played</th>}
                        {hiddenColumnsFormatted.indexOf('votesUp') === -1 && <th>Votes helpful <SortControl sortId={'votesUp'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {hiddenColumnsFormatted.indexOf('votesFunny') === -1 && <th>Votes funny <SortControl sortId={'votesFunny'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {hiddenColumnsFormatted.indexOf('commentCount') === -1 && <th>Comment count <SortControl sortId={'commentCount'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                    </tr>
                </thead>
                <tbody>
                    {this.props.reviews.length > 0 ?
                        this.props.reviews.map(r => <ReviewItem filters={this.props.filters} viewOptions={this.props.viewOptions} key={r.recommendationid} game={this.props.game} review={r} reviewTextTruncateLength={this.props.reviewTextTruncateLength}/>)
                        : <tr><td colSpan={100}><div style={{paddingLeft: '12px', paddingRight: '12px', textAlign: 'center'}}>No reviews found</div></td></tr>}
                </tbody>
            </Table>
        )
    }
}

export default ReviewTable