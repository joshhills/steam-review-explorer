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


// import React, { useState } from "react"
// import { Bar, BarChart, Brush, Label, ReferenceLine, ResponsiveContainer, Tooltip, XAxis } from "recharts"

// const ReviewVolumeDistributionBarChart = ({ reviewStatistics }) => {

//     const [control, setControl] = useState({
//         data: reviewStatistics.reviewVolumeOverTime,
//         left: 'dataMin',
//         right: 'dataMax',
//         refAreaLeft: '',
//         refAreaRight: '',
//         top: 'dataMax+1',
//         bottom: 'dataMin-1',
//         top2: 'dataMax+20',
//         bottom2: 'dataMin-20',
//         animation: true
//     })

//     const zoom = () => {
//         let { refAreaLeft, refAreaRight } = control

//         const { data } = control
    
//         if (refAreaLeft === refAreaRight) {
//             setControl({
//                 ...control,
//                 refAreaLeft: '',
//                 refAreaRight: '',
//             })
//             return
//         }
    
//         // xAxis domain
//         if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]
    
//         // console.log(refAreaLeft)
//         // console.log(refAreaRight)

//         // yAxis domain
//         const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'Total Positive', 0)
//         const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'Total Negative', 0)
    
//         const newControl: any = {
//             refAreaLeft: '',
//             refAreaRight: '',
//             data: data.slice(),
//             left: refAreaLeft,
//             right: refAreaRight,
//             bottom,
//             top,
//             bottom2,
//             top2,
//         }

//         console.log(newControl)

//         setControl((prevControl) => newControl)
//     }

//     const getAxisYDomain = (from, to, ref, offset) => {
//         const refData = reviewStatistics.reviewVolumeOverTime.slice(from - 1, to)
//         let [bottom, top] = [refData[0][ref], refData[0][ref]]
//         refData.forEach((d) => {
//             if (d[ref] > top) top = d[ref]
//             if (d[ref] < bottom) bottom = d[ref]
//         })
      
//         return [(bottom | 0) - offset, (top | 0) + offset]
//     }

//     return (<>
//         <h5 className="mt-3">Total Reviews Over Time</h5>
//         <ResponsiveContainer width="100%" height={400}>
//             <BarChart
//                 width={730}
//                 height={250}
//                 data={reviewStatistics.reviewVolumeOverTime}
//                 stackOffset="sign"
//                 margin={{ top: 15, bottom: 25 }}
//                 onMouseDown={(e) => { console.log(e); setControl({ ...control, refAreaLeft: e.activeTooltipIndex })}}
//                 onMouseMove={(e) => control.refAreaLeft && setControl({ ...control, refAreaRight: e.activeTooltipIndex })}
//                 onMouseUp={zoom.bind(this)}
//             >
//                 <ReferenceLine y={0} stroke="#000" />
//                 <XAxis allowDataOverflow dataKey="name" type="number" domain={[control.left, control.right]}>
//                     <Label value="Date" offset={-15} position="insideBottom"/>
//                 </XAxis>
//                 <Tooltip />
//                 <Bar dataKey="Total Positive" stackId="a" fill="#c3e6cb" />
//                 <Bar dataKey="Total Negative" stackId="a" fill="#f5c6cb" />
//                 <Brush dataKey="name" height={30} stroke="#dee2e6" />
//             </BarChart>
//         </ResponsiveContainer>
//     </>)
// }

// export default ReviewVolumeDistributionBarChart