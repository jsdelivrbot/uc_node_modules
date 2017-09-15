/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Bounds, SimpleSelection } from "../core/interfaces";
import { QuantitativeScale } from "../scales/quantitativeScale";
import { Component } from "./component";
export declare enum PropertyMode {
    VALUE = 0,
    PIXEL = 1,
}
export declare class SelectionBoxLayer extends Component {
    protected _box: SimpleSelection<void>;
    private _boxArea;
    private _boxVisible;
    private _boxBounds;
    private _xExtent;
    private _yExtent;
    private _xScale;
    private _yScale;
    private _adjustBoundsCallback;
    protected _xBoundsMode: PropertyMode;
    protected _yBoundsMode: PropertyMode;
    constructor();
    protected _setup(): void;
    protected _sizeFromOffer(availableWidth: number, availableHeight: number): {
        width: number;
        height: number;
    };
    /**
     * Gets the Bounds of the box.
     */
    bounds(): Bounds;
    /**
     * Sets the Bounds of the box.
     *
     * @param {Bounds} newBounds
     * @return {SelectionBoxLayer} The calling SelectionBoxLayer.
     */
    bounds(newBounds: Bounds): this;
    protected _setBounds(newBounds: Bounds): void;
    private _getBounds();
    renderImmediately(): this;
    /**
     * Gets whether the box is being shown.
     */
    boxVisible(): boolean;
    /**
     * Shows or hides the selection box.
     *
     * @param {boolean} show Whether or not to show the box.
     * @return {SelectionBoxLayer} The calling SelectionBoxLayer.
     */
    boxVisible(show: boolean): this;
    fixedWidth(): boolean;
    fixedHeight(): boolean;
    /**
     * Gets the x scale for this SelectionBoxLayer.
     */
    xScale(): QuantitativeScale<number | {
        valueOf(): number;
    }>;
    /**
     * Sets the x scale for this SelectionBoxLayer.
     *
     * @returns {SelectionBoxLayer} The calling SelectionBoxLayer.
     */
    xScale(xScale: QuantitativeScale<number | {
        valueOf(): number;
    }>): this;
    /**
     * Gets the y scale for this SelectionBoxLayer.
     */
    yScale(): QuantitativeScale<number | {
        valueOf(): number;
    }>;
    /**
     * Sets the y scale for this SelectionBoxLayer.
     *
     * @returns {SelectionBoxLayer} The calling SelectionBoxLayer.
     */
    yScale(yScale: QuantitativeScale<number | {
        valueOf(): number;
    }>): this;
    /**
     * Gets the data values backing the left and right edges of the box.
     *
     * Returns an undefined array if the edges are not backed by a scale.
     */
    xExtent(): (number | {
        valueOf(): number;
    })[];
    /**
     * Sets the data values backing the left and right edges of the box.
     */
    xExtent(xExtent: (number | {
        valueOf(): number;
    })[]): this;
    private _getXExtent();
    protected _setXExtent(xExtent: (number | {
        valueOf(): number;
    })[]): void;
    /**
     * Gets the data values backing the top and bottom edges of the box.
     *
     * Returns an undefined array if the edges are not backed by a scale.
     */
    yExtent(): (number | {
        valueOf(): number;
    })[];
    /**
     * Sets the data values backing the top and bottom edges of the box.
     */
    yExtent(yExtent: (number | {
        valueOf(): number;
    })[]): this;
    private _getYExtent();
    protected _setYExtent(yExtent: (number | {
        valueOf(): number;
    })[]): void;
    destroy(): void;
}
