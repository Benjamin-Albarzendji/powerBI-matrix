import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import powerbi from 'powerbi-visuals-api';
import ISelectionManager = powerbi.extensibility.ISelectionManager;
export declare class TestClass {
    static columnDefs: any[];
    static rowData: any[];
    static nodeList: any[];
    static selectionManager: ISelectionManager;
    static host: any;
    static dataViews: any;
    static gridOptions: GridOptions;
    private static onFirstDataRendered;
    private static selectOnClick;
    static formatMatrix(dataViews: powerbi.DataView, nodeList: any, selectionManager: any, host: any): HTMLElement;
    static formatRows(): void;
}
