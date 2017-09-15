/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Component } from "../components/component";
import { Point } from "../core/interfaces";
import { Interaction } from "./interaction";
export declare type PointerCallback = (point: Point) => void;
export declare class Pointer extends Interaction {
    private _mouseDispatcher;
    private _touchDispatcher;
    private _overComponent;
    private _pointerEnterCallbacks;
    private _pointerMoveCallbacks;
    private _pointerExitCallbacks;
    private _mouseMoveCallback;
    private _touchStartCallback;
    protected _anchor(component: Component): void;
    protected _unanchor(): void;
    private _handleMouseEvent(p, e);
    private _handleTouchEvent(p, e);
    private _handlePointerEvent(p, insideSVG);
    /**
     * Adds a callback to be called when the pointer enters the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    onPointerEnter(callback: PointerCallback): this;
    /**
     * Removes a callback that would be called when the pointer enters the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    offPointerEnter(callback: PointerCallback): this;
    /**
     * Adds a callback to be called when the pointer moves within the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    onPointerMove(callback: PointerCallback): this;
    /**
     * Removes a callback that would be called when the pointer moves within the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    offPointerMove(callback: PointerCallback): this;
    /**
     * Adds a callback to be called when the pointer exits the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    onPointerExit(callback: PointerCallback): this;
    /**
     * Removes a callback that would be called when the pointer exits the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    offPointerExit(callback: PointerCallback): this;
}
