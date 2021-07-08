import * as React from "react";
import {
    StackedRadialGaugeSeries,
    RadialGauge,
    StackedRadialGaugeLabel,
} from "reaviz";
import { max } from "./utils";

const GaugeChart: React.FunctionComponent = () => {
    const categoryData = [
        {
            key: "Phishing Attack",
            data: 10,
        },
        {
            key: "IDS",
            data: 14,
        },
        {
            key: "Malware",
            data: 5,
        },
        {
            key: "DLP",
            data: 18,
        },
    ];

    const minValue = 0;

    const maxValue = max(categoryData.map((data) => data.data));

    const fillFactor = 0.3;

    const arcPadding = 0.1;

    const height = 300;

    const width = 700;

    const colorScheme = ["#CE003E", "#DF8D03", "#00ECB1", "#9FA9B1"];

    const label = "Security Threats";

    return (
        <RadialGauge
            data={categoryData}
            height={height}
            width={width}
            minValue={minValue}
            maxValue={maxValue}
            series={
                <StackedRadialGaugeSeries
                    arcPadding={arcPadding}
                    fillFactor={fillFactor}
                    colorScheme={colorScheme}
                    label={<StackedRadialGaugeLabel label={label} />}
                />
            }
        />
    );
};

export default GaugeChart;
