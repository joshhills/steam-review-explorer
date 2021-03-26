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
    filters: any
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
        return (
            <Table id="rtable" striped bordered hover responsive ref={(table) => { this.table = table }}>
                <style global jsx>{`
                    .customDrag {
                        border-left: 1px dotted black;
                        margin-left: -1px !important;
                    }
                `}</style>
                <thead>
                    <tr>
                        <th>ID</th>
                        {this.props.filters.hiddenColumns.indexOf('timeCreated') === -1 && <th>Time created <SortControl sortId={'timestampCreated'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {this.props.filters.hiddenColumns.indexOf('timeUpdated') === -1 && <th>Time updated <SortControl sortId={'timestampUpdated'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {this.props.filters.hiddenColumns.indexOf('votedUp') === -1 && <th>Voted</th>}
                        {this.props.filters.hiddenColumns.indexOf('language') === -1 && <th>Language</th>}
                        <th>Text <SortControl sortId={'textLength'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>
                        {this.props.filters.hiddenColumns.indexOf('playtimeAtReview') === -1 && <th>Playtime at review time <SortControl sortId={'playtimeAtReview'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {this.props.filters.hiddenColumns.indexOf('playtimeForever') === -1 && <th>Playtime forever <SortControl sortId={'playtimeForever'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {this.props.filters.hiddenColumns.indexOf('earlyAccess') === -1 && <th>Written during early access</th>}
                        {this.props.filters.hiddenColumns.indexOf('receivedForFree') === -1 && <th>Marked as received for free</th>}
                        {this.props.filters.hiddenColumns.indexOf('steamPurchase') === -1 && <th>Purchased via Steam</th>}
                        {this.props.filters.hiddenColumns.indexOf('votesUp') === -1 && <th>Votes helpful <SortControl sortId={'votesUp'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {this.props.filters.hiddenColumns.indexOf('votesFunny') === -1 && <th>Votes Funny <SortControl sortId={'votesFunny'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                        {this.props.filters.hiddenColumns.indexOf('commentCount') === -1 && <th>Comment Count <SortControl sortId={'commentCount'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>}
                    </tr>
                </thead>
                <tbody>
                    {this.props.reviews.length > 0 ?
                        this.props.reviews.map(r => <ReviewItem filters={this.props.filters} key={r.recommendationid} game={this.props.game} review={r}/>)
                        : <tr><td colSpan={100}><div style={{paddingLeft: '12px', paddingRight: '12px', textAlign: 'center'}}>No reviews found</div></td></tr>}
                </tbody>
            </Table>
        )
    }
}

export default ReviewTable