import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";
import { IChartDropdownOption } from "./IChartDropdownOption";

export interface IBiState {
    chartKind: ChartType;
    selectedChart: IChartDropdownOption;
}
