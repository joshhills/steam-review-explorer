import React from "react"
import { Brush, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const ReviewScoreOverTimeChart = ({ reviewStatistics }) => {

    return (<>
        <h5 className="mt-3">Review Score Over Time</h5>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                width={500}
                height={300}
                data={reviewStatistics.reviewVolumeOverTime}
                margin={{
                    top: 15, bottom: 25
                }}>
                    <XAxis dataKey="name">
                        <Label value="Date" offset={-15} position="insideBottom"/>
                    </XAxis>
                    <Tooltip />
                    <Line type="monotone" dataKey="Review Score" stroke="#82ca9d" dot={false} />
                    <Brush dataKey="name" height={30} stroke="#dee2e6" />
            </LineChart>
        </ResponsiveContainer>
    </>)
}

export default ReviewScoreOverTimeChart