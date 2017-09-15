/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Point } from "../core/interfaces";
import { QuantitativeScale } from "../scales/quantitativeScale";
import { Component } from "./component";
export declare class GuideLineLayer<D> extends Component {
    static ORIENTATION_VERTICAL: string;
    static ORIENTATION_HORIZONTAL: string;
    private _orientation;
    private _value;
    private _scale;
    private _pixelPosition;
    private _scaleUpdateCallback;
    private _guideLine;
    private _mode;
    constructor(orientation: string);
    protected _setup(): void;
    protected _sizeFromOffer(availableWidth: number, availableHeight: number): {
        width: number;
        height: number;
    };
    protected _isVertical(): boolean;
    fixedWidth(): boolean;
    fixedHeight(): boolean;
    computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): this;
    renderImmediately(): this;
    private _syncPixelPositionAndValue();
    protected _setPixelPositionWithoutChangingMode(pixelPosition: number): void;
    /**
     * Gets the QuantitativeScale on the GuideLineLayer.
     *
     * @return {QuantitativeScale<D>}
     */
    scale(): QuantitativeScale<D>;
    /**
     * Sets the QuantitativeScale on the GuideLineLayer.
     * If value() was the last property set, pixelPosition() will be updated according to the new scale.
     * If pixelPosition() was the last property set, value() will be updated according to the new scale.
     *
     * @param {QuantitativeScale<D>} scale
     * @return {GuideLineLayer<D>} The calling GuideLineLayer.
     */
    scale(scale: QuantitativeScale<D>): this;
    /**
     * Gets the value of the guide line in data-space.
     *
     * @return {D}
     */
    value(): D;
    /**
     * Sets the value of the guide line in data-space.
     * If the GuideLineLayer has a scale, pixelPosition() will be updated now and whenever the scale updates.
     *
     * @param {D} value
     * @return {GuideLineLayer<D>} The calling GuideLineLayer.
     */
    value(value: D): this;
    /**
     * Gets the position of the guide line in pixel-space.
     *
     * @return {number}
     */
    pixelPosition(): number;
    /**
     * Sets the position of the guide line in pixel-space.
     * If the GuideLineLayer has a scale, the value() will be updated now and whenever the scale updates.
     *
     * @param {number} pixelPosition
     * @return {GuideLineLayer<D>} The calling GuideLineLayer.
     */
    pixelPosition(pixelPosition: number): this;
    destroy(): void;
}
