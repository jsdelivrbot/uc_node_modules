/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import * as d3 from "d3";
import * as d3Shape from "d3-shape";
import { Dataset } from "../core/dataset";
import { AttributeToProjector, Bounds, IAccessor, Point, Projector, Range } from "../core/interfaces";
import * as Drawers from "../drawers";
import { ProxyDrawer } from "../drawers/drawer";
import { Scale } from "../scales/scale";
import * as Utils from "../utils";
import * as Plots from "./";
import { IPlotEntity } from "./";
import { XYPlot } from "./xyPlot";
/**
 * Known curve types that line and area plot's .curve() methods understand
 */
export declare const CurveName: {
    linear: "linear";
    linearClosed: "linearClosed";
    step: "step";
    stepBefore: "stepBefore";
    stepAfter: "stepAfter";
    basis: "basis";
    basisOpen: "basisOpen";
    basisClosed: "basisClosed";
    bundle: "bundle";
    cardinal: "cardinal";
    cardinalOpen: "cardinalOpen";
    cardinalClosed: "cardinalClosed";
    monotone: "monotone";
};
export declare type CurveName = keyof typeof CurveName;
export declare class Line<X> extends XYPlot<X, number> {
    private _curve;
    private _autorangeSmooth;
    private _croppedRenderingEnabled;
    private _collapseDenseVerticalLinesEnabled;
    private _downsamplingEnabled;
    /**
     * A Line Plot draws line segments starting from the first data point to the next.
     *
     * @constructor
     */
    constructor();
    x(): Plots.ITransformableAccessorScaleBinding<X, number>;
    x(x: number | IAccessor<number>): this;
    x(x: X | IAccessor<X>, xScale: Scale<X, number>): this;
    y(): Plots.ITransformableAccessorScaleBinding<number, number>;
    y(y: number | IAccessor<number>): this;
    y(y: number | IAccessor<number>, yScale: Scale<number, number>): this;
    autorangeMode(): string;
    autorangeMode(autorangeMode: string): this;
    /**
     * Gets whether or not the autoranging is done smoothly.
     */
    autorangeSmooth(): boolean;
    /**
     * Sets whether or not the autorange is done smoothly.
     *
     * Smooth autoranging is done by making sure lines always exit on the left / right side of the plot
     * and deactivating the nice domain feature on the scales
     */
    autorangeSmooth(autorangeSmooth: boolean): this;
    private _setScaleSnapping();
    /**
     * Gets the curve function associated with the plot.
     *
     * @return {string | d3.CurveFactory | d3.CurveFactoryLineOnly}
     */
    curve(): CurveName | d3.CurveFactory | d3.CurveFactoryLineOnly;
    /**
     * Sets the curve function associated with the plot. The curve function specifies how to
     * draw the interpolated line between successive points.
     *
     * @param {string | points: Array<[number, number]>) => string} curve Curve function
     * @return Plots.Line
     */
    curve(curve: CurveName | d3.CurveFactory | d3.CurveFactoryLineOnly): this;
    /**
     * Gets if downsampling is enabled
     *
     * When downsampling is enabled, two consecutive lines with the same slope will be merged to one line.
     */
    downsamplingEnabled(): boolean;
    /**
     * Sets if downsampling is enabled
     *
     * @returns {Plots.Line} The calling Plots.Line
     */
    downsamplingEnabled(downsampling: boolean): this;
    /**
     * Gets if croppedRendering is enabled
     *
     * When croppedRendering is enabled, lines that will not be visible in the viewport will not be drawn.
     */
    croppedRenderingEnabled(): boolean;
    /**
     * Sets if croppedRendering is enabled
     *
     * @returns {Plots.Line} The calling Plots.Line
     */
    croppedRenderingEnabled(croppedRendering: boolean): this;
    /**
     * Gets if collapseDenseLines is enabled
     *
     * When collapseDenseLines is enabled, vertical or nearly vertical line
     * segments that have the same floored x coordinate will be bucketed then
     * drawn, drastically reducing the render time of dense line plots like
     * timeseries. Only applies to the high performance "canvas" drawer.
     */
    collapseDenseLinesEnabled(): boolean;
    /**
     * Sets if collapseDenseLines is enabled
     *
     * @returns {Plots.Line} The calling Plots.Line
     */
    collapseDenseLinesEnabled(collapseDenseLines: boolean): this;
    protected _createDrawer(dataset: Dataset): ProxyDrawer;
    protected _extentsForProperty(property: string): any[];
    private _getEdgeIntersectionPoints();
    protected _getResetYFunction(): (d: any, i: number, dataset: Dataset) => number;
    protected _generateDrawSteps(): Drawers.DrawStep[];
    protected _generateAttrToProjector(): AttributeToProjector;
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
    /**
     * Returns the PlotEntity nearest to the query point by X then by Y, or undefined if no PlotEntity can be found.
     *
     * @param {Point} queryPoint
     * @returns {PlotEntity} The nearest PlotEntity, or undefined if no PlotEntity can be found.
     */
    entityNearestByXThenY(queryPoint: Point): IPlotEntity;
    protected _propertyProjectors(): AttributeToProjector;
    protected _constructLineProjector(xProjector: Projector, yProjector: Projector): (datum: any, index: number, dataset: Dataset) => string;
    /**
     * Return a d3.Line whose .x, .y, and .defined accessors are hooked up to the xProjector and yProjector
     * after they've been fed the dataset, and whose curve is configured to this plot's curve.
     * @param dataset
     * @param xProjector
     * @param yProjector
     * @returns {Line<[number,number]>}
     * @private
     */
    protected _d3LineFactory(dataset: Dataset, xProjector?: IAccessor<any>, yProjector?: IAccessor<any>): d3Shape.Line<any>;
    protected _getCurveFactory(): d3.CurveFactory | d3.CurveFactoryLineOnly;
    /**
     * Line plots represent each dataset with a single <path> element, so we wrap the dataset data in a single element array.
     * @returns {Map<Dataset, any[]>}
     * @private
     */
    protected _getDataToDraw(): Utils.Map<Dataset, any[]>;
    private _filterCroppedRendering(dataset, indices);
    private _filterDownsampling(dataset, indices);
    /**
     * Collapse line geometry
     *
     * Assuming that there are many points that are drawn on the same coordinate,
     * we can save a lot of render time by just drawing one line from the min to
     * max y-coordinate of all those points.
     */
    private _filterDenseLines(dataset, indices);
    /**
     * Iterates over the line points collapsing points that fall on the same
     * floored x coordinate.
     *
     * Once all the points with the same x coordinate are detected, we draw a
     * single line from the min to max y coorindate.
     *
     * The "entrance" and "exit" lines to/from this collapsed vertical line are
     * also drawn. This allows lines with no collapsed segments to render
     * correctly.
     */
    private _bucketByX(dataset, indices, xFn, yFn);
}
