import React from "react"
import { Badge, Button } from "react-bootstrap"
import { CSVLink } from "react-csv"
import sanitize from "sanitize-filename"

const Export = ({ game, reviews }) => {

    let ref

    const headers = [
        { label: 'Recommendation ID', key: 'recommendationid'},
        { label: 'Author Steam ID', key: 'author.steamid'}
    ]

    const report = {
        headers: headers,
        data: reviews,
        filename: sanitize(`${game.steam_appid} ${game.name} Reviews`).replace(/[^a-z0-9]/gi, '_'),
        className: 'hidden',
        target: '_blank'
    }

    const handleClick = () => {
        ref.link.click()
    }

    return (<>
        <CSVLink {...report} ref={(r) => ref = r}/>
        <Button className="mt-3 mb-3" disabled={reviews.length === 0} block onClick={handleClick}>Export { reviews.length > 0 && <Badge variant="light">{reviews.length.toLocaleString()} review{reviews.length !== 1 && 's'}</Badge>}</Button>
    </>)
}

export default Export