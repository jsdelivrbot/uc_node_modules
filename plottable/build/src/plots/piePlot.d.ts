import { Dataset } from "../core/dataset";
import { DatumFormatter } from "../core/formatters";
import { AttributeToProjector, IAccessor, Point, SimpleSelection } from "../core/interfaces";
import { Scale } from "../scales/scale";
import * as Utils from "../utils";
import { ProxyDrawer } from "../drawers/drawer";
import { IAccessorScaleBinding, IPlotEntity } from "./";
import { Plot } from "./plot";
export interface IPiePlotEntity extends IPlotEntity {
    strokeSelection: SimpleSelection<any>;
}
export declare class Pie extends Plot {
    private static _INNER_RADIUS_KEY;
    private static _OUTER_RADIUS_KEY;
    private static _SECTOR_VALUE_KEY;
    private _startAngle;
    private _endAngle;
    private _startAngles;
    private _endAngles;
    private _labelFormatter;
    private _labelsEnabled;
    private _strokeDrawers;
    /**
     * @constructor
     */
    constructor();
    protected _setup(): void;
    computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): this;
    addDataset(dataset: Dataset): this;
    protected _addDataset(dataset: Dataset): this;
    removeDataset(dataset: Dataset): this;
    protected _removeDatasetNodes(dataset: Dataset): void;
    protected _removeDataset(dataset: Dataset): this;
    selections(datasets?: Dataset[]): SimpleSelection<any>;
    protected _onDatasetUpdate(): void;
    protected _createDrawer(): ProxyDrawer;
    entities(datasets?: Dataset[]): IPiePlotEntity[];
    /**
     * Gets the AccessorScaleBinding for the sector value.
     */
    sectorValue<S>(): IAccessorScaleBinding<S, number>;
    /**
     * Sets the sector value to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} sectorValue
     * @returns {Pie} The calling Pie Plot.
     */
    sectorValue(sectorValue: number | IAccessor<number>): this;
    /**
     * Sets the sector value to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {S|Accessor<S>} sectorValue
     * @param {Scale<S, number>} scale
     * @returns {Pie} The calling Pie Plot.
     */
    sectorValue<S>(sectorValue: S | IAccessor<S>, scale: Scale<S, number>): this;
    /**
     * Gets the AccessorScaleBinding for the inner radius.
     */
    innerRadius<R>(): IAccessorScaleBinding<R, number>;
    /**
     * Sets the inner radius to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} innerRadius
     * @returns {Pie} The calling Pie Plot.
     */
    innerRadius(innerRadius: number | IAccessor<number>): any;
    /**
     * Sets the inner radius to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {R|Accessor<R>} innerRadius
     * @param {Scale<R, number>} scale
     * @returns {Pie} The calling Pie Plot.
     */
    innerRadius<R>(innerRadius: R | IAccessor<R>, scale: Scale<R, number>): any;
    /**
     * Gets the AccessorScaleBinding for the outer radius.
     */
    outerRadius<R>(): IAccessorScaleBinding<R, number>;
    /**
     * Sets the outer radius to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} outerRadius
     * @returns {Pie} The calling Pie Plot.
     */
    outerRadius(outerRadius: number | IAccessor<number>): this;
    /**
     * Sets the outer radius to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {R|Accessor<R>} outerRadius
     * @param {Scale<R, number>} scale
     * @returns {Pie} The calling Pie Plot.
     */
    outerRadius<R>(outerRadius: R | IAccessor<R>, scale: Scale<R, number>): this;
    /**
     * Gets the start angle of the Pie Plot
     *
     * @returns {number} Returns the start angle
     */
    startAngle(): number;
    /**
     * Sets the start angle of the Pie Plot.
     *
     * @param {number} startAngle
     * @returns {Pie} The calling Pie Plot.
     */
    startAngle(angle: number): this;
    /**
     * Gets the end angle of the Pie Plot.
     *
     * @returns {number} Returns the end angle
     */
    endAngle(): number;
    /**
     * Sets the end angle of the Pie Plot.
     *
     * @param {number} endAngle
     * @returns {Pie} The calling Pie Plot.
     */
    endAngle(angle: number): this;
    /**
     * Get whether slice labels are enabled.
     *
     * @returns {boolean} Whether slices should display labels or not.
     */
    labelsEnabled(): boolean;
    /**
     * Sets whether labels are enabled.
     *
     * @param {boolean} labelsEnabled
     * @returns {Pie} The calling Pie Plot.
     */
    labelsEnabled(enabled: boolean): this;
    /**
     * Gets the Formatter for the labels.
     */
    labelFormatter(): DatumFormatter;
    /**
     * Sets the Formatter for the labels. The labelFormatter will be fed each pie
     * slice's value as computed by the `.sectorValue()` accessor, as well as the
     * datum, datum index, and dataset associated with that bar.
     *
     * @param {Formatter} formatter
     * @returns {Pie} The calling Pie Plot.
     */
    labelFormatter(formatter: DatumFormatter): this;
    entitiesAt(queryPoint: Point): IPiePlotEntity[];
    protected _propertyProjectors(): AttributeToProjector;
    private _updatePieAngles();
    private _pieCenter();
    protected _getDataToDraw(): Utils.Map<Dataset, any[]>;
    protected static _isValidData(value: any): boolean;
    protected _pixelPoint(datum: any, index: number, dataset: Dataset): {
        x: number;
        y: number;
    };
    protected _additionalPaint(time: number): void;
    private _generateStrokeDrawSteps();
    private _sliceIndexForPoint(p);
    private _drawLabels();
}
