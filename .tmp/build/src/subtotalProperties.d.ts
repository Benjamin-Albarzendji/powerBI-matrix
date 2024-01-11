import { DataViewObjectPropertyReference } from './common';
export declare class SubtotalProperties {
    static readonly ObjectSubTotals: string;
    static rowSubtotals: DataViewObjectPropertyReference<boolean>;
    static rowSubtotalsPerLevel: DataViewObjectPropertyReference<boolean>;
    static columnSubtotals: DataViewObjectPropertyReference<boolean>;
    static columnSubtotalsPerLevel: DataViewObjectPropertyReference<boolean>;
    static levelSubtotalEnabled: DataViewObjectPropertyReference<boolean>;
}
