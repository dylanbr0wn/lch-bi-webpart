import * as React from "react";
import styles from "./Bi.module.scss";
import { IBiProps } from "./IBiProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
    ChartControl,
    ChartType,
} from "@pnp/spfx-controls-react/lib/ChartControl";
import { IChartControlProps } from "@pnp/spfx-controls-react/lib/ChartControl";
import { Card, CardItem } from "@fluentui/react-cards";
import { IBiState } from "./IBiState";
import {
    Dropdown,
    DropdownMenuItemType,
    IDropdownStyles,
    IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import { IChartDropdownOption } from "./IChartDropdownOption";
import GChart from "react-gauge-chart";
import { BiChartType } from "./BiChartType";
import GaugeChart from "../charts/GaugeChart";
import HeatmapChart from "../charts/HeatMap";
import SpeedoChart from "../charts/SpeedoChart";

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const Gauge: BiChartType = "gauge";
const HeatMap: BiChartType = "heatmap";

const dropdownControlledExampleOptions = [
    {
        key: "types",
        text: "Chart Types",
        itemType: DropdownMenuItemType.Header,
    },
    { key: "bar", text: "Bar Chart", chartType: ChartType.Bar },
    { key: "doughnut", text: "Doughnut Chart", chartType: ChartType.Doughnut },
    { key: "gauge", text: "Gauge Chart", chartType: Gauge },
    { key: "heatmap", text: "Heat Map", chartType: HeatMap },
];

export default class Bi extends React.Component<IBiProps, IBiState> {
    public constructor(props: IBiProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            chartKind: ChartType.Bar,
            selectedChart: {
                key: "bar",
                text: "Bar Chart",
                chartType: ChartType.Bar,
            },
        };
    }

    public onChange(
        event: React.FormEvent<HTMLDivElement>,
        selectedChart: IChartDropdownOption
    ): void {
        this.setState({
            selectedChart,
        });
    }

    public render(): React.ReactElement<IBiProps> {
        const cardStyle = {
            root: {
                width: "100%",
                padding: 10,
                maxWidth: "screen",
            },
        };

        const donutData = {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                    label: "My First Dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
            ],
        };
        let { selectedChart } = this.state;
        return (
            <Card styles={cardStyle}>
                <CardItem>
                    {/* {selectedChart.chartType === ChartType.Bar && (
                        <ChartControl
                            type={ChartType.Bar}
                            data={{
                                labels: [
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                ],
                                datasets: [
                                    {
                                        label: "My First dataset",
                                        data: [65, 59, 80, 81, 56, 55, 40],
                                    },
                                ],
                            }}
                        />
                    )}
                    {selectedChart.chartType === ChartType.Doughnut && (
                        <ChartControl
                            type={ChartType.Doughnut}
                            data={{
                                labels: [
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                ],
                                datasets: [
                                    {
                                        label: "My First dataset",
                                        data: [65, 59, 80, 81, 56, 55, 40],
                                    },
                                ],
                            }}
                        />
                    )}

                    {selectedChart.chartType === Gauge && <GaugeChart />}
                    {selectedChart.chartType === HeatMap && <HeatmapChart height={300} width={700}  />} */}
                </CardItem>
                {/* <CardItem>
                    <Dropdown
                        label="Select Chart Type"
                        selectedKey={
                            selectedChart ? selectedChart.key : undefined
                        }
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.onChange}
                        placeholder="Select an option"
                        options={dropdownControlledExampleOptions}
                        styles={dropdownStyles}
                    />
                </CardItem> */}
                <SpeedoChart />
            </Card>
        );
    }
}
