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
var d3 = require("d3");
var Interactions = require("../interactions");
var Utils = require("../utils");
var scale_1 = require("./scale");
var TRANSFORMATION_SPACE = [0, 1];
var Category = (function (_super) {
    __extends(Category, _super);
    /**
     * A Category Scale maps strings to numbers.
     *
     * @constructor
     */
    function Category() {
        var _this = _super.call(this) || this;
        _this._range = [0, 1];
        _this._d3Scale = d3.scaleBand();
        _this._d3Scale.range(TRANSFORMATION_SPACE);
        _this._d3TransformationScale = d3.scaleLinear();
        _this._d3TransformationScale.domain(TRANSFORMATION_SPACE);
        var d3InnerPadding = 0.3;
        _this._innerPadding = Category._convertToPlottableInnerPadding(d3InnerPadding);
        _this._outerPadding = Category._convertToPlottableOuterPadding(0.5, d3InnerPadding);
        return _this;
    }
    /**
     * Return a clone of this category scale that holds the same pan/zoom, padding, domain and range, but
     * without any included values providers.
     */
    Category.prototype.cloneWithoutProviders = function () {
        var scale = new Category()
            .domain(this.domain())
            .range(this.range())
            .innerPadding(this.innerPadding())
            .outerPadding(this.outerPadding());
        scale._d3TransformationScale.domain(this._d3TransformationScale.domain());
        return scale;
    };
    Category.prototype.extentOfValues = function (values) {
        return Utils.Array.uniq(values);
    };
    Category.prototype._getExtent = function () {
        return Utils.Array.uniq(this._getAllIncludedValues());
    };
    Category.prototype.domain = function (values) {
        return _super.prototype.domain.call(this, values);
    };
    /**
     * Returns domain values that lie inside the given range.
     * @param range
     * @returns {string[]}
     */
    Category.prototype.invertRange = function (range) {
        var _this = this;
        if (range === void 0) { range = this.range(); }
        var rangeBand = this._d3Scale.bandwidth();
        var domainStartNormalized = this.invertedTransformation(range[0]);
        var domainEndNormalized = this.invertedTransformation(range[1]);
        var domain = this._d3Scale.domain();
        // map ["a", "b", "c"] to the normalized center position (e.g. [0.25, .5, 0.75]). We add
        // half the rangeBand to consider the center of the bars
        var normalizedDomain = domain.map(function (d) { return _this._d3Scale(d) + rangeBand / 2; });
        var domainStart = d3.bisect(normalizedDomain, domainStartNormalized);
        var domainEnd = d3.bisect(normalizedDomain, domainEndNormalized);
        return domain.slice(domainStart, domainEnd);
    };
    Category.prototype.range = function (values) {
        return _super.prototype.range.call(this, values);
    };
    Category._convertToPlottableInnerPadding = function (d3InnerPadding) {
        return 1 / (1 - d3InnerPadding) - 1;
    };
    Category._convertToPlottableOuterPadding = function (d3OuterPadding, d3InnerPadding) {
        return d3OuterPadding / (1 - d3InnerPadding);
    };
    Category.prototype._setBands = function () {
        var d3InnerPadding = 1 - 1 / (1 + this.innerPadding());
        var d3OuterPadding = this.outerPadding() / (1 + this.innerPadding());
        this._d3Scale.paddingInner(d3InnerPadding);
        this._d3Scale.paddingOuter(d3OuterPadding);
    };
    /**
     * Returns the width of the range band.
     *
     * @returns {number} The range band width
     */
    Category.prototype.rangeBand = function () {
        return this._rescaleBand(this._d3Scale.bandwidth());
    };
    /**
     * Returns the step width of the scale.
     *
     * The step width is the pixel distance between adjacent values in the domain.
     *
     * @returns {number}
     */
    Category.prototype.stepWidth = function () {
        // todo consider replacing this with _d3Scale.step()
        return this._rescaleBand(this._d3Scale.bandwidth() * (1 + this.innerPadding()));
    };
    Category.prototype.innerPadding = function (innerPadding) {
        if (innerPadding == null) {
            return this._innerPadding;
        }
        this._innerPadding = innerPadding;
        this.range(this.range());
        this._dispatchUpdate();
        return this;
    };
    Category.prototype.outerPadding = function (outerPadding) {
        if (outerPadding == null) {
            return this._outerPadding;
        }
        this._outerPadding = outerPadding;
        this.range(this.range());
        this._dispatchUpdate();
        return this;
    };
    Category.prototype.scale = function (value) {
        // Determine the middle of the range band for the value
        var untransformed = this._d3Scale(value) + this._d3Scale.bandwidth() / 2;
        // Convert to screen space
        return this._d3TransformationScale(untransformed);
    };
    Category.prototype.zoom = function (magnifyAmount, centerValue) {
        var _this = this;
        var magnifyTransform = function (rangeValue) {
            return _this._d3TransformationScale.invert(Interactions.zoomAt(rangeValue, magnifyAmount, centerValue));
        };
        this._d3TransformationScale.domain(this._d3TransformationScale.range().map(magnifyTransform));
        this._dispatchUpdate();
    };
    Category.prototype.pan = function (translateAmount) {
        var _this = this;
        var translateTransform = function (rangeValue) {
            return _this._d3TransformationScale.invert(rangeValue + translateAmount);
        };
        this._d3TransformationScale.domain(this._d3TransformationScale.range().map(translateTransform));
        this._dispatchUpdate();
    };
    Category.prototype.scaleTransformation = function (value) {
        return this._d3TransformationScale(value);
    };
    Category.prototype.invertedTransformation = function (value) {
        return this._d3TransformationScale.invert(value);
    };
    Category.prototype.getTransformationDomain = function () {
        return this._d3TransformationScale.domain();
    };
    Category.prototype._getDomain = function () {
        return this._backingScaleDomain();
    };
    Category.prototype._backingScaleDomain = function (values) {
        if (values == null) {
            return this._d3Scale.domain();
        }
        else {
            this._d3Scale.domain(values);
            this._setBands();
            return this;
        }
    };
    Category.prototype._getRange = function () {
        return this._range;
    };
    Category.prototype._setRange = function (values) {
        this._range = values;
        this._d3TransformationScale.range(values);
        this._setBands();
    };
    /**
     * Converts a width or height in *Transformation Space* into *Screen Space*.
     */
    Category.prototype._rescaleBand = function (band) {
        return Math.abs(this._d3TransformationScale(band) - this._d3TransformationScale(0));
    };
    return Category;
}(scale_1.Scale));
exports.Category = Category;
