/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Component } from "../components/component";
import { Point } from "../core/interfaces";
import { Interaction } from "./interaction";
export declare type ClickCallback = (point: Point, event: MouseEvent | TouchEvent) => void;
export declare class Click extends Interaction {
    private _mouseDispatcher;
    private _touchDispatcher;
    private _clickedDown;
    private _clickedPoint;
    private _doubleClicking;
    private _onClickCallbacks;
    private _onDoubleClickCallbacks;
    /**
     * Note: we bind to mousedown, mouseup, touchstart and touchend because browsers
     * have a 300ms delay between touchstart and click to allow for scrolling cancelling etc.
     */
    private _mouseDownCallback;
    private _mouseUpCallback;
    private _dblClickCallback;
    private _touchStartCallback;
    private _touchEndCallback;
    private _touchCancelCallback;
    protected _anchor(component: Component): void;
    protected _unanchor(): void;
    private _handleClickDown(p, event);
    private _handleClickUp(p, event);
    private _handleDblClick(p, event);
    private static _pointsEqual(p1, p2);
    /**
     * Adds a callback to be called when the Component is clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    onClick(callback: ClickCallback): this;
    /**
     * Removes a callback that would be called when the Component is clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    offClick(callback: ClickCallback): this;
    /**
     * Adds a callback to be called when the Component is double-clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    onDoubleClick(callback: ClickCallback): this;
    /**
     * Removes a callback that would be called when the Component is double-clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    offDoubleClick(callback: ClickCallback): this;
}
