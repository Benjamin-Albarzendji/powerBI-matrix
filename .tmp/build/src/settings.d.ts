import { formattingSettings } from 'powerbi-visuals-utils-formattingmodel';
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
declare class ExpansionSettingsCard extends FormattingSettingsCard {
    constructor(name: any, displayName: any);
    fontFamily: formattingSettings.FontPicker;
    fontSize: formattingSettings.NumUpDown;
    fontColor: formattingSettings.ColorPicker;
    expandUp: formattingSettings.ToggleSwitch;
    enableButtons: formattingSettings.ToggleSwitch;
    enableBold: formattingSettings.ToggleSwitch;
    enableItalic: formattingSettings.ToggleSwitch;
    alignment: formattingSettings.ItemDropdown;
    backgroundColor: formattingSettings.ColorPicker;
    enableTopBorder: formattingSettings.ToggleSwitch;
    enableBottomBorder: formattingSettings.ToggleSwitch;
    borderWidth: formattingSettings.NumUpDown;
    borderColor: formattingSettings.ColorPicker;
    borderStyle: formattingSettings.ItemDropdown;
    enableIndentation: formattingSettings.ToggleSwitch;
    indentationValue: formattingSettings.NumUpDown;
    visible?: boolean;
    slices: Array<FormattingSettingsSlice>;
}
declare class RowSettingsCard extends FormattingSettingsCard {
    constructor(name: any, displayName: any);
    fontFamily: formattingSettings.FontPicker;
    fontSize: formattingSettings.NumUpDown;
    fontColor: formattingSettings.ColorPicker;
    enableBold: formattingSettings.ToggleSwitch;
    enableItalic: formattingSettings.ToggleSwitch;
    alignment: formattingSettings.ItemDropdown;
    backgroundColor: formattingSettings.ColorPicker;
    enableTopBorder: formattingSettings.ToggleSwitch;
    enableBottomBorder: formattingSettings.ToggleSwitch;
    borderWidth: formattingSettings.NumUpDown;
    borderColor: formattingSettings.ColorPicker;
    borderStyle: formattingSettings.ItemDropdown;
    visible?: boolean;
    slices: Array<FormattingSettingsSlice>;
}
declare class RowHeadersSettingsCard extends FormattingSettingsCard {
    constructor(name: any, displayName: any);
    enableCard: formattingSettings.ToggleSwitch;
    fontFamily: formattingSettings.FontPicker;
    fontSize: formattingSettings.NumUpDown;
    fontColor: formattingSettings.ColorPicker;
    enableBold: formattingSettings.ToggleSwitch;
    enableItalic: formattingSettings.ToggleSwitch;
    alignment: formattingSettings.ItemDropdown;
    backgroundColor: formattingSettings.ColorPicker;
    enableTopBorder: formattingSettings.ToggleSwitch;
    enableBottomBorder: formattingSettings.ToggleSwitch;
    enableRightBorder: formattingSettings.ToggleSwitch;
    borderWidth: formattingSettings.NumUpDown;
    borderColor: formattingSettings.ColorPicker;
    borderStyle: formattingSettings.ItemDropdown;
    visible?: boolean;
    slices: Array<FormattingSettingsSlice>;
}
/**
 * Column settings class
 *
 */
declare class ColumnSettingsCard extends FormattingSettingsCard {
    constructor(name: any, displayName: any);
    enableAutoWidth: formattingSettings.ToggleSwitch;
    columnWidth: formattingSettings.NumUpDown;
    visible?: boolean;
    slices: Array<FormattingSettingsSlice>;
}
declare class colHeadersSettingsCard extends FormattingSettingsCard {
    constructor(name: any, displayName: any);
    enableCard: formattingSettings.ToggleSwitch;
    fontFamily: formattingSettings.FontPicker;
    fontSize: formattingSettings.NumUpDown;
    fontColor: formattingSettings.ColorPicker;
    enableBold: formattingSettings.ToggleSwitch;
    enableItalic: formattingSettings.ToggleSwitch;
    alignment: formattingSettings.ItemDropdown;
    backgroundColor: formattingSettings.ColorPicker;
    enableTopBorder: formattingSettings.ToggleSwitch;
    enableBottomBorder: formattingSettings.ToggleSwitch;
    enableRightBorder: formattingSettings.ToggleSwitch;
    enableLeftBorder: formattingSettings.ToggleSwitch;
    borderWidth: formattingSettings.NumUpDown;
    borderColor: formattingSettings.ColorPicker;
    borderStyle: formattingSettings.ItemDropdown;
    headerHeight: formattingSettings.NumUpDown;
    visible?: boolean;
    slices: Array<FormattingSettingsSlice>;
}
declare class SpecificColumnSettingsCard extends FormattingSettingsCard {
    constructor(name: any, displayName: any);
    enableCard: formattingSettings.ToggleSwitch;
    columnWidth: formattingSettings.NumUpDown;
    enableRightBorder: formattingSettings.ToggleSwitch;
    enableLeftBorder: formattingSettings.ToggleSwitch;
    borderColor: formattingSettings.ColorPicker;
    borderStyle: formattingSettings.ItemDropdown;
    borderWidth: formattingSettings.NumUpDown;
    columnFontFamily: formattingSettings.FontPicker;
    columnFontSize: formattingSettings.NumUpDown;
    columnFontColor: formattingSettings.ColorPicker;
    columnBold: formattingSettings.ToggleSwitch;
    columnItalic: formattingSettings.ToggleSwitch;
    columnAlignment: formattingSettings.ItemDropdown;
    columnBackgroundColor: formattingSettings.ColorPicker;
    columnHeaderFontFamily: formattingSettings.FontPicker;
    columnHeaderFontSize: formattingSettings.NumUpDown;
    columnHeaderFontColor: formattingSettings.ColorPicker;
    columnHeaderBold: formattingSettings.ToggleSwitch;
    columnHeaderItalic: formattingSettings.ToggleSwitch;
    columnHeaderAlignment: formattingSettings.ItemDropdown;
    columnHeaderBackgroundColor: formattingSettings.ColorPicker;
    visible?: boolean;
    slices: Array<FormattingSettingsSlice>;
}
/**
 * visual settings model class
 *
 */
export declare class VisualFormattingSettingsModel extends FormattingSettingsModel {
    3: any;
    expansionCard: ExpansionSettingsCard;
    rowCard: RowSettingsCard;
    rowHeadersCard: RowHeadersSettingsCard;
    columnCard: ColumnSettingsCard;
    colHeadersCard: colHeadersSettingsCard;
    specificColumnCard: SpecificColumnSettingsCard;
    cards: (ColumnSettingsCard | RowSettingsCard | ExpansionSettingsCard | RowHeadersSettingsCard | colHeadersSettingsCard | SpecificColumnSettingsCard)[];
    constructor();
}
export declare function setDataView(data: any): void;
export {};