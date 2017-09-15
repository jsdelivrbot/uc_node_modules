import { Dataset } from "../core/dataset";
import { AttributeToProjector, Bounds, IAccessor, Point, Range } from "../core/interfaces";
import * as Drawers from "../drawers";
import { ProxyDrawer } from "../drawers/drawer";
import { Scale } from "../scales/scale";
import * as Utils from "../utils";
import * as Plots from "./";
import { IPlotEntity } from "./";
import { XYPlot } from "./xyPlot";
export declare class Rectangle<X, Y> extends XYPlot<X, Y> {
    private static _X2_KEY;
    private static _Y2_KEY;
    private _labelsEnabled;
    private _label;
    /**
     * A Rectangle Plot displays rectangles based on the data.
     * The left and right edges of each rectangle can be set with x() and x2().
     *   If only x() is set the Rectangle Plot will attempt to compute the correct left and right edge positions.
     * The top and bottom edges of each rectangle can be set with y() and y2().
     *   If only y() is set the Rectangle Plot will attempt to compute the correct top and bottom edge positions.
     *
     * @constructor
     * @param {Scale.Scale} xScale
     * @param {Scale.Scale} yScale
     */
    constructor();
    protected _createDrawer(): ProxyDrawer;
    protected _generateAttrToProjector(): AttributeToProjector;
    protected _generateDrawSteps(): Drawers.DrawStep[];
    protected _updateExtentsForProperty(property: string): void;
    protected _filterForProperty(property: string): IAccessor<boolean>;
    /**
     * Gets the AccessorScaleBinding for X.
     */
    x(): Plots.ITransformableAccessorScaleBinding<X, number>;
    /**
     * Sets X to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} x
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    x(x: number | IAccessor<number>): this;
    /**
     * Sets X to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {X|Accessor<X>} x
     * @param {Scale<X, number>} xScale
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    x(x: X | IAccessor<X>, xScale: Scale<X, number>): this;
    /**
     * Gets the AccessorScaleBinding for X2.
     */
    x2(): Plots.ITransformableAccessorScaleBinding<X, number>;
    /**
     * Sets X2 to a constant number or the result of an Accessor.
     * If a Scale has been set for X, it will also be used to scale X2.
     *
     * @param {number|Accessor<number>|X|Accessor<X>} x2
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    x2(x2: number | IAccessor<number> | X | IAccessor<X>): this;
    /**
     * Gets the AccessorScaleBinding for Y.
     */
    y(): Plots.ITransformableAccessorScaleBinding<Y, number>;
    /**
     * Sets Y to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} y
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    y(y: number | IAccessor<number>): this;
    /**
     * Sets Y to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {Y|Accessor<Y>} y
     * @param {Scale<Y, number>} yScale
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    y(y: Y | IAccessor<Y>, yScale: Scale<Y, number>): this;
    /**
     * Gets the AccessorScaleBinding for Y2.
     */
    y2(): Plots.ITransformableAccessorScaleBinding<Y, number>;
    /**
     * Sets Y2 to a constant number or the result of an Accessor.
     * If a Scale has been set for Y, it will also be used to scale Y2.
     *
     * @param {number|Accessor<number>|Y|Accessor<Y>} y2
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    y2(y2: number | IAccessor<number> | Y | IAccessor<Y>): this;
    /**
     * Gets the PlotEntities at a particular Point.
     *
     * @param {Point} point The point to query.
     * @returns {PlotEntity[]} The PlotEntities at the particular point
     */
    entitiesAt(point: Point): IPlotEntity[];
    /**
     * Gets the Entities that intersect the Bounds.
     *
     * @param {Bounds} bounds
     * @returns {PlotEntity[]}
     */
    entitiesIn(bounds: Bounds): IPlotEntity[];
    /**
     * Gets the Entities that intersect the area defined by the ranges.
     *
     * @param {Range} xRange
     * @param {Range} yRange
     * @returns {PlotEntity[]}
     */
    entitiesIn(xRange: Range, yRange: Range): IPlotEntity[];
    private _entityBBox(datum, index, dataset, attrToProjector);
    private _entitiesIntersecting(xValOrRange, yValOrRange);
    /**
     * Gets the accessor for labels.
     *
     * @returns {Accessor<string>}
     */
    label(): IAccessor<string>;
    /**
     * Sets the text of labels to the result of an Accessor.
     *
     * @param {Accessor<string>} label
     * @returns {Plots.Rectangle} The calling Rectangle Plot.
     */
    label(label: IAccessor<string>): this;
    /**
     * Gets whether labels are enabled.
     *
     * @returns {boolean}
     */
    labelsEnabled(): boolean;
    /**
     * Sets whether labels are enabled.
     * Labels too big to be contained in the rectangle, cut off by edges, or blocked by other rectangles will not be shown.
     *
     * @param {boolean} labelsEnabled
     * @returns {Rectangle} The calling Rectangle Plot.
     */
    labelsEnabled(enabled: boolean): this;
    protected _propertyProjectors(): AttributeToProjector;
    protected _pixelPoint(datum: any, index: number, dataset: Dataset): {
        x: any;
        y: any;
    };
    private _rectangleWidth(scale);
    protected _getDataToDraw(): Utils.Map<Dataset, any[]>;
    protected _additionalPaint(time: number): void;
    private _drawLabels();
    private _drawLabel(dataToDraw, dataset, datasetIndex);
    private _overlayLabel(labelXRange, labelYRange, datumIndex, datasetIndex, dataToDraw);
}
