import { formattingSettings } from 'powerbi-visuals-utils-formattingmodel';
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
declare class ExpansionSettingsCard extends FormattingSettingsCard {
    constructor(name: any, displayName: any);
    fontFamily: formattingSettings.FontPicker;
    fontSize: formattingSettings.NumUpDown;
    height: formattingSettings.NumUpDown;
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
    opacity: formattingSettings.NumUpDown;
    borderOpacity: formattingSettings.NumUpDown;
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
    height: formattingSettings.NumUpDown;
    opacity: formattingSettings.NumUpDown;
    indentation: formattingSettings.NumUpDown;
    borderOpacity: formattingSettings.NumUpDown;
    visible?: boolean;
    slices: Array<FormattingSettingsSlice>;
}
declare class RowHeadersSettingsCard extends FormattingSettingsCard {
    constructor(name: any, displayName: any);
    enableCard: formattingSettings.ToggleSwitch;
    borderOpacity: formattingSettings.NumUpDown;
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
    opacity: formattingSettings.NumUpDown;
    indentation: formattingSettings.NumUpDown;
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
    borderOpacity: formattingSettings.NumUpDown;
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
    height: formattingSettings.NumUpDown;
    opacity: formattingSettings.NumUpDown;
    visible?: boolean;
    slices: Array<FormattingSettingsSlice>;
}
declare class SpecificRowSettingsCard extends FormattingSettingsCard {
    constructor(name: any, displayName: any);
    visibility: () => void;
    enableCard: formattingSettings.ToggleSwitch;
    savedName: formattingSettings.TextArea;
    height: formattingSettings.NumUpDown;
    opacity: formattingSettings.NumUpDown;
    rowHeaderAlignment: formattingSettings.ItemDropdown;
    rowHeaderBackground: formattingSettings.ColorPicker;
    headerOpacity: formattingSettings.NumUpDown;
    rowHeaderFontColor: formattingSettings.ColorPicker;
    rowHeaderFontFamily: formattingSettings.FontPicker;
    rowHeaderFontSize: formattingSettings.NumUpDown;
    rowHeaderBold: formattingSettings.ToggleSwitch;
    rowHeaderItalic: formattingSettings.ToggleSwitch;
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
    borderOpacity: formattingSettings.NumUpDown;
    rowHeaderIndentation: formattingSettings.NumUpDown;
    indentation: formattingSettings.NumUpDown;
    visible?: boolean;
    slices: Array<FormattingSettingsSlice>;
}
declare class SpecificColumnSettingsCard extends FormattingSettingsCard {
    constructor(name: any, displayName: any);
    enableCard: formattingSettings.ToggleSwitch;
    savedName: formattingSettings.TextArea;
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
    borderOpacity: formattingSettings.NumUpDown;
    opacity: formattingSettings.NumUpDown;
    valuesOpacity: formattingSettings.NumUpDown;
    visible?: boolean;
    slices: Array<FormattingSettingsSlice>;
}
/**
 * visual settings model class
 *
 */
export declare class VisualFormattingSettingsModel extends FormattingSettingsModel {
    expansionCard: ExpansionSettingsCard;
    rowCard: RowSettingsCard;
    rowHeadersCard: RowHeadersSettingsCard;
    columnCard: ColumnSettingsCard;
    colHeadersCard: colHeadersSettingsCard;
    specificRowCard1: SpecificRowSettingsCard;
    specificRowCard2: SpecificRowSettingsCard;
    specificRowCard3: SpecificRowSettingsCard;
    specificRowCard4: SpecificRowSettingsCard;
    specificRowCard5: SpecificRowSettingsCard;
    specificColumnCard0: SpecificColumnSettingsCard;
    specificColumnCard1: SpecificColumnSettingsCard;
    specificColumnCard2: SpecificColumnSettingsCard;
    specificColumnCard3: SpecificColumnSettingsCard;
    specificColumnCard4: SpecificColumnSettingsCard;
    cards: (ColumnSettingsCard | colHeadersSettingsCard | RowSettingsCard | ExpansionSettingsCard | RowHeadersSettingsCard | SpecificColumnSettingsCard | SpecificRowSettingsCard)[];
}
export {};
