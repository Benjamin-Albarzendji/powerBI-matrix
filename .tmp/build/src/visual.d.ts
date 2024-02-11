import powerbi from 'powerbi-visuals-api';
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import './../style/visual.less';
export declare class Visual implements IVisual {
    private target;
    private dataView;
    private host;
    private formattingSettings;
    private formattingSettingsService;
    private selectionManager;
    private events;
    constructor(options: VisualConstructorOptions);
    /**
     * Update function that gets called with interaction, data, size, etc.
     */
    update(options: VisualUpdateOptions): void;
    /**
     * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
     * This method is called once every time we open properties pane or when the user edit any format property.
     */
    getFormattingModel(): powerbi.visuals.FormattingModel;
}
