import { Dataset } from "../core/dataset";
import { Formatter } from "../core/formatters";
import { IAccessor } from "../core/interfaces";
import { Scale } from "../scales/scale";
import * as Utils from "../utils";
import * as Plots from "./";
import { Bar, BarOrientation } from "./barPlot";
export declare class StackedBar<X, Y> extends Bar<X, Y> {
    protected static _STACKED_BAR_LABEL_PADDING: number;
    private _extremaFormatter;
    private _labelArea;
    private _measurer;
    private _writer;
    private _stackingOrder;
    private _stackingResult;
    private _stackedExtent;
    /**
     * A StackedBar Plot stacks bars across Datasets based on the primary value of the bars.
     *   On a vertical StackedBar Plot, the bars with the same X value are stacked.
     *   On a horizontal StackedBar Plot, the bars with the same Y value are stacked.
     *
     * @constructor
     * @param {Scale} xScale
     * @param {Scale} yScale
     * @param {string} [orientation="vertical"] One of "vertical"/"horizontal".
     */
    constructor(orientation?: BarOrientation);
    x(): Plots.ITransformableAccessorScaleBinding<X, number>;
    x(x: number | IAccessor<number>): this;
    x(x: X | IAccessor<X>, xScale: Scale<X, number>): this;
    y(): Plots.ITransformableAccessorScaleBinding<Y, number>;
    y(y: number | IAccessor<number>): this;
    y(y: Y | IAccessor<Y>, yScale: Scale<Y, number>): this;
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
     * Gets the Formatter for the stacked bar extrema labels.
     */
    extremaFormatter(): Formatter;
    /**
     * Sets the Formatter for the stacked bar extrema labels. Extrema labels are the
     * numbers at the very top and bottom of the stack that aren't associated
     * with a single datum. Their value will be passed through this formatter
     * before being displayed.
     *
     * @param {Formatter} formatter
     * @returns {this}
     */
    extremaFormatter(formatter: Formatter): this;
    protected _setup(): void;
    protected _drawLabels(): void;
    protected _generateAttrToProjector(): {
        [attr: string]: (datum: any, index: number, dataset: Dataset) => any;
    };
    protected _onDatasetUpdate(): this;
    protected _updateExtentsForProperty(property: string): void;
    protected _extentsForProperty(attr: string): any[];
    private _updateStackExtentsAndOffsets();
    invalidateCache(): void;
}
