/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import * as Dispatchers from "./";
import { Dispatcher } from "./dispatcher";
export declare type KeyCallback = (keyCode: number, event: KeyboardEvent) => void;
export declare class Key extends Dispatcher {
    private static _DISPATCHER_KEY;
    private static _KEYDOWN_EVENT_NAME;
    private static _KEYUP_EVENT_NAME;
    /**
     * Gets a Key Dispatcher. If one already exists it will be returned;
     * otherwise, a new one will be created.
     *
     * @return {Dispatchers.Key}
     */
    static getDispatcher(): Dispatchers.Key;
    /**
     * This constructor should not be invoked directly.
     *
     * @constructor
     */
    constructor();
    private _processKeydown(event);
    private _processKeyup(event);
    /**
     * Registers a callback to be called whenever a key is pressed.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    onKeyDown(callback: KeyCallback): this;
    /**
     * Removes the callback to be called whenever a key is pressed.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    offKeyDown(callback: KeyCallback): this;
    /** Registers a callback to be called whenever a key is released.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    onKeyUp(callback: KeyCallback): this;
    /**
     * Removes the callback to be called whenever a key is released.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    offKeyUp(callback: KeyCallback): this;
}
