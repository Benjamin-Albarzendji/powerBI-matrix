'use strict';

// Power BI Classes
import powerbi from 'powerbi-visuals-api';
import powerbiVisualsApi from 'powerbi-visuals-api';
import { FormattingSettingsService } from 'powerbi-visuals-utils-formattingmodel';

// Power BI API Interfaces
import DataView = powerbi.DataView;
import VisualEnumerationInstanceKinds = powerbiVisualsApi.VisualEnumerationInstanceKinds;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DataViewObjects = powerbi.DataViewObjects;
import DataViewObject = powerbi.DataViewObject;
import DataViewMatrix = powerbi.DataViewMatrix;
import DataViewMatrixNode = powerbi.DataViewMatrixNode;
import DataViewHierarchyLevel = powerbi.DataViewHierarchyLevel;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import ISelectionId = powerbi.visuals.ISelectionId;
import ISelectionIdBuilder = powerbi.visuals.ISelectionIdBuilder;

// Formatting model
import { VisualFormattingSettingsModel, setDataView } from './settings';

// Style sheet
import './../style/visual.less';

// 3rd party imports imports
import * as d3 from 'd3';
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

// Own imports
import { DataViewObjectPropertyReference, Selector } from './common';
import { MatrixDataviewHtmlFormatter } from './matrixDataviewHtmlFormatter';
import { SubtotalProperties } from './subtotalProperties';
import { Matrix } from './Matrix';

export class Visual implements IVisual {
  private target: HTMLElement;
  private dataView: DataView;
  private host: IVisualHost;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;
  private selectionManager: ISelectionManager;

  constructor(options: VisualConstructorOptions) {
    console.log('Visual constructor', options);
    // Formatting Service
    this.formattingSettingsService = new FormattingSettingsService();

    // Root element
    this.target = options.element;

    // Host and Selection Manager
    this.host = options.host;
    this.selectionManager = this.host.createSelectionManager();
    // this.handleContextMenu();

    // Do we need this?
    this.target.style.overflowY = 'auto';
  }

  public update(options: VisualUpdateOptions) {
    console.log('Selection Manager', this.selectionManager);
    console.log('Update Options', options);
    console.log('Host object', this.host);

    // The Host
    const host = this.host;

    // The Selection Manager
    const selectionManager = this.selectionManager;

    // The Data view
    const dataView: DataView = options.dataViews[0];

    // The matrix data view
    const matrixDataView: DataViewMatrix = dataView.matrix;

    // Set dataView in the settings
    setDataView(dataView);

    // CHECK IF THIS WORKS OUT
    // console.log(this.selectionManager.hasSelection())
    

    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        dataView
      );

    if (options.type === 4) {
      // Matrix.formatRows();
    }
    if (!options) {
      return;
    }

    if (!matrixDataView || !matrixDataView.columns || !matrixDataView.rows) {
      console.log(!options.dataViews[0].matrix);

      console.log('WE HERE');

      Matrix.clearGrid();
      return;
    }

    if (options.type === 2 && !options.dataViews[0].matrix) {
      console.log('we here');
      // Matrix.clearGrid();
    }

