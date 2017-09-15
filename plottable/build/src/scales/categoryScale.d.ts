import { ITransformableScale } from "./";
import { Scale } from "./scale";
export declare class Category extends Scale<string, number> implements ITransformableScale {
    /**
     * An additional linear scale to apply pan/zoom interactions to the category
     * scale. Pan/zoom requires a numerically invertable scale.
     *
     * This adds an intermediate coordinate space called the *Transformation
     * Space*. The conversion from data to screen coordinates is as follows:
     *
     * Data Space -> _d3Scale -> Transformation Space -> _d3TransformationScale -> Screen Space.
     *
     * The *Transformation Space* coordinates are initialized to [0, 1].
     *
     * Notably, range band calculations are internally computed in
     * *Transformation Space* and transformed to screen space in methods like
     * `rangeBand()` and `stepWidth()`.
     */
    private _d3TransformationScale;
    private _d3Scale;
    private _range;
    private _innerPadding;
    private _outerPadding;
    /**
     * A Category Scale maps strings to numbers.
     *
     * @constructor
     */
    constructor();
    /**
     * Return a clone of this category scale that holds the same pan/zoom, padding, domain and range, but
     * without any included values providers.
     */
    cloneWithoutProviders(): Category;
    extentOfValues(values: string[]): string[];
    protected _getExtent(): string[];
    domain(): string[];
    domain(values: string[]): this;
    /**
     * Returns domain values that lie inside the given range.
     * @param range
     * @returns {string[]}
     */
    invertRange(range?: [number, number]): string[];
    range(): [number, number];
    range(values: [number, number]): this;
    private static _convertToPlottableInnerPadding(d3InnerPadding);
    private static _convertToPlottableOuterPadding(d3OuterPadding, d3InnerPadding);
    private _setBands();
    /**
     * Returns the width of the range band.
     *
     * @returns {number} The range band width
     */
    rangeBand(): number;
    /**
     * Returns the step width of the scale.
     *
     * The step width is the pixel distance between adjacent values in the domain.
     *
     * @returns {number}
     */
    stepWidth(): number;
    /**
     * Gets the inner padding.
     *
     * The inner padding is defined as the padding in between bands on the scale,
     * expressed as a multiple of the rangeBand().
     *
     * @returns {number}
     */
    innerPadding(): number;
    /**
     * Sets the inner padding.
     *
     * The inner padding is defined as the padding in between bands on the scale,
     * expressed as a multiple of the rangeBand().
     *
     * @returns {Category} The calling Category Scale.
     */
    innerPadding(innerPadding: number): this;
    /**
     * Gets the outer padding.
     *
     * The outer padding is the padding in between the outer bands and the edges of the range,
     * expressed as a multiple of the rangeBand().
     *
     * @returns {number}
     */
    outerPadding(): number;
    /**
     * Sets the outer padding.
     *
     * The outer padding is the padding in between the outer bands and the edges of the range,
     * expressed as a multiple of the rangeBand().
     *
     * @returns {Category} The calling Category Scale.
     */
    outerPadding(outerPadding: number): this;
    scale(value: string): number;
    zoom(magnifyAmount: number, centerValue: number): void;
    pan(translateAmount: number): void;
    scaleTransformation(value: number): number;
    invertedTransformation(value: number): number;
    getTransformationDomain(): [number, number];
    protected _getDomain(): string[];
    protected _backingScaleDomain(): string[];
    protected _backingScaleDomain(values: string[]): this;
    protected _getRange(): number[];
    protected _setRange(values: number[]): void;
    /**
     * Converts a width or height in *Transformation Space* into *Screen Space*.
     */
    protected _rescaleBand(band: number): number;
}
