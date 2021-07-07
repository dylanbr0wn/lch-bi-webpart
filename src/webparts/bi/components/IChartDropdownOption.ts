import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

export interface IChartDropdownOption extends IDropdownOption {
    chartType: ChartType;
}
