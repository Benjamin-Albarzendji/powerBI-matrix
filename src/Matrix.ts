import * as agGrid from 'ag-grid-community';
import { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

import powerbi from 'powerbi-visuals-api';
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import { valueFormatter } from 'powerbi-visuals-utils-formattingutils';
import { line, max } from 'd3';
import { getMaxWordWidth } from 'powerbi-visuals-utils-formattingutils/lib/src/wordBreaker';

export class Matrix {
  // The columnDefs array to hold columns
  static columnDefs: any[] = [];

  // The rowData array that holds the data for the rows that are mapped to columnDefs
  static rowData: any[] = [];

  // The powerBI selection API for selection and expansion
  static selectionManager: ISelectionManager;

  // The powerBI host API
  static host;

  // The formatting settings
  static formattingSettings;

  // The powerBI dataView provided by the API
  static dataView: any;

  // The rowLevels information provided by the API
  static rowLevels: powerbi.DataViewHierarchyLevel[];

  // The columnLevels information provided byt he API
  static columnLevels: powerbi.DataViewHierarchyLevel[];

  // The row children of the matrix dataview
  static rowChildren: powerbi.DataViewMatrixNode[];

  // The column children of the matrix dataview
  static columnChildren: powerbi.DataViewMatrixNode[];

  // An array where the rowChildrenNodes get added too
  static rowChildrenNodes = [];

  // The array where the previous array gets sorted
  static rowChildrenNodesSorted = [];

  // The array to map nodes for expansion
  static nodesToExpand = [];

  // Boolean value that decides if the array gets sorted, otherwise defaults to expansion upwards
  static expandUpwards = false;

  // A helper array that gets used during the creation of nodes
  static tempRowChildren = [];

  // GRID OPTIONS
  static gridOptions: GridOptions = {
    // Grab the columnDefs
    columnDefs: this.columnDefs,
    // Grab the rowData
    rowData: this.rowData,

    // Default rowHeight is 25
    rowHeight: 25,

    // Default header height is 25
    headerHeight: 25,

    // Default col def properties get applied to all columns
    defaultColDef: {
      resizable: false,
      editable: false,
      suppressMovable: true,
    },

    // Prevents the context menu in the browser
    preventDefaultOnContextMenu: true,

    // suppressMaxRenderedRowRestriction:true,
    // suppressRowVirtualisation: true,
    rowBuffer: 10,

    // If this is not enabled, the eventlisteners on the columns will not work when you have a lot of columns
    //that warrants a horizontal scroller. This should not be an issue most of the time if performance suffers
    suppressColumnVirtualisation: true,

    //
    columnHoverHighlight: true,
    suppressRowHoverHighlight: false,

    // When clicking a cell
    onCellClicked: (e) => {
      this.selectOnClick(e);
    },

    // Context menu (Right click)
    onCellContextMenu: (e) => {
      this.selectOnClick(e);
    },

    // When the grid is ready do this
    onGridReady: (params) => {
      //  Sets the event listeners for the headers
      this.addHeaderEventListeners();

      // Sets the event listeners for the body
      this.addBodyEventListeners();

      // Add the expansion buttons
      this.AddExpandButtons();

      // Format the columns
      this.formatColumns(this.gridOptions);

      // Format all the rows
      this.formatRows();

      // Format the expanded rows
      this.formatExpandedRows();

      // Format rowheaders
      this.formatRowHeaders();

      // Format column headers
      this.formatColHeaders();

      // Format specific columns
      this.formatSpecificColumns();

      // Format specific rows
      this.formatSpecificRows();
    },

    onViewportChanged: (params) => {
      // Add expand buttons and format them
      this.AddExpandButtons();

      // Format the columns THIS SHOULD BE DISABLED FOR PERFORMANCE AS IT IS VERY EXPENSIVE TO RUN ON VIEWPORT CHANGES (WHICH HAPPENS A LOT ON SCROLLING)
      // this.formatColumns(this.gridOptions);

      // Format all the rows
      this.formatRows();

      // Format the expansion buttons
      this.formatExpandedRows();

      // Format rowheaders
      this.formatRowHeaders();

      // Format specific columns
      this.formatSpecificColumns();

      // Format specific rows
      this.formatSpecificRows();
    },

    // rowSelection: 'multiple', // allow rows to be selected
    // animateRows: false, // have rows animate to new positions when sorted ////FIXXX????
    onFirstDataRendered: (params) => {
      // Auto sizes the columns to fit the cell content rather than content of the container
      // params.columnApi.autoSizeAllColumns();
      // this.formatColumns(this.gridOptions);
      // params.api.sizeColumnsToFit();
    },
  };

  // GRID OPTIONS END //

  // Handles the selection on clicks
  private static async selectOnClick(cell) {
    console.log('Cell was clicked', cell);

    console.log(this.formattingSettings);

    // Make sure it is not propagating through the expand button (This is due us needing the grid API to be triggered for traversing algorithm information)
    if (cell.event.target.classList[0] === 'expandButton') {
      this.startExpansion(cell);
      return;
    }

    // multiSelect variable
    let multiSelect = false;

    //Extract the row and column from the cell
    // Selected row, assuming there are no levels in the dataView
    let selectedRow;

    // Check level length
    if (this.dataView.matrix.rows.levels.length > 1) {
      // Traverse through the rowChildren and try to find the value of the row
      const rowHeader = Object.values(cell.data)[0];

      // When found it becomes selectedRow
      selectedRow = this.traverseSelection(
        rowHeader,
        this.dataView.matrix.rows.root.children
      );
    }
    // Assuming no levels
    else {
      // SelectedRow per default value
      selectedRow = this.rowChildren[cell.rowIndex];
    }

    // Selected column
    const selectedColumn = this.columnChildren[cell.column.colId - 1];

    console.log(selectedColumn);
    console.log(selectedRow);

    // Create selectionId
    const selectionId = this.visualMapping(selectedRow, selectedColumn);

    // Check if right clicked for context menu
    if (cell.event.type === 'contextmenu') {
      this.selectionManager.showContextMenu(selectionId, {
        x: cell.event.clientX,
        y: cell.event.clientY,
      });

      return;
    }

    // Check if multiSelect is true
    if (cell.event.ctrlKey) {
      multiSelect = true;
    }

    // Apply the selection
    this.selectionManager.select(selectionId, multiSelect);
  }

  private static traverseSelection(rowHeader, children) {
    // A sentinel value to stop loops
    let sentinelValueStop = false;

    // The variable that is to be returned
    let childToBeReturned;

    // Loop through children until you find the rowheader
    children.forEach((child) => {
      // Abort the loop if child is fiund
      if (sentinelValueStop) {
        return;
      }

      // Look for the right child
      if (child.value === rowHeader) {
        // If found, set the sentinel value and set the child to the functional scope variable
        sentinelValueStop = true;
        childToBeReturned = child;

        // Finish the iteration
        return childToBeReturned;
      }

      // Recursively go through the tree if child has not been found and it has children
      if (child.children && !sentinelValueStop) {
        // Set the variable
        childToBeReturned = this.traverseSelection(rowHeader, child.children);

        // If the child is not undefined / null, set the sentinelvalue to stop further iterations
        if (childToBeReturned) {
          sentinelValueStop = true;
        }
        // Finish the iteration
        return childToBeReturned;
      }
    });

    // Return the child through the recursive chain
    return childToBeReturned;
  }

  // The entrance to the class for populating the class
  public static populateMatrixInformation(
    dataView: powerbi.DataView,
    selectionManager,
    host,
    formattingSettings
  ) {
    // Update selection manager
    this.selectionManager = selectionManager;

    // Update host
    this.host = host;

    // Update dataView
    this.dataView = dataView;

    // Update rowLevels
    this.rowLevels = dataView.matrix.rows.levels;

    // Update columnLevels
    this.columnLevels = dataView.matrix.columns.levels;

    // Update rowChildren
    this.rowChildren = dataView.matrix.rows.root.children;

    // Update columnChildren
    this.columnChildren = dataView.matrix.columns.root.children;

    // Update the formatting settings
    this.formattingSettings = formattingSettings;

    // Return the formatted matrix
    return this.formatMatrix(dataView);
  }

  private static formatMatrix(dataView: powerbi.DataView) {
    // Clear out the child nodes in case they are already populated
    this.rowChildrenNodes = [];
    this.rowChildrenNodesSorted = [];

    // Set the expansionUpwards boolean
    this.expandUpwards = this.formattingSettings.expansionCard.expandUp.value;

    // Clear out the nodes to expand
    this.nodesToExpand = [];

    // Column definitions
    const columnDefs = [];

    // Column ID iterator to be used later for mapping
    let colId = 0;

    // Deconstruct dataview to a matrix
    const matrix = dataView.matrix;

    // Dynamic header on the first column. First we set a let variable due to a try/catch
    let dynamicHeader: String;

    // Searches for the first column with the role of Rows and sets the dynamicHeader to that column's display name
    for (const column of dataView.metadata.columns) {
      if (column.roles['Rows']) {
        dynamicHeader = column.displayName;
      }
    }

    // Set the rowHeight from the rowCard formatting settings (Has to be separate for the API)
    this.gridOptions.rowHeight = this.formattingSettings.rowCard.height.value;

    // Set the headerHeight from the rowCard formatting settings (Has to be separate for the API)
    this.gridOptions.headerHeight =
      this.formattingSettings.colHeadersCard.height.value;

    // Create an object to hold CSS styling from the rowCard formatting settings
    const rowCard = this.formattingSettings.rowCard;
    const gridCellStyling = {
      justifyContent: rowCard.alignment.value.value,
      color: rowCard.fontColor.value.value,
      fontFamily: rowCard.fontFamily.value,
      fontSize: `${rowCard.fontSize.value}px`,
      fontWeight: rowCard.enableBold.value ? 'bold' : 'normal',
      fontStyle: rowCard.enableItalic.value ? 'italic' : 'normal',
      textIndent: `${rowCard.indentation.value}px`,
    };

    // Formatting for the rowHeadersCard (The first column)
    const rowHeadersCard = this.formattingSettings.rowHeadersCard;
    const categoryCellStyling = {
      textIndent: `${rowHeadersCard.indentation.value}px`,
      justifyContent: rowHeadersCard.alignment.value.value,
      fontWeight: rowHeadersCard.enableBold.value ? 'bold' : 'normal',
      fontStyle: rowHeadersCard.enableItalic.value ? 'italic' : 'normal',
      color: rowHeadersCard.fontColor.value.value,
      fontSize: `${rowHeadersCard.fontSize.value}px`,
      fontFamily: rowHeadersCard.fontFamily.value,
      borderRight: rowHeadersCard.enableRightBorder.value
        ? `${rowHeadersCard.borderWidth.value}px ${
            rowHeadersCard.borderStyle.value.value
          } ${hex2rgba(
            rowHeadersCard.borderColor.value.value,
            rowHeadersCard.borderOpacity.value
          )}`
        : 'none',
      borderTop: rowHeadersCard.enableTopBorder.value
        ? `${rowHeadersCard.borderWidth.value}px ${
            rowHeadersCard.borderStyle.value.value
          } ${hex2rgba(
            rowHeadersCard.borderColor.value.value,
            rowHeadersCard.borderOpacity.value
          )}`
        : 'none',
      borderBottom: rowHeadersCard.enableBottomBorder.value
        ? `${rowHeadersCard.borderWidth.value}px ${
            rowHeadersCard.borderStyle.value.value
          } ${hex2rgba(
            rowHeadersCard.borderColor.value.value,
            rowHeadersCard.borderOpacity.value
          )}`
        : 'none',
    };

    // A singular measure (or multiple measures) without any columns or rows
    if (
      !matrix.columns.root.hasOwnProperty('childIdentityFields') &&
      !matrix.rows.root.hasOwnProperty('childIdentityFields')
    ) {
      // Loop through the valueSources
      matrix.valueSources.forEach((source) => {
        // Push into columnDefs
        columnDefs.push({
          field: source.displayName,
          colId: colId++,
          cellStyle: gridCellStyling,
          cellClass: 'gridCell',
        });
      });
    }

    // No columns inserted, only rows and values (Via PowerBI)
    if (
      !matrix.columns.root.hasOwnProperty('childIdentityFields') &&
      matrix.rows.root.hasOwnProperty('childIdentityFields')
    ) {
      // Insert the first value from the row node
      columnDefs.push({
        field: dynamicHeader,
        colId: colId++,
        cellClass: 'categoryCell',
        cellStyle: rowHeadersCard.enableCard.value
          ? categoryCellStyling
          : gridCellStyling,
      });

      // Loop through the columns in the metadata list. Ensure the loop skips a repeat of the first column.
      dataView.matrix.valueSources.forEach((column) => {
        //  Check if repeated column, if so then return
        if (
          column.expr['ref'] === matrix.rows.root.childIdentityFields[0]['ref']
        ) {
          return;
        }

        // Check if column is on a lower level, if so return as it should not be a column
        if (
          column['roles']['Value'] != true &&
          column['rolesIndex']['Rows'][0] != 0
        ) {
          // Return as not to add it as a column
          return;
        }

        // Otherwise, push the object to the columnDefs
        columnDefs.push({
          field: column.displayName,
          colId: colId++,
          cellStyle: gridCellStyling,
          cellClass: 'gridCell',
        });
      });
    }
    // Assuming columns and rows and measures have been inserted (Works without measures and rows)
    if (matrix.columns.root.hasOwnProperty('childIdentityFields')) {
      // Pushes the leftmost column name
      columnDefs.push({
        field: dynamicHeader,
        colId: colId++,
        cellClass: 'categoryCell',
        cellStyle: rowHeadersCard.enableCard.value
          ? categoryCellStyling
          : gridCellStyling,
      });

      // Iterates through the column children
      matrix.columns.root.children.forEach((column) => {
        columnDefs.push({
          field: column.value,
          colId: colId++,
          cellClass: 'gridCell',
          cellStyle: gridCellStyling,
        });
      });

      // Pushes a "Total" field as the last field
      const lengthOfColumnDefs = columnDefs.length;
      columnDefs[lengthOfColumnDefs - 1]['field'] = 'Total';
    }

    // Updates the columnDefs in the object,
    this.columnDefs = columnDefs;

    // Row Data
    const rowData: object[] = [];

    // Loop through children for when columns and rows exist
    matrix.rows.root.children.forEach((row) => {
      // Identity holder to be reset every loop. We need these for row expansion
      const identityHolder = [];

      // Declare the rowObj variable to be pushed into rowData. Resets every loop
      const rowObj = {};

      // If identity holder is not subTotal, push it
      if (row.isSubtotal !== true) {
        identityHolder.push(row);
      }

      // Push the identity holder into the rowObj
      rowObj['identity'] = identityHolder;

      // Loop through for measures
      if (
        row.hasOwnProperty('values') &&
        !matrix.columns.root.hasOwnProperty('childIdentityFields') &&
        !matrix.rows.root.hasOwnProperty('childIdentityFields')
      ) {
        // RowValues
        const rowValues = row.values;

        // Index iterator
        let index = 0;

        // Loop through last level of children and insert into rowObj
        Object.values(rowValues).forEach((value) => {
          const valueFormatted = this.valueFormatterMatrix(
            value.value,
            value.valueSourceIndex
          );
          rowObj[Object(columnDefs)[index]['field']] = valueFormatted;

          index++;
        });
      }

      // If there are multiple values in a row
      else if (row.hasOwnProperty('values') || row.children) {
        // Deconstruct row into values
        const rowValues = row.values;

        // Index iterator
        let index = 0;

        // Insert row header
        rowObj[Object(columnDefs)[index]['field']] = row.value;

        // Add the nodes to the nodesToExpand array so expand buttons can be programatically added
        if (
          row.hasOwnProperty('isCollapsed') ||
          row.hasOwnProperty('identity')
        ) {
          this.nodesToExpand.push(row);
        }

        // Increment index
        index++;

        // Try catch as sometimes it is values and sometimes it is children, but they never exist together in the dataView.
        try {
          // Loop through last level of children and insert into rowObj
          Object.values(rowValues).forEach((value) => {
            // Come back
            const valueFormatted = this.valueFormatterMatrix(
              value.value,
              value.valueSourceIndex
            );

            rowObj[Object(columnDefs)[index]['field']] = valueFormatted;

            // Increment the index counter
            index++;
          });

          // If catch then it is children and we need to recursively loop through them
        } catch {
          // If expand upwards is enabled, then pop it and insert it after loop

          let lastItem = null;

          if (this.formattingSettings.expansionCard.expandUp.value === true) {
            lastItem = this.nodesToExpand.pop();
          }

          // Loop through children and insert into rowObj
          row.children.forEach((child) => {
            this.tempRowChildren.length = 0;
            this.traverseChildNodes(
              child,
              columnDefs,
              row.value,
              identityHolder
            );

            // Increment the index counter
            index++;
          });

          if (lastItem !== null) {
            this.nodesToExpand.push(lastItem);
          }
        }
      }

      // Else if a singular value, it checks to check it has childIdentityFields otherwise it should not be inserting the value
      else if (
        matrix.columns.root.hasOwnProperty('childIdentityFields') ||
        matrix.rows.root.hasOwnProperty('childIdentityFields')
      ) {
        // Insert the value so it is not undefined or null
        rowObj[Object(columnDefs)[0]['field']] = row.value;
      }

      // Depending on the expansionUp check, we need to insert the rowObj in different ways
      if (!this.expandUpwards && this.rowChildrenNodes.length > 0) {
        // Clear out the rowData
        rowData.length = 0;

        // Create temporary holder array
        const tempHolderNodes = [];

        for (const node of this.rowChildrenNodes) {
          tempHolderNodes.push(node);
        }

        // Put the last item in tempHolderNodes first
        tempHolderNodes.unshift(tempHolderNodes.pop());

        this.rowChildrenNodesSorted = [
          ...this.rowChildrenNodesSorted,
          ...tempHolderNodes,
        ];

        this.rowChildrenNodes = [];

        for (const node of this.rowChildrenNodesSorted) {
          rowData.push(node);
        }
      }

      // If multiple level rows, clear out the rowData before inserting it. AND EXPAND UP!
      else if (this.rowChildrenNodes.length > 0) {
        // Clearing out the arrray
        rowData.length = 0;
        // Looping through the rowChildrenNodes and pushing them to rowData
        this.rowChildrenNodes.forEach((child) => {
          rowData.push(child);
        });
      }

      if (
        rowData.length !== this.rowChildrenNodesSorted.length &&
        this.rowChildrenNodesSorted.length > 0
      ) {
        rowData.pop();
      }

      // Push into rowData
      rowData.push(rowObj);
    });

    console.log(rowData);

    // We fix the last row header of "Total" by getting the length of the array and changing the name on the last object. Other wise it will remain blank
    const lengthOfRowData = rowData.length;

    // Insert "Total" as last row header with a keyof typeof to ensure the string can access the object index. Checks first if undefined
    if (
      rowData[lengthOfRowData - 1][dynamicHeader as keyof typeof rowData] ===
      undefined
    ) {
      // Ensure a "Total does not show up for measures only matrix"
      if (
        matrix.columns.root.hasOwnProperty('childIdentityFields') ||
        matrix.rows.root.hasOwnProperty('childIdentityFields')
      ) {
        //  Insert Total in the first column last row
        rowData[lengthOfRowData - 1][dynamicHeader as keyof typeof rowData] =
          'Total';
      }
    }

    // Update the object's rowData
    this.rowData = rowData;

    // let the grid know which columns and what data to use
    let gridOptions = this.gridOptions;

    // Insert column width into grid options defaultColDef from the formatting settings columnCard
    gridOptions['defaultColDef']['width'] =
      this.formattingSettings.columnCard.columnWidth.value;

    // Populate the gridOptions
    gridOptions['columnDefs'] = columnDefs;
    gridOptions['rowData'] = rowData;

    // The gridDiv
    const gridDiv: HTMLElement = document.createElement('div');
    gridDiv.className = 'ag-theme-alpine';
    gridDiv.id = 'myGrid';

    // Creates the final Grid
    new agGrid.Grid(gridDiv, gridOptions);

    // FIXXX LATER WITH FORMATTING SETTINGS
    gridOptions.api.setPinnedBottomRowData([rowData[rowData.length - 1]]);

    // Return a finished DIV to be attached
    return gridDiv;
  }

  // Recursive function to traverse through the child nodes
  private static async traverseChildNodes(
    child,
    columnDefs,
    parentHeader,
    identityHolder
  ) {
    // Identity holder in a separate array to avoid reference duplication
    identityHolder = [...identityHolder];

    // Create the rowObj
    const rowObj = {};

    // Deconstruct row into values
    const rowValues = child.values;

    // Index iterator
    let index = 0;

    // Check if child.value (aka the header) is undefined, if so grab the parentHeader
    let rowHeader = child.value;

    if (child.value === undefined) {
      rowHeader = parentHeader;
    }

    // Insert row header
    rowObj[Object(columnDefs)[index]['field']] = String(rowHeader);

    // Add the nodes to the nodesToExpand array so expand buttons can be programatically added & for expansion identification
    if (
      child.hasOwnProperty('isCollapsed') ||
      child.hasOwnProperty('identity')
    ) {
      this.nodesToExpand.push(child);
    }

    // If identity holder is not subTotal, push it
    if (child.isSubtotal !== true) {
      identityHolder.push(child);
    }

    // Push the identity holder into the rowObj
    rowObj['identity'] = identityHolder;

    // Increment index
    index++;

    // Create a temporary holding array for sorting
    const tempRowChildren = [...this.tempRowChildren];

    // Try catch as sometimes it is values and sometimes it is children, but they never exist together in the dataView.
    try {
      // Loop through last level of children and insert into rowObj
      Object.values(rowValues).forEach((value) => {
        const valueFormatted = this.valueFormatterMatrix(
          value['value'],
          value['valueSourceIndex']
        );

        rowObj[Object(columnDefs)[index]['field']] = valueFormatted;

        // Increment the index counter
        index++;
      });

      // If expand upwards splice and merge the arrays otherwise just insert
      if (this.expandUpwards === false) {
        // Push into both arrays
        this.tempRowChildren.push(rowObj);
        this.rowChildrenNodes.push(rowObj);

        // Push into the local array
        tempRowChildren.push(rowObj);

        // Get the last item of the tempRowChildren array
        const LastITem = tempRowChildren.pop();

        // Insert it first
        tempRowChildren.unshift(LastITem);

        // Splice the list to avoid duplicates and then merge
        const lengthOfRowChildrenNodes = this.rowChildrenNodes.length;
        const lengthOfTempNodes = tempRowChildren.length;
        const difference = lengthOfRowChildrenNodes - lengthOfTempNodes;

        this.rowChildrenNodes.splice(difference, lengthOfTempNodes);

        this.rowChildrenNodes = [...this.rowChildrenNodes, ...tempRowChildren];
      } else {
        this.rowChildrenNodes.push(rowObj);
      }

      // If catch then it is children and we need to recursively loop through them
    } catch {
      // Contains the children in case expanse upward is false
      const tempRowChildrenContained = [...this.tempRowChildren];

      // If expand upwards is false, reset the tempRowChildren array
      if (this.expandUpwards === false) {
        this.tempRowChildren.length = 0;
      }

      let lastItem = null;
      // If the expandUp is true, pop the last item in the array

      if (this.formattingSettings.expansionCard.expandUp.value === true) {
        lastItem = this.nodesToExpand.pop();
      }

      // Loop through children and insert into rowObj
      child.children.forEach((child) => {
        this.traverseChildNodes(child, columnDefs, rowHeader, identityHolder);

        index++;
      });

      // Insert it after every other item
      if (lastItem !== null) {
        this.nodesToExpand.push(lastItem);
      }

      // If expand upwards, unshift and merge the temprow children and temprowChildrenContained arrays
      if (this.expandUpwards === false) {
        // tempRowChildrenContained.unshift(tempRowChildrenContained.pop());

        this.tempRowChildren.unshift(this.tempRowChildren.pop());

        // tempRowChildrenContained.unshift(this.tempRowChildren.pop());

        tempRowChildren.reverse();

        this.tempRowChildren = [
          ...tempRowChildrenContained,
          ...this.tempRowChildren,
        ];
      }
    }
  }

  // Adds the body event listeners
  private static addBodyEventListeners() {
    // Get the grid body
    const gridBody = document.getElementsByClassName('ag-body-viewport');

    // Add event listeners for selection to deselect
    gridBody[0].addEventListener('click', (e) => {
      const event = e as PointerEvent;

      // See if the target is the body and not a cell, and cast it so ti works
      const target = (event.target as Element).classList[0];

      // If true, clear the selection
      if (target === 'ag-body-viewport') {
        this.selectionManager.clear();
      }
    });

    // Event listener for the context menu (right click)
    gridBody[0].addEventListener('contextmenu', (e) => {
      // Dummy selection id as we are not selecting anything.
      const selectionId = {};

      // Convet event to MouseEvent
      const event = e as MouseEvent;

      // Bring up context menu via Power BI API
      this.selectionManager.showContextMenu(selectionId, {
        x: event.clientX,
        y: event.clientY,
      });
    });
  }

  // Event listeners for the headers
  private static async addHeaderEventListeners() {
    // Get the header elements (Important to await!)
    const headerElements = await document.querySelectorAll(
      '.ag-header-cell-comp-wrapper'
    );

    // Create a sentinel value for the forEach loop in the case of all measures
    let allMeasuresListened = false;

    // Loop through the header elements
    headerElements.forEach((element, index) => {
      // Convert the type of the element to something that can be used
      let elementUnknown = element as unknown;
      const elementHTML = elementUnknown as HTMLElement;

      // Add the context menu to every header
      this.addContextMenuEventListener(elementHTML);

      // Add special eventListener to the first column (For sorting)
      if (index === 0) {
        let dataSource;
        // TRY to Get the row query name to sort
        try {
          dataSource = this.dataView.matrix.rows.levels[0].sources[0];
        } catch {
          // Else it is a column
          dataSource = this.dataView.matrix.columns.levels[0].sources[0];
        }

        // Adds the sorting event listener
        this.addSortingEventlistener(elementHTML, dataSource);

        // Return to finish this iteration of the loop
        return;
      }

      // If there are multiple measures and no columns, proceed to add a sorting event listener for every column.
      // We are assuming no columns has a length of 1

      if (
        this.dataView.matrix.valueSources.length > 1 ||
        this.dataView.matrix.columns.root.children.length == 1
      ) {
        // Return if event listener has already been applied
        // if (allMeasuresListened) {
        //   return;
        // }

        // Put value sources in, -1 as the index will be n+1 by the time it comes here due to returning from the first column
        const dataSource = this.dataView.matrix.valueSources[index - 1];

        // Loop through the add event listener
        this.addSortingEventlistener(elementHTML, dataSource);

        // Set sentinel value to true
        allMeasuresListened = true;

        // Return to quit this iteration of the loop
        return;
      }

      // Check the last header if it is "Total" and implement custom sorting on it
      if (index === headerElements.length - 1) {
        // Get the textContent of the header table
        const headerLabel = elementHTML.getElementsByClassName(
          'ag-header-cell-text'
        )[0].textContent;

        // Check if it is "Total"
        if (headerLabel === 'Total') {
          // Get the row query name to sort
          const dataSource = this.dataView.matrix.valueSources[0];

          //  Add the event listener
          this.addSortingEventlistener(elementHTML, dataSource);

          // Return to end this it iteration of the loop
          return;
        }
      }

      // Add the selection to every header (This is last as not to have duplicate event listeners)
      this.addSelectionEventListener(elementHTML, index);
    });
  }

  // Add a selection header event listener
  private static addSelectionEventListener(element, index) {
    // Add the event listener for selections on non-sorting columns
    element.addEventListener('click', (e) => {
      // Get column
      const selectedColumn = this.columnChildren[index - 1];

      // Create selection ID (Empty object in row due to us selecting only a column)
      const selectionId = this.visualMapping({}, selectedColumn);

      // Enabling multiselect with false as default
      let multiSelect = false;

      // Check if multiSelect is true
      if (e.ctrlKey) {
        multiSelect = true;
      }
      // Creating selection
      this.selectionManager.select(selectionId, multiSelect);
    });
  }

  private static addContextMenuEventListener(element) {
    // Adding the context menu on every column header
    element.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      // Dummy selection id as we are not selecting anything.
      const selectionId = {};

      this.selectionManager.showContextMenu(selectionId, {
        x: e.clientX,
        y: e.clientY,
      });
    });
  }

  // Add the sorting header event listener
  private static addSortingEventlistener(element, source) {
    element.addEventListener('click', (e) => {
      // Get the row query name to sort
      const sortingQueryName = source.queryName;

      // Get the sorting type and inverse it
      const sortOrder = source.sort;

      // Set the sorting
      const sortDirection =
        sortOrder === 2
          ? powerbi.SortDirection.Ascending
          : powerbi.SortDirection.Descending;

      // The sorting arguments, assuming Descending as default
      let sortArgs = {
        sortDescriptors: [
          {
            queryName: sortingQueryName,
            sortDirection: sortDirection,
          },
        ],
      };

      // Apply the sorting
      this.host.applyCustomSort(sortArgs);
    });
  }

  // Clears the grid in preparation for a new set of data
  public static clearGrid() {
    this.gridOptions.api.setRowData([]);
    this.gridOptions.api.setColumnDefs([]);
    this.gridOptions.api.hideOverlay();
  }

  // Maps the node to a selectionId
  private static visualMapping(row, column) {
    // Creates the selection id
    const nodeSelection = this.host
      .createSelectionIdBuilder()
      .withMatrixNode(column, this.columnLevels)
      .withMatrixNode(row, this.rowLevels)
      .createSelectionId();

    // Returns the selection
    return nodeSelection;
  }

  // Loop through the children tree to find the proper parent-child relationship
  private static expansionTraverser(row) {
    // Deconstruct dataview into the child nodes
    const childrenNodes = this.dataView.matrix.rows.root.children;

    // Parent Node Array
    const parentNodes = [];

    // Loop through the children
    for (const node of childrenNodes) {
      // If row is the node, then append and return
      if (row.value === node.value) {
        parentNodes.push(node);
        break;
      }

      // If not, and it the flag isCollapsed = false, then go deeper, assuming we are not dealing with a level 0 and it is collapsed, i.e first row
      if (row.level !== 0 && row.isCollapsed === true) {
        if (node.isCollapsed === false) {
          console.log('AM H IHERE THO?');
          const childNodes = this.expansionTraverserHelper(
            node.children,
            row.value
          );

          parentNodes.push(node);
          try {
            parentNodes.push(...childNodes);
          } catch {
            parentNodes.push(childNodes);
          }
          console.log(node, 'originalNode');
          console.log(childNodes);
        }
      }
    }

    // Return it all
    return parentNodes;
  }

  // A helper recursive algorithm for the expansionTraverser
  private static expansionTraverserHelper(children, rowValue) {
    console.log('HERE???????????');
    // Holder of nodes
    const parentNodes = [];

    // Loop through the children

    for (const node of children) {
      if (node.value === rowValue) {
        return node;
        break;
      }

      // If not, and it the flag isCollapsed = false, then go deeper
      if (node.isCollapsed === false) {
        const nodes = this.expansionTraverserHelper(node.children, rowValue);

        console.log(nodes, 'THE NODES');
        console.log(node, 'THE SINGULAR NODE');
        try {
          return [node, ...nodes];
        } catch {
          return [node, nodes];
        }
      }
    }
  }

  // This functions creates the mapping for the row expansion
  private static rowMapping(nodeLineage) {
    // Create the selectionbuilder
    const nodeSelectionBuilder = this.host.createSelectionIdBuilder();

    // Creates the selection id via looping through parents + current node
    for (const node of nodeLineage) {
      nodeSelectionBuilder.withMatrixNode(node, this.rowLevels);
    }

    // Create the selectionID
    const nodeSelectionId = nodeSelectionBuilder.createSelectionId();

    return nodeSelectionId;
  }

  // This adds the expand buttons for every row
  private static AddExpandButtons() {
    // Check if addButtons is in the formattingSetting card otherwise return
    if (this.formattingSettings.expansionCard.enableButtons.value === false) {
      return;
    }

    // Get the rows via the ag-row class
    const rows = document.querySelectorAll('.ag-row');

    // Loop through the rows
    for (const rowHeader of Object(rows)) {
      const rowHeaderTextcontent = rowHeader.children[0].textContent;
      const rowHeaderDIV = rowHeader.children[0];

      // For every rowHeader, loop through the nodesToExpand Array to find a match
      for (const node of this.nodesToExpand) {
        // Check if there is an equal value
        if (rowHeaderTextcontent === node.value) {
          // Check that there is no button already added
          const potentialButtons =
            rowHeaderDIV.querySelectorAll('.expandButton');

          // If length longer than 0, skip to next loop
          if (potentialButtons.length != 0) {
            continue;
          }

          // Check that the level can in fact be expanded
          const levels = this.dataView.matrix.rows.levels;

          const nodeLevel = node.level;

          const nodeLevelInTree = levels[nodeLevel];

          if (
            nodeLevelInTree['canBeExpanded'] === false ||
            !nodeLevelInTree.hasOwnProperty('canBeExpanded')
          ) {
            continue;
          }

          // Create the button and style it
          const button = document.createElement('button');

          // CSS STYLING
          button.classList.add('expandButton');
          button.textContent = '+';
          button.style.left = `${(nodeLevel + 1) * 10}px`;

          // Append to the div
          rowHeaderDIV.insertBefore(button, rowHeaderDIV.firstChild);
        }
      }
    }
  }

  // This function enables the button to expand up and down
  private static startExpansion(cell) {
    // Get the selectedRow

    // Grab the lineage of the selected row
    const selectedRowIdentityLineage = cell.data.identity;

    // Create a selectionID
    const selectionID = this.rowMapping(selectedRowIdentityLineage);

    this.selectionManager.toggleExpandCollapse(selectionID);
  }

  // This functions formats the expanded rows.
  private static formatExpandedRows() {
    console.log(this.formattingSettings);

    // IF checks to make sure function is not running needlessly
    if (
      !this.dataView.matrix.columns.root.hasOwnProperty(
        'childIdentityFields'
      ) &&
      !this.dataView.matrix.rows.root.hasOwnProperty('childIdentityFields')
    ) {
      return;
    }

    // If the row level length is 1, return as we do not want to format rows that cannot be expanded/Have buttons
    if (!this.dataView.matrix.rows.levels[0].hasOwnProperty('canBeExpanded')) {
      return;
    }

    // Get the expansionCard
    const expansionCard = this.formattingSettings.expansionCard;

    // Get all the rows
    const rows = document.querySelectorAll('.ag-row');

    // Loop through them
    for (const rowHeader of Object(rows)) {
      // If singular measure, do not run this function as there is no expansion

      // Get the row-id from the HTML attribute
      const rowId = rowHeader.getAttribute('row-id');

      // Get the corresponding node from the nodesToExpand Array
      const rowNodeData = this.nodesToExpand[rowId];

      // The rowHeaderTextContent to skip "Total" to avoid an error but also indent it
      const rowHeaderTextcontent = rowHeader.children[0].textContent;

      // The rowHeaderDIV for CSS transformation
      const rowHeaderDIV = rowHeader.children[0];

      // INDENTATION
      // Get the value from the formatting settings
      let indentation =
        this.formattingSettings.expansionCard.indentationValue.value;

      // Try catch in case of unforseen errors (Should not be any but for good measure) Also indent it to the same as first level nodes
      try {
        if (rowHeaderTextcontent === 'Total') {
          // Check if indentation is enabled
          if (
            this.formattingSettings.expansionCard.enableIndentation.value ===
            true
          ) {
            // Check if buttons are enabled
            if (
              this.formattingSettings.expansionCard.enableButtons.value === true
            ) {
              rowHeaderDIV.style.textIndent = `${indentation}px`;
              rowHeaderDIV.style.textAlign = 'start';
            }

            continue;
          }
        }

        // Ensure node level is 1 for multiplication
        let nodeLevel = rowNodeData.level === 0 ? 1 : rowNodeData.level + 1;

        // If buttons are disabled, remove one level
        if (
          this.formattingSettings.expansionCard.enableButtons.value === false
        ) {
          nodeLevel = nodeLevel - 1;
        }

        indentation = parseInt(nodeLevel) * indentation;

        // Check if indentation is enabled
        if (
          this.formattingSettings.expansionCard.enableIndentation.value === true
        ) {
          // Put in the indentation
          rowHeaderDIV.style.textIndent = `${indentation}px`;
        }

        // Bold rows that have been expanded and change the button text to "-"
        if (rowNodeData.isCollapsed === false) {
          // Set the background color via image left right gradient

          // To be refered to later in the expandedRows function
          rowHeader.classList.add('expandedRow');

          // Set alignment
          for (const child of rowHeader.children) {
            // Set the bold
            child.style.fontWeight = expansionCard.enableBold.value
              ? 'bold'
              : 'normal';

            // Set the italic
            child.style.fontStyle = expansionCard.enableItalic.value
              ? 'italic'
              : 'normal';

            // child.style.backgroundColor = 'red';
            child.style.justifyContent = expansionCard.alignment.value.value;

            // Set the fontFamily
            child.style.fontFamily = expansionCard.fontFamily.value;

            // set the fontSize
            child.style.fontSize = `${expansionCard.fontSize.value}px`;

            // Set the fontColor
            child.style.color = expansionCard.fontColor.value.value;
          }

          // Get the value from the formatting settings
          const borderWidth = expansionCard.borderWidth.value;

          // Get the border color from the formatting settings
          const borderColor = hex2rgba(
            expansionCard.borderColor.value.value,
            expansionCard.borderOpacity.value
          );

          // Get the border style from the formatting settings
          const borderStyle = expansionCard.borderStyle.value.value;

          // Set the style TOP
          rowHeader.style.borderTop = expansionCard.enableTopBorder.value
            ? `${borderWidth}px ${borderStyle} ${borderColor}`
            : 'none';

          // Set the style BOTTOM
          rowHeader.style.borderBottom = expansionCard.enableBottomBorder.value
            ? `${borderWidth}px ${borderStyle} ${borderColor}`
            : 'none';

          this.gridOptions.api
            .getRowNode(rowId)
            .setRowHeight(expansionCard.height.value);

          // Rowheader style via background image
          rowHeader.style.backgroundImage = `linear-gradient(to right, ${hex2rgba(
            expansionCard.backgroundColor.value.value,
            expansionCard.opacity.value
          )} 100%, white 100%)`;

          // Change the button text to "-"
          const button = rowHeaderDIV.querySelector('.expandButton');
          button.textContent = '-';
        }
      } catch (e) {}
    }
    // The grid API needs to recalculate the height of the rows if the row height has changed
    // NO NEED FOR IT TO RUN IF VALUE IS 25 AS IT IS THE DEFAULT
    if (expansionCard.height.value !== 25) {
      this.gridOptions.api.onRowHeightChanged();
    }
  }

  // Format the rows to get a filled background color. The function was reduced from a more complex function as the rest was integrated into the grid
  private static formatRows() {
    // Get all the rows
    const rows = document.querySelectorAll('.ag-row');

    const rowCard = this.formattingSettings.rowCard;

    // Get the background color
    const backgroundColor = hex2rgba(
      rowCard.backgroundColor.value.value,
      rowCard.opacity.value
    );

    for (const row of Object(rows)) {
      // Apply background colors
      // (row.style.backgroundColor = backgroundColor),

      row.style.backgroundImage = `linear-gradient(to right, ${backgroundColor} 100%, white 100%)`;
      // Row borders
      (row.style.borderTop = rowCard.enableTopBorder.value
        ? `${rowCard.borderWidth.value}px ${
            rowCard.borderStyle.value.value
          } ${hex2rgba(
            rowCard.borderColor.value.value,
            rowCard.borderOpacity.value
          )}`
        : 'none'),
        (row.style.borderBottom = rowCard.enableBottomBorder.value
          ? `${rowCard.borderWidth.value}px ${
              rowCard.borderStyle.value.value
            } ${hex2rgba(
              rowCard.borderColor.value.value,
              rowCard.borderOpacity.value
            )}`
          : 'none');
    }
  }

  private static formatRowHeaders() {
    // Check that rowHeaders card is enabled
    if (this.formattingSettings.rowHeadersCard.enableCard.value === false) {
      return;
    }

    // Get all the rows
    const rows = document.querySelectorAll('.ag-row');

    // The rowheaders card
    const rowHeadersCard = this.formattingSettings.rowHeadersCard;

    // Get the row card
    const rowCard = this.formattingSettings.rowCard;

    // Get the rowHeaders background color & opacity
    const backgroundColor = hex2rgba(
      rowHeadersCard.backgroundColor.value.value,
      rowHeadersCard.opacity.value
    );

    for (const row of Object(rows)) {
      // Dynamic rowBackgroundColor that depends on if a row is expanded or not
      let rowBackgroundColor;

      // Get the row background color and opacity
      rowBackgroundColor = hex2rgba(
        rowCard.backgroundColor.value.value,
        rowCard.opacity.value
      );
      // Get the width of a categoryCell
      const width = row.children[0].offsetWidth;

      if (row.classList.contains('expandedRow')) {
        rowBackgroundColor = hex2rgba(
          this.formattingSettings.expansionCard.backgroundColor.value.value,
          this.formattingSettings.expansionCard.opacity.value
        );

        // Replace header styles for expanded Rows
        row.children[0].style.fontFamily = rowHeadersCard.fontFamily.value;
        row.children[0].style.fontSize = `${rowHeadersCard.fontSize.value}px`;
        row.children[0].style.color = rowHeadersCard.fontColor.value.value;
        row.children[0].style.fontWeight = rowHeadersCard.enableBold.value
          ? 'bold'
          : 'normal';
        row.children[0].style.fontStyle = rowHeadersCard.enableItalic.value
          ? 'italic'
          : 'normal';

        row.children[0].style.justifyContent =
          rowHeadersCard.alignment.value.value;
      }

      // Set a linear gradient with the header backgroundColor and the row backgroundColor with a cut off where the width of the header is
      row.style.backgroundImage = `linear-gradient(to right, ${backgroundColor} ${width}px, ${rowBackgroundColor} ${width}px)`;
    }
  }

  // The column formatter
  private static formatColumns(gridApi) {
    // Check if auto width is enabled
    if (this.formattingSettings.columnCard.enableAutoWidth.value === true) {
      gridApi.columnApi.autoSizeAllColumns();
    }
  }

  // This function acts as the value formatter for every row value
  private static valueFormatterMatrix(value, valueSourceIndex) {
    // Get the value sources from the dataView
    const valueSources = this.dataView.matrix.valueSources;

    // For some reason, a value source index is always provided, except in the cases of the first index. Therefore if undefined, make it a 0
    if (valueSourceIndex === undefined) {
      valueSourceIndex = 0;
    }

    // Get the valueSource
    const valueSource = valueSources[valueSourceIndex];

    // Get the format string
    let formatString = valueSource.format;

    // If the formatString is undefined (Which happens if an implicit measure OR the measure is set to automatic) then set to the default formatString
    if (formatString === undefined) {
      formatString = '0.00';
    }

    // Create the value formatter with the formatString
    let iValueFormatter = valueFormatter.create({ format: formatString });

    // Format the value
    let formattedValue = iValueFormatter.format(value);

    // We want blanks to be invisible rather than written out as blanks
    if (formattedValue === '(Blank)') {
      formattedValue = '';
    }

    // Return the formattedValue
    return formattedValue;
  }

  // Formats the column headers
  private static formatColHeaders() {
    // Check that rowHeaders card is enabled
    if (this.formattingSettings.colHeadersCard.enableCard.value === false) {
      return;
    }

    // Get all the rows
    const rows = document.querySelectorAll('.ag-header-cell');

    // Get the row font
    const font = this.formattingSettings.colHeadersCard.fontFamily.value;

    // Get the row font size
    const fontSize = this.formattingSettings.colHeadersCard.fontSize.value;

    // Get the row font color
    const fontColor =
      this.formattingSettings.colHeadersCard.fontColor.value.value;

    // Get the bold value
    const bold = this.formattingSettings.colHeadersCard.enableBold.value;

    // Get the italic value
    const italic = this.formattingSettings.colHeadersCard.enableItalic.value;

    // Get the background color
    const backgroundColor =
      this.formattingSettings.colHeadersCard.backgroundColor.value.value;

    // Get the border width
    const borderWidth =
      this.formattingSettings.colHeadersCard.borderWidth.value;

    // Get the border color
    const borderColor = hex2rgba(
      this.formattingSettings.colHeadersCard.borderColor.value.value,
      this.formattingSettings.colHeadersCard.borderOpacity.value
    );

    // Get the border style
    const borderStyle =
      this.formattingSettings.colHeadersCard.borderStyle.value.value;

    // Get the Top border enabled
    const topBorder =
      this.formattingSettings.colHeadersCard.enableTopBorder.value;

    // Get the right border enabled
    const rightBorder =
      this.formattingSettings.colHeadersCard.enableRightBorder.value;

    // Get the left border
    const leftBorder =
      this.formattingSettings.colHeadersCard.enableLeftBorder.value;

    // Get alignment
    const alignment =
      this.formattingSettings.colHeadersCard.alignment.value.value;

    // Get the Bottom border enabled
    const bottomBorder =
      this.formattingSettings.colHeadersCard.enableBottomBorder.value;

    for (const rowContainer of Object(rows)) {
      const row = rowContainer.querySelector('.ag-header-cell-label');

      // Set the background Color to the parent element of the row to avoid gaps in the background color (Perhaps changed later to cells, depending on specific columns)
      rowContainer.parentElement.style.backgroundColor = hex2rgba(
        backgroundColor,
        this.formattingSettings.colHeadersCard.opacity.value
      );

      // Set the row font
      row.style.fontFamily = font;

      // Set the row font size
      row.style.fontSize = `${fontSize}px`;

      // Set the row font color
      row.style.color = fontColor;

      // Set the bold
      row.style.fontWeight = bold ? 'bold' : 'normal';

      // Set the italic
      row.style.fontStyle = italic ? 'italic' : 'normal';

      // Set the top border
      rowContainer.style.borderTop = topBorder
        ? `${borderWidth}px ${borderStyle} ${borderColor}`
        : 'none';

      // Set the bottom border
      rowContainer.style.borderBottom = bottomBorder
        ? `${borderWidth}px ${borderStyle} ${borderColor}`
        : 'none';

      // Set the right border
      rowContainer.style.borderRight = rightBorder
        ? `${borderWidth}px ${borderStyle} ${borderColor}`
        : 'none';

      // Set the left border
      rowContainer.style.borderLeft = leftBorder
        ? `${borderWidth}px ${borderStyle} ${borderColor}`
        : 'none';

      // Set alignment
      for (const child of row.children) {
        child.style.justifyContent = alignment;
      }
    }
  }

  private static formatSpecificRows() {
    // Get all the categoryCells
    const categoryCells = document.querySelectorAll('.categoryCell');

    // Loop through the formatting settings cards array
    for (const card of this.formattingSettings.cards) {
      // Check if the card contains the string "specificRow" via the name attribute
      const name = card.name;

      if (!name.includes('specificRow')) {
        continue;
      }

      // Check if the enableCard is enabled
      if (card.enableCard.value === false) {
        continue;
      }

      if (card.savedName.value === '') {
        continue;
      }

      // Get the applicable rows
      const applicableRows = card.savedName.value.split(',');

      // Get the rowHeaderFontFamily
      const rowHeaderFontFamily = card.rowHeaderFontFamily.value;

      // Get the height
      const height = card.height.value;

      // Get the RowHeaderFontColor
      const rowHeaderFontColor = card.rowHeaderFontColor.value.value;

      // Get the RowHeaderFontSize
      const rowHeaderFontSize = card.rowHeaderFontSize.value;

      // Get the RowHeaderBold
      const rowHeaderBold = card.rowHeaderBold.value;

      // Get the RowHeaderItalic
      const rowHeaderItalic = card.rowHeaderItalic.value;

      // Get the RowHeaderAlignment
      const rowHeaderAlignment = card.rowHeaderAlignment.value.value;

      // Get the RowHeaderBackground
      const rowHeaderBackground = card.rowHeaderBackground.value.value;

      // Get the row font
      const font = card.fontFamily.value;

      // Get the row font size
      const fontSize = card.fontSize.value;

      // Get the row font color
      const fontColor = card.fontColor.value.value;

      // Get the bold value
      const bold = card.enableBold.value;

      // Get the italic value
      const italic = card.enableItalic.value;

      // Get the background color
      const backgroundColor = card.backgroundColor.value.value;

      // Get the border width
      const borderWidth = card.borderWidth.value;

      // Get the border color
      const borderColor = hex2rgba(
        card.borderColor.value.value,
        card.borderOpacity.value
      );

      // Get the border style
      const borderStyle = card.borderStyle.value.value;

      // Get the Top border enabled
      const topBorder = card.enableTopBorder.value;

      // Get alignment
      const alignment = card.alignment.value.value;

      // Get the Bottom border enabled
      const bottomBorder = card.enableBottomBorder.value;

      // Loop through the applicale rows
      for (const displayName of applicableRows) {
        // Loop through the category cells to find the correct row
        for (const rowHeader of Object(categoryCells)) {
          // Remove "+" or "-" from the row textContent
          const rowTextContent = rowHeader.textContent
            .replace('+', '')
            .replace('-', '');

          // Skip if they do not match
          if (
            rowTextContent !== displayName.replace('+', '').replace('-', '')
          ) {
            continue;
          }

          // Get the parent element to style the row
          const row = rowHeader.parentElement;

          // Get the row-id via query selector
          const rowId = row.getAttribute('row-id');

          // Get the row node
          const rowNode = this.gridOptions.api.getRowNode(rowId);

          // Set the row height via the grid API
          rowNode.setRowHeight(height);

          // Set the top border
          row.style.borderTop = topBorder
            ? `${borderWidth}px ${borderStyle} ${borderColor}`
            : 'none';

          // Set the bottom border
          row.style.borderBottom = bottomBorder
            ? `${borderWidth}px ${borderStyle} ${borderColor}`
            : 'none';

          // Set child specific values
          for (const child of row.children) {
            child.style.justifyContent = alignment;

            // Set the row font
            child.style.fontFamily = font;

            // Set the row font size
            child.style.fontSize = `${fontSize}px`;

            // Set the row font color
            child.style.color = fontColor;

            // Set the bold
            child.style.fontWeight = bold ? 'bold' : 'normal';

            // Set the italic
            child.style.fontStyle = italic ? 'italic' : 'normal';

            // Set the indentation
            child.style.textIndent = `${card.indentation.value}px`;

            child.style.backgroundColor = 'RGBA(0,0,0,0)';
          }

          // Get the rowheader width for the linear gradient
          const rowHeaderWidth = rowHeader.offsetWidth;

          // Create a linear gradient where the color includes the headerColor and the row color where it cuts off at the header width
          row.style.backgroundImage = `linear-gradient(to right, ${hex2rgba(
            rowHeaderBackground,
            card.headerOpacity.value
          )} ${rowHeaderWidth}px, ${hex2rgba(
            backgroundColor,
            card.opacity.value
          )} ${rowHeaderWidth}px)`;

          // Set the rowHeader values to the rowHeader
          rowHeader.style.fontFamily = rowHeaderFontFamily;
          rowHeader.style.fontSize = `${rowHeaderFontSize}px`;
          rowHeader.style.color = rowHeaderFontColor;
          rowHeader.style.justifyContent = rowHeaderAlignment;
          rowHeader.style.fontWeight = rowHeaderBold ? 'bold' : 'normal';
          rowHeader.style.fontStyle = rowHeaderItalic ? 'italic' : 'normal';
          rowHeader.style.textIndent = `${card.rowHeaderIndentation.value}px`;
        }
      }

      // Toggle the grid api row height changed for reformatting IF value is NOT 25
      if (height !== 25) {
        this.gridOptions.api.onRowHeightChanged();
      }
    }
  }

  // The function to format specific columns
  private static formatSpecificColumns() {
    const headerCells = Object(
      document.querySelectorAll('.ag-header-cell-text')
    );

    // Loop through the formatting settings cards array
    for (const card of this.formattingSettings.cards) {
      // Check if the card contains the string "specificRow" via the name attribute
      const name = card.name;

      if (!name.includes('specificColumn')) {
        continue;
      }

      // Check if the enableCard is enabled
      if (card.enableCard.value === false) {
        continue;
      }

      // Applicable columns via the card savedName
      const applicableColumns = card.savedName.value.split(',');

      for (const displayName of applicableColumns) {
        // Loop through the header cells to find the correct row
        for (const header of headerCells) {
          // Skip if they do not match
          if (header.textContent !== displayName) {
            continue;
          }

          // Get the columnAlignment from the card
          const alignment = card.columnAlignment.value.value;

          // Get the columncBackgroundColor
          const backgroundColor = hex2rgba(
            card.columnBackgroundColor.value.value,
            card.valuesOpacity.value
          );

          // Get the columnBold
          const bold = card.columnBold.value;

          // Get the columnItalic
          const italic = card.columnItalic.value;

          // Get the columnFontColor
          const fontColor = card.columnFontColor.value.value;

          // Get the columnFontFamily
          const font = card.columnFontFamily.value;

          // Get the columnFontSize
          const fontSize = card.columnFontSize.value;

          // Get the columnHeaderAlignment
          const columnHeaderAlignment = card.columnHeaderAlignment.value.value;

          // Get the columnHeaderBackgroundColor
          const columnHeaderBackgroundColor = hex2rgba(
            card.columnHeaderBackgroundColor.value.value,
            card.opacity.value
          );

          console.log(columnHeaderBackgroundColor, 'columnHeaderBackgroundColor')

          // Get the columnHeaderBold
          const columnHeaderBold = card.columnHeaderBold.value;

          // Get the columnHeaderFontColor
          const columnHeaderFontColor = card.columnHeaderFontColor.value.value;

          // Get the columnHeaderFontFamily
          const columnHeaderFontFamily = card.columnHeaderFontFamily.value;

          // Get the columnHeaderFontSize
          const columnHeaderFontSize = card.columnHeaderFontSize.value;

          // Get the columnHeaderItalic
          const columnHeaderItalic = card.columnHeaderItalic.value;

          // APPLIES TO HEADER AND REST OF COLUMN
          // Get the columnWidth
          const columnWidth = card.columnWidth.value;

          // Get the enableLeftBorder
          const enableLeftBorder = card.enableLeftBorder.value;

          // Get the enableRightBorder
          const enableRightBorder = card.enableRightBorder.value;

          // Get the borderColor
          const borderColor = hex2rgba(
            card.borderColor.value.value,
            card.borderOpacity.value
          );

          // Get the borderStyle
          const borderStyle = card.borderStyle.value.value;

          // Get the borderWidth
          const borderWidth = card.borderWidth.value;

          // Get the parent of the parent of parent of parent of the header to style the column
          // This is due to line breaks being added from the top parent that could not get removed
          const headerParent =
            header.parentElement.parentElement.parentElement.parentElement;

          // Get the col-id attribute value form the headerParent
          const colId = headerParent.getAttribute('col-id');

          // Get the column via col-id from querySelectorAll
          const columnChildren = Object(
            document.querySelectorAll(`[col-id="${colId}"]`)
          );

          for (const child of columnChildren) {
            // // Apply styles to children
            child.style.justifyContent = alignment;
            child.style.backgroundColor = backgroundColor;
            child.style.fontFamily = font;
            child.style.fontSize = `${fontSize}px`;
            child.style.color = fontColor;
            child.style.fontWeight = bold ? 'bold' : 'normal';
            child.style.fontStyle = italic ? 'italic' : 'normal';
            child.style.borderLeft = enableLeftBorder
              ? `${borderWidth}px ${borderStyle} ${borderColor}`
              : 'none';

            child.style.borderRight = enableRightBorder
              ? `${borderWidth}px ${borderStyle} ${borderColor}`
              : 'none';

            child.style.borderBottom = 'none';
            child.style.borderTop = 'none';
          }

          // Apply to the headerParent and the header from the header variables
          // Set the column font
          header.style.fontFamily = columnHeaderFontFamily;
          header.style.fontStyle = columnHeaderItalic ? 'italic' : 'normal';
          header.style.fontWeight = columnHeaderBold ? 'bold' : 'normal';
          header.style.fontSize = `${columnHeaderFontSize}px`;
          header.style.color = columnHeaderFontColor;
          headerParent.style.backgroundColor = columnHeaderBackgroundColor;
          headerParent.style.display = 'flex';
          header.style.justifyContent = columnHeaderAlignment;

          // Apply the column width
          this.gridOptions.columnApi.setColumnWidths([
            { key: colId, newWidth: columnWidth },
          ]);
        }
      }
    }
  }
}

// HEX TO RGBA CONVERTER FUNCTION
function hex2rgba(hex, alpha = 1) {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha / 100})`;
}
