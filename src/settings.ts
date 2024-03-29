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

/**
 * This class acts as the settings for the formatting model
 */

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
    displayName: 'Header Indentation',
    value: 20,
  });

  opacity: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'opacity',
    displayName: 'Background Opacity',
    value: 0,
  });

  borderOpacity = new formattingSettings.NumUpDown({
    name: 'borderOpacity',
    displayName: 'Border Opacity',
    value: 100,
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableButtons,
    this.expandUp,
    this.height,
    this.enableIndentation,
    this.indentationValue,
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
    this.borderColor,
    this.borderOpacity,
    this.borderStyle,
    this.borderWidth,
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
    value: 0,
  });

  indentation: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'indentation',
    displayName: 'Indentation',
    value: 0,
  });

  borderOpacity: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'borderOpacity',
      displayName: 'Border Opacity',
      value: 100,
    });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.height,
    this.indentation,
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
    this.borderStyle,
    this.borderColor,
    this.borderOpacity,
  ];
}

class RowHeadersSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  // This function is used to hide the card slices if the enableCard toggle is off
  visibility = function () {
    for (const slice of this.slices) {
      if (slice.name === 'enableCard') {
        continue;
      }

      slice.visible = this.enableCard.value ? true : false;
    }
  };

  enableCard: formattingSettings.ToggleSwitch =
    new formattingSettings.ToggleSwitch({
      name: 'enableCard',
      displayName: 'Enable Formatting',
      value: false,
    });

  borderOpacity: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'borderOpacity',
      displayName: 'Border Opacity',
      value: 100,
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
    value: 0,
  });

  indentation: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'indentation',
    displayName: 'Indentation',
    value: 0,
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableCard,
    this.indentation,
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
    this.borderColor,
    this.borderStyle,
    this.borderWidth,
    this.borderOpacity,
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

  wrapHeaders = new formattingSettings.ToggleSwitch({
    name: 'wrapHeaders',
    displayName: 'Wrap Text - Headers',
    value: true,
  });

  wrapValues = new formattingSettings.ToggleSwitch({
    name: 'wrapValues',
    displayName: 'Wrap Text - Cell Contents',
    value: true,
  });

  enableDrag = new formattingSettings.ToggleSwitch({
    name: 'enableDrag',
    displayName: 'Column Mouse Resize',
    value: true,
  });

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

  enableTotal = new formattingSettings.ToggleSwitch({
    name: 'enableTotal',
    displayName: 'Show Total',
    value: true,
  });

  autoHeaderHeight = new formattingSettings.ToggleSwitch({
    name: 'autoHeaderHeight',
    displayName: 'Wrap Text - Auto Header Height',
    value: true,
  });

  autoRowHeight = new formattingSettings.ToggleSwitch({
    name: 'autoRowHeight',
    displayName: 'Wrap Text - Auto Row Height',
    value: true,
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableAutoWidth,
    this.columnWidth,
    this.enableTotal,
    this.enableDrag,
    this.wrapHeaders,
    this.autoHeaderHeight,
    this.wrapValues,
    this.autoRowHeight,
  ];
}

class colHeadersSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  // This function is used to hide the card slices if the enableCard toggle is off
  visibility = function () {
    for (const slice of this.slices) {
      if (slice.name === 'enableCard') {
        continue;
      }

      slice.visible = this.enableCard.value ? true : false;
    }
  };

  enableCard: formattingSettings.ToggleSwitch =
    new formattingSettings.ToggleSwitch({
      name: 'enableCard',
      displayName: 'Enable Formatting',
      value: true,
    });

  borderOpacity: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'borderOpacity',
      displayName: 'Border Opacity',
      value: 100,
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

  height = new formattingSettings.NumUpDown({
    name: 'height',
    displayName: 'Height',
    value: 25,
  });

  opacity: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'opacity',
    displayName: 'Background Opacity',
    value: 0,
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableCard,
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
    this.enableRightBorder,
    this.enableLeftBorder,
    this.borderWidth,
    this.borderColor,
    this.borderOpacity,
    this.borderStyle,
  ];
}

class SpecificRowSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  // This function is used to hide the card slices if the enableCard toggle is off
  visibility = function () {
    for (const slice of this.slices) {
      if (slice.name === 'enableCard') {
        continue;
      }

      slice.visible = this.enableCard.value ? true : false;
    }
  };

  enableCard: formattingSettings.ToggleSwitch =
    new formattingSettings.ToggleSwitch({
      name: 'enableCard',
      displayName: 'Enable Formatting',
      value: false,
    });

  savedName: formattingSettings.TextArea = new formattingSettings.TextArea({
    name: 'savedName',
    displayName: 'Applicable Rows',
    value: '',
    placeholder:
      'Enter row names by a comma-separation (Without spaces!) like so: \n"EBITDA,OPEX,Net Income" \n without the quotation marks.',
    description:
      'Enter row names by a comma-separation (Without spaces!) like so: \n"EBITDA,OPEX,Net Income" \n without the quotation marks.',
  });

  height: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'height',
    displayName: 'Row Height',
    value: 25,
  });

  opacity: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'opacity',
    displayName: 'Background Opacity',
    value: 0,
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
    displayName: 'Header Background Color',
    value: { value: '#ffffff' },
  });

  headerOpacity: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'headerOpacity',
      displayName: 'Background Opacity',
      value: 0,
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

  borderOpacity: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'borderOpacity',
      displayName: 'Border Opacity',
      value: 100,
    });

  rowHeaderIndentation: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'rowHeaderIndentation',
      displayName: 'Row Header Indentation',
      value: 0,
    });

  indentation: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'indentation',
    displayName: 'Values Indentation',
    value: 0,
  });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableCard,
    this.savedName,
    this.height,
    this.rowHeaderIndentation,
    this.rowHeaderFontFamily,
    this.rowHeaderFontColor,
    this.rowHeaderFontSize,
    this.rowHeaderBold,
    this.rowHeaderItalic,
    this.rowHeaderAlignment,
    this.rowHeaderBackground,
    this.headerOpacity,
    this.indentation,
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
    this.borderOpacity,
  ];
}

class totalSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  // This function is used to hide the card slices if the enableCard toggle is off
  visibility = function () {
    for (const slice of this.slices) {
      if (slice.name === 'enableCard') {
        continue;
      }

      slice.visible = this.enableCard.value ? true : false;
    }
  };

  height: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'height',
    displayName: 'Row Height',
    value: 25,
  });

  opacity: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'opacity',
    displayName: 'Background Opacity',
    value: 0,
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
    displayName: 'Header Background Color',
    value: { value: '#ffffff' },
  });

  headerOpacity: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'headerOpacity',
      displayName: 'Background Opacity',
      value: 0,
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

  borderOpacity: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'borderOpacity',
      displayName: 'Border Opacity',
      value: 100,
    });

  rowHeaderIndentation: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'rowHeaderIndentation',
      displayName: 'Row Header Indentation',
      value: 0,
    });

  indentation: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'indentation',
    displayName: 'Values Indentation',
    value: 0,
  });

  savedName = new formattingSettings.TextInput({
    name: 'savedName',
    displayName: 'Custom Label',
    value: 'Total',
    placeholder: 'Enter a custom label for the total row',
    description: 'Enter a custom label for the total row',
  });

  enableCard: formattingSettings.ToggleSwitch =
    new formattingSettings.ToggleSwitch({
      name: 'enableCard',
      displayName: 'Show Total Row',
      value: true,
    });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableCard,
    this.savedName,
    this.height,
    this.rowHeaderIndentation,
    this.rowHeaderFontFamily,
    this.rowHeaderFontColor,
    this.rowHeaderFontSize,
    this.rowHeaderBold,
    this.rowHeaderItalic,
    this.rowHeaderAlignment,
    this.rowHeaderBackground,
    this.headerOpacity,
    this.indentation,
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
    this.borderOpacity,
  ];
}

class SpecificColumnSettingsCard extends FormattingSettingsCard {
  constructor(name, displayName) {
    super();

    this.name = name;
    this.displayName = displayName;
  }

