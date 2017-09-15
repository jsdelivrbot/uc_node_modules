import { IAnimator } from "../animators/animator";
import { Dataset } from "../core/dataset";
import { AttributeToProjector, IAccessor, Point } from "../core/interfaces";
import { QuantitativeScale } from "../scales/quantitativeScale";
import { Scale } from "../scales/scale";
import * as Utils from "../utils";
import * as Plots from "./";
import { Area } from "./areaPlot";
export declare class StackedArea<X> extends Area<X> {
    private _stackingOrder;
    private _stackingResult;
    private _stackedExtent;
    private _baseline;
    private _baselineValue;
    private _baselineValueProvider;
    /**
     * @constructor
     */
    constructor();
    croppedRenderingEnabled(): boolean;
    croppedRenderingEnabled(croppedRendering: boolean): this;
    protected _getAnimator(key: string): IAnimator;
    protected _setup(): void;
    x(): Plots.ITransformableAccessorScaleBinding<X, number>;
    x(x: number | IAccessor<number>): this;
    x(x: X | IAccessor<X>, xScale: Scale<X, number>): this;
    y(): Plots.ITransformableAccessorScaleBinding<number, number>;
    y(y: number | IAccessor<number>): this;
    y(y: number | IAccessor<number>, yScale: QuantitativeScale<number>): this;
    /**
     * Gets the stacking order of the plot.
     */
    stackingOrder(): Utils.Stacking.IStackingOrder;
    /**
     * Sets the stacking order of the plot.
     *
     * By default, stacked plots are "bottomup", meaning for positive data, the
     * first series will be placed at the bottom of the scale and subsequent
     * data series will by stacked on top. This can be reveresed by setting
     * stacking order to "topdown".
     *
     * @returns {Plots.StackedArea} This plot
     */
    stackingOrder(stackingOrder: Utils.Stacking.IStackingOrder): this;
    /**
     * Gets if downsampling is enabled
     *
     * When downsampling is enabled, two consecutive lines with the same slope will be merged to one line.
     */
    downsamplingEnabled(): boolean;
    /**
     * Sets if downsampling is enabled
     *
     * For now, downsampling is always disabled in stacked area plot
     * @returns {Plots.StackedArea} The calling Plots.StackedArea
     */
    downsamplingEnabled(downsampling: boolean): this;
    protected _additionalPaint(): void;
    protected _updateYScale(): void;
    protected _onDatasetUpdate(): this;
    protected _updateExtentsForProperty(property: string): void;
    protected _extentsForProperty(attr: string): any[];
    private _updateStackExtentsAndOffsets();
    private _checkSameDomain(datasets, keyAccessor);
    /**
     * Given an array of Datasets and the accessor function for the key, computes the
     * set reunion (no duplicates) of the domain of each Dataset. The keys are stringified
     * before being returned.
     *
     * @param {Dataset[]} datasets The Datasets for which we extract the domain keys
     * @param {Accessor<any>} keyAccessor The accessor for the key of the data
     * @return {string[]} An array of stringified keys
     */
    private static _domainKeys(datasets, keyAccessor);
    protected _propertyProjectors(): AttributeToProjector;
    protected _pixelPoint(datum: any, index: number, dataset: Dataset): Point;
}
