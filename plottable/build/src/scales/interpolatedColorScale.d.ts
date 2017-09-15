import { Scale } from "./scale";
export declare class InterpolatedColor extends Scale<number, string> {
    static REDS: string[];
    static BLUES: string[];
    static POSNEG: string[];
    private _colorRange;
    private _colorScale;
    private _d3Scale;
    /**
     * An InterpolatedColor Scale maps numbers to color hex values, expressed as strings.
     *
     * @param {string} [scaleType="linear"] One of "linear"/"log"/"sqrt"/"pow".
     */
    constructor(scaleType?: string);
    extentOfValues(values: number[]): number[];
    /**
     * Generates the converted QuantitativeScale.
     */
    private _d3InterpolatedScale();
    /**
     * Generates the d3 interpolator for colors.
     */
    private _interpolateColors();
    private _resetScale();
    autoDomain(): this;
    scale(value: number): string;
    protected _getDomain(): number[];
    protected _backingScaleDomain(): number[];
    protected _backingScaleDomain(values: number[]): this;
    protected _getRange(): string[];
    protected _setRange(range: string[]): void;
}