  // This function is used to hide the card slices if the enableCard toggle is off
  visibility = function () {
    for (const slice of this.slices) {
      if (slice.name === 'enableCard') {
        continue;
      }

      slice.visible = this.enableCard.value ? true : false;
    }
  };

  enableCard: formattingSettings.ToggleSwitch =
    new formattingSettings.ToggleSwitch({
      name: 'enableCard',
      displayName: 'Enable Formatting',
      value: false,
    });

  savedName: formattingSettings.TextArea = new formattingSettings.TextArea({
    name: 'savedName',
    displayName: 'Applicable Columns',
    value: '',
    placeholder:
      'Enter column names by a comma-separation (Without spaces!) like so: \n"EBITDA,OPEX,Net Income" \n without the quotation marks.',
    description:
      'Enter column names by a comma-separation (Without spaces!) like so: \n"EBITDA,OPEX,Net Income" \n without the quotation marks.',
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

  borderOpacity: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'borderOpacity',
      displayName: 'Border Opacity',
      value: 100,
    });

  opacity: formattingSettings.NumUpDown = new formattingSettings.NumUpDown({
    name: 'opacity',
    displayName: 'Background Opacity',
    value: 0,
  });

  valuesOpacity: formattingSettings.NumUpDown =
    new formattingSettings.NumUpDown({
      name: 'valuesOpacity',
      displayName: 'Values Opacity',
      value: 0,
    });

  visible?: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.enableCard,
    this.savedName,
    this.columnWidth,
    this.columnHeaderFontFamily,
    this.columnHeaderFontSize,
    this.columnHeaderFontColor,
    this.columnHeaderBold,
    this.columnHeaderItalic,
    this.columnHeaderAlignment,
    this.columnHeaderBackgroundColor,
    this.opacity,
    this.enableLeftBorder,
    this.enableRightBorder,
    this.borderColor,
    this.borderStyle,
    this.borderWidth,
    this.borderOpacity,
    this.columnFontFamily,
    this.columnFontSize,
    this.columnFontColor,
    this.columnBold,
    this.columnItalic,
    this.columnAlignment,
    this.columnBackgroundColor,
    this.valuesOpacity,
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
  columnCard = new ColumnSettingsCard('columns', 'General Column Formatting');
  colHeadersCard = new colHeadersSettingsCard('colHeaders', 'Column Headers');
  totalCard = new totalSettingsCard('total', 'Total Row');

  specificRowCard1 = new SpecificRowSettingsCard(
    'specificRow0',
    'Specific Rows - 1'
  );
  specificRowCard2 = new SpecificRowSettingsCard(
    'specificRow1',
    'Specific Rows - 2'
  );
  specificRowCard3 = new SpecificRowSettingsCard(
    'specificRow2',
    'Specific Rows - 3'
  );
  specificRowCard4 = new SpecificRowSettingsCard(
    'specificRow3',
    'Specific Rows - 4'
  );
  specificRowCard5 = new SpecificRowSettingsCard(
    'specificRow4',
    'Specific Rows - 5'
  );

  specificColumnCard0 = new SpecificColumnSettingsCard(
    'specificColumn0',
    'Specific Columns - 1'
  );
  specificColumnCard1 = new SpecificColumnSettingsCard(
    'specificColumn1',
    'Specific Columns - 2'
  );
  specificColumnCard2 = new SpecificColumnSettingsCard(
    'specificColumn2',
    'Specific Columns - 3'
  );
  specificColumnCard3 = new SpecificColumnSettingsCard(
    'specificColumn3',
    'Specific Columns - 4'
  );
  specificColumnCard4 = new SpecificColumnSettingsCard(
    'specificColumn4',
    'Specific Columns - 5'
  );

  cards = [
    this.columnCard,
    this.colHeadersCard,
    this.rowCard,
    this.expansionCard,
    this.rowHeadersCard,
    this.totalCard,
    this.specificColumnCard0,
    this.specificColumnCard1,
    this.specificColumnCard2,
    this.specificColumnCard3,
    this.specificColumnCard4,
    this.specificRowCard1,
    this.specificRowCard2,
    this.specificRowCard3,
    this.specificRowCard4,
    this.specificRowCard5,
  ];
}
