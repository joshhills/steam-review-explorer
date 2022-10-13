import supportedLocales from "lib/utils/SteamLocales";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const LanguagePieChart = ({ game, reviewStatistics }) => {

    const mungeReviewData = (totalLanguages) => {
        return Object.entries(totalLanguages).sort((a:any, b:any) => b[1] - a[1]).map((a) => {
            return {
                name: supportedLocales[a[0]].englishName,
                numReviews: a[1]
            }
        })
    }

    const data = mungeReviewData(reviewStatistics.totalLanguages)
    const COLORS = ['#024b7a', '#03578f', '#056aad', '#0b76bd', '#1586d1', '#2c8bc9', '#4093c9', '#57a5d9', '#5998c2', '#75a8c9', '#7ba9c7', '#85b0cc', '#94bad4', '#9ec1d9', '#a5c3d6', '#bad6e8', '#c5dded', '#cadce8', '#e4eff7']

    return (
        <>
        <h5 className="mt-3">Language Distribution</h5>
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