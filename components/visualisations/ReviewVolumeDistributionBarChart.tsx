import React from "react"
import { Bar, BarChart, Brush, Label, ReferenceLine, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const ReviewVolumeDistributionBarChart = ({ reviewStatistics }) => {

    return (<>
        <h5 className="mt-3">Total Reviews Over Time</h5>
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                width={730}
                height={250}
                data={reviewStatistics.reviewVolumeOverTime}
                stackOffset="sign"
                margin={{ top: 15, bottom: 25 }}
            >
                <ReferenceLine y={0} stroke="#000" />
                <XAxis dataKey="name">
                    <Label value="Date" offset={-15} position="insideBottom"/>
                </XAxis>
                <Tooltip />
                <Bar dataKey="Total Positive" stackId="a" fill="#c3e6cb" />
                <Bar dataKey="Total Negative" stackId="a" fill="#f5c6cb" />
                <Brush dataKey="name" height={30} stroke="#dee2e6" />
            </BarChart>
        </ResponsiveContainer>
    </>)
}

export default ReviewVolumeDistributionBarChart