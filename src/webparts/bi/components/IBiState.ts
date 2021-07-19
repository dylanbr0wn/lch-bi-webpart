import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";
import { IChartDropdownOption } from "./IChartDropdownOption";

export interface IBiState {
    chartKind: ChartType;
    selectedChart: IChartDropdownOption;
    max: MonthData,
    min: MonthData,
    current: MonthData,
    speedoChartReady: boolean
}

type MonthData = {
    NumberEntered: number,
    MonthEntered: string
}
