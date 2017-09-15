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
var Click = (function (_super) {
    __extends(Click, _super);
    function Click() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._clickedDown = false;
        _this._doubleClicking = false;
        _this._onClickCallbacks = new Utils.CallbackSet();
        _this._onDoubleClickCallbacks = new Utils.CallbackSet();
        /**
         * Note: we bind to mousedown, mouseup, touchstart and touchend because browsers
         * have a 300ms delay between touchstart and click to allow for scrolling cancelling etc.
         */
        _this._mouseDownCallback = function (p, event) { return _this._handleClickDown(p, event); };
        _this._mouseUpCallback = function (p, event) { return _this._handleClickUp(p, event); };
        _this._dblClickCallback = function (p, event) { return _this._handleDblClick(p, event); };
        _this._touchStartCallback = function (ids, idToPoint, event) { return _this._handleClickDown(idToPoint[ids[0]], event); };
        _this._touchEndCallback = function (ids, idToPoint, event) { return _this._handleClickUp(idToPoint[ids[0]], event); };
        _this._touchCancelCallback = function (ids, idToPoint) { return _this._clickedDown = false; };
        return _this;
    }
    Click.prototype._anchor = function (component) {
        _super.prototype._anchor.call(this, component);
        this._mouseDispatcher = Dispatchers.Mouse.getDispatcher(component);
        this._mouseDispatcher.onMouseDown(this._mouseDownCallback);
        this._mouseDispatcher.onMouseUp(this._mouseUpCallback);
        this._mouseDispatcher.onDblClick(this._dblClickCallback);
        this._touchDispatcher = Dispatchers.Touch.getDispatcher(component);
        this._touchDispatcher.onTouchStart(this._touchStartCallback);
        this._touchDispatcher.onTouchEnd(this._touchEndCallback);
        this._touchDispatcher.onTouchCancel(this._touchCancelCallback);
    };
    Click.prototype._unanchor = function () {
        _super.prototype._unanchor.call(this);
        this._mouseDispatcher.offMouseDown(this._mouseDownCallback);
        this._mouseDispatcher.offMouseUp(this._mouseUpCallback);
        this._mouseDispatcher.offDblClick(this._dblClickCallback);
        this._mouseDispatcher = null;
        this._touchDispatcher.offTouchStart(this._touchStartCallback);
        this._touchDispatcher.offTouchEnd(this._touchEndCallback);
        this._touchDispatcher.offTouchCancel(this._touchCancelCallback);
        this._touchDispatcher = null;
    };
    Click.prototype._handleClickDown = function (p, event) {
        var translatedP = this._translateToComponentSpace(p);
        if (this._isInsideComponent(translatedP)) {
            this._clickedDown = true;
            this._clickedPoint = translatedP;
        }
    };
    Click.prototype._handleClickUp = function (p, event) {
        var _this = this;
        var translatedP = this._translateToComponentSpace(p);
        if (this._clickedDown && Click._pointsEqual(translatedP, this._clickedPoint)) {
            setTimeout(function () {
                if (!_this._doubleClicking) {
                    _this._onClickCallbacks.callCallbacks(translatedP, event);
                }
            }, 0);
        }
        this._clickedDown = false;
    };
    Click.prototype._handleDblClick = function (p, event) {
        var _this = this;
        var translatedP = this._translateToComponentSpace(p);
        this._doubleClicking = true;
        this._onDoubleClickCallbacks.callCallbacks(translatedP, event);
        setTimeout(function () { return _this._doubleClicking = false; }, 0);
    };
    Click._pointsEqual = function (p1, p2) {
        return p1.x === p2.x && p1.y === p2.y;
    };
    /**
     * Adds a callback to be called when the Component is clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    Click.prototype.onClick = function (callback) {
        this._onClickCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the Component is clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    Click.prototype.offClick = function (callback) {
        this._onClickCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called when the Component is double-clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    Click.prototype.onDoubleClick = function (callback) {
        this._onDoubleClickCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the Component is double-clicked.
     *
     * @param {ClickCallback} callback
     * @return {Interactions.Click} The calling Click Interaction.
     */
    Click.prototype.offDoubleClick = function (callback) {
        this._onDoubleClickCallbacks.delete(callback);
        return this;
    };
    return Click;
}(interaction_1.Interaction));
exports.Click = Click;
