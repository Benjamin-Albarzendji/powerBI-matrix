import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import powerbi from 'powerbi-visuals-api';
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
/**
 * The Matrix Class responsible for creating the grid and formatting via ag-grid.
 */
export declare class Matrix {
    static columnDefs: any[];
    static rowData: any[];
    static selectionManager: ISelectionManager;
    static host: IVisualHost;
    static pinnedTotalRow: any;
    static formattingSettings: any;
    static dataView: any;
    static rowLevels: powerbi.DataViewHierarchyLevel[];
    static columnLevels: powerbi.DataViewHierarchyLevel[];
    static rowChildren: powerbi.DataViewMatrixNode[];
    static columnChildren: powerbi.DataViewMatrixNode[];
    static rowChildrenNodes: any[];
    static rowChildrenNodesSorted: any[];
    static nodesToExpand: any[];
    static expandUpwards: boolean;
    static tempRowChildren: any[];
    static persistedProperties: any;
    /**
     * The grid options!
     */
    static gridOptions: GridOptions;
    /**
     * Getting the persisted properties and applying them to the grid
     */
    static getAndSetPersistedProperties(): void;
    /**
     * Applying the persisted properties
     */
    static setPersistedProperties(props: any): void;
    /**
     * The persist properties function to save the column width
     */
    static persistPropertiesToAPI(): void;
    /**
     * Populates the matrix via the Power BI API
     */
    static populateMatrixInformation(dataView: powerbi.DataView, selectionManager: any, host: any, formattingSettings: any): HTMLElement;
    /**
     * The core function for the creation of the matrix
     */
    private static formatMatrix;
    /**
     * Recursive function to traverse child nodes
     */
    private static traverseChildNodes;
    /**
     * Handles the selection on clicks
     */
    private static selectOnClick;
    /**
     * Traversing the selection
     */
    private static traverseSelection;
    /**
     * Adds the body event listeners
     */
    private static addBodyEventListeners;
    /**
     * Event listeners for the headers
     */
    private static addHeaderEventListeners;
    private static addSelectionEventListener;
    /**
     * Adds the context menu event listeners
     */
    private static addContextMenuEventListener;
    /**
     * Adds the sorting event listeners
     */
    private static addSortingEventlistener;
    static clearGrid(): void;
    private static visualMapping;
    /**
     * This functions creates the mapping for the row expansion
     */
    private static rowMapping;
    /**
     *  This adds the expand buttons for every row
     */
    private static AddExpandButtons;
    /**
     *  This function enables the button to expand up and down
     */
    private static startExpansion;
    /**
     * This functions formats the expanded rows.
     */
    private static formatExpandedRows;
    /**
     * Format the rows to get a filled background color. The function was reduced from a more complex function as the rest was integrated into the grid
     */
    private static formatRows;
    /**
     * Format the row headers
     */
    private static formatRowHeaders;
    /**
     * Format the columns
     */
    private static formatColumns;
    /**
     * THe value formatter for the matrix
     */
    private static valueFormatterMatrix;
    /**
     * Format the column headers
     */
    private static formatColHeaders;
    /**
     * Format specific rows
     */
    private static formatSpecificRows;
    /**
     * Format specific columns
     */
    private static formatSpecificColumns;
    /**
     * Format the Total Row
     */
    private static formatTotal;
    /**
     * Reorganies the grid after height changes via the API
     */
    private static onFinishHeightChange;
}
