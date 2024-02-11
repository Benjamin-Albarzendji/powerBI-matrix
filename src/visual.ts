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
import IVisualEventService = powerbi.extensibility.IVisualEventService;

// Formatting model
import { VisualFormattingSettingsModel } from './settings';

// Style sheet
import './../style/visual.less';

// Own imports
import { Matrix } from './matrix';

export class Visual implements IVisual {
  private target: HTMLElement;
  private dataView: DataView;
  private host: IVisualHost;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;
  private selectionManager: ISelectionManager;
  private events: IVisualEventService;

  constructor(options: VisualConstructorOptions) {
    // console.log('Visual constructor', options);
    // Formatting Service
    this.formattingSettingsService = new FormattingSettingsService();

    // Root element
    this.target = options.element;

    // Host and Selection Manager
    this.host = options.host;
    this.selectionManager = this.host.createSelectionManager();

    // Events
    this.events = options.host.eventService;

    this.target.style.overflowY = 'auto';
  }

  /**
   * Update function that gets called with interaction, data, size, etc.
   */

  public update(options: VisualUpdateOptions) {
    // Start rendering signal
    this.events.renderingStarted(options);
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
      Matrix.clearGrid();
      return;
    }

    if (options.type === 2 && !options.dataViews[0].matrix) {
      // Matrix.clearGrid();
    }

    if (options.type & powerbi.VisualUpdateType.Data) {
      if (!matrixDataView || !matrixDataView.columns || !matrixDataView.rows) {
        return;
      }

      // Set the data view
      this.dataView = options.dataViews[0];

      // Remove the child
      while (this.target.firstChild) {
        this.target.removeChild(this.target.firstChild);
      }

      // Append the new child
      this.target.appendChild(
        Matrix.populateMatrixInformation(
          dataView,
          selectionManager,
          host,
          this.formattingSettings
        )
      );
    }

    // Get the #myGrid element
    const myDiv = document.getElementById('myGrid');

    // If the element does not exist then rendering has failed
    if (!myDiv) {
      this.events.renderingFailed(options);
      return;
    }

    // End rendering signal
    this.events.renderingFinished(options);
  }

  /**
   * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
   * This method is called once every time we open properties pane or when the user edit any format property.
   */

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    // Toggle the visibility function in cards that have it
    for (const card of this.formattingSettings.cards) {
      // Try/Catch as some cards do not have such visibility
      try {
        (card as any).visibility();
      } catch {
        continue;
      }
    }

    // Return the formatting model
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
