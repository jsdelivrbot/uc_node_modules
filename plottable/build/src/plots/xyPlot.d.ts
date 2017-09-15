/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Dataset } from "../core/dataset";
import { IAccessor, Point } from "../core/interfaces";
import { Scale } from "../scales/scale";
import * as Utils from "../utils";
import { ITransformableAccessorScaleBinding } from "./commons";
import { Plot } from "./plot";
export declare class XYPlot<X, Y> extends Plot {
    protected static _X_KEY: string;
    protected static _Y_KEY: string;
    private _autoAdjustXScaleDomain;
    private _autoAdjustYScaleDomain;
    private _adjustYDomainOnChangeFromXCallback;
    private _adjustXDomainOnChangeFromYCallback;
    private _deferredRendering;
    private _cachedDomainX;
    private _cachedDomainY;
    /**
     * An XYPlot is a Plot that displays data along two primary directions, X and Y.
     *
     * @constructor
     * @param {Scale} xScale The x scale to use.
     * @param {Scale} yScale The y scale to use.
     */
    constructor();
    /**
     * Returns the whether or not the rendering is deferred for performance boost.
     * @return {boolean} The deferred rendering option
     */
    deferredRendering(): boolean;
    /**
     * Sets / unsets the deferred rendering option
     * Activating this option improves the performance of plot interaction (pan / zoom) by
     * performing lazy renders, only after the interaction has stopped. Because re-rendering
     * is no longer performed during the interaction, the zooming might experience a small
     * resolution degradation, before the lazy re-render is performed.
     *
     * This option is intended for cases where performance is an issue.
     */
    deferredRendering(deferredRendering: boolean): this;
    /**
     * Gets the TransformableAccessorScaleBinding for X.
     */
    x(): ITransformableAccessorScaleBinding<X, number>;
    /**
     * Sets X to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} x
     * @returns {XYPlot} The calling XYPlot.
     */
    x(x: number | IAccessor<number>): this;
    /**
     * Sets X to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {X|Accessor<X>} x
     * @param {Scale<X, number>} xScale
     * @returns {XYPlot} The calling XYPlot.
     */
    x(x: X | IAccessor<X>, xScale: Scale<X, number>): this;
    /**
     * Gets the AccessorScaleBinding for Y.
     */
    y(): ITransformableAccessorScaleBinding<Y, number>;
    /**
     * Sets Y to a constant number or the result of an Accessor<number>.
     *
     * @param {number|Accessor<number>} y
     * @returns {XYPlot} The calling XYPlot.
     */
    y(y: number | IAccessor<number>): this;
    /**
     * Sets Y to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the values when autoDomain()-ing.
     *
     * @param {Y|Accessor<Y>} y
     * @param {Scale<Y, number>} yScale
     * @returns {XYPlot} The calling XYPlot.
     */
    y(y: Y | IAccessor<Y>, yScale: Scale<Y, number>): this;
    protected _filterForProperty(property: string): IAccessor<boolean>;
    private _makeFilterByProperty(property);
    protected _uninstallScaleForKey(scale: Scale<any, any>, key: string): void;
    protected _installScaleForKey(scale: Scale<any, any>, key: string): void;
    destroy(): this;
    /**
     * Gets the automatic domain adjustment mode for visible points.
     */
    autorangeMode(): string;
    /**
     * Sets the automatic domain adjustment mode for visible points to operate against the X Scale, Y Scale, or neither.
     * If "x" or "y" is specified the adjustment is immediately performed.
     *
     * @param {string} autorangeMode One of "x"/"y"/"none".
     *   "x" will adjust the x Scale in relation to changes in the y domain.
     *   "y" will adjust the y Scale in relation to changes in the x domain.
     *   "none" means neither Scale will change automatically.
     * @returns {XYPlot} The calling XYPlot.
     */
    autorangeMode(autorangeMode: string): this;
    computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): this;
    private _updateXExtentsAndAutodomain();
    private _updateYExtentsAndAutodomain();
    /**
     * Adjusts the domains of both X and Y scales to show all data.
     * This call does not override the autorange() behavior.
     *
     * @returns {XYPlot} The calling XYPlot.
     */
    showAllData(): this;
    private _adjustYDomainOnChangeFromX();
    private _adjustXDomainOnChangeFromY();
    protected _projectorsReady(): boolean;
    protected _pixelPoint(datum: any, index: number, dataset: Dataset): Point;
    protected _getDataToDraw(): Utils.Map<Dataset, any[]>;
}
