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
var Utils = require("../utils");
var dispatcher_1 = require("./dispatcher");
var Mouse = (function (_super) {
    __extends(Mouse, _super);
    /**
     * This constructor not be invoked directly.
     *
     * @constructor
     */
    function Mouse(component) {
        var _this = _super.call(this) || this;
        _this._translator = Utils.getTranslator(component);
        _this._lastMousePosition = { x: -1, y: -1 };
        var processMoveCallback = function (e) { return _this._measureAndDispatch(component, e, Mouse._MOUSEMOVE_EVENT_NAME, "page"); };
        _this._eventToProcessingFunction[Mouse._MOUSEOVER_EVENT_NAME] = processMoveCallback;
        _this._eventToProcessingFunction[Mouse._MOUSEMOVE_EVENT_NAME] = processMoveCallback;
        _this._eventToProcessingFunction[Mouse._MOUSEOUT_EVENT_NAME] = processMoveCallback;
        _this._eventToProcessingFunction[Mouse._MOUSEDOWN_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Mouse._MOUSEDOWN_EVENT_NAME); };
        _this._eventToProcessingFunction[Mouse._MOUSEUP_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Mouse._MOUSEUP_EVENT_NAME, "page"); };
        _this._eventToProcessingFunction[Mouse._WHEEL_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Mouse._WHEEL_EVENT_NAME); };
        _this._eventToProcessingFunction[Mouse._DBLCLICK_EVENT_NAME] =
            function (e) { return _this._measureAndDispatch(component, e, Mouse._DBLCLICK_EVENT_NAME); };
        return _this;
    }
    /**
     * Get a Mouse Dispatcher for the component tree.
     * If one already exists on that <svg>, it will be returned; otherwise, a new one will be created.
     *
     * @param {SVGElement} elem
     * @return {Dispatchers.Mouse}
     */
    Mouse.getDispatcher = function (component) {
        var element = component.root().rootElement();
        var dispatcher = element[Mouse._DISPATCHER_KEY];
        if (dispatcher == null) {
            dispatcher = new Mouse(component);
            element[Mouse._DISPATCHER_KEY] = dispatcher;
        }
        return dispatcher;
    };
    /**
     * Registers a callback to be called when the mouse position changes.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.onMouseMove = function (callback) {
        this._addCallbackForEvent(Mouse._MOUSEMOVE_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the mouse position changes.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.offMouseMove = function (callback) {
        this._removeCallbackForEvent(Mouse._MOUSEMOVE_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when a mousedown occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.onMouseDown = function (callback) {
        this._addCallbackForEvent(Mouse._MOUSEDOWN_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a mousedown occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.offMouseDown = function (callback) {
        this._removeCallbackForEvent(Mouse._MOUSEDOWN_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when a mouseup occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.onMouseUp = function (callback) {
        this._addCallbackForEvent(Mouse._MOUSEUP_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a mouseup occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.offMouseUp = function (callback) {
        this._removeCallbackForEvent(Mouse._MOUSEUP_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when a wheel event occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.onWheel = function (callback) {
        this._addCallbackForEvent(Mouse._WHEEL_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a wheel event occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.offWheel = function (callback) {
        this._removeCallbackForEvent(Mouse._WHEEL_EVENT_NAME, callback);
        return this;
    };
    /**
     * Registers a callback to be called when a dblClick occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.onDblClick = function (callback) {
        this._addCallbackForEvent(Mouse._DBLCLICK_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes a callback that would be called when a dblClick occurs.
     *
     * @param {MouseCallback} callback
     * @return {Dispatchers.Mouse} The calling Mouse Dispatcher.
     */
    Mouse.prototype.offDblClick = function (callback) {
        this._removeCallbackForEvent(Mouse._DBLCLICK_EVENT_NAME, callback);
        return this;
    };
    /**
     * Computes the mouse position from the given event, and if successful
     * calls all the callbacks in the provided callbackSet.
     */
    Mouse.prototype._measureAndDispatch = function (component, event, eventName, scope) {
        if (scope === void 0) { scope = "element"; }
        if (scope !== "page" && scope !== "element") {
            throw new Error("Invalid scope '" + scope + "', must be 'element' or 'page'");
        }
        if (scope === "page" || this.eventInside(component, event)) {
            var newMousePosition = this._translator.computePosition(event.clientX, event.clientY);
            if (newMousePosition != null) {
                this._lastMousePosition = newMousePosition;
                this._callCallbacksForEvent(eventName, this.lastMousePosition(), event);
            }
        }
    };
    Mouse.prototype.eventInside = function (component, event) {
        return this._translator.isInside(component, event);
    };
    /**
     * Returns the last computed mouse position in <svg> coordinate space.
     *
     * @return {Point}
     */
    Mouse.prototype.lastMousePosition = function () {
        return this._lastMousePosition;
    };
    return Mouse;
}(dispatcher_1.Dispatcher));
Mouse._DISPATCHER_KEY = "__Plottable_Dispatcher_Mouse";
Mouse._MOUSEOVER_EVENT_NAME = "mouseover";
Mouse._MOUSEMOVE_EVENT_NAME = "mousemove";
Mouse._MOUSEOUT_EVENT_NAME = "mouseout";
Mouse._MOUSEDOWN_EVENT_NAME = "mousedown";
Mouse._MOUSEUP_EVENT_NAME = "mouseup";
Mouse._WHEEL_EVENT_NAME = "wheel";
Mouse._DBLCLICK_EVENT_NAME = "dblclick";
exports.Mouse = Mouse;
