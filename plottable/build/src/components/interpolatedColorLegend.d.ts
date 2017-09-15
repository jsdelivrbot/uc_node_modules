import { Formatter } from "../core/formatters";
import { SpaceRequest } from "../core/interfaces";
import * as Scales from "../scales";
import { Component } from "./component";
export declare class InterpolatedColorLegend extends Component {
    private static _DEFAULT_NUM_SWATCHES;
    private _measurer;
    private _wrapper;
    private _writer;
    private _scale;
    private _orientation;
    private _textPadding;
    private _formatter;
    private _expands;
    private _swatchContainer;
    private _swatchBoundingBox;
    private _lowerLabel;
    private _upperLabel;
    private _redrawCallback;
    /**
     * The css class applied to the legend labels.
     */
    static LEGEND_LABEL_CLASS: string;
    /**
     * Creates an InterpolatedColorLegend.
     *
     * The InterpolatedColorLegend consists of a sequence of swatches that show the
     * associated InterpolatedColor Scale sampled at various points.
     * Two labels show the maximum and minimum values of the InterpolatedColor Scale.
     *
     * @constructor
     * @param {Scales.InterpolatedColor} interpolatedColorScale
     */
    constructor(interpolatedColorScale: Scales.InterpolatedColor);
    destroy(): void;
    /**
     * Gets the Formatter for the labels. The domain ticks will be passed through the formatter
     * before being displayed.
     */
    formatter(): Formatter;
    /**
     * Sets the Formatter for the labels. The domain ticks will be passed through the formatter
     * before being displayed.
     *
     * @param {Formatter} formatter
     * @returns {InterpolatedColorLegend} The calling InterpolatedColorLegend.
     */
    formatter(formatter: Formatter): this;
    /**
     * Gets whether the InterpolatedColorLegend expands to occupy all offered space in the long direction
     */
    expands(): boolean;
    /**
     * Sets whether the InterpolatedColorLegend expands to occupy all offered space in the long direction
     *
     * @param {expands} boolean
     * @returns {InterpolatedColorLegend} The calling InterpolatedColorLegend.
     */
    expands(expands: boolean): this;
    private static _ensureOrientation(orientation);
    /**
     * Gets the orientation.
     */
    orientation(): string;
    /**
     * Sets the orientation.
     *
     * @param {string} orientation One of "horizontal"/"left"/"right".
     * @returns {InterpolatedColorLegend} The calling InterpolatedColorLegend.
     */
    orientation(orientation: string): this;
    fixedWidth(): boolean;
    fixedHeight(): boolean;
    private _generateTicks(numSwatches?);
    protected _setup(): void;
    requestedSpace(offeredWidth: number, offeredHeight: number): SpaceRequest;
    private _isVertical();
    renderImmediately(): this;
}
