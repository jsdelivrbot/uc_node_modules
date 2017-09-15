/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Component } from "../components/component";
import { Point } from "../core/interfaces";
import { Interaction } from "./interaction";
export declare type DragCallback = (start: Point, end: Point) => void;
export declare class Drag extends Interaction {
    private _dragging;
    private _constrainedToComponent;
    private _mouseDispatcher;
    private _touchDispatcher;
    private _dragOrigin;
    private _dragStartCallbacks;
    private _dragCallbacks;
    private _dragEndCallbacks;
    private _mouseDownCallback;
    private _mouseMoveCallback;
    private _mouseUpCallback;
    private _touchStartCallback;
    private _touchMoveCallback;
    private _touchEndCallback;
    protected _anchor(component: Component): void;
    protected _unanchor(): void;
    private _translateAndConstrain(p);
    private _startDrag(point, event);
    private _doDrag(point, event);
    private _endDrag(point, event);
    /**
     * Gets whether the Drag Interaction constrains Points passed to its
     * callbacks to lie inside its Component.
     *
     * If true, when the user drags outside of the Component, the closest Point
     * inside the Component will be passed to the callback instead of the actual
     * cursor position.
     *
     * @return {boolean}
     */
    constrainedToComponent(): boolean;
    /**
     * Sets whether the Drag Interaction constrains Points passed to its
     * callbacks to lie inside its Component.
     *
     * If true, when the user drags outside of the Component, the closest Point
     * inside the Component will be passed to the callback instead of the actual
     * cursor position.
     *
     * @param {boolean}
     * @return {Interactions.Drag} The calling Drag Interaction.
     */
    constrainedToComponent(constrainedToComponent: boolean): this;
    /**
     * Adds a callback to be called when dragging starts.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    onDragStart(callback: DragCallback): this;
    /**
     * Removes a callback that would be called when dragging starts.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    offDragStart(callback: DragCallback): this;
    /**
     * Adds a callback to be called during dragging.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    onDrag(callback: DragCallback): this;
    /**
     * Removes a callback that would be called during dragging.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    offDrag(callback: DragCallback): this;
    /**
     * Adds a callback to be called when dragging ends.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    onDragEnd(callback: DragCallback): this;
    /**
     * Removes a callback that would be called when dragging ends.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    offDragEnd(callback: DragCallback): this;
}
