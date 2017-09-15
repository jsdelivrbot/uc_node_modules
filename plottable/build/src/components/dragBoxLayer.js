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
var Interactions = require("../interactions");
var Utils = require("../utils");
var coerceD3_1 = require("../utils/coerceD3");
var _1 = require("./");
var selectionBoxLayer_1 = require("./selectionBoxLayer");
var DragBoxLayer = (function (_super) {
    __extends(DragBoxLayer, _super);
    /**
     * Constructs a DragBoxLayer.
     *
     * A DragBoxLayer is a SelectionBoxLayer with a built-in Drag Interaction.
     * A drag gesture will set the Bounds of the box.
     * If resizing is enabled using resizable(true), the edges of box can be repositioned.
     *
     * @constructor
     */
    function DragBoxLayer() {
        var _this = _super.call(this) || this;
        _this._detectionRadius = 3;
        _this._resizable = false;
        _this._movable = false;
        _this._hasCorners = true;
        _this.addClass("drag-box-layer");
        _this._dragInteraction = new Interactions.Drag();
        _this._setUpCallbacks();
        _this._dragInteraction.attachTo(_this);
        _this._dragStartCallbacks = new Utils.CallbackSet();
        _this._dragCallbacks = new Utils.CallbackSet();
        _this._dragEndCallbacks = new Utils.CallbackSet();
        return _this;
    }
    DragBoxLayer.prototype._setUpCallbacks = function () {
        var _this = this;
        var resizingEdges;
        var topLeft;
        var bottomRight;
        var lastEndPoint;
        var DRAG_MODES = {
            newBox: 0,
            resize: 1,
            move: 2,
        };
        var mode = DRAG_MODES.newBox;
        var onDragStartCallback = function (startPoint) {
            resizingEdges = _this._getResizingEdges(startPoint);
            var bounds = _this.bounds();
            var isInsideBox = bounds.topLeft.x <= startPoint.x && startPoint.x <= bounds.bottomRight.x &&
                bounds.topLeft.y <= startPoint.y && startPoint.y <= bounds.bottomRight.y;
            if (_this.boxVisible() && (resizingEdges.top || resizingEdges.bottom || resizingEdges.left || resizingEdges.right)) {
                mode = DRAG_MODES.resize;
            }
            else if (_this.boxVisible() && _this.movable() && isInsideBox) {
                mode = DRAG_MODES.move;
            }
            else {
                mode = DRAG_MODES.newBox;
                _this._setBounds({
                    topLeft: startPoint,
                    bottomRight: startPoint,
                });
                if (_this._xBoundsMode === _1.PropertyMode.VALUE && _this.xScale() != null) {
                    _this._setXExtent([_this.xScale().invert(startPoint.x), _this.xScale().invert(startPoint.x)]);
                }
                if (_this._yBoundsMode === _1.PropertyMode.VALUE && _this.yScale() != null) {
                    _this._setYExtent([_this.yScale().invert(startPoint.y), _this.yScale().invert(startPoint.y)]);
                }
                _this.render();
            }
            _this.boxVisible(true);
            bounds = _this.bounds();
            // copy points so changes to topLeft and bottomRight don't mutate bounds
            topLeft = { x: bounds.topLeft.x, y: bounds.topLeft.y };
            bottomRight = { x: bounds.bottomRight.x, y: bounds.bottomRight.y };
            lastEndPoint = startPoint;
            _this._dragStartCallbacks.callCallbacks(bounds);
        };
        var onDragCallback = function (startPoint, endPoint) {
            switch (mode) {
                case DRAG_MODES.newBox:
                    bottomRight.x = endPoint.x;
                    bottomRight.y = endPoint.y;
                    break;
                case DRAG_MODES.resize:
                    if (resizingEdges.bottom) {
                        bottomRight.y = endPoint.y;
                    }
                    else if (resizingEdges.top) {
                        topLeft.y = endPoint.y;
                    }
                    if (resizingEdges.right) {
                        bottomRight.x = endPoint.x;
                    }
                    else if (resizingEdges.left) {
                        topLeft.x = endPoint.x;
                    }
                    break;
                case DRAG_MODES.move:
                    var dx = endPoint.x - lastEndPoint.x;
                    var dy = endPoint.y - lastEndPoint.y;
                    topLeft.x += dx;
                    topLeft.y += dy;
                    bottomRight.x += dx;
                    bottomRight.y += dy;
                    lastEndPoint = endPoint;
                    break;
            }
            _this._setBounds({
                topLeft: topLeft,
                bottomRight: bottomRight,
            });
            if (_this._xBoundsMode === _1.PropertyMode.VALUE && _this.xScale() != null) {
                _this._setXExtent([_this.xScale().invert(topLeft.x), _this.xScale().invert(bottomRight.x)]);
            }
            if (_this._yBoundsMode === _1.PropertyMode.VALUE && _this.yScale() != null) {
                _this._setYExtent([_this.yScale().invert(topLeft.y), _this.yScale().invert(bottomRight.y)]);
            }
            _this.render();
            _this._dragCallbacks.callCallbacks(_this.bounds());
        };
        var onDragEndCallback = function (startPoint, endPoint) {
            if (mode === DRAG_MODES.newBox && startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
                _this.boxVisible(false);
            }
            _this._dragEndCallbacks.callCallbacks(_this.bounds());
        };
        this._dragInteraction.onDragStart(onDragStartCallback);
        this._dragInteraction.onDrag(onDragCallback);
        this._dragInteraction.onDragEnd(onDragEndCallback);
        this._disconnectInteraction = function () {
            _this._dragInteraction.offDragStart(onDragStartCallback);
            _this._dragInteraction.offDrag(onDragCallback);
            _this._dragInteraction.offDragEnd(onDragEndCallback);
            _this._dragInteraction.detach();
        };
    };
    DragBoxLayer.prototype._setup = function () {
        var _this = this;
        _super.prototype._setup.call(this);
        var createLine = function () { return _this._box.append("line").styles({
            opacity: 0,
            stroke: "pink",
            "pointer-events": "visibleStroke",
        }); };
        this._detectionEdgeT = createLine().classed("drag-edge-tb", true);
        this._detectionEdgeB = createLine().classed("drag-edge-tb", true);
        this._detectionEdgeL = createLine().classed("drag-edge-lr", true);
        this._detectionEdgeR = createLine().classed("drag-edge-lr", true);
        if (this._hasCorners) {
            var createCorner = function () { return _this._box.append("circle")
                .styles({
                opacity: 0,
                fill: "pink",
                "pointer-events": "visibleFill",
            }); };
            this._detectionCornerTL = createCorner().classed("drag-corner-tl", true);
            this._detectionCornerTR = createCorner().classed("drag-corner-tr", true);
            this._detectionCornerBL = createCorner().classed("drag-corner-bl", true);
            this._detectionCornerBR = createCorner().classed("drag-corner-br", true);
        }
    };
    DragBoxLayer.prototype._getResizingEdges = function (p) {
        var edges = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        };
        if (!this.resizable()) {
            return edges;
        }
        var bounds = this.bounds();
        var t = bounds.topLeft.y;
        var b = bounds.bottomRight.y;
        var l = bounds.topLeft.x;
        var r = bounds.bottomRight.x;
        var rad = this._detectionRadius;
        if (l - rad <= p.x && p.x <= r + rad) {
            edges.top = (t - rad <= p.y && p.y <= t + rad);
            edges.bottom = (b - rad <= p.y && p.y <= b + rad);
        }
        if (t - rad <= p.y && p.y <= b + rad) {
            edges.left = (l - rad <= p.x && p.x <= l + rad);
            edges.right = (r - rad <= p.x && p.x <= r + rad);
        }
        return edges;
    };
    DragBoxLayer.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        if (this.boxVisible()) {
            var bounds = this.bounds();
            var t = bounds.topLeft.y;
            var b = bounds.bottomRight.y;
            var l = bounds.topLeft.x;
            var r = bounds.bottomRight.x;
            this._detectionEdgeT.attrs({
                "x1": l, "y1": t, "x2": r, "y2": t,
                "stroke-width": this._detectionRadius * 2,
            });
            this._detectionEdgeB.attrs({
                "x1": l, "y1": b, "x2": r, "y2": b,
                "stroke-width": this._detectionRadius * 2,
            });
            this._detectionEdgeL.attrs({
                "x1": l, "y1": t, "x2": l, "y2": b,
                "stroke-width": this._detectionRadius * 2,
            });
            this._detectionEdgeR.attrs({
                "x1": r, "y1": t, "x2": r, "y2": b,
                "stroke-width": this._detectionRadius * 2,
            });
            if (this._hasCorners) {
                this._detectionCornerTL.attrs({ cx: l, cy: t, r: this._detectionRadius });
                this._detectionCornerTR.attrs({ cx: r, cy: t, r: this._detectionRadius });
                this._detectionCornerBL.attrs({ cx: l, cy: b, r: this._detectionRadius });
                this._detectionCornerBR.attrs({ cx: r, cy: b, r: this._detectionRadius });
            }
        }
        return this;
    };
    DragBoxLayer.prototype.detectionRadius = function (r) {
        if (r == null) {
            return this._detectionRadius;
        }
        if (r < 0) {
            throw new Error("detection radius cannot be negative.");
        }
        this._detectionRadius = r;
        this.render();
        return this;
    };
    DragBoxLayer.prototype.resizable = function (canResize) {
        if (canResize == null) {
            return this._resizable;
        }
        this._resizable = canResize;
        this._setResizableClasses(canResize);
        return this;
    };
    // Sets resizable classes. Overridden by subclasses that only resize in one dimension.
    DragBoxLayer.prototype._setResizableClasses = function (canResize) {
        if (canResize && this.enabled()) {
            this.addClass("x-resizable");
            this.addClass("y-resizable");
        }
        else {
            this.removeClass("x-resizable");
            this.removeClass("y-resizable");
        }
    };
    DragBoxLayer.prototype.movable = function (movable) {
        if (movable == null) {
            return this._movable;
        }
        this._movable = movable;
        this._setMovableClass();
        return this;
    };
    DragBoxLayer.prototype._setMovableClass = function () {
        if (this.movable() && this.enabled()) {
            this.addClass("movable");
        }
        else {
            this.removeClass("movable");
        }
    };
    /**
     * Sets the callback to be called when dragging starts.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.onDragStart = function (callback) {
        this._dragStartCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback to be called when dragging starts.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.offDragStart = function (callback) {
        this._dragStartCallbacks.delete(callback);
        return this;
    };
    /**
     * Sets a callback to be called during dragging.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.onDrag = function (callback) {
        this._dragCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback to be called during dragging.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.offDrag = function (callback) {
        this._dragCallbacks.delete(callback);
        return this;
    };
    /**
     * Sets a callback to be called when dragging ends.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.onDragEnd = function (callback) {
        this._dragEndCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback to be called when dragging ends.
     *
     * @param {DragBoxCallback} callback
     * @returns {DragBoxLayer} The calling DragBoxLayer.
     */
    DragBoxLayer.prototype.offDragEnd = function (callback) {
        this._dragEndCallbacks.delete(callback);
        return this;
    };
    /**
     * Gets the internal Interactions.Drag of the DragBoxLayer.
     */
    DragBoxLayer.prototype.dragInteraction = function () {
        return this._dragInteraction;
    };
    DragBoxLayer.prototype.enabled = function (enabled) {
        if (enabled == null) {
            return this._dragInteraction.enabled();
        }
        this._dragInteraction.enabled(enabled);
        this._setResizableClasses(this.resizable());
        this._setMovableClass();
        return this;
    };
    DragBoxLayer.prototype.destroy = function () {
        var _this = this;
        _super.prototype.destroy.call(this);
        this._dragStartCallbacks.forEach(function (callback) { return _this._dragCallbacks.delete(callback); });
        this._dragCallbacks.forEach(function (callback) { return _this._dragCallbacks.delete(callback); });
        this._dragEndCallbacks.forEach(function (callback) { return _this._dragEndCallbacks.delete(callback); });
        this._disconnectInteraction();
    };
    DragBoxLayer.prototype.detach = function () {
        this._resetState();
        this._dragInteraction.detach();
        _super.prototype.detach.call(this);
        return this;
    };
    DragBoxLayer.prototype.anchor = function (selection) {
        selection = coerceD3_1.coerceExternalD3(selection);
        this._dragInteraction.attachTo(this);
        _super.prototype.anchor.call(this, selection);
        return this;
    };
    DragBoxLayer.prototype._resetState = function () {
        this.bounds({
            topLeft: { x: 0, y: 0 },
            bottomRight: { x: 0, y: 0 },
        });
    };
    return DragBoxLayer;
}(selectionBoxLayer_1.SelectionBoxLayer));
exports.DragBoxLayer = DragBoxLayer;
