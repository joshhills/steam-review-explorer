import supportedLocales from "lib/utils/SteamLocales";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { FaCheck,  } from "react-icons/fa";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const LanguagePieChart = ({ game, reviewStatistics, handleFilterPreset }) => {

    const numSupportedLanguagesAsNum = Object.keys(game.parsed_supported_languages).length
    const numSupportedLanguages = numSupportedLanguagesAsNum.toLocaleString()
    const numAvailableLanguages = Object.keys(supportedLocales).length.toLocaleString()
    const numReviewLanguages = Object.keys(reviewStatistics.totalLanguages).length.toLocaleString()
    let reviewLanguagesUnsupported = []
    for (let lang of Object.keys(reviewStatistics.totalLanguages)) {
        if (Object.keys(game.unsupported_languages).indexOf(lang) !== -1) {
            reviewLanguagesUnsupported.push(lang)
        }
    }

    const mungeReviewData = (totalLanguages) => {
        return Object.entries(totalLanguages).sort((a:any, b:any) => b[1].total - a[1].total).map((a: any) => {
            return {
                name: supportedLocales[a[0]].englishName,
                langCode: a[0],
                numReviews: a[1].total
            }
        })
    }

    const data = mungeReviewData(reviewStatistics.totalLanguages)
    const COLORS = ['#024b7a', '#03578f', '#056aad', '#0b76bd', '#1586d1', '#2c8bc9', '#4093c9', '#57a5d9', '#5998c2', '#75a8c9', '#7ba9c7', '#85b0cc', '#94bad4', '#9ec1d9', '#a5c3d6', '#bad6e8', '#c5dded', '#cadce8', '#e4eff7']

    const navToLanguage = (languageName: string, languageCode: string) => {
        handleFilterPreset({
            languages: [{label: languageName, value: languageCode}]
        })
    }

    return (
        <>
        <h5 className="mt-3">Language Distribution</h5>
        {numSupportedLanguagesAsNum > 0 && <div>
            <p>This product supports {numSupportedLanguages} of the {numAvailableLanguages} available Steam languages</p>
            <p>Reviews have been retrieved in {numReviewLanguages} language{numReviewLanguages === 1 ? '' : 's'}, {reviewLanguagesUnsupported.length} of which {reviewLanguagesUnsupported.length === 1 ? 'is' : 'are'} unsupported</p>
            <h6>Unsupported product languages</h6>
            <p>{Object.keys(game.unsupported_languages).map(e => supportedLocales[e].englishName).sort().join(', ')}</p>
            <h6>Unsupported review languages</h6>
            <p>{reviewLanguagesUnsupported.map(e => supportedLocales[e].englishName).sort().join(', ')}</p>
        </div>}
        <small>
            Note that Steam allows users to tag their review's language, defaulting to their account's primary language;
            therefore, the actual content of a review may be in a different language to that stated, or even a multitude of languages
        </small>
        <Table className="mt-3">
            <thead>
                <td>Total</td>
                <td>Proportion</td>
                <td>Language</td>
                <td>Total Positive</td>
                <td>% Positive</td>
                <td>Negative</td>
                <td>% Negative</td>
                <td>Supported</td>
            </thead>
            <tbody>
                {data.map(e => {
                    const ref = reviewStatistics.totalLanguages[e.langCode]
                    
                    return <tr>
                        <td>{ref.total.toLocaleString()}</td>
                        <td>{Math.round(ref.total / reviewStatistics.totalReviews * 100)}%</td>
                        <td><Button className="p-0" variant="link" onClick={() => navToLanguage(e.name, e.langCode)}>{e.name}</Button></td>
                        <td>{ref.positive.toLocaleString()}</td>
                        <td>{Math.round(ref.positive / ref.total * 100)}%</td>
                        <td>{ref.negative.toLocaleString()}</td>
                        <td>{Math.round(ref.negative / ref.total * 100)}%</td>
                        <td>{Object.keys(game.parsed_supported_languages).indexOf(e.langCode) !== -1 ? <FaCheck/> : ''}</td>
                    </tr>
                })}
            </tbody>
        </Table>

        <ResponsiveContainer height={400} width="100%">
            <PieChart>
                <Tooltip/>
                <Pie data={data} dataKey="numReviews">
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        </>
    )
}

export default LanguagePieChart