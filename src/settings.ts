/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

'use strict';

import { formattingSettings } from 'powerbi-visuals-utils-formattingmodel';

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
import FormattingSettingsGroup = formattingSettings.Group;

let dataView;
const sortedDataViewRows = [];
const sortedDataViewColumns = [];

class ExpansionSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  fontFamily = new formattingSettings.FontPicker({
    name: 'fontFamily',
    displayName: 'Font',
    value: 'Segoe UI',
  });

  fontSize: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'fontSize',
    displayName: 'Text Size',
    value: 13,
  });

  height: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'height',
    displayName: 'Row Height',
    value: 25,
  });

  fontColor = new formattingSettings.ColorPicker({
    name: 'fontColor',
    displayName: 'Font Color',
    value: { value: '#000000' },
  });

  expandUp = new formattingSettings.ToggleSwitch({
    name: 'enableExpansionUp',
    displayName: 'Expand Upwards',
    value: false,
  });

  enableButtons = new formattingSettings.ToggleSwitch({
    name: 'enableButtons',
    displayName: 'Show Buttons',
    value: true,
  });

  enableBold = new formattingSettings.ToggleSwitch({
    name: 'enableBold',
    displayName: 'Bold Row(s)',
    value: true,
  });

  enableItalic = new formattingSettings.ToggleSwitch({
    name: 'enableItalic',
    displayName: 'Italicize Row(s)',
    value: false,
  });

  alignment = new formattingSettings.ItemDropdown({
    name: 'alignment',
    displayName: 'Alignment',
    value: { value: 'flex-end', displayName: 'Right' },

    items: [
      { value: 'flex-start', displayName: 'Left' },
      { value: 'center', displayName: 'Center' },
      { value: 'flex-end', displayName: 'Right' },
    ],
  });

  backgroundColor = new formattingSettings.ColorPicker({
    name: 'backgroundColor',
    displayName: 'Background Color',
    value: { value: '#ffffff' },
  });

  enableTopBorder = new formattingSettings.ToggleSwitch({
    name: 'enableTopBorder',
    displayName: 'Show Top Border',
    value: false,
  });

  enableBottomBorder = new formattingSettings.ToggleSwitch({
    name: 'enableBottomBorder',
    displayName: 'Show Bottom Border',
    value: false,
  });

  borderWidth = new formattingSettings.NumUpDown({
    name: 'borderWidth',
    displayName: 'Border Width',
    value: 1,
  });

  borderColor = new formattingSettings.ColorPicker({
    name: 'borderColor',
    displayName: 'Border Color',
    value: { value: '#000000' },
  });

  borderStyle = new formattingSettings.ItemDropdown({
    name: 'borderStyle',
    displayName: 'Border Style',
    value: { value: 'solid', displayName: 'Solid' },

    items: [
      { value: 'solid', displayName: 'Solid' },
      { value: 'dotted', displayName: 'Dotted' },
      { value: 'dashed', displayName: 'Dashed' },
      { value: 'double', displayName: 'Double' },
      { value: 'groove', displayName: 'Groove' },
      { value: 'ridge', displayName: 'Ridge' },
      { value: 'inset', displayName: 'Inset' },
      { value: 'outset', displayName: 'Outset' },
    ],
  });

  enableIndentation = new formattingSettings.ToggleSwitch({
    name: 'enableIndentation',
    displayName: 'Enable Indentation',
    value: true,
  });

  indentationValue = new formattingSettings.NumUpDown({
    name: 'indentationValue',
    displayName: 'Indentation',
    value: 20,
  });

  opacity: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'opacity',
    displayName: 'Background Opacity',
    value: 100,
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.height,
    this.fontFamily,
    this.fontColor,
    this.fontSize,
    this.enableBold,
    this.enableItalic,
    this.alignment,
    this.backgroundColor,
    this.opacity,
    this.expandUp,
    this.enableButtons,
    this.enableTopBorder,
    this.enableBottomBorder,
    this.borderWidth,
    this.borderColor,
    this.borderStyle,
    this.enableIndentation,
    this.indentationValue,
  ];
}

class RowSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  fontFamily = new formattingSettings.FontPicker({
    name: 'fontFamily',
    displayName: 'Font',
    value: 'Segoe UI',
  });

  fontSize: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'fontSize',
    displayName: 'Text Size',
    value: 13,
  });

  fontColor = new formattingSettings.ColorPicker({
    name: 'fontColor',
    displayName: 'Font Color',
    value: { value: '#000000' },
  });

  enableBold = new formattingSettings.ToggleSwitch({
    name: 'enableBold',
    displayName: 'Bold Row(s)',
    value: false,
  });

  enableItalic = new formattingSettings.ToggleSwitch({
    name: 'enableItalic',
    displayName: 'Italicize Row(s)',
    value: false,
  });

  alignment = new formattingSettings.ItemDropdown({
    name: 'alignment',
    displayName: 'Alignment',
    value: { value: 'flex-end', displayName: 'Right' },

    items: [
      { value: 'flex-start', displayName: 'Left' },
      { value: 'center', displayName: 'Center' },
      { value: 'flex-end', displayName: 'Right' },
    ],
  });

  backgroundColor = new formattingSettings.ColorPicker({
    name: 'backgroundColor',
    displayName: 'Background Color',
    value: { value: '#ffffff' },
  });

  enableTopBorder = new formattingSettings.ToggleSwitch({
    name: 'enableTopBorder',
    displayName: 'Show Top Border',
    value: false,
  });

  enableBottomBorder = new formattingSettings.ToggleSwitch({
    name: 'enableBottomBorder',
    displayName: 'Show Bottom Border',
    value: false,
  });

  borderWidth = new formattingSettings.NumUpDown({
    name: 'borderWidth',
    displayName: 'Border Width',
    value: 1,
  });

  borderColor = new formattingSettings.ColorPicker({
    name: 'borderColor',
    displayName: 'Border Color',
    value: { value: '#000000' },
  });

  borderStyle = new formattingSettings.ItemDropdown({
    name: 'borderStyle',
    displayName: 'Border Style',
    value: { value: 'solid', displayName: 'Solid' },

    items: [
      { value: 'solid', displayName: 'Solid' },
      { value: 'dotted', displayName: 'Dotted' },
      { value: 'dashed', displayName: 'Dashed' },
      { value: 'double', displayName: 'Double' },
      { value: 'groove', displayName: 'Groove' },
      { value: 'ridge', displayName: 'Ridge' },
      { value: 'inset', displayName: 'Inset' },
      { value: 'outset', displayName: 'Outset' },
    ],
  });

  height: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'height',
    displayName: 'Row Height',
    value: 25,
  });

  opacity: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'opacity',
    displayName: 'Background Opacity',
    value: 100,
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.height,
    this.fontFamily,
    this.fontColor,
    this.fontSize,
    this.enableBold,
    this.enableItalic,
    this.alignment,
    this.backgroundColor,
    this.opacity,
    this.enableTopBorder,
    this.enableBottomBorder,
    this.borderWidth,
    this.borderColor,
    this.borderStyle,
  ];
}

class RowHeadersSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  enableCard: formattingSettings.ToggleSwitch =
    new formattingSettings.ToggleSwitch({
      name: 'enableCard',
      displayName: 'Enable Formatting',
      value: false,
    });

  fontFamily = new formattingSettings.FontPicker({
    name: 'fontFamily',
    displayName: 'Font',
    value: 'Segoe UI',
  });

  fontSize: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'fontSize',
    displayName: 'Text Size',
    value: 13,
  });

  fontColor = new formattingSettings.ColorPicker({
    name: 'fontColor',
    displayName: 'Font Color',
    value: { value: '#000000' },
  });

  enableBold = new formattingSettings.ToggleSwitch({
    name: 'enableBold',
    displayName: 'Bold Row(s)',
    value: false,
  });

  enableItalic = new formattingSettings.ToggleSwitch({
    name: 'enableItalic',
    displayName: 'Italicize Row(s)',
    value: false,
  });

  alignment = new formattingSettings.ItemDropdown({
    name: 'alignment',
    displayName: 'Alignment',
    value: { value: 'flex-end', displayName: 'Right' },

    items: [
      { value: 'flex-start', displayName: 'Left' },
      { value: 'center', displayName: 'Center' },
      { value: 'flex-end', displayName: 'Right' },
    ],
  });

  backgroundColor = new formattingSettings.ColorPicker({
    name: 'backgroundColor',
    displayName: 'Background Color',
    value: { value: '#ffffff' },
  });

  enableTopBorder = new formattingSettings.ToggleSwitch({
    name: 'enableTopBorder',
    displayName: 'Show Top Border',
    value: false,
  });

  enableBottomBorder = new formattingSettings.ToggleSwitch({
    name: 'enableBottomBorder',
    displayName: 'Show Bottom Border',
    value: false,
  });

  enableRightBorder = new formattingSettings.ToggleSwitch({
    name: 'enableRightBorder',
    displayName: 'Show Right Border',
    value: true,
  });

  borderWidth = new formattingSettings.NumUpDown({
    name: 'borderWidth',
    displayName: 'Border Width',
    value: 1,
  });

  borderColor = new formattingSettings.ColorPicker({
    name: 'borderColor',
    displayName: 'Border Color',
    value: { value: '#000000' },
  });

  borderStyle = new formattingSettings.ItemDropdown({
    name: 'borderStyle',
    displayName: 'Border Style',
    value: { value: 'solid', displayName: 'Solid' },

    items: [
      { value: 'solid', displayName: 'Solid' },
      { value: 'dotted', displayName: 'Dotted' },
      { value: 'dashed', displayName: 'Dashed' },
      { value: 'double', displayName: 'Double' },
      { value: 'groove', displayName: 'Groove' },
      { value: 'ridge', displayName: 'Ridge' },
      { value: 'inset', displayName: 'Inset' },
      { value: 'outset', displayName: 'Outset' },
    ],
  });

  opacity: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'opacity',
    displayName: 'Background Opacity',
    value: 100,
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableCard,
    this.fontFamily,
    this.fontColor,
    this.fontSize,
    this.enableBold,
    this.enableItalic,
    this.alignment,
    this.backgroundColor,
    this.opacity,
    this.enableTopBorder,
    this.enableBottomBorder,
    this.enableRightBorder,
    this.borderWidth,
    this.borderColor,
    this.borderStyle,
  ];
}

/**
 * Column settings class
 *
 */

class ColumnSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  enableAutoWidth = new formattingSettings.ToggleSwitch({
    name: 'autoSizeColumns',
    displayName: 'Auto Width',
    value: true,
  });

  columnWidth = new formattingSettings.NumUpDown({
    name: 'columnWidth',
    displayName: 'Column Width',
    value: 100,
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableAutoWidth,
    this.columnWidth,
  ];
}

class colHeadersSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  enableCard: formattingSettings.ToggleSwitch =
    new formattingSettings.ToggleSwitch({
      name: 'enableCard',
      displayName: 'Enable Formatting',
      value: false,
    });

  fontFamily = new formattingSettings.FontPicker({
    name: 'fontFamily',
    displayName: 'Font',
    value: 'Segoe UI',
  });

  fontSize: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'fontSize',
    displayName: 'Text Size',
    value: 13,
  });

  fontColor = new formattingSettings.ColorPicker({
    name: 'fontColor',
    displayName: 'Font Color',
    value: { value: '#000000' },
  });

  enableBold = new formattingSettings.ToggleSwitch({
    name: 'enableBold',
    displayName: 'Bold Row(s)',
    value: false,
  });

  enableItalic = new formattingSettings.ToggleSwitch({
    name: 'enableItalic',
    displayName: 'Italicize Row(s)',
    value: false,
  });

  alignment = new formattingSettings.ItemDropdown({
    name: 'alignment',
    displayName: 'Alignment',
    value: { value: 'flex-end', displayName: 'Right' },

    items: [
      { value: 'flex-start', displayName: 'Left' },
      { value: 'center', displayName: 'Center' },
      { value: 'flex-end', displayName: 'Right' },
    ],
  });

  backgroundColor = new formattingSettings.ColorPicker({
    name: 'backgroundColor',
    displayName: 'Background Color',
    value: { value: '#ffffff' },
  });

  enableTopBorder = new formattingSettings.ToggleSwitch({
    name: 'enableTopBorder',
    displayName: 'Show Top Border',
    value: false,
  });

  enableBottomBorder = new formattingSettings.ToggleSwitch({
    name: 'enableBottomBorder',
    displayName: 'Show Bottom Border',
    value: false,
  });

  enableRightBorder = new formattingSettings.ToggleSwitch({
    name: 'enableRightBorder',
    displayName: 'Show Right Border',
    value: false,
  });

  enableLeftBorder = new formattingSettings.ToggleSwitch({
    name: 'enableLeftBorder',
    displayName: 'Show Left Border',
    value: false,
  });

  borderWidth = new formattingSettings.NumUpDown({
    name: 'borderWidth',
    displayName: 'Border Width',
    value: 1,
  });

  borderColor = new formattingSettings.ColorPicker({
    name: 'borderColor',
    displayName: 'Border Color',
    value: { value: '#000000' },
  });

  borderStyle = new formattingSettings.ItemDropdown({
    name: 'borderStyle',
    displayName: 'Border Style',
    value: { value: 'solid', displayName: 'Solid' },

    items: [
      { value: 'solid', displayName: 'Solid' },
      { value: 'dotted', displayName: 'Dotted' },
      { value: 'dashed', displayName: 'Dashed' },
      { value: 'double', displayName: 'Double' },
      { value: 'groove', displayName: 'Groove' },
      { value: 'ridge', displayName: 'Ridge' },
      { value: 'inset', displayName: 'Inset' },
      { value: 'outset', displayName: 'Outset' },
    ],
  });

  headerHeight = new formattingSettings.NumUpDown({
    name: 'headerHeight',
    displayName: 'Header Height',
    value: 25,
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableCard,
    this.fontFamily,
    this.fontColor,
    this.fontSize,
    this.enableBold,
    this.enableItalic,
    this.alignment,
    this.backgroundColor,
    this.enableTopBorder,
    this.enableBottomBorder,
    this.enableRightBorder,
    this.enableLeftBorder,
    this.borderWidth,
    this.borderColor,
    this.borderStyle,
    this.headerHeight,
  ];
}

class SpecificRowSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  enableCard: formattingSettings.ToggleSwitch =
    new formattingSettings.ToggleSwitch({
      name: 'enableCard',
      displayName: 'Enable Formatting',
      value: false,
    });

  height: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'height',
    displayName: 'Row Height',
    value: 25,
  });

  opacity: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'opacity',
    displayName: 'Background Opacity',
    value: 100,
  });

  rowHeaderAlignment = new formattingSettings.ItemDropdown({
    name: 'rowHeaderAlignment',
    displayName: 'Row Header Alignment',
    value: { value: 'flex-end', displayName: 'Right' },

    items: [
      { value: 'flex-start', displayName: 'Left' },
      { value: 'center', displayName: 'Center' },
      { value: 'flex-end', displayName: 'Right' },
    ],
  });

  rowHeaderBackground = new formattingSettings.ColorPicker({
    name: 'rowHeaderBackground',
    displayName: 'Row Header Background Color',
    value: { value: '#ffffff' },
  });

  rowHeaderFontColor = new formattingSettings.ColorPicker({
    name: 'rowHeaderFontColor',
    displayName: 'Row Header Font Color',
    value: { value: '#000000' },
  });

  rowHeaderFontFamily = new formattingSettings.FontPicker({
    name: 'rowHeaderFontFamily',
    displayName: 'Row Header Font',
    value: 'Segoe UI',
  });

  rowHeaderFontSize = new formattingSettings.NumUpDown({
    name: 'rowHeaderFontSize',
    displayName: 'Row Header Font Size',
    value: 13,
  });

  rowHeaderBold = new formattingSettings.ToggleSwitch({
    name: 'rowHeaderBold',
    displayName: 'Bold Row Header',
    value: false,
  });

  rowHeaderItalic = new formattingSettings.ToggleSwitch({
    name: 'rowHeaderItalic',
    displayName: 'Italicize Row Header',
    value: false,
  });

  fontFamily = new formattingSettings.FontPicker({
    name: 'fontFamily',
    displayName: 'Values Font',
    value: 'Segoe UI',
  });

  fontSize: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'fontSize',
    displayName: 'Values Text Size',
    value: 13,
  });

  fontColor = new formattingSettings.ColorPicker({
    name: 'fontColor',
    displayName: 'Values Font Color',
    value: { value: '#000000' },
  });

  enableBold = new formattingSettings.ToggleSwitch({
    name: 'enableBold',
    displayName: 'Bold Values ',
    value: false,
  });

  enableItalic = new formattingSettings.ToggleSwitch({
    name: 'enableItalic',
    displayName: 'Italicize Values',
    value: false,
  });

  alignment = new formattingSettings.ItemDropdown({
    name: 'alignment',
    displayName: 'Values Alignment',
    value: { value: 'flex-end', displayName: 'Right' },

    items: [
      { value: 'flex-start', displayName: 'Left' },
      { value: 'center', displayName: 'Center' },
      { value: 'flex-end', displayName: 'Right' },
    ],
  });

  backgroundColor = new formattingSettings.ColorPicker({
    name: 'backgroundColor',
    displayName: 'Values Background Color',
    value: { value: '#ffffff' },
  });

  enableTopBorder = new formattingSettings.ToggleSwitch({
    name: 'enableTopBorder',
    displayName: 'Show Top Border',
    value: false,
  });

  enableBottomBorder = new formattingSettings.ToggleSwitch({
    name: 'enableBottomBorder',
    displayName: 'Show Bottom Border',
    value: false,
  });

  borderWidth = new formattingSettings.NumUpDown({
    name: 'borderWidth',
    displayName: 'Border Width',
    value: 1,
  });

  borderColor = new formattingSettings.ColorPicker({
    name: 'borderColor',
    displayName: 'Border Color',
    value: { value: '#000000' },
  });

  borderStyle = new formattingSettings.ItemDropdown({
    name: 'borderStyle',
    displayName: 'Border Style',
    value: { value: 'solid', displayName: 'Solid' },

    items: [
      { value: 'solid', displayName: 'Solid' },
      { value: 'dotted', displayName: 'Dotted' },
      { value: 'dashed', displayName: 'Dashed' },
      { value: 'double', displayName: 'Double' },
      { value: 'groove', displayName: 'Groove' },
      { value: 'ridge', displayName: 'Ridge' },
      { value: 'inset', displayName: 'Inset' },
      { value: 'outset', displayName: 'Outset' },
    ],
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableCard,
    this.height,
    this.rowHeaderFontFamily,
    this.rowHeaderFontColor,
    this.rowHeaderFontSize,
    this.rowHeaderBold,
    this.rowHeaderItalic,
    this.rowHeaderAlignment,
    this.rowHeaderBackground,
    this.fontFamily,
    this.fontColor,
    this.fontSize,
    this.enableBold,
    this.enableItalic,
    this.alignment,
    this.backgroundColor,
    this.enableTopBorder,
    this.enableBottomBorder,
    this.borderWidth,
    this.borderColor,
    this.borderStyle,
  ];
}

class SpecificColumnSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  enableCard: formattingSettings.ToggleSwitch =
    new formattingSettings.ToggleSwitch({
      name: 'enableCard',
      displayName: 'Enable Formatting',
      value: false,
    });

  columnWidth = new formattingSettings.NumUpDown({
    name: 'columnWidth',
    displayName: 'Column Width',
    value: 100,
  });

  enableRightBorder = new formattingSettings.ToggleSwitch({
    name: 'enableRightBorder',
    displayName: 'Show Right Border',
    value: true,
  });

  enableLeftBorder = new formattingSettings.ToggleSwitch({
    name: 'enableLeftBorder',
    displayName: 'Show Left Border',
    value: true,
  });

  borderColor = new formattingSettings.ColorPicker({
    name: 'borderColor',
    displayName: 'Border Color',
    value: { value: '#000000' },
  });

  borderStyle = new formattingSettings.ItemDropdown({
    name: 'borderStyle',
    displayName: 'Border Style',
    value: { value: 'solid', displayName: 'Solid' },

    items: [
      { value: 'solid', displayName: 'Solid' },
      { value: 'dotted', displayName: 'Dotted' },
      { value: 'dashed', displayName: 'Dashed' },
      { value: 'double', displayName: 'Double' },
      { value: 'groove', displayName: 'Groove' },
      { value: 'ridge', displayName: 'Ridge' },
      { value: 'inset', displayName: 'Inset' },
      { value: 'outset', displayName: 'Outset' },
    ],
  });

  borderWidth = new formattingSettings.NumUpDown({
    name: 'borderWidth',
    displayName: 'Border Width',
    value: 1,
  });

  columnFontFamily = new formattingSettings.FontPicker({
    name: 'columnFontFamily',
    displayName: 'Column Font',
    value: 'Segoe UI',
  });

  columnFontSize = new formattingSettings.NumUpDown({
    name: 'columnFontSize',
    displayName: 'Column Font Size',
    value: 13,
  });

  columnFontColor = new formattingSettings.ColorPicker({
    name: 'columnFontColor',
    displayName: 'Column Font Color',
    value: { value: '#000000' },
  });

  columnBold = new formattingSettings.ToggleSwitch({
    name: 'columnBold',
    displayName: 'Bold Column',
    value: false,
  });

  columnItalic = new formattingSettings.ToggleSwitch({
    name: 'columnItalic',
    displayName: 'Italicize Column',
    value: false,
  });

  columnAlignment = new formattingSettings.ItemDropdown({
    name: 'columnAlignment',
    displayName: 'Column Alignment',
    value: { value: 'flex-end', displayName: 'Right' },

    items: [
      { value: 'flex-start', displayName: 'Left' },
      { value: 'center', displayName: 'Center' },
      { value: 'flex-end', displayName: 'Right' },
    ],
  });

  columnBackgroundColor = new formattingSettings.ColorPicker({
    name: 'columnBackground',
    displayName: 'Column Background Color',
    value: { value: '#ffffff' },
  });

  columnHeaderFontFamily = new formattingSettings.FontPicker({
    name: 'columnHeaderFontFamily',
    displayName: 'Column Header Font',
    value: 'Segoe UI',
  });

  columnHeaderFontSize = new formattingSettings.NumUpDown({
    name: 'columnHeaderFontSize',
    displayName: 'Column Header Font Size',
    value: 13,
  });

  columnHeaderFontColor = new formattingSettings.ColorPicker({
    name: 'columnHeaderFontColor',
    displayName: 'Column Header Font Color',
    value: { value: '#000000' },
  });

  columnHeaderBold = new formattingSettings.ToggleSwitch({
    name: 'columnHeaderBold',
    displayName: 'Bold Column Header',
    value: false,
  });

  columnHeaderItalic = new formattingSettings.ToggleSwitch({
    name: 'columnHeaderItalic',
    displayName: 'Italicize Column Header',
    value: false,
  });

  columnHeaderAlignment = new formattingSettings.ItemDropdown({
    name: 'columnHeaderAlignment',
    displayName: 'Column Header Alignment',
    value: { value: 'flex-end', displayName: 'Right' },

    items: [
      { value: 'flex-start', displayName: 'Left' },
      { value: 'center', displayName: 'Center' },
      { value: 'flex-end', displayName: 'Right' },
    ],
  });

  columnHeaderBackgroundColor = new formattingSettings.ColorPicker({
    name: 'columnHeaderBackground',
    displayName: 'Column Header Background Color',
    value: { value: '#ffffff' },
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableCard,
    this.columnWidth,
    this.enableRightBorder,
    this.enableLeftBorder,
    this.borderColor,
    this.borderStyle,
    this.borderWidth,
    this.columnFontFamily,
    this.columnFontSize,
    this.columnFontColor,
    this.columnBold,
    this.columnItalic,
    this.columnAlignment,
    this.columnBackgroundColor,
    this.columnHeaderFontFamily,
    this.columnHeaderFontSize,
    this.columnHeaderFontColor,
    this.columnHeaderBold,
    this.columnHeaderItalic,
    this.columnHeaderAlignment,
    this.columnHeaderBackgroundColor,
  ];
}

