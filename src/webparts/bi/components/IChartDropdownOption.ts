import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";
import { BiChartType } from "./BiChartType";

export interface IChartDropdownOption extends IDropdownOption {
    chartType: BiChartType;
}
