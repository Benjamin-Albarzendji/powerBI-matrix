import powerbi from 'powerbi-visuals-api';
import { Selector } from './common';
import VisualObjectInstance = powerbi.VisualObjectInstance;
import VisualObjectInstanceContainer = powerbi.VisualObjectInstanceContainer;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
export declare class ObjectEnumerationBuilder {
    private instances;
    private containers;
    private containerIdx;
    pushInstance(instance: VisualObjectInstance, mergeInstances?: boolean): ObjectEnumerationBuilder;
    pushContainer(container: VisualObjectInstanceContainer): ObjectEnumerationBuilder;
    popContainer(): ObjectEnumerationBuilder;
    complete(): VisualObjectInstanceEnumerationObject;
    private canMerge;
    private extend;
    static merge(x: VisualObjectInstanceEnumeration, y: VisualObjectInstanceEnumeration): VisualObjectInstanceEnumerationObject;
    static normalize(x: VisualObjectInstanceEnumeration): VisualObjectInstanceEnumerationObject;
    static getContainerForInstance(enumeration: VisualObjectInstanceEnumerationObject, instance: VisualObjectInstance): VisualObjectInstanceContainer;
    static selectorEquals(x: Selector, y: Selector): boolean;
}
