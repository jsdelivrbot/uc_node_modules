/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Dataset } from "../core/dataset";
import { IAccessor } from "../core/interfaces";
import { ProxyDrawer } from "../drawers/drawer";
import * as Plots from "./";
import { Bar } from "./barPlot";
export declare class Waterfall<X, Y> extends Bar<X, number> {
    private static _BAR_DECLINE_CLASS;
    private static _BAR_GROWTH_CLASS;
    private static _BAR_TOTAL_CLASS;
    private static _CONNECTOR_CLASS;
    private static _CONNECTOR_AREA_CLASS;
    private static _TOTAL_KEY;
    private _connectorArea;
    private _connectorsEnabled;
    private _extent;
    private _subtotals;
    constructor();
    /**
     * Gets whether connectors are enabled.
     *
     * @returns {boolean} Whether connectors should be shown or not.
     */
    connectorsEnabled(): boolean;
    /**
     * Sets whether connectors are enabled.
     *
     * @param {boolean} enabled
     * @returns {Plots.Waterfall} The calling Waterfall Plot.
     */
    connectorsEnabled(enabled: boolean): this;
    /**
     * Gets the AccessorScaleBinding for whether a bar represents a total or a delta.
     */
    total<T>(): Plots.IAccessorScaleBinding<T, boolean>;
    /**
     * Sets total to a constant number or the result of an Accessor
     *
     * @param {Accessor<boolean>}
     * @returns {Plots.Waterfall} The calling Waterfall Plot.
     */
    total(total: IAccessor<boolean>): this;
    protected _additionalPaint(time: number): void;
    protected _createNodesForDataset(dataset: Dataset): ProxyDrawer;
    protected _extentsForProperty(attr: string): any[];
    protected _generateAttrToProjector(): {
        [attr: string]: (datum: any, index: number, dataset: Dataset) => any;
    };
    protected _onDatasetUpdate(): this;
    private _calculateSubtotalsAndExtent(dataset);
    private _drawConnectors();
    private _updateSubtotals();
}
