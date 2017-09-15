import { QuantitativeScale } from "../scales/quantitativeScale";
import { Axis, AxisOrientation } from "./axis";
export declare class Numeric extends Axis<number> {
    private _tickLabelPositioning;
    private _usesTextWidthApproximation;
    private _measurer;
    private _wrapper;
    /**
     * Constructs a Numeric Axis.
     *
     * A Numeric Axis is a visual representation of a QuantitativeScale.
     *
     * @constructor
     * @param {QuantitativeScale} scale
     * @param {AxisOrientation} orientation Orientation of this Numeric Axis.
     */
    constructor(scale: QuantitativeScale<number>, orientation: AxisOrientation);
    protected _setup(): void;
    protected _computeWidth(): number;
    private _computeExactTextWidth();
    private _computeApproximateTextWidth();
    protected _computeHeight(): number;
    protected _getTickValues(): number[];
    protected _rescale(): void;
    renderImmediately(): this;
    /**
     * Gets the tick label position relative to the tick marks.
     *
     * @returns {string} The current tick label position.
     */
    tickLabelPosition(): string;
    /**
     * Sets the tick label position relative to the tick marks.
     *
     * @param {string} position "top"/"center"/"bottom" for a vertical Numeric Axis,
     *                          "left"/"center"/"right" for a horizontal Numeric Axis.
     * @returns {Numeric} The calling Numeric Axis.
     */
    tickLabelPosition(position: string): this;
    /**
     * Gets the approximate text width setting.
     *
     * @returns {boolean} The current text width approximation setting.
     */
    usesTextWidthApproximation(): boolean;
    /**
     * Sets the approximate text width setting. Approximating text width
     * measurements can drastically speed up plot rendering, but the plot may
     * have extra white space that would be eliminated by exact measurements.
     * Additionally, very abnormal fonts may not approximate reasonably.
     *
     * @param {boolean} The new text width approximation setting.
     * @returns {Axes.Numeric} The calling Axes.Numeric.
     */
    usesTextWidthApproximation(enable: boolean): this;
    private _hideEndTickLabels();
    private _hideOverlappingTickLabels();
    /**
     * The method is responsible for evenly spacing the labels on the axis.
     * @return test to see if taking every `interval` recrangle from `rects`
     *         will result in labels not overlapping
     *
     * For top, bottom, left, right positioning of the thicks, we want the padding
     * between the labels to be 3x, such that the label will be  `padding` distance
     * from the tick and 2 * `padding` distance (or more) from the next tick:
     * see https://github.com/palantir/plottable/pull/1812
     */
    private _hasOverlapWithInterval(interval, rects);
    invalidateCache(): void;
}
