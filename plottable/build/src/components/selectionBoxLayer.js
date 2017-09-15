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
var component_1 = require("./component");
var PropertyMode;
(function (PropertyMode) {
    PropertyMode[PropertyMode["VALUE"] = 0] = "VALUE";
    PropertyMode[PropertyMode["PIXEL"] = 1] = "PIXEL";
})(PropertyMode = exports.PropertyMode || (exports.PropertyMode = {}));
var SelectionBoxLayer = (function (_super) {
    __extends(SelectionBoxLayer, _super);
    function SelectionBoxLayer() {
        var _this = _super.call(this) || this;
        _this._boxVisible = false;
        _this._boxBounds = {
            topLeft: { x: 0, y: 0 },
            bottomRight: { x: 0, y: 0 },
        };
        _this._xBoundsMode = PropertyMode.PIXEL;
        _this._yBoundsMode = PropertyMode.PIXEL;
        _this.addClass("selection-box-layer");
        _this._adjustBoundsCallback = function () {
            _this.render();
        };
        _this._overflowHidden = true;
        _this._xExtent = [undefined, undefined];
        _this._yExtent = [undefined, undefined];
        return _this;
    }
    SelectionBoxLayer.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._box = this.content().append("g").classed("selection-box", true).remove();
        this._boxArea = this._box.append("rect").classed("selection-area", true);
    };
    SelectionBoxLayer.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
        return {
            width: availableWidth,
            height: availableHeight,
        };
    };
    SelectionBoxLayer.prototype.bounds = function (newBounds) {
        if (newBounds == null) {
            return this._getBounds();
        }
        this._setBounds(newBounds);
        this._xBoundsMode = PropertyMode.PIXEL;
        this._yBoundsMode = PropertyMode.PIXEL;
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype._setBounds = function (newBounds) {
        var topLeft = {
            x: Math.min(newBounds.topLeft.x, newBounds.bottomRight.x),
            y: Math.min(newBounds.topLeft.y, newBounds.bottomRight.y),
        };
        var bottomRight = {
            x: Math.max(newBounds.topLeft.x, newBounds.bottomRight.x),
            y: Math.max(newBounds.topLeft.y, newBounds.bottomRight.y),
        };
        this._boxBounds = {
            topLeft: topLeft,
            bottomRight: bottomRight,
        };
    };
    SelectionBoxLayer.prototype._getBounds = function () {
        return {
            topLeft: {
                x: this._xBoundsMode === PropertyMode.PIXEL ?
                    this._boxBounds.topLeft.x :
                    (this._xScale == null ?
                        0 :
                        Math.min(this.xScale().scale(this.xExtent()[0]), this.xScale().scale(this.xExtent()[1]))),
                y: this._yBoundsMode === PropertyMode.PIXEL ?
                    this._boxBounds.topLeft.y :
                    (this._yScale == null ?
                        0 :
                        Math.min(this.yScale().scale(this.yExtent()[0]), this.yScale().scale(this.yExtent()[1]))),
            },
            bottomRight: {
                x: this._xBoundsMode === PropertyMode.PIXEL ?
                    this._boxBounds.bottomRight.x :
                    (this._xScale == null ?
                        0 :
                        Math.max(this.xScale().scale(this.xExtent()[0]), this.xScale().scale(this.xExtent()[1]))),
                y: this._yBoundsMode === PropertyMode.PIXEL ?
                    this._boxBounds.bottomRight.y :
                    (this._yScale == null ?
                        0 :
                        Math.max(this.yScale().scale(this.yExtent()[0]), this.yScale().scale(this.yExtent()[1]))),
            },
        };
    };
    SelectionBoxLayer.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        if (this._boxVisible) {
            var bounds = this.bounds();
            var t = bounds.topLeft.y;
            var b = bounds.bottomRight.y;
            var l = bounds.topLeft.x;
            var r = bounds.bottomRight.x;
            if (!(Utils.Math.isValidNumber(t) &&
                Utils.Math.isValidNumber(b) &&
                Utils.Math.isValidNumber(l) &&
                Utils.Math.isValidNumber(r))) {
                throw new Error("bounds have not been properly set");
            }
            this._boxArea.attrs({
                x: l, y: t, width: r - l, height: b - t,
            });
            this.content().node().appendChild(this._box.node());
        }
        else {
            this._box.remove();
        }
        return this;
    };
    SelectionBoxLayer.prototype.boxVisible = function (show) {
        if (show == null) {
            return this._boxVisible;
        }
        this._boxVisible = show;
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype.fixedWidth = function () {
        return true;
    };
    SelectionBoxLayer.prototype.fixedHeight = function () {
        return true;
    };
    SelectionBoxLayer.prototype.xScale = function (xScale) {
        if (xScale == null) {
            return this._xScale;
        }
        if (this._xScale != null) {
            this._xScale.offUpdate(this._adjustBoundsCallback);
        }
        this._xScale = xScale;
        this._xBoundsMode = PropertyMode.VALUE;
        this._xScale.onUpdate(this._adjustBoundsCallback);
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype.yScale = function (yScale) {
        if (yScale == null) {
            return this._yScale;
        }
        if (this._yScale != null) {
            this._yScale.offUpdate(this._adjustBoundsCallback);
        }
        this._yScale = yScale;
        this._yBoundsMode = PropertyMode.VALUE;
        this._yScale.onUpdate(this._adjustBoundsCallback);
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype.xExtent = function (xExtent) {
        // Explicit typing for Typescript 1.4
        if (xExtent == null) {
            return this._getXExtent();
        }
        this._setXExtent(xExtent);
        this._xBoundsMode = PropertyMode.VALUE;
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype._getXExtent = function () {
        return this._xBoundsMode === PropertyMode.VALUE ?
            this._xExtent :
            (this._xScale == null ?
                [undefined, undefined] :
                [
                    this._xScale.invert(this._boxBounds.topLeft.x),
                    this._xScale.invert(this._boxBounds.bottomRight.x),
                ]);
    };
    SelectionBoxLayer.prototype._setXExtent = function (xExtent) {
        this._xExtent = xExtent;
    };
    SelectionBoxLayer.prototype.yExtent = function (yExtent) {
        // Explicit typing for Typescript 1.4
        if (yExtent == null) {
            return this._getYExtent();
        }
        this._setYExtent(yExtent);
        this._yBoundsMode = PropertyMode.VALUE;
        this.render();
        return this;
    };
    SelectionBoxLayer.prototype._getYExtent = function () {
        return this._yBoundsMode === PropertyMode.VALUE ?
            this._yExtent :
            (this._yScale == null ?
                [undefined, undefined] :
                [
                    this._yScale.invert(this._boxBounds.topLeft.y),
                    this._yScale.invert(this._boxBounds.bottomRight.y),
                ]);
    };
    SelectionBoxLayer.prototype._setYExtent = function (yExtent) {
        this._yExtent = yExtent;
    };
    SelectionBoxLayer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this._xScale != null) {
            this.xScale().offUpdate(this._adjustBoundsCallback);
        }
        if (this._yScale != null) {
            this.yScale().offUpdate(this._adjustBoundsCallback);
        }
    };
    return SelectionBoxLayer;
}(component_1.Component));
exports.SelectionBoxLayer = SelectionBoxLayer;
