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
var Typesettable = require("typesettable");
var component_1 = require("../components/component");
var Utils = require("../utils");
var axis_1 = require("./axis");
var Category = (function (_super) {
    __extends(Category, _super);
    /**
     * Constructs a Category Axis.
     *
     * A Category Axis is a visual representation of a Category Scale.
     *
     * @constructor
     * @param {Scales.Category} scale
     * @param {AxisOrientation} [orientation="bottom"] Orientation of this Category Axis.
     */
    function Category(scale, orientation) {
        if (orientation === void 0) { orientation = "bottom"; }
        var _this = _super.call(this, scale, orientation) || this;
        /**
         * The rotation angle of tick label text. Only 0, 90, -90 are supported
         */
        _this._tickLabelAngle = 0;
        /**
         * The shear angle of the tick label text. Only values -80 <= x <= 80 are supported
         */
        _this._tickLabelShearAngle = 0;
        _this.addClass("category-axis");
        return _this;
    }
    Object.defineProperty(Category.prototype, "_wrapper", {
        /**
         * A Wrapper configured according to the other properties on this axis.
         * @returns {Typesettable.Wrapper}
         */
        get: function () {
            var wrapper = new Typesettable.Wrapper();
            if (this._tickLabelMaxLines != null) {
                wrapper.maxLines(this._tickLabelMaxLines);
            }
            return wrapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "_writer", {
        /**
         * A Writer attached to this measurer and wrapper.
         * @returns {Typesettable.Writer}
         */
        get: function () {
            return new Typesettable.Writer(this._measurer, this._typesetterContext, this._wrapper);
        },
        enumerable: true,
        configurable: true
    });
    Category.prototype._setup = function () {
        _super.prototype._setup.call(this);
        this._typesetterContext = new Typesettable.SvgContext(this._tickLabelContainer.node());
        this._measurer = new Typesettable.CacheMeasurer(this._typesetterContext);
    };
    Category.prototype._rescale = function () {
        return this.redraw();
    };
    /**
     * Compute space requirements for this Category Axis. Category Axes have two primary space requirements:
     *
     * 1) width/height needed by the tick lines (including annotations, padding, and margins).
     * 2) width/height needed by the tick text.
     *
     * We requested space is the sum of the lines and text.
     * @param offeredWidth
     * @param offeredHeight
     * @returns {any}
     */
    Category.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
        var widthRequiredByTicks = this.isHorizontal() ? 0 : this._tickSpaceRequired() + this.margin();
        var heightRequiredByTicks = this.isHorizontal() ? this._tickSpaceRequired() + this.margin() : 0;
        if (this._scale.domain().length === 0) {
            return {
                minWidth: 0,
                minHeight: 0,
            };
        }
        if (this.annotationsEnabled()) {
            var tierTotalHeight = this._annotationTierHeight() * this.annotationTierCount();
            if (this.isHorizontal()) {
                heightRequiredByTicks += tierTotalHeight;
            }
            else {
                widthRequiredByTicks += tierTotalHeight;
            }
        }
        var measureResult = this._measureTickLabels(offeredWidth, offeredHeight);
        return {
            minWidth: measureResult.usedWidth + widthRequiredByTicks,
            minHeight: measureResult.usedHeight + heightRequiredByTicks,
        };
    };
    Category.prototype._coreSize = function () {
        var relevantDimension = this.isHorizontal() ? this.height() : this.width();
        var relevantRequestedSpaceDimension = this.isHorizontal() ?
            this.requestedSpace(this.width(), this.height()).minHeight :
            this.requestedSpace(this.width(), this.height()).minWidth;
        var marginAndAnnotationSize = this.margin() + this._annotationTierHeight();
        var axisHeightWithoutMargin = relevantRequestedSpaceDimension - marginAndAnnotationSize;
        return Math.min(axisHeightWithoutMargin, relevantDimension);
    };
    Category.prototype._getTickValues = function () {
        return this.getDownsampleInfo().domain;
    };
    Category.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
        // hack: continue using Component._sizeFromOffer to prevent angled axis ticks
        // from overflowing their container
        return component_1.Component.prototype._sizeFromOffer.call(this, availableWidth, availableHeight);
    };
    /**
     * Take the scale and drop ticks at regular intervals such that the resultant ticks are all a reasonable minimum
     * distance apart. Return the resultant ticks to render, as well as the new stepWidth between them.
     *
     * @param {Scales.Category} scale - The scale being downsampled. Defaults to this Axis' scale.
     * @return {DownsampleInfo} an object holding the resultant domain and new stepWidth.
     */
    Category.prototype.getDownsampleInfo = function (scale, domain) {
        if (scale === void 0) { scale = this._scale; }
        if (domain === void 0) { domain = scale.invertRange(); }
        // account for how shearing tightens the space between vertically oriented ticks
        var shearFactor = this._tickLabelAngle === 0 ? 1 : 1 / Math.cos(this._tickLabelShearAngle / 180 * Math.PI);
        var shearedMinimumWidth = Category._MINIMUM_WIDTH_PER_LABEL_PX * shearFactor;
        var downsampleRatio = Math.ceil(shearedMinimumWidth / scale.stepWidth());
        return {
            domain: domain.filter(function (d, i) { return i % downsampleRatio === 0; }),
            stepWidth: downsampleRatio * scale.stepWidth(),
        };
    };
    Category.prototype.tickLabelAngle = function (angle) {
        if (angle == null) {
            return this._tickLabelAngle;
        }
        if (angle !== 0 && angle !== 90 && angle !== -90) {
            throw new Error("Angle " + angle + " not supported; only 0, 90, and -90 are valid values");
        }
        this._tickLabelAngle = angle;
        this.redraw();
        return this;
    };
    Category.prototype.tickLabelShearAngle = function (angle) {
        if (angle == null) {
            return this._tickLabelShearAngle;
        }
        if (angle < -80 || angle > 80) {
            throw new Error("Angle " + angle + " not supported; Must be between [-80, 80]");
        }
        this._tickLabelShearAngle = angle;
        this.redraw();
        return this;
    };
    Category.prototype.tickLabelMaxWidth = function (maxWidth) {
        // allow user to un-set tickLabelMaxWidth by passing in null or undefined explicitly
        if (arguments.length === 0) {
            return this._tickLabelMaxWidth;
        }
        this._tickLabelMaxWidth = maxWidth;
        this.redraw();
        return this;
    };
    Category.prototype.tickLabelMaxLines = function (maxLines) {
        // allow user to un-set tickLabelMaxLines by passing in null or undefined explicitly
        if (arguments.length === 0) {
            return this._tickLabelMaxLines;
        }
        this._tickLabelMaxLines = maxLines;
        this.redraw();
        return this;
    };
    /**
     * Return the space required by the ticks, padding included.
     * @returns {number}
     */
    Category.prototype._tickSpaceRequired = function () {
        return this._maxLabelTickLength() + this.tickLabelPadding();
    };
    /**
     * Write ticks to the DOM.
     * @param {Plottable.Scales.Category} scale The scale this axis is representing.
     * @param {d3.Selection} ticks The tick elements to write.
     */
    Category.prototype._drawTicks = function (stepWidth, ticks) {
        var self = this;
        var xAlign;
        var yAlign;
        switch (this.tickLabelAngle()) {
            case 0:
                xAlign = { left: "right", right: "left", top: "center", bottom: "center" };
                yAlign = { left: "center", right: "center", top: "bottom", bottom: "top" };
                break;
            case 90:
                xAlign = { left: "center", right: "center", top: "right", bottom: "left" };
                yAlign = { left: "top", right: "bottom", top: "center", bottom: "center" };
                break;
            case -90:
                xAlign = { left: "center", right: "center", top: "left", bottom: "right" };
                yAlign = { left: "bottom", right: "top", top: "center", bottom: "center" };
                break;
        }
        ticks.each(function (d) {
            var container = d3.select(this);
            var width = self.isHorizontal() ? stepWidth : self.width() - self._tickSpaceRequired();
            var height = self.isHorizontal() ? self.height() - self._tickSpaceRequired() : stepWidth;
            var writeOptions = {
                xAlign: xAlign[self.orientation()],
                yAlign: yAlign[self.orientation()],
                textRotation: self.tickLabelAngle(),
                textShear: self.tickLabelShearAngle(),
            };
            if (self._tickLabelMaxWidth != null) {
                // for left-oriented axes, we must move the ticks by the amount we've cut off in order to keep the text
                // aligned with the side of the ticks
                if (self.orientation() === "left" && width > self._tickLabelMaxWidth) {
                    var cutOffWidth = width - self._tickLabelMaxWidth;
                    var newTransform = container.attr("transform") + " translate(" + cutOffWidth + ", 0)";
                    container.attr("transform", newTransform);
                }
                width = Math.min(width, self._tickLabelMaxWidth);
            }
            self._writer.write(self.formatter()(d), width, height, writeOptions, container.node());
        });
    };
    /**
     * Measures the size of the tick labels without making any (permanent) DOM changes.
     *
     * @param {number} axisWidth Width available for this axis.
     * @param {number} axisHeight Height available for this axis.
     * @param {Plottable.Scales.Category} scale The scale this axis is representing.
     * @param {string[]} ticks The strings that will be printed on the ticks.
     */
    Category.prototype._measureTickLabels = function (axisWidth, axisHeight) {
        var _this = this;
        var thisScale = this._scale;
        // set up a test scale to simulate rendering ticks with the given width and height.
        var scale = thisScale.cloneWithoutProviders()
            .range([0, this.isHorizontal() ? axisWidth : axisHeight]);
        var _a = this.getDownsampleInfo(scale), domain = _a.domain, stepWidth = _a.stepWidth;
        // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
        // the width (x-axis specific) available to a single tick label.
        var width = axisWidth - this._tickSpaceRequired(); // default for left/right
        if (this.isHorizontal()) {
            width = stepWidth; // defaults to the band width
            if (this._tickLabelAngle !== 0) {
                width = axisHeight - this._tickSpaceRequired(); // use the axis height
            }
            // HACKHACK: Wrapper fails under negative circumstances
            width = Math.max(width, 0);
        }
        // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
        // the height (y-axis specific) available to a single tick label.
        var height = stepWidth; // default for left/right
        if (this.isHorizontal()) {
            height = axisHeight - this._tickSpaceRequired();
            if (this._tickLabelAngle !== 0) {
                height = axisWidth - this._tickSpaceRequired();
            }
            // HACKHACK: Wrapper fails under negative circumstances
            height = Math.max(height, 0);
        }
        if (this._tickLabelMaxWidth != null) {
            width = Math.min(width, this._tickLabelMaxWidth);
        }
        var wrappingResults = domain.map(function (s) {
            return _this._wrapper.wrap(_this.formatter()(s), _this._measurer, width, height);
        });
        // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
        var widthFn = (this.isHorizontal() && this._tickLabelAngle === 0) ? d3.sum : Utils.Math.max;
        var heightFn = (this.isHorizontal() && this._tickLabelAngle === 0) ? Utils.Math.max : d3.sum;
        var usedWidth = widthFn(wrappingResults, function (t) { return _this._measurer.measure(t.wrappedText).width; }, 0);
        var usedHeight = heightFn(wrappingResults, function (t) { return _this._measurer.measure(t.wrappedText).height; }, 0);
        // If the tick labels are rotated, reverse usedWidth and usedHeight
        // HACKHACK: https://github.com/palantir/svg-typewriter/issues/25
        if (this._tickLabelAngle !== 0) {
            _b = [usedHeight, usedWidth], usedWidth = _b[0], usedHeight = _b[1];
        }
        return {
            usedWidth: usedWidth,
            usedHeight: usedHeight,
        };
        var _b;
    };
    Category.prototype.renderImmediately = function () {
        var _this = this;
        _super.prototype.renderImmediately.call(this);
        var catScale = this._scale;
        var _a = this.getDownsampleInfo(catScale), domain = _a.domain, stepWidth = _a.stepWidth;
        // Give each tick a stepWidth of space which will partition the entire axis evenly
        var availableTextSpace = stepWidth;
        if (this.isHorizontal() && this._tickLabelMaxWidth != null) {
            availableTextSpace = Math.min(availableTextSpace, this._tickLabelMaxWidth);
        }
        var getTickLabelTransform = function (d, i) {
            // scale(d) will give the center of the band, so subtract half of the text width to get the left (top-most)
            // coordinate that the tick label should be transformed to.
            var tickLabelEdge = catScale.scale(d) - availableTextSpace / 2;
            var x = _this.isHorizontal() ? tickLabelEdge : 0;
            var y = _this.isHorizontal() ? 0 : tickLabelEdge;
            return "translate(" + x + "," + y + ")";
        };
        var tickLabelsUpdate = this._tickLabelContainer.selectAll("." + axis_1.Axis.TICK_LABEL_CLASS).data(domain);
        var tickLabels = tickLabelsUpdate
            .enter()
            .append("g")
            .classed(axis_1.Axis.TICK_LABEL_CLASS, true)
            .merge(tickLabelsUpdate);
        tickLabelsUpdate.exit().remove();
        tickLabels.attr("transform", getTickLabelTransform);
        // erase all text first, then rewrite
        tickLabels.text("");
        this._drawTicks(stepWidth, tickLabels);
        var xTranslate = this.orientation() === "right" ? this._tickSpaceRequired() : 0;
        var yTranslate = this.orientation() === "bottom" ? this._tickSpaceRequired() : 0;
        this._tickLabelContainer.attr("transform", "translate(" + xTranslate + "," + yTranslate + ")");
        // hide ticks and labels that overflow the axis
        this._showAllTickMarks();
        this._showAllTickLabels();
        this._hideTickMarksWithoutLabel();
        return this;
    };
    Category.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        if (!this.isHorizontal()) {
            this._scale.range([0, this.height()]);
        }
        return this;
    };
    Category.prototype.invalidateCache = function () {
        _super.prototype.invalidateCache.call(this);
        this._measurer.reset();
    };
    return Category;
}(axis_1.Axis));
/**
 * How many pixels to give labels at minimum before downsampling takes effect.
 */
Category._MINIMUM_WIDTH_PER_LABEL_PX = 15;
exports.Category = Category;
