/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dispatchers = require("../dispatchers");
var Utils = require("../utils");
var interaction_1 = require("./interaction");
var Key = (function (_super) {
    __extends(Key, _super);
    function Key() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._keyPressCallbacks = {};
        _this._keyReleaseCallbacks = {};
        _this._mouseMoveCallback = function (point) { return false; }; // HACKHACK: registering a listener
        _this._downedKeys = new Utils.Set();
        _this._keyDownCallback = function (keyCode, event) { return _this._handleKeyDownEvent(keyCode, event); };
        _this._keyUpCallback = function (keyCode) { return _this._handleKeyUpEvent(keyCode); };
        return _this;
    }
    Key.prototype._anchor = function (component) {
        _super.prototype._anchor.call(this, component);
        this._positionDispatcher = Dispatchers.Mouse.getDispatcher(this._componentAttachedTo);
        this._positionDispatcher.onMouseMove(this._mouseMoveCallback);
        this._keyDispatcher = Dispatchers.Key.getDispatcher();
        this._keyDispatcher.onKeyDown(this._keyDownCallback);
        this._keyDispatcher.onKeyUp(this._keyUpCallback);
    };
    Key.prototype._unanchor = function () {
        _super.prototype._unanchor.call(this);
        this._positionDispatcher.offMouseMove(this._mouseMoveCallback);
        this._positionDispatcher = null;
        this._keyDispatcher.offKeyDown(this._keyDownCallback);
        this._keyDispatcher.offKeyUp(this._keyUpCallback);
        this._keyDispatcher = null;
    };
    Key.prototype._handleKeyDownEvent = function (keyCode, event) {
        var p = this._translateToComponentSpace(this._positionDispatcher.lastMousePosition());
        if (this._isInsideComponent(p) && !event.repeat) {
            if (this._keyPressCallbacks[keyCode]) {
                this._keyPressCallbacks[keyCode].callCallbacks(keyCode);
            }
            this._downedKeys.add(keyCode);
        }
    };
    Key.prototype._handleKeyUpEvent = function (keyCode) {
        if (this._downedKeys.has(keyCode) && this._keyReleaseCallbacks[keyCode]) {
            this._keyReleaseCallbacks[keyCode].callCallbacks(keyCode);
        }
        this._downedKeys.delete(keyCode);
    };
    /**
     * Adds a callback to be called when the key with the given keyCode is
     * pressed and the user is moused over the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    Key.prototype.onKeyPress = function (keyCode, callback) {
        if (!this._keyPressCallbacks[keyCode]) {
            this._keyPressCallbacks[keyCode] = new Utils.CallbackSet();
        }
        this._keyPressCallbacks[keyCode].add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the key with the given keyCode is
     * pressed and the user is moused over the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    Key.prototype.offKeyPress = function (keyCode, callback) {
        this._keyPressCallbacks[keyCode].delete(callback);
        if (this._keyPressCallbacks[keyCode].size === 0) {
            delete this._keyPressCallbacks[keyCode];
        }
        return this;
    };
    /**
     * Adds a callback to be called when the key with the given keyCode is
     * released if the key was pressed with the mouse inside of the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    Key.prototype.onKeyRelease = function (keyCode, callback) {
        if (!this._keyReleaseCallbacks[keyCode]) {
            this._keyReleaseCallbacks[keyCode] = new Utils.CallbackSet();
        }
        this._keyReleaseCallbacks[keyCode].add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the key with the given keyCode is
     * released if the key was pressed with the mouse inside of the Component.
     *
     * @param {number} keyCode
     * @param {KeyCallback} callback
     * @returns {Interactions.Key} The calling Key Interaction.
     */
    Key.prototype.offKeyRelease = function (keyCode, callback) {
        this._keyReleaseCallbacks[keyCode].delete(callback);
        if (this._keyReleaseCallbacks[keyCode].size === 0) {
            delete this._keyReleaseCallbacks[keyCode];
        }
        return this;
    };
    return Key;
}(interaction_1.Interaction));
exports.Key = Key;
