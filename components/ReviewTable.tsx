import React from "react"
import { Table } from "react-bootstrap"
import ReviewItem from "./ReviewItem"
import ColumnResizer from "column-resizer"

interface ReviewTableProps {
    game: any,
    reviews: any
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
            minWidth: 50
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
                    {this.props.reviews.length > 0 ?
                        this.props.reviews.map(r => <ReviewItem key={r.recommendationid} game={this.props.game} review={r}/>)
                        : <tr><td colSpan={100}><div style={{paddingLeft: '12px', paddingRight: '12px', textAlign: 'center'}}>No reviews found</div></td></tr>}
                </tbody>
            </Table>)
    }
}

export default ReviewTable