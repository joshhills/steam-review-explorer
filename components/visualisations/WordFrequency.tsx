import React from "react"
import { Badge, Button, Table } from "react-bootstrap"

const WordFrequency = ({ game, reviewStatistics, handleFilterPreset }) => {

    const navToPositiveWord = (word) => {
        handleFilterPreset({
            searchTerm: word,
            languages : [{label: 'English', value: 'english'}],
            votedUpPositive: true,
            votedUpNegative: false
        })
    }

    const navToNegativeWord = (word) => {
        handleFilterPreset({
            searchTerm: word,
            languages : [{label: 'English', value: 'english'}],
            votedUpPositive: false,
            votedUpNegative: true
        })
    }

    return reviewStatistics.positiveWordFrequencyList.length === 0 || reviewStatistics.negativeWordFrequencyList.length === 0 || reviewStatistics.positiveWordFrequencyList.length !== reviewStatistics.negativeWordFrequencyList.length ? 
        <></> :
        <>
        <h5>Top 20 Frequently Occuring Words* <Badge bg="info">Experimental</Badge></h5>
        <Table responsive className="mt-3">
            <thead>
                <tr>
                    <th>
                        {/* Rank */}
                    </th>
                    <th colSpan={2} className='table-success'>
                        Positive reviews
                    </th>
                    <th colSpan={2} className='table-danger'>
                        Negative reviews
                    </th>
                </tr>
                <tr>
                    <th></th>
                    <th className='table-success'>
                        Word
                    </th>
                    <th className='table-success'>
                        Total occurences
                    </th>
                    <th className='table-danger'>
                        Word
                    </th>
                    <th className='table-danger'>
                        Total occurences
                    </th>
                </tr>
            </thead>
            <tbody>
                {reviewStatistics.positiveWordFrequencyList.map((e, i) => {
                    return (
                        <tr key={i}>
                            <td>
                                {i + 1}
                            </td>
                            <td className='table-success'>
                                {e[0]}
                            </td>
                            <td className='table-success'>
                                <Button className="p-0" variant="link" onClick={() => navToNegativeWord(e[0])}>
                                    {e[1].toLocaleString()}
                                </Button>
                            </td>
                            <td className='table-danger'>
                                {reviewStatistics.negativeWordFrequencyList[i][0]}
                            </td>
                            <td className='table-danger'>
                                <Button className="p-0" variant="link" onClick={() => navToNegativeWord(reviewStatistics.negativeWordFrequencyList[i][0])}>
                                    {reviewStatistics.negativeWordFrequencyList[i][1].toLocaleString()}
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        <p>
            <small>
                *Excluding a <a href="https://github.com/joshhills/steam-review-explorer/blob/main/lib/utils/CommonWords.ts">list of commonly occuring words</a>, and only counting each word once per review.
                Word clouds <a href="https://getthematic.com/insights/word-clouds-harm-insights/">may provide misleading insights</a>!
            </small>
        </p>
        </>
}

export default WordFrequency