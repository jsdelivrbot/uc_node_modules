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
var Pointer = (function (_super) {
    __extends(Pointer, _super);
    function Pointer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._overComponent = false;
        _this._pointerEnterCallbacks = new Utils.CallbackSet();
        _this._pointerMoveCallbacks = new Utils.CallbackSet();
        _this._pointerExitCallbacks = new Utils.CallbackSet();
        _this._mouseMoveCallback = function (p, e) { return _this._handleMouseEvent(p, e); };
        _this._touchStartCallback = function (ids, idToPoint, e) { return _this._handleTouchEvent(idToPoint[ids[0]], e); };
        return _this;
    }
    Pointer.prototype._anchor = function (component) {
        _super.prototype._anchor.call(this, component);
        this._mouseDispatcher = Dispatchers.Mouse.getDispatcher(this._componentAttachedTo);
        this._mouseDispatcher.onMouseMove(this._mouseMoveCallback);
        this._touchDispatcher = Dispatchers.Touch.getDispatcher(this._componentAttachedTo);
        this._touchDispatcher.onTouchStart(this._touchStartCallback);
    };
    Pointer.prototype._unanchor = function () {
        _super.prototype._unanchor.call(this);
        this._mouseDispatcher.offMouseMove(this._mouseMoveCallback);
        this._mouseDispatcher = null;
        this._touchDispatcher.offTouchStart(this._touchStartCallback);
        this._touchDispatcher = null;
    };
    Pointer.prototype._handleMouseEvent = function (p, e) {
        var insideSVG = this._mouseDispatcher.eventInside(this._componentAttachedTo, e);
        this._handlePointerEvent(p, insideSVG);
    };
    Pointer.prototype._handleTouchEvent = function (p, e) {
        var insideSVG = this._touchDispatcher.eventInside(this._componentAttachedTo, e);
        this._handlePointerEvent(p, insideSVG);
    };
    Pointer.prototype._handlePointerEvent = function (p, insideSVG) {
        var translatedP = this._translateToComponentSpace(p);
        var overComponent = this._isInsideComponent(translatedP);
        if (overComponent && insideSVG) {
            if (!this._overComponent) {
                this._pointerEnterCallbacks.callCallbacks(translatedP);
            }
            this._pointerMoveCallbacks.callCallbacks(translatedP);
        }
        else if (this._overComponent) {
            this._pointerExitCallbacks.callCallbacks(translatedP);
        }
        this._overComponent = overComponent && insideSVG;
    };
    /**
     * Adds a callback to be called when the pointer enters the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.onPointerEnter = function (callback) {
        this._pointerEnterCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the pointer enters the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.offPointerEnter = function (callback) {
        this._pointerEnterCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called when the pointer moves within the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.onPointerMove = function (callback) {
        this._pointerMoveCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the pointer moves within the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.offPointerMove = function (callback) {
        this._pointerMoveCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called when the pointer exits the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.onPointerExit = function (callback) {
        this._pointerExitCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the pointer exits the Component.
     *
     * @param {PointerCallback} callback
     * @return {Interactions.Pointer} The calling Pointer Interaction.
     */
    Pointer.prototype.offPointerExit = function (callback) {
        this._pointerExitCallbacks.delete(callback);
        return this;
    };
    return Pointer;
}(interaction_1.Interaction));
exports.Pointer = Pointer;
