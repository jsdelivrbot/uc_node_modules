import { Scale } from "./scale";
export declare class Color extends Scale<string, string> {
    private static _LOOP_LIGHTEN_FACTOR;
    private static _MAXIMUM_COLORS_FROM_CSS;
    private static _plottableColorCache;
    private _d3Scale;
    /**
     * A Color Scale maps string values to color hex values expressed as a string.
     *
     * @constructor
     * @param {string} [scaleType] One of "Category10"/"Category20"/"Category20b"/"Category20c".
     *   (see https://github.com/mbostock/d3/wiki/Ordinal-Scales#categorical-colors)
     *   If not supplied, reads the colors defined using CSS -- see plottable.css.
     */
    constructor(scaleType?: string);
    extentOfValues(values: string[]): string[];
    protected _getExtent(): string[];
    static invalidateColorCache(): void;
    private static _getPlottableColors();
    /**
     * Returns the color-string corresponding to a given string.
     * If there are not enough colors in the range(), a lightened version of an existing color will be used.
     *
     * @param {string} value
     * @returns {string}
     */
    scale(value: string): string;
    protected _getDomain(): string[];
    protected _backingScaleDomain(): string[];
    protected _backingScaleDomain(values: string[]): this;
    protected _getRange(): string[];
    protected _setRange(values: string[]): void;
}
