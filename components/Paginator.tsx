import React from "react"
import { Pagination } from "react-bootstrap"

const Paginator = ({ pageBuffer, currentIndex, lastIndex, callback }) => {

    // Handle changes to to chosen pagination
    const handleSetIndex = (i: number) => {
        if (i >= 0 && i <= lastIndex) {
            callback(i)
        }
    }

    // Compute the bounds
    let startPaginationIndex = currentIndex - pageBuffer
    let endPaginationIndex = currentIndex + pageBuffer
    
    if (endPaginationIndex > lastIndex) {
        endPaginationIndex = lastIndex
        startPaginationIndex = lastIndex - pageBuffer * 2
    }
    if (startPaginationIndex < 0) {
        startPaginationIndex = 0
        endPaginationIndex = pageBuffer * 2
    }
    if (endPaginationIndex > lastIndex) {
        endPaginationIndex = lastIndex
    }

    // Populate the paginator
    let paginationItems = []
    for (let i = startPaginationIndex; i <= endPaginationIndex; i++) {
        paginationItems.push(
            <Pagination.Item key={i} active={currentIndex === i} onClick={() => handleSetIndex(i)}>
              {i + 1}
            </Pagination.Item>
        )
    }

    console.log(currentIndex)
    console.log(lastIndex)

    return (
        <Pagination className="mt-3">
            <Pagination.First disabled={currentIndex === 0} onClick={() => handleSetIndex(0)} />
            <Pagination.Prev disabled={currentIndex === 0} onClick={() => handleSetIndex(currentIndex - 1)} />
            {paginationItems}
            <Pagination.Next disabled={currentIndex === lastIndex} onClick={() => handleSetIndex(currentIndex + 1)} />
            <Pagination.Last disabled={currentIndex === lastIndex} onClick={() => handleSetIndex(lastIndex)} />
        </Pagination>
    )
}

export default Paginator