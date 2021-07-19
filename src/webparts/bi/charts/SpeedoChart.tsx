import axios from 'axios';
import * as React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
// import { MongoClient } from 'mongodb';
type MonthData = {
    NumberEntered: number,
    MonthEntered: string
}

type SpeedoChartProps = {
    max: MonthData,
    min: MonthData,
    current: MonthData
}

const SpeedoChart = ({max, min, current}: SpeedoChartProps) => {

    const [dataReady, setDataReady] = React.useState(false)

    return (
        <>
        {/* {dataReady &&  */}
            <ReactSpeedometer
            minValue={min.NumberEntered}
            maxValue={max.NumberEntered}
            value={current.NumberEntered}
            needleHeightRatio={0.7}
            forceRender={true}
            segments={3}
            />
        {/* } */}
           
        </>
       
    );
};

export default SpeedoChart;
