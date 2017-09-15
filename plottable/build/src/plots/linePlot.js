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
var Animators = require("../animators");
var drawer_1 = require("../drawers/drawer");
var lineDrawer_1 = require("../drawers/lineDrawer");
var Scales = require("../scales");
var quantitativeScale_1 = require("../scales/quantitativeScale");
var Utils = require("../utils");
var makeEnum_1 = require("../utils/makeEnum");
var Plots = require("./");
var plot_1 = require("./plot");
var xyPlot_1 = require("./xyPlot");
var CURVE_NAME_MAPPING = {
    linear: d3.curveLinear,
    linearClosed: d3.curveLinearClosed,
    step: d3.curveStep,
    stepBefore: d3.curveStepBefore,
    stepAfter: d3.curveStepAfter,
    basis: d3.curveBasis,
    basisOpen: d3.curveBasisOpen,
    basisClosed: d3.curveBasisClosed,
    bundle: d3.curveBundle,
    cardinal: d3.curveCardinal,
    cardinalOpen: d3.curveCardinalOpen,
    cardinalClosed: d3.curveCardinalClosed,
    monotone: d3.curveMonotoneX,
};
/**
 * Known curve types that line and area plot's .curve() methods understand
 */
exports.CurveName = makeEnum_1.makeEnum([
    "linear",
    "linearClosed",
    "step",
    "stepBefore",
    "stepAfter",
    "basis",
    "basisOpen",
    "basisClosed",
    "bundle",
    "cardinal",
    "cardinalOpen",
    "cardinalClosed",
    "monotone",
]);
var Line = (function (_super) {
    __extends(Line, _super);
    /**
     * A Line Plot draws line segments starting from the first data point to the next.
     *
     * @constructor
     */
    function Line() {
        var _this = _super.call(this) || this;
        _this._curve = "linear";
        _this._autorangeSmooth = false;
        _this._croppedRenderingEnabled = true;
        _this._collapseDenseVerticalLinesEnabled = false;
        _this._downsamplingEnabled = false;
        _this.addClass("line-plot");
        var animator = new Animators.Easing();
        animator.stepDuration(plot_1.Plot._ANIMATION_MAX_DURATION);
        animator.easingMode("expInOut");
        animator.maxTotalDuration(plot_1.Plot._ANIMATION_MAX_DURATION);
        _this.animator(Plots.Animator.MAIN, animator);
        _this.attr("stroke", new Scales.Color().range()[0]);
        _this.attr("stroke-width", "2px");
        return _this;
    }
    Line.prototype.x = function (x, xScale) {
        if (x == null) {
            return _super.prototype.x.call(this);
        }
        else {
            if (xScale == null) {
                _super.prototype.x.call(this, x);
            }
            else {
                _super.prototype.x.call(this, x, xScale);
            }
            this._setScaleSnapping();
            return this;
        }
    };
    Line.prototype.y = function (y, yScale) {
        if (y == null) {
            return _super.prototype.y.call(this);
        }
        else {
            _super.prototype.y.call(this, y, yScale);
            this._setScaleSnapping();
            return this;
        }
    };
    Line.prototype.autorangeMode = function (autorangeMode) {
        if (autorangeMode == null) {
            return _super.prototype.autorangeMode.call(this);
        }
        _super.prototype.autorangeMode.call(this, autorangeMode);
        this._setScaleSnapping();
        return this;
    };
    Line.prototype.autorangeSmooth = function (autorangeSmooth) {
        if (autorangeSmooth == null) {
            return this._autorangeSmooth;
        }
        this._autorangeSmooth = autorangeSmooth;
        this._setScaleSnapping();
        return this;
    };
    Line.prototype._setScaleSnapping = function () {
        if (this.autorangeMode() === "x" && this.x() && this.x().scale && this.x().scale instanceof quantitativeScale_1.QuantitativeScale) {
            this.x().scale.snappingDomainEnabled(!this.autorangeSmooth());
        }
        if (this.autorangeMode() === "y" && this.y() && this.y().scale && this.y().scale instanceof quantitativeScale_1.QuantitativeScale) {
            this.y().scale.snappingDomainEnabled(!this.autorangeSmooth());
        }
    };
    Line.prototype.curve = function (curve) {
        if (curve == null) {
            return this._curve;
        }
        this._curve = curve;
        this.render();
        return this;
    };
    Line.prototype.downsamplingEnabled = function (downsampling) {
        if (downsampling == null) {
            return this._downsamplingEnabled;
        }
        this._downsamplingEnabled = downsampling;
        return this;
    };
    Line.prototype.croppedRenderingEnabled = function (croppedRendering) {
        if (croppedRendering == null) {
            return this._croppedRenderingEnabled;
        }
        this._croppedRenderingEnabled = croppedRendering;
        this.render();
        return this;
    };
    Line.prototype.collapseDenseLinesEnabled = function (collapseDenseLines) {
        if (collapseDenseLines == null) {
            return this._collapseDenseVerticalLinesEnabled;
        }
        this._collapseDenseVerticalLinesEnabled = collapseDenseLines;
        this.render();
        return this;
    };
    Line.prototype._createDrawer = function (dataset) {
        var _this = this;
        var canvasDrawer = lineDrawer_1.makeLineCanvasDrawStep(function () { return _this._d3LineFactory(dataset); });
        return new drawer_1.ProxyDrawer(function () { return new lineDrawer_1.LineSVGDrawer(); }, canvasDrawer);
    };
    Line.prototype._extentsForProperty = function (property) {
        var extents = _super.prototype._extentsForProperty.call(this, property);
        if (!this._autorangeSmooth) {
            return extents;
        }
        if (this.autorangeMode() !== property) {
            return extents;
        }
        if (this.autorangeMode() !== "x" && this.autorangeMode() !== "y") {
            return extents;
        }
        var edgeIntersectionPoints = this._getEdgeIntersectionPoints();
        var includedValues;
        if (this.autorangeMode() === "y") {
            includedValues = edgeIntersectionPoints.left.concat(edgeIntersectionPoints.right).map(function (point) { return point.y; });
        }
        else {
            includedValues = edgeIntersectionPoints.top.concat(edgeIntersectionPoints.bottom).map(function (point) { return point.x; });
        }
        return extents.map(function (extent) { return d3.extent(d3.merge([extent, includedValues])); });
    };
    Line.prototype._getEdgeIntersectionPoints = function () {
        var _this = this;
        if (!(this.y().scale instanceof quantitativeScale_1.QuantitativeScale && this.x().scale instanceof quantitativeScale_1.QuantitativeScale)) {
            return {
                left: [],
                right: [],
                top: [],
                bottom: [],
            };
        }
        var yScale = this.y().scale;
        var xScale = this.x().scale;
        var intersectionPoints = {
            left: [],
            right: [],
            top: [],
            bottom: [],
        };
        var leftX = xScale.scale(xScale.domain()[0]);
        var rightX = xScale.scale(xScale.domain()[1]);
        var bottomY = yScale.scale(yScale.domain()[0]);
        var topY = yScale.scale(yScale.domain()[1]);
        this.datasets().forEach(function (dataset) {
            var data = dataset.data();
            var x1, x2, y1, y2;
            var prevX, prevY, currX, currY;
            for (var i = 1; i < data.length; i++) {
                prevX = currX || xScale.scale(_this.x().accessor(data[i - 1], i - 1, dataset));
                prevY = currY || yScale.scale(_this.y().accessor(data[i - 1], i - 1, dataset));
                currX = xScale.scale(_this.x().accessor(data[i], i, dataset));
                currY = yScale.scale(_this.y().accessor(data[i], i, dataset));
                // If values crossed left edge
                if ((prevX < leftX) === (leftX <= currX)) {
                    x1 = leftX - prevX;
                    x2 = currX - prevX;
                    y2 = currY - prevY;
                    y1 = x1 * y2 / x2;
                    intersectionPoints.left.push({
                        x: leftX,
                        y: yScale.invert(prevY + y1),
                    });
                }
                // If values crossed right edge
                if ((prevX < rightX) === (rightX <= currX)) {
                    x1 = rightX - prevX;
                    x2 = currX - prevX;
                    y2 = currY - prevY;
                    y1 = x1 * y2 / x2;
                    intersectionPoints.right.push({
                        x: rightX,
                        y: yScale.invert(prevY + y1),
                    });
                }
                // If values crossed upper edge
                if ((prevY < topY) === (topY <= currY)) {
                    x2 = currX - prevX;
                    y1 = topY - prevY;
                    y2 = currY - prevY;
                    x1 = y1 * x2 / y2;
                    intersectionPoints.top.push({
                        x: xScale.invert(prevX + x1),
                        y: topY,
                    });
                }
                // If values crossed lower edge
                if ((prevY < bottomY) === (bottomY <= currY)) {
                    x2 = currX - prevX;
                    y1 = bottomY - prevY;
                    y2 = currY - prevY;
                    x1 = y1 * x2 / y2;
                    intersectionPoints.bottom.push({
                        x: xScale.invert(prevX + x1),
                        y: bottomY,
                    });
                }
            }
        });
        return intersectionPoints;
    };
    Line.prototype._getResetYFunction = function () {
        // gets the y-value generator for the animation start point
        var yDomain = this.y().scale.domain();
        var domainMax = Math.max(yDomain[0], yDomain[1]);
        var domainMin = Math.min(yDomain[0], yDomain[1]);
        // start from zero, or the closest domain value to zero
        // avoids lines zooming on from offscreen.
        var startValue = (domainMax < 0 && domainMax) || (domainMin > 0 && domainMin) || 0;
        var scaledStartValue = this.y().scale.scale(startValue);
        return function (d, i, dataset) { return scaledStartValue; };
    };
    Line.prototype._generateDrawSteps = function () {
        var drawSteps = [];
        if (this._animateOnNextRender()) {
            var attrToProjector = this._generateAttrToProjector();
            attrToProjector["d"] = this._constructLineProjector(plot_1.Plot._scaledAccessor(this.x()), this._getResetYFunction());
            drawSteps.push({ attrToProjector: attrToProjector, animator: this._getAnimator(Plots.Animator.RESET) });
        }
        drawSteps.push({
            attrToProjector: this._generateAttrToProjector(),
            animator: this._getAnimator(Plots.Animator.MAIN),
        });
        return drawSteps;
    };
    Line.prototype._generateAttrToProjector = function () {
        var attrToProjector = _super.prototype._generateAttrToProjector.call(this);
        Object.keys(attrToProjector).forEach(function (attribute) {
            if (attribute === "d") {
                return;
            }
            var projector = attrToProjector[attribute];
            attrToProjector[attribute] = function (data, i, dataset) {
                return data.length > 0 ? projector(data[0], i, dataset) : null;
            };
        });
        return attrToProjector;
    };
    Line.prototype.entitiesAt = function (point) {
        var entity = this.entityNearestByXThenY(point);
        if (entity != null) {
            return [entity];
        }
        else {
            return [];
        }
    };
    Line.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
        var dataXRange;
        var dataYRange;
        if (yRange == null) {
            var bounds = xRangeOrBounds;
            dataXRange = { min: bounds.topLeft.x, max: bounds.bottomRight.x };
            dataYRange = { min: bounds.topLeft.y, max: bounds.bottomRight.y };
        }
        else {
            dataXRange = xRangeOrBounds;
            dataYRange = yRange;
        }
        var xProjector = plot_1.Plot._scaledAccessor(this.x());
        var yProjector = plot_1.Plot._scaledAccessor(this.y());
        return this.entities().filter(function (entity) {
            var datum = entity.datum, index = entity.index, dataset = entity.dataset;
            var x = xProjector(datum, index, dataset);
            var y = yProjector(datum, index, dataset);
            return dataXRange.min <= x && x <= dataXRange.max && dataYRange.min <= y && y <= dataYRange.max;
        });
    };
    /**
     * Returns the PlotEntity nearest to the query point by X then by Y, or undefined if no PlotEntity can be found.
     *
     * @param {Point} queryPoint
     * @returns {PlotEntity} The nearest PlotEntity, or undefined if no PlotEntity can be found.
     */
    Line.prototype.entityNearestByXThenY = function (queryPoint) {
        var minXDist = Infinity;
        var minYDist = Infinity;
        var closest;
        var chartBounds = this.bounds();
        this.entities().forEach(function (entity) {
            if (!Utils.Math.within(entity.position, chartBounds)) {
                return;
            }
            var xDist = Math.abs(queryPoint.x - entity.position.x);
            var yDist = Math.abs(queryPoint.y - entity.position.y);
            if (xDist < minXDist || xDist === minXDist && yDist < minYDist) {
                closest = entity;
                minXDist = xDist;
                minYDist = yDist;
            }
        });
        return closest;
    };
    Line.prototype._propertyProjectors = function () {
        var propertyToProjectors = _super.prototype._propertyProjectors.call(this);
        propertyToProjectors["d"] = this._constructLineProjector(plot_1.Plot._scaledAccessor(this.x()), plot_1.Plot._scaledAccessor(this.y()));
        return propertyToProjectors;
    };
    Line.prototype._constructLineProjector = function (xProjector, yProjector) {
        var _this = this;
        return function (datum, index, dataset) {
            return _this._d3LineFactory(dataset, xProjector, yProjector)(datum);
        };
    };
    /**
     * Return a d3.Line whose .x, .y, and .defined accessors are hooked up to the xProjector and yProjector
     * after they've been fed the dataset, and whose curve is configured to this plot's curve.
     * @param dataset
     * @param xProjector
     * @param yProjector
     * @returns {Line<[number,number]>}
     * @private
     */
    Line.prototype._d3LineFactory = function (dataset, xProjector, yProjector) {
        if (xProjector === void 0) { xProjector = plot_1.Plot._scaledAccessor(this.x()); }
        if (yProjector === void 0) { yProjector = plot_1.Plot._scaledAccessor(this.y()); }
        var definedProjector = function (d, i, dataset) {
            var positionX = xProjector(d, i, dataset);
            var positionY = yProjector(d, i, dataset);
            return Utils.Math.isValidNumber(positionX) && Utils.Math.isValidNumber(positionY);
        };
        return d3.line()
            .x(function (innerDatum, innerIndex) { return xProjector(innerDatum, innerIndex, dataset); })
            .y(function (innerDatum, innerIndex) { return yProjector(innerDatum, innerIndex, dataset); })
            .curve(this._getCurveFactory())
            .defined(function (innerDatum, innerIndex) { return definedProjector(innerDatum, innerIndex, dataset); });
    };
    ;
    Line.prototype._getCurveFactory = function () {
        var curve = this.curve();
        if (typeof curve === "string") {
            var maybeCurveFunction = CURVE_NAME_MAPPING[curve];
            if (maybeCurveFunction == null) {
                // oops; name is wrong - default to linear instead
                return CURVE_NAME_MAPPING["linear"];
            }
            else {
                return maybeCurveFunction;
            }
        }
        else {
            return curve;
        }
    };
    /**
     * Line plots represent each dataset with a single <path> element, so we wrap the dataset data in a single element array.
     * @returns {Map<Dataset, any[]>}
     * @private
     */
    Line.prototype._getDataToDraw = function () {
        var _this = this;
        var dataToDraw = new Utils.Map();
        this.datasets().forEach(function (dataset) {
            var data = dataset.data();
            if (!_this._croppedRenderingEnabled && !_this._downsamplingEnabled) {
                dataToDraw.set(dataset, [data]);
                return;
            }
            var filteredDataIndices = data.map(function (d, i) { return i; });
            if (_this._croppedRenderingEnabled) {
                filteredDataIndices = _this._filterCroppedRendering(dataset, filteredDataIndices);
            }
            if (_this._downsamplingEnabled) {
                filteredDataIndices = _this._filterDownsampling(dataset, filteredDataIndices);
            }
            if (_this._collapseDenseVerticalLinesEnabled) {
                filteredDataIndices = _this._filterDenseLines(dataset, filteredDataIndices);
            }
            dataToDraw.set(dataset, [filteredDataIndices.map(function (d, i) { return data[d]; })]);
        });
        return dataToDraw;
    };
    Line.prototype._filterCroppedRendering = function (dataset, indices) {
        var _this = this;
        var xProjector = plot_1.Plot._scaledAccessor(this.x());
        var yProjector = plot_1.Plot._scaledAccessor(this.y());
        var data = dataset.data();
        var filteredDataIndices = [];
        var pointInViewport = function (x, y) {
            return Utils.Math.inRange(x, 0, _this.width()) &&
                Utils.Math.inRange(y, 0, _this.height());
        };
        for (var i = 0; i < indices.length; i++) {
            var currXPoint = xProjector(data[indices[i]], indices[i], dataset);
            var currYPoint = yProjector(data[indices[i]], indices[i], dataset);
            var shouldShow = pointInViewport(currXPoint, currYPoint);
            if (!shouldShow && indices[i - 1] != null && data[indices[i - 1]] != null) {
                var prevXPoint = xProjector(data[indices[i - 1]], indices[i - 1], dataset);
                var prevYPoint = yProjector(data[indices[i - 1]], indices[i - 1], dataset);
                shouldShow = shouldShow || pointInViewport(prevXPoint, prevYPoint);
            }
            if (!shouldShow && indices[i + 1] != null && data[indices[i + 1]] != null) {
                var nextXPoint = xProjector(data[indices[i + 1]], indices[i + 1], dataset);
                var nextYPoint = yProjector(data[indices[i + 1]], indices[i + 1], dataset);
                shouldShow = shouldShow || pointInViewport(nextXPoint, nextYPoint);
            }
            if (shouldShow) {
                filteredDataIndices.push(indices[i]);
            }
        }
        return filteredDataIndices;
    };
    Line.prototype._filterDownsampling = function (dataset, indices) {
        if (indices.length === 0) {
            return [];
        }
        var data = dataset.data();
        var scaledXAccessor = plot_1.Plot._scaledAccessor(this.x());
        var scaledYAccessor = plot_1.Plot._scaledAccessor(this.y());
        var filteredIndices = [indices[0]];
        var indexOnCurrentSlope = function (i, currentSlope) {
            var p1x = scaledXAccessor(data[indices[i]], indices[i], dataset);
            var p1y = scaledYAccessor(data[indices[i]], indices[i], dataset);
            var p2x = scaledXAccessor(data[indices[i + 1]], indices[i + 1], dataset);
            var p2y = scaledYAccessor(data[indices[i + 1]], indices[i + 1], dataset);
            if (currentSlope === Infinity) {
                return Math.floor(p1x) === Math.floor(p2x);
            }
            else {
                var expectedP2y = p1y + (p2x - p1x) * currentSlope;
                return Math.floor(p2y) === Math.floor(expectedP2y);
            }
        };
        for (var i = 0; i < indices.length - 1;) {
            var indexFirst = indices[i];
            var p1x = scaledXAccessor(data[indices[i]], indices[i], dataset);
            var p1y = scaledYAccessor(data[indices[i]], indices[i], dataset);
            var p2x = scaledXAccessor(data[indices[i + 1]], indices[i + 1], dataset);
            var p2y = scaledYAccessor(data[indices[i + 1]], indices[i + 1], dataset);
            var currentSlope = (Math.floor(p1x) === Math.floor(p2x)) ? Infinity : (p2y - p1y) / (p2x - p1x);
            var indexMin = indices[i];
            var minScaledValue = (currentSlope === Infinity) ? p1y : p1x;
            var indexMax = indexMin;
            var maxScaledValue = minScaledValue;
            var firstIndexOnCurrentSlope = true;
            while (i < indices.length - 1 && (firstIndexOnCurrentSlope || indexOnCurrentSlope(i, currentSlope))) {
                i++;
                firstIndexOnCurrentSlope = false;
                var currScaledValue = currentSlope === Infinity ? scaledYAccessor(data[indices[i]], indices[i], dataset) :
                    scaledXAccessor(data[indices[i]], indices[i], dataset);
                if (currScaledValue > maxScaledValue) {
                    maxScaledValue = currScaledValue;
                    indexMax = indices[i];
                }
                if (currScaledValue < minScaledValue) {
                    minScaledValue = currScaledValue;
                    indexMin = indices[i];
                }
            }
            var indexLast = indices[i];
            if (indexMin !== indexFirst) {
                filteredIndices.push(indexMin);
            }
            if (indexMax !== indexMin && indexMax !== indexFirst) {
                filteredIndices.push(indexMax);
            }
            if (indexLast !== indexFirst && indexLast !== indexMin && indexLast !== indexMax) {
                filteredIndices.push(indexLast);
            }
        }
        return filteredIndices;
    };
    /**
     * Collapse line geometry
     *
     * Assuming that there are many points that are drawn on the same coordinate,
     * we can save a lot of render time by just drawing one line from the min to
     * max y-coordinate of all those points.
     */
    Line.prototype._filterDenseLines = function (dataset, indices) {
        if (indices.length === 0) {
            return [];
        }
        var data = dataset.data();
        var scaledXAccessor = plot_1.Plot._scaledAccessor(this.x());
        var scaledYAccessor = plot_1.Plot._scaledAccessor(this.y());
        var xFn = function (i) { return scaledXAccessor(data[i], i, dataset); };
        var yFn = function (i) { return scaledYAccessor(data[i], i, dataset); };
        // TODO determine if we should collapse x or y or not collapse at all.
        // For now, we assume line charts are always a function of x
        return this._bucketByX(dataset, indices, xFn, yFn);
    };
    /**
     * Iterates over the line points collapsing points that fall on the same
     * floored x coordinate.
     *
     * Once all the points with the same x coordinate are detected, we draw a
     * single line from the min to max y coorindate.
     *
     * The "entrance" and "exit" lines to/from this collapsed vertical line are
     * also drawn. This allows lines with no collapsed segments to render
     * correctly.
     */
    Line.prototype._bucketByX = function (dataset, indices, xFn, yFn) {
        var filteredIndices = [];
        var data = dataset.data();
        var bucket = null;
        for (var ii = 0; ii <= indices.length; ++ii) {
            var i = indices[ii];
            if (data[i] == null) {
                continue;
            }
            var x = Math.floor(xFn(i));
            var y = yFn(i);
            if (bucket == null) {
                bucket = new Utils.Bucket(i, x, y);
            }
            else if (bucket.isInBucket(x)) {
                bucket.addToBucket(y, i);
            }
            else {
                filteredIndices.push.apply(filteredIndices, bucket.getUniqueIndices());
                bucket = new Utils.Bucket(i, x, y);
            }
        }
        if (bucket != null) {
            filteredIndices.push.apply(filteredIndices, bucket.getUniqueIndices());
        }
        return filteredIndices;
    };
    return Line;
}(xyPlot_1.XYPlot));
exports.Line = Line;
