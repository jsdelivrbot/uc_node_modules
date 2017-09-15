/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Point } from "../core/interfaces";
import { Component } from "../components/component";
import * as Dispatchers from "./";
import { Dispatcher } from "./dispatcher";
export declare type MouseCallback = (p: Point, event: MouseEvent) => void;
export declare class Mouse extends Dispatcher {
    private static _DISPATCHER_KEY;
    private _translator;
    private _lastMousePosition;
    private static _MOUSEOVER_EVENT_NAME;
    private static _MOUSEMOVE_EVENT_NAME;
    private static _MOUSEOUT_EVENT_NAME;
    private static _MOUSEDOWN_EVENT_NAME;
    private static _MOUSEUP_EVENT_NAME;
    private static _WHEEL_EVENT_NAME;
    private static _DBLCLICK_EVENT_NAME;
    /**
     * Get a Mouse Dispatcher for the component tree.
     * If one already exists on that <svg>, it will be returned; otherwise, a new one will be created.
     *
     * @param {SVGElement} elem
     * @return {Dispatchers.Mouse}
     */
    static getDispatcher(component: Component): Dispatchers.Mouse;
    /**
     * This constructor not be invoked directly.
     *
     * @constructor
     */
    private constructor(component);
    /**
     * Registers a callback to be called when the mouse position changes.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    onMouseMove(callback: MouseCallback): this;
    /**
     * Removes a callback that would be called when the mouse position changes.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    offMouseMove(callback: MouseCallback): this;
    /**
     * Registers a callback to be called when a mousedown occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    onMouseDown(callback: MouseCallback): this;
    /**
     * Removes a callback that would be called when a mousedown occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    offMouseDown(callback: MouseCallback): this;
    /**
     * Registers a callback to be called when a mouseup occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    onMouseUp(callback: MouseCallback): this;
    /**
     * Removes a callback that would be called when a mouseup occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    offMouseUp(callback: MouseCallback): this;
    /**
     * Registers a callback to be called when a wheel event occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    onWheel(callback: MouseCallback): this;
    /**
     * Removes a callback that would be called when a wheel event occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    offWheel(callback: MouseCallback): this;
    /**
     * Registers a callback to be called when a dblClick occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    onDblClick(callback: MouseCallback): this;
    /**
     * Removes a callback that would be called when a dblClick occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    offDblClick(callback: MouseCallback): this;
    /**
     * Computes the mouse position from the given event, and if successful
     * calls all the callbacks in the provided callbackSet.
     */
    private _measureAndDispatch(component, event, eventName, scope?);
    eventInside(component: Component, event: MouseEvent): boolean;
    /**
     * Returns the last computed mouse position in <svg> coordinate space.
     *
     * @return {Point}
     */
    lastMousePosition(): Point;
}
