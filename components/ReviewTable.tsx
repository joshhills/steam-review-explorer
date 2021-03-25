import React from "react"
import { Table } from "react-bootstrap"
import ReviewItem from "./ReviewItem"
import ColumnResizer from "column-resizer"
import SortControl from "./SortControl"

interface ReviewTableProps {
    game: any,
    reviews: any,
    sorting: any,
    handleSort: any
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
            <Table striped bordered hover responsive ref={(table) => { this.table = table }} id="test" style={{tableLayout: 'fixed'}}>
                <style global jsx>{`
                    .customDrag {
                        border-left: 1px dotted black;
                        margin-left: -1px !important;
                    }
                `}</style>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Time Created <SortControl sortId={'timestampCreated'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>
                        <th>Time Updated <SortControl sortId={'timestampUpdated'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>
                        <th>Voted</th>
                        <th>Language</th>
                        <th>Text <SortControl sortId={'textLength'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>
                        <th>Playtime at review time <SortControl sortId={'playtimeAtReview'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>
                        <th>Playtime forever <SortControl sortId={'playtimeForever'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>
                        <th>Written during early access</th>
                        <th>Votes Up <SortControl sortId={'votesUp'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>
                        <th>Votes Funny <SortControl sortId={'votesFunny'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>
                        <th>Comment Count <SortControl sortId={'commentCount'} sorting={this.props.sorting} callBack={this.props.handleSort} /></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.reviews.length > 0 ?
                        this.props.reviews.map(r => <ReviewItem key={r.recommendationid} game={this.props.game} review={r}/>)
                        : <tr><td colSpan={100}><div style={{paddingLeft: '12px', paddingRight: '12px', textAlign: 'center'}}>No reviews found</div></td></tr>}
                </tbody>
            </Table>)
    }
}

export default ReviewTable