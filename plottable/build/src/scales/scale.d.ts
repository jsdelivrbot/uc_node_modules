import * as Scales from "./";
export declare type TransformableScale<D, R> = Scale<D, R> & Scales.ITransformableScale;
export interface IScaleCallback<S extends Scale<any, any>> {
    (scale: S): any;
}
export declare class Scale<D, R> {
    private _callbacks;
    private _autoDomainAutomatically;
    private _domainModificationInProgress;
    private _includedValuesProviders;
    /**
     * A Scale is a function (in the mathematical sense) that maps values from a domain to a range.
     *
     * @constructor
     */
    constructor();
    /**
     * Given an array of potential domain values, computes the extent of those values.
     *
     * @param {D[]} values
     * @returns {D[]} The extent of the input values.
     */
    extentOfValues(values: D[]): D[];
    protected _getAllIncludedValues(): D[];
    protected _getExtent(): D[];
    /**
     * Adds a callback to be called when the Scale updates.
     *
     * @param {ScaleCallback} callback.
     * @returns {Scale} The calling Scale.
     */
    onUpdate(callback: IScaleCallback<this>): this;
    /**
     * Removes a callback that would be called when the Scale updates.
     *
     * @param {ScaleCallback} callback.
     * @returns {Scale} The calling Scale.
     */
    offUpdate(callback: IScaleCallback<this>): this;
    protected _dispatchUpdate(): void;
    /**
     * Sets the Scale's domain so that it spans the Extents of all its ExtentsProviders.
     *
     * @returns {Scale} The calling Scale.
     */
    autoDomain(): this;
    protected _autoDomainIfAutomaticMode(): void;
    /**
     * Computes the range value corresponding to a given domain value.
     *
     * @param {D} value
     * @returns {R} The range value corresponding to the supplied domain value.
     */
    scale(value: D): R;
    /**
     * Gets the domain.
     *
     * @returns {D[]} The current domain.
     */
    domain(): D[];
    /**
     * Sets the domain.
     *
     * @param {D[]} values
     * @returns {Scale} The calling Scale.
     */
    domain(values: D[]): this;
    protected _getDomain(): D[];
    protected _setDomain(values: D[]): void;
    protected _backingScaleDomain(): D[];
    protected _backingScaleDomain(values: D[]): this;
    /**
     * Gets the range.
     *
     * @returns {R[]} The current range.
     */
    range(): R[];
    /**
     * Sets the range.
     *
     * @param {R[]} values
     * @returns {Scale} The calling Scale.
     */
    range(values: R[]): this;
    protected _getRange(): R[];
    protected _setRange(values: R[]): void;
    /**
     * Adds an IncludedValuesProvider to the Scale.
     *
     * @param {Scales.IncludedValuesProvider} provider
     * @returns {Scale} The calling Scale.
     */
    addIncludedValuesProvider(provider: Scales.IIncludedValuesProvider<D>): this;
    /**
     * Removes the IncludedValuesProvider from the Scale.
     *
     * @param {Scales.IncludedValuesProvider} provider
     * @returns {Scale} The calling Scale.
     */
    removeIncludedValuesProvider(provider: Scales.IIncludedValuesProvider<D>): this;
}
