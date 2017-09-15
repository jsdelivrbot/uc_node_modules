/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Component } from "../components/component";
import { Interaction } from "./interaction";
export declare type KeyCallback = (keyCode: number) => void;
export declare class Key extends Interaction {
    /**
     * A Key Interaction listens to key events that occur while the Component is
     * moused over.
     */
    private _positionDispatcher;
    private _keyDispatcher;
    private _keyPressCallbacks;
    private _keyReleaseCallbacks;
    private _mouseMoveCallback;
    private _downedKeys;
    private _keyDownCallback;
    private _keyUpCallback;
    protected _anchor(component: Component): void;
    protected _unanchor(): void;
    private _handleKeyDownEvent(keyCode, event);
    private _handleKeyUpEvent(keyCode);
    /**
     * Adds a callback to be called when the key with the given keyCode is
     * pressed and the user is moused over the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    onKeyPress(keyCode: number, callback: KeyCallback): this;
    /**
     * Removes a callback that would be called when the key with the given keyCode is
     * pressed and the user is moused over the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    offKeyPress(keyCode: number, callback: KeyCallback): this;
    /**
     * Adds a callback to be called when the key with the given keyCode is
     * released if the key was pressed with the mouse inside of the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    onKeyRelease(keyCode: number, callback: KeyCallback): this;
    /**
     * Removes a callback that would be called when the key with the given keyCode is
     * released if the key was pressed with the mouse inside of the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    offKeyRelease(keyCode: number, callback: KeyCallback): this;
}
