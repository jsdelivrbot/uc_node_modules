import { Dataset } from "../core/dataset";
import { AttributeToProjector, IAccessor, Projector, SimpleSelection } from "../core/interfaces";
import * as Drawers from "../drawers";
import { QuantitativeScale } from "../scales/quantitativeScale";
import { ProxyDrawer } from "../drawers/drawer";
import * as Plots from "./";
import { Line } from "./linePlot";
export declare class Area<X> extends Line<X> {
    private static _Y0_KEY;
    private _lineDrawers;
    private _constantBaselineValueProvider;
    /**
     * An Area Plot draws a filled region (area) between Y and Y0.
     *
     * @constructor
     */
    constructor();
    protected _setup(): void;
    y(): Plots.ITransformableAccessorScaleBinding<number, number>;
    y(y: number | IAccessor<number>): this;
    y(y: number | IAccessor<number>, yScale: QuantitativeScale<number>): this;
    /**
     * Gets the AccessorScaleBinding for Y0.
     */
    y0(): Plots.IAccessorScaleBinding<number, number>;
    /**
     * Sets Y0 to a constant number or the result of an Accessor<number>.
     * If a Scale has been set for Y, it will also be used to scale Y0.
     *
     * @param {number|Accessor<number>} y0
     * @returns {Area} The calling Area Plot.
     */
    y0(y0: number | IAccessor<number>): this;
    protected _onDatasetUpdate(): void;
    addDataset(dataset: Dataset): this;
    protected _addDataset(dataset: Dataset): this;
    protected _removeDatasetNodes(dataset: Dataset): void;
    protected _additionalPaint(): void;
    private _generateLineDrawSteps();
    private _generateLineAttrToProjector();
    protected _createDrawer(): ProxyDrawer;
    protected _generateDrawSteps(): Drawers.DrawStep[];
    protected _updateYScale(): void;
    protected _getResetYFunction(): IAccessor<any>;
    protected _propertyProjectors(): AttributeToProjector;
    selections(datasets?: Dataset[]): SimpleSelection<any>;
    protected _constructAreaProjector(xProjector: Projector, yProjector: Projector, y0Projector: Projector): (datum: any[], index: number, dataset: Dataset) => string;
}
