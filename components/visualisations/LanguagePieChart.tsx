import React from "react";
import { Pie, PieChart, Tooltip } from "recharts";

const LanguagePieChart = ({ reviews }) => {

    const mungeReviewData = (reviews) => {
        const languageBuckets = reviews.reduce((a, r) => { a[r.language] = a[r.language] ? a[r.language] + 1 : 1; return a }, {})
        let output = []
        for (let language of Object.keys(languageBuckets)) {
            output.push({
                name: language,
                numReviews: languageBuckets[language]
            })
        }
        return output
    }

    const data = mungeReviewData(reviews)

    return (
        <PieChart width={400} height={400}>
            <Tooltip/>
            <Pie data={data} dataKey="numReviews"/>
        </PieChart>
    )
}

export default LanguagePieChart