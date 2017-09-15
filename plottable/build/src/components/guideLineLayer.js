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
})(PropertyMode || (PropertyMode = {}));
var GuideLineLayer = (function (_super) {
    __extends(GuideLineLayer, _super);
    function GuideLineLayer(orientation) {
        var _this = _super.call(this) || this;
        _this._mode = PropertyMode.VALUE;
        if (orientation !== GuideLineLayer.ORIENTATION_VERTICAL && orientation !== GuideLineLayer.ORIENTATION_HORIZONTAL) {
            throw new Error(orientation + " is not a valid orientation for GuideLineLayer");
        }
        _this._orientation = orientation;
        _this._overflowHidden = true;
        _this.addClass("guide-line-layer");
        if (_this._isVertical()) {
            _this.addClass("vertical");
        }
        else {
            _this.addClass("horizontal");
        }
        _this._scaleUpdateCallback = function () {
            _this._syncPixelPositionAndValue();
            _this.render();
        };
        return _this;
    }
    GuideLineLayer.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._guideLine = this.content().append("line").classed("guide-line", true);
    };
    GuideLineLayer.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
        return {
            width: availableWidth,
            height: availableHeight,
        };
    };
    GuideLineLayer.prototype._isVertical = function () {
        return this._orientation === GuideLineLayer.ORIENTATION_VERTICAL;
    };
    GuideLineLayer.prototype.fixedWidth = function () {
        return true;
    };
    GuideLineLayer.prototype.fixedHeight = function () {
        return true;
    };
    GuideLineLayer.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        if (this.scale() != null) {
            if (this._isVertical()) {
                this.scale().range([0, this.width()]);
            }
            else {
                this.scale().range([this.height(), 0]);
            }
        }
        return this;
    };
    GuideLineLayer.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        this._syncPixelPositionAndValue();
        this._guideLine.attrs({
            "x1": this._isVertical() ? this.pixelPosition() : 0,
            "y1": this._isVertical() ? 0 : this.pixelPosition(),
            "x2": this._isVertical() ? this.pixelPosition() : this.width(),
            "y2": this._isVertical() ? this.height() : this.pixelPosition(),
        });
        return this;
    };
    // sets pixelPosition() or value() based on the other, depending on which was the last one set
    GuideLineLayer.prototype._syncPixelPositionAndValue = function () {
        if (this.scale() == null) {
            return;
        }
        if (this._mode === PropertyMode.VALUE && this.value() != null) {
            this._pixelPosition = this.scale().scale(this.value());
        }
        else if (this._mode === PropertyMode.PIXEL && this.pixelPosition() != null) {
            this._value = this.scale().invert(this.pixelPosition());
        }
    };
    GuideLineLayer.prototype._setPixelPositionWithoutChangingMode = function (pixelPosition) {
        this._pixelPosition = pixelPosition;
        if (this.scale() != null) {
            this._value = this.scale().invert(this.pixelPosition());
        }
        this.render();
    };
    GuideLineLayer.prototype.scale = function (scale) {
        if (scale == null) {
            return this._scale;
        }
        var previousScale = this._scale;
        if (previousScale != null) {
            previousScale.offUpdate(this._scaleUpdateCallback);
        }
        this._scale = scale;
        this._scale.onUpdate(this._scaleUpdateCallback);
        this._syncPixelPositionAndValue();
        this.redraw();
        return this;
    };
    GuideLineLayer.prototype.value = function (value) {
        if (value == null) {
            return this._value;
        }
        this._value = value;
        this._mode = PropertyMode.VALUE;
        this._syncPixelPositionAndValue();
        this.render();
        return this;
    };
    GuideLineLayer.prototype.pixelPosition = function (pixelPosition) {
        if (pixelPosition == null) {
            return this._pixelPosition;
        }
        if (!Utils.Math.isValidNumber(pixelPosition)) {
            throw new Error("pixelPosition must be a finite number");
        }
        this._pixelPosition = pixelPosition;
        this._mode = PropertyMode.PIXEL;
        this._syncPixelPositionAndValue();
        this.render();
        return this;
    };
    GuideLineLayer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.scale() != null) {
            this.scale().offUpdate(this._scaleUpdateCallback);
        }
    };
    return GuideLineLayer;
}(component_1.Component));
GuideLineLayer.ORIENTATION_VERTICAL = "vertical";
GuideLineLayer.ORIENTATION_HORIZONTAL = "horizontal";
exports.GuideLineLayer = GuideLineLayer;
