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
var Drag = (function (_super) {
    __extends(Drag, _super);
    function Drag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._dragging = false;
        _this._constrainedToComponent = true;
        _this._dragStartCallbacks = new Utils.CallbackSet();
        _this._dragCallbacks = new Utils.CallbackSet();
        _this._dragEndCallbacks = new Utils.CallbackSet();
        _this._mouseDownCallback = function (p, e) { return _this._startDrag(p, e); };
        _this._mouseMoveCallback = function (p, e) { return _this._doDrag(p, e); };
        _this._mouseUpCallback = function (p, e) { return _this._endDrag(p, e); };
        _this._touchStartCallback = function (ids, idToPoint, e) { return _this._startDrag(idToPoint[ids[0]], e); };
        _this._touchMoveCallback = function (ids, idToPoint, e) { return _this._doDrag(idToPoint[ids[0]], e); };
        _this._touchEndCallback = function (ids, idToPoint, e) { return _this._endDrag(idToPoint[ids[0]], e); };
        return _this;
    }
    Drag.prototype._anchor = function (component) {
        _super.prototype._anchor.call(this, component);
        this._mouseDispatcher = Dispatchers.Mouse.getDispatcher(this._componentAttachedTo);
        this._mouseDispatcher.onMouseDown(this._mouseDownCallback);
        this._mouseDispatcher.onMouseMove(this._mouseMoveCallback);
        this._mouseDispatcher.onMouseUp(this._mouseUpCallback);
        this._touchDispatcher = Dispatchers.Touch.getDispatcher(this._componentAttachedTo);
        this._touchDispatcher.onTouchStart(this._touchStartCallback);
        this._touchDispatcher.onTouchMove(this._touchMoveCallback);
        this._touchDispatcher.onTouchEnd(this._touchEndCallback);
    };
    Drag.prototype._unanchor = function () {
        _super.prototype._unanchor.call(this);
        this._mouseDispatcher.offMouseDown(this._mouseDownCallback);
        this._mouseDispatcher.offMouseMove(this._mouseMoveCallback);
        this._mouseDispatcher.offMouseUp(this._mouseUpCallback);
        this._mouseDispatcher = null;
        this._touchDispatcher.offTouchStart(this._touchStartCallback);
        this._touchDispatcher.offTouchMove(this._touchMoveCallback);
        this._touchDispatcher.offTouchEnd(this._touchEndCallback);
        this._touchDispatcher = null;
    };
    Drag.prototype._translateAndConstrain = function (p) {
        var translatedP = this._translateToComponentSpace(p);
        if (!this._constrainedToComponent) {
            return translatedP;
        }
        return {
            x: Utils.Math.clamp(translatedP.x, 0, this._componentAttachedTo.width()),
            y: Utils.Math.clamp(translatedP.y, 0, this._componentAttachedTo.height()),
        };
    };
    Drag.prototype._startDrag = function (point, event) {
        if (event instanceof MouseEvent && event.button !== 0) {
            return;
        }
        var translatedP = this._translateToComponentSpace(point);
        if (this._isInsideComponent(translatedP)) {
            event.preventDefault();
            this._dragging = true;
            this._dragOrigin = translatedP;
            this._dragStartCallbacks.callCallbacks(this._dragOrigin);
        }
    };
    Drag.prototype._doDrag = function (point, event) {
        if (this._dragging) {
            this._dragCallbacks.callCallbacks(this._dragOrigin, this._translateAndConstrain(point));
        }
    };
    Drag.prototype._endDrag = function (point, event) {
        if (event instanceof MouseEvent && event.button !== 0) {
            return;
        }
        if (this._dragging) {
            this._dragging = false;
            this._dragEndCallbacks.callCallbacks(this._dragOrigin, this._translateAndConstrain(point));
        }
    };
    Drag.prototype.constrainedToComponent = function (constrainedToComponent) {
        if (constrainedToComponent == null) {
            return this._constrainedToComponent;
        }
        this._constrainedToComponent = constrainedToComponent;
        return this;
    };
    /**
     * Adds a callback to be called when dragging starts.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.onDragStart = function (callback) {
        this._dragStartCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when dragging starts.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.offDragStart = function (callback) {
        this._dragStartCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called during dragging.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.onDrag = function (callback) {
        this._dragCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called during dragging.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.offDrag = function (callback) {
        this._dragCallbacks.delete(callback);
        return this;
    };
    /**
     * Adds a callback to be called when dragging ends.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.onDragEnd = function (callback) {
        this._dragEndCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when dragging ends.
     *
     * @param {DragCallback} callback
     * @returns {Drag} The calling Drag Interaction.
     */
    Drag.prototype.offDragEnd = function (callback) {
        this._dragEndCallbacks.delete(callback);
        return this;
    };
    return Drag;
}(interaction_1.Interaction));
exports.Drag = Drag;
