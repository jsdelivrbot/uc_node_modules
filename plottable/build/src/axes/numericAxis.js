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
var Formatters = require("../core/formatters");
var Utils = require("../utils");
var axis_1 = require("./axis");
var Numeric = (function (_super) {
    __extends(Numeric, _super);
    /**
     * Constructs a Numeric Axis.
     *
     * A Numeric Axis is a visual representation of a QuantitativeScale.
     *
     * @constructor
     * @param {QuantitativeScale} scale
     * @param {AxisOrientation} orientation Orientation of this Numeric Axis.
     */
    function Numeric(scale, orientation) {
        var _this = _super.call(this, scale, orientation) || this;
        _this._tickLabelPositioning = "center";
        _this._usesTextWidthApproximation = false;
        _this.formatter(Formatters.general());
        return _this;
    }
    Numeric.prototype._setup = function () {
        _super.prototype._setup.call(this);
        var context = new Typesettable.SvgContext(this._tickLabelContainer.node(), axis_1.Axis.TICK_LABEL_CLASS);
        this._measurer = new Typesettable.CacheMeasurer(context);
        this._wrapper = new Typesettable.Wrapper().maxLines(1);
    };
    Numeric.prototype._computeWidth = function () {
        var maxTextWidth = this._usesTextWidthApproximation ? this._computeApproximateTextWidth() : this._computeExactTextWidth();
        if (this._tickLabelPositioning === "center") {
            return this._maxLabelTickLength() + this.tickLabelPadding() + maxTextWidth;
        }
        else {
            return Math.max(this._maxLabelTickLength(), this.tickLabelPadding() + maxTextWidth);
        }
    };
    Numeric.prototype._computeExactTextWidth = function () {
        var _this = this;
        var tickValues = this._getTickValues();
        var textLengths = tickValues.map(function (v) {
            var formattedValue = _this.formatter()(v);
            return _this._measurer.measure(formattedValue).width;
        });
        return Utils.Math.max(textLengths, 0);
    };
    Numeric.prototype._computeApproximateTextWidth = function () {
        var _this = this;
        var tickValues = this._getTickValues();
        var mWidth = this._measurer.measure("M").width;
        var textLengths = tickValues.map(function (v) {
            var formattedValue = _this.formatter()(v);
            return formattedValue.length * mWidth;
        });
        return Utils.Math.max(textLengths, 0);
    };
    Numeric.prototype._computeHeight = function () {
        var textHeight = this._measurer.measure().height;
        if (this._tickLabelPositioning === "center") {
            return this._maxLabelTickLength() + this.tickLabelPadding() + textHeight;
        }
        else {
            return Math.max(this._maxLabelTickLength(), this.tickLabelPadding() + textHeight);
        }
    };
    Numeric.prototype._getTickValues = function () {
        var scale = this._scale;
        var domain = scale.domain();
        var min = domain[0] <= domain[1] ? domain[0] : domain[1];
        var max = domain[0] >= domain[1] ? domain[0] : domain[1];
        return scale.ticks().filter(function (i) { return i >= min && i <= max; });
    };
    Numeric.prototype._rescale = function () {
        if (!this._isSetup) {
            return;
        }
        if (!this.isHorizontal()) {
            var reComputedWidth = this._computeWidth();
            if (reComputedWidth > this.width() || reComputedWidth < (this.width() - this.margin())) {
                this.redraw();
                return;
            }
        }
        this.render();
    };
    Numeric.prototype.renderImmediately = function () {
        var _this = this;
        _super.prototype.renderImmediately.call(this);
        var tickLabelAttrHash = {
            x: 0,
            y: 0,
            dx: "0em",
            dy: "0.3em",
        };
        var tickMarkLength = this._maxLabelTickLength();
        var tickLabelPadding = this.tickLabelPadding();
        var tickLabelTextAnchor = "middle";
        var labelGroupTransformX = 0;
        var labelGroupTransformY = 0;
        var labelGroupShiftX = 0;
        var labelGroupShiftY = 0;
        if (this.isHorizontal()) {
            switch (this._tickLabelPositioning) {
                case "left":
                    tickLabelTextAnchor = "end";
                    labelGroupTransformX = -tickLabelPadding;
                    labelGroupShiftY = tickLabelPadding;
                    break;
                case "center":
                    labelGroupShiftY = tickMarkLength + tickLabelPadding;
                    break;
                case "right":
                    tickLabelTextAnchor = "start";
                    labelGroupTransformX = tickLabelPadding;
                    labelGroupShiftY = tickLabelPadding;
                    break;
            }
        }
        else {
            switch (this._tickLabelPositioning) {
                case "top":
                    tickLabelAttrHash["dy"] = "-0.3em";
                    labelGroupShiftX = tickLabelPadding;
                    labelGroupTransformY = -tickLabelPadding;
                    break;
                case "center":
                    labelGroupShiftX = tickMarkLength + tickLabelPadding;
                    break;
                case "bottom":
                    tickLabelAttrHash["dy"] = "1em";
                    labelGroupShiftX = tickLabelPadding;
                    labelGroupTransformY = tickLabelPadding;
                    break;
            }
        }
        var tickMarkAttrHash = this._generateTickMarkAttrHash();
        switch (this.orientation()) {
            case "bottom":
                tickLabelAttrHash["x"] = tickMarkAttrHash["x1"];
                tickLabelAttrHash["dy"] = "0.95em";
                labelGroupTransformY = tickMarkAttrHash["y1"] + labelGroupShiftY;
                break;
            case "top":
                tickLabelAttrHash["x"] = tickMarkAttrHash["x1"];
                tickLabelAttrHash["dy"] = "-.25em";
                labelGroupTransformY = tickMarkAttrHash["y1"] - labelGroupShiftY;
                break;
            case "left":
                tickLabelTextAnchor = "end";
                labelGroupTransformX = tickMarkAttrHash["x1"] - labelGroupShiftX;
                tickLabelAttrHash["y"] = tickMarkAttrHash["y1"];
                break;
            case "right":
                tickLabelTextAnchor = "start";
                labelGroupTransformX = tickMarkAttrHash["x1"] + labelGroupShiftX;
                tickLabelAttrHash["y"] = tickMarkAttrHash["y1"];
                break;
        }
        var tickLabelValues = this._getTickValues();
        var tickLabelsUpdate = this._tickLabelContainer.selectAll("." + axis_1.Axis.TICK_LABEL_CLASS).data(tickLabelValues);
        tickLabelsUpdate.exit().remove();
        var tickLabels = tickLabelsUpdate
            .enter()
            .append("text")
            .classed(axis_1.Axis.TICK_LABEL_CLASS, true)
            .merge(tickLabelsUpdate);
        tickLabels.style("text-anchor", tickLabelTextAnchor)
            .style("visibility", "inherit")
            .attrs(tickLabelAttrHash)
            .text(function (s) { return _this.formatter()(s); });
        var labelGroupTransform = "translate(" + labelGroupTransformX + ", " + labelGroupTransformY + ")";
        this._tickLabelContainer.attr("transform", labelGroupTransform);
        this._showAllTickMarks();
        if (!this.showEndTickLabels()) {
            this._hideEndTickLabels();
        }
        this._hideOverflowingTickLabels();
        this._hideOverlappingTickLabels();
        if (this._tickLabelPositioning !== "center") {
            this._hideTickMarksWithoutLabel();
        }
        return this;
    };
    Numeric.prototype.tickLabelPosition = function (position) {
        if (position == null) {
            return this._tickLabelPositioning;
        }
        else {
            var positionLC = position.toLowerCase();
            if (this.isHorizontal()) {
                if (!(positionLC === "left" || positionLC === "center" || positionLC === "right")) {
                    throw new Error(positionLC + " is not a valid tick label position for a horizontal NumericAxis");
                }
            }
            else {
                if (!(positionLC === "top" || positionLC === "center" || positionLC === "bottom")) {
                    throw new Error(positionLC + " is not a valid tick label position for a vertical NumericAxis");
                }
            }
            this._tickLabelPositioning = positionLC;
            this.redraw();
            return this;
        }
    };
    Numeric.prototype.usesTextWidthApproximation = function (enable) {
        if (enable == null) {
            return this._usesTextWidthApproximation;
        }
        else {
            this._usesTextWidthApproximation = enable;
            return this;
        }
    };
    Numeric.prototype._hideEndTickLabels = function () {
        var boundingBox = this.element().node().getBoundingClientRect();
        var tickLabels = this._tickLabelContainer.selectAll("." + axis_1.Axis.TICK_LABEL_CLASS);
        if (tickLabels.size() === 0) {
            return;
        }
        var firstTickLabel = tickLabels.nodes()[0];
        if (!Utils.DOM.clientRectInside(firstTickLabel.getBoundingClientRect(), boundingBox)) {
            d3.select(firstTickLabel).style("visibility", "hidden");
        }
        var lastTickLabel = tickLabels.nodes()[tickLabels.size() - 1];
        if (!Utils.DOM.clientRectInside(lastTickLabel.getBoundingClientRect(), boundingBox)) {
            d3.select(lastTickLabel).style("visibility", "hidden");
        }
    };
    Numeric.prototype._hideOverlappingTickLabels = function () {
        var visibleTickLabels = this._tickLabelContainer
            .selectAll("." + axis_1.Axis.TICK_LABEL_CLASS)
            .filter(function (d, i) {
            var visibility = d3.select(this).style("visibility");
            return (visibility === "inherit") || (visibility === "visible");
        });
        var visibleTickLabelRects = visibleTickLabels.nodes().map(function (label) { return label.getBoundingClientRect(); });
        var interval = 1;
        while (!this._hasOverlapWithInterval(interval, visibleTickLabelRects) && interval < visibleTickLabelRects.length) {
            interval += 1;
        }
        visibleTickLabels.each(function (d, i) {
            var tickLabel = d3.select(this);
            if (i % interval !== 0) {
                tickLabel.style("visibility", "hidden");
            }
        });
    };
    /**
     * The method is responsible for evenly spacing the labels on the axis.
     * @return test to see if taking every `interval` recrangle from `rects`
     *         will result in labels not overlapping
     *
     * For top, bottom, left, right positioning of the thicks, we want the padding
     * between the labels to be 3x, such that the label will be  `padding` distance
     * from the tick and 2 * `padding` distance (or more) from the next tick:
     * see https://github.com/palantir/plottable/pull/1812
     */
    Numeric.prototype._hasOverlapWithInterval = function (interval, rects) {
        var padding = (this._tickLabelPositioning === "center")
            ? this.tickLabelPadding()
            : this.tickLabelPadding() * 3;
        var rectsWithPadding = rects.map(function (rect) { return Utils.DOM.expandRect(rect, padding); });
        for (var i = 0; i < rectsWithPadding.length - interval; i += interval) {
            var currRect = rectsWithPadding[i];
            var nextRect = rectsWithPadding[i + interval];
            if (Utils.DOM.clientRectsOverlap(currRect, nextRect)) {
                return false;
            }
        }
        return true;
    };
    Numeric.prototype.invalidateCache = function () {
        _super.prototype.invalidateCache.call(this);
        this._measurer.reset();
    };
    return Numeric;
}(axis_1.Axis));
exports.Numeric = Numeric;