    if (options.type & powerbi.VisualUpdateType.Data) {
      if (!matrixDataView || !matrixDataView.columns || !matrixDataView.rows) {
        return;
      }

      this.dataView = options.dataViews[0];

      // FIX THIS
      while (this.target.firstChild) {
        // Matrix.clearGrid()

        this.target.removeChild(this.target.firstChild);
      }

     

      this.target.appendChild(
        Matrix.populateMatrixInformation(
          dataView,
          selectionManager,
          host,
          this.formattingSettings
        )
      );
    }
  }

  /**
   * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
   * This method is called once every time we open properties pane or when the user edit any format property.
   */

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    // console.log('Inside');

    // let rowSubTotals =
    //   this.dataView.metadata.objects.subTotals.rowSubtotals === undefined
    //     ? false
    //     : this.dataView.metadata.objects.subTotals.rowSubtotals;

    //     let expansionUp =
    //     this.dataView.metadata.objects.expansion.expandUp === undefined
    //       ? false
    //       : this.dataView.metadata.objects.expansion.expandUp;

    // const myCustomCard: powerbi.visuals.FormattingCard = {
    //   displayName: 'My Custom Object Card',
    //   uid: 'myCustomObjectCard_uid',
    //   groups: [
    //     {
    //       displayName: undefined,
    //       uid: 'myCustomObjectGroup_uid',
    //       slices: [
    //         {
    //           uid: 'myCustomProperty_uid',
    //           displayName: 'My Custom Property',
    //           control: {
    //             type: powerbi.visuals.FormattingComponent.ColorPicker,
    //             properties: {
    //               descriptor: {
    //                 objectName: 'myCustomObject',
    //                 propertyName: 'myCustomProperty',
    //                 selector: null, // selector is optional
    //               },
    //               value: { value: '#FFFFFF' },
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // };

    // const ExpansionCard: powerbi.visuals.FormattingCard = {
    //   displayName: 'Expansion',
    //   uid: 'expansionCard_uid',
    //   groups: [
    //     {
    //       displayName: 'Expand Upwards',
    //       uid: 'ExpandUpwardsGroup_uid',
    //       slices: [

    //         {
    //           uid: 'expansion_expand_upwards_slice',
    //           displayName: 'Expand Upwards',

    //           control: {
    //             type: powerbi.visuals.FormattingComponent.ToggleSwitch,
    //             properties: {
    //               descriptor: {
    //                 objectName: 'expansion',
    //                 propertyName: 'expandUp',
    //                 selector: null,
    //               },
    //               value: Boolean(expansionUp),
    //             },
    //           },
    //         },

    //         {
    //           uid: 'ExpandUpwardsProperty_uidd',
    //           displayName: 'Enable Buttons',

    //           control: {
    //             type: powerbi.visuals.FormattingComponent.ToggleSwitch,
    //             properties: {
    //               descriptor: {
    //                 objectName: 'expansion',
    //                 propertyName: 'enableButtons',
    //                 selector: null,
    //               },
    //               value: false,
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // };

    // const SubTotalsCard: powerbi.visuals.FormattingCard = {
    //   displayName: 'Subtotals',
    //   uid: 'SubTotalsCard_uid',
    //   groups: [
    //     {
    //       displayName: undefined,
    //       uid: 'mySubTotalsCardGroup_uid',
    //       slices: [
    //         {
    //           uid: 'SubtotalsProperty_uid',
    //           displayName: 'Row Subtotals',
    //           control: {
    //             type: powerbi.visuals.FormattingComponent.ToggleSwitch,
    //             properties: {
    //               descriptor: {
    //                 objectName: 'subTotals',
    //                 propertyName: 'rowSubtotals',
    //                 selector: null,
    //               },
    //               value: Boolean(rowSubTotals),
    //             },
    //           },
    //         },
    //         {
    //           uid: 'SubtotalsPropersty_uid',
    //           displayName: 'Per row level',
    //           control: {
    //             type: powerbi.visuals.FormattingComponent.ToggleSwitch,
    //             properties: {
    //               descriptor: {
    //                 objectName: 'subTotals',
    //                 propertyName: 'perRowLevel',
    //                 selector: null,
    //               },
    //               value:
    //                 this.dataView.metadata.objects.subTotals.perRowLevel ===
    //                 true
    //                   ? false
    //                   : true,
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // };

    // // const testCard = [myCustomCard, SubTotalsCard];

    // console.log(this.formattingSettings.cards, 'here');

    // // this.formattingSettings.cards.push(myCustomCard)

    // const test: powerbi.visuals.FormattingModel = {
    //   cards: [ExpansionCard, myCustomCard, SubTotalsCard],
    // };

    // console.log(test);

    // this.formattingSettingsService.buildFormattingModel(
    //   this.formattingSettings)

    // return test;

    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