/**
 * visual settings model class
 *
 */
export class VisualFormattingSettingsModel extends FormattingSettingsModel {
  // Create formatting settings model formatting cards
  expansionCard = new ExpansionSettingsCard('expansion', 'Row Expansion');
  rowCard = new RowSettingsCard('rows', 'Row Formatting');
  rowHeadersCard = new RowHeadersSettingsCard('rowHeaders', 'Row Headers');
  columnCard = new ColumnSettingsCard('columns', 'Column Formatting');
  colHeadersCard = new colHeadersSettingsCard('colHeaders', 'Column Headers');
  specificColumnCard = new SpecificColumnSettingsCard(
    'specificColumn',
    'Specific Column'
  );

  cards = [
    this.columnCard,
    this.rowCard,
    this.expansionCard,
    this.rowHeadersCard,
    this.colHeadersCard,
    this.specificColumnCard,
  ];

  constructor() {
    super();

    // Remove Specific Column Card that for some reason has to be added up there otherwise the loop for all specific columns won't work
    this.cards.pop();

    // Sort the dataview to always get a predictable specific row order & column order otherwise sorting via powerBi will mess up the settings
    sortDataViewRows();
    sortDataViewColumns();

    // Row iterator for rows
    let rowIterator = 0;

    // Dynamically add all parent rows as a card
    for (const child of sortedDataViewRows) {
      if (child === undefined) {
        this.cards.push(
          new SpecificRowSettingsCard(`specificRow${rowIterator}`, `Row Total`)
        );
      }
      // Else add all the cards
      this.cards.push(
        new SpecificRowSettingsCard(`specificRow${rowIterator}`, `Row ${child}`)
      );

      rowIterator++;
    }

    // Remove undefined card
    this.cards.pop();

    // Row iterator for columns
    let columnIterator = 0;

    // Dynamically add all parent rows as a card
    for (const child of sortedDataViewColumns) {
      this.cards.push(
        new SpecificColumnSettingsCard(
          `specificColumn${columnIterator}`,
          `Column ${child}`
        )
      );

      columnIterator++;
    }
  }
}

// Set dataView function
export function setDataView(data) {
  dataView = data;
}

function sortDataViewRows() {
  sortedDataViewRows.length = 0;

  // Grab the matrix row children
  const matrixRows = dataView.matrix.rows.root.children;

  // Loop through them and sort them alphabetically and append to sortedDataView
  for (const child of matrixRows) {
    sortedDataViewRows.push(child.value);
  }

  // Sort the array alphabetically descending
  sortedDataViewRows.sort();
}

function sortDataViewColumns() {
  sortedDataViewColumns.length = 0;

  // Grab the matrix row children
  const matrixColumns = dataView.metadata.columns;

  // Loop through them and sort them alphabetically and append to sortedDataView
  for (const child of matrixColumns) {
    sortedDataViewColumns.push(child.displayName);
  }

  // Sort the array alphabetically descending
  sortedDataViewColumns.sort();
}
