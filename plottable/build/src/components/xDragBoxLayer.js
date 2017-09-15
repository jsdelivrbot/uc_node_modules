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
var dragBoxLayer_1 = require("./dragBoxLayer");
var XDragBoxLayer = (function (_super) {
    __extends(XDragBoxLayer, _super);
    /**
     * An XDragBoxLayer is a DragBoxLayer whose size can only be set in the X-direction.
     * The y-values of the bounds() are always set to 0 and the height() of the XDragBoxLayer.
     *
     * @constructor
     */
    function XDragBoxLayer() {
        var _this = _super.call(this) || this;
        _this.addClass("x-drag-box-layer");
        _this._hasCorners = false;
        return _this;
    }
    XDragBoxLayer.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        // set correct bounds when width/height changes
        this._setBounds(this.bounds());
        return this;
    };
    XDragBoxLayer.prototype._setBounds = function (newBounds) {
        _super.prototype._setBounds.call(this, {
            topLeft: { x: newBounds.topLeft.x, y: 0 },
            bottomRight: { x: newBounds.bottomRight.x, y: this.height() },
        });
    };
    XDragBoxLayer.prototype._setResizableClasses = function (canResize) {
        if (canResize && this.enabled()) {
            this.addClass("x-resizable");
        }
        else {
            this.removeClass("x-resizable");
        }
    };
    XDragBoxLayer.prototype.yScale = function (yScale) {
        if (yScale == null) {
            return _super.prototype.yScale.call(this);
        }
        throw new Error("yScales cannot be set on an XDragBoxLayer");
    };
    XDragBoxLayer.prototype.yExtent = function (yExtent) {
        if (yExtent == null) {
            return _super.prototype.yExtent.call(this);
        }
        throw new Error("XDragBoxLayer has no yExtent");
    };
    return XDragBoxLayer;
}(dragBoxLayer_1.DragBoxLayer));
exports.XDragBoxLayer = XDragBoxLayer;
