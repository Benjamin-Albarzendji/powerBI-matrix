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
import { VisualFormattingSettingsModel } from './settings';

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
    for (const card of this.formattingSettings.cards) {
      if (card.name.includes('specificRow')) {
        (card as any).visibility();
      }
    }

    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
