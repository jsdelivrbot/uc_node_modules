/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import * as d3 from "d3";
import { Bounds } from "../core/interfaces";
import * as Interactions from "../interactions";
import { SelectionBoxLayer } from "./selectionBoxLayer";
export declare type DragBoxCallback = (bounds: Bounds) => void;
export declare class DragBoxLayer extends SelectionBoxLayer {
    private _dragInteraction;
    private _detectionEdgeT;
    private _detectionEdgeB;
    private _detectionEdgeL;
    private _detectionEdgeR;
    private _detectionCornerTL;
    private _detectionCornerTR;
    private _detectionCornerBL;
    private _detectionCornerBR;
    private _detectionRadius;
    private _resizable;
    private _movable;
    protected _hasCorners: boolean;
    private _dragStartCallbacks;
    private _dragCallbacks;
    private _dragEndCallbacks;
    private _disconnectInteraction;
    /**
     * Constructs a DragBoxLayer.
     *
     * A DragBoxLayer is a SelectionBoxLayer with a built-in Drag Interaction.
     * A drag gesture will set the Bounds of the box.
     * If resizing is enabled using resizable(true), the edges of box can be repositioned.
     *
     * @constructor
     */
    constructor();
    private _setUpCallbacks();
    protected _setup(): void;
    private _getResizingEdges(p);
    renderImmediately(): this;
    /**
     * Gets the detection radius of the drag box in pixels.
     */
    detectionRadius(): number;
    /**
     * Sets the detection radius of the drag box in pixels.
     *
     * @param {number} r
     * @return {DragBoxLayer} The calling DragBoxLayer.
     */
    detectionRadius(r: number): this;
    /**
     * Gets whether or not the drag box is resizable.
     */
    resizable(): boolean;
    /**
     * Sets whether or not the drag box is resizable.
     *
     * @param {boolean} canResize
     * @return {DragBoxLayer} The calling DragBoxLayer.
     */
    resizable(canResize: boolean): this;
    protected _setResizableClasses(canResize: boolean): void;
    /**
     * Gets whether or not the drag box is movable.
     */
    movable(): boolean;
    /**
     * Sets whether or not the drag box is movable.
     *
     * @param {boolean} movable
     * @return {DragBoxLayer} The calling DragBoxLayer.
     */
    movable(movable: boolean): this;
    private _setMovableClass();
    /**
     * Sets the callback to be called when dragging starts.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    onDragStart(callback: DragBoxCallback): this;
    /**
     * Removes a callback to be called when dragging starts.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    offDragStart(callback: DragBoxCallback): this;
    /**
     * Sets a callback to be called during dragging.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    onDrag(callback: DragBoxCallback): this;
    /**
     * Removes a callback to be called during dragging.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    offDrag(callback: DragBoxCallback): this;
    /**
     * Sets a callback to be called when dragging ends.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    onDragEnd(callback: DragBoxCallback): this;
    /**
     * Removes a callback to be called when dragging ends.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    offDragEnd(callback: DragBoxCallback): this;
    /**
     * Gets the internal Interactions.Drag of the DragBoxLayer.
     */
    dragInteraction(): Interactions.Drag;
    /**
     * Enables or disables the interaction and drag box.
     */
    enabled(enabled: boolean): this;
    /**
     * Gets the enabled state.
     */
    enabled(): boolean;
    destroy(): void;
    detach(): this;
    anchor(selection: d3.Selection<HTMLElement, any, any, any>): this;
    private _resetState();
}
