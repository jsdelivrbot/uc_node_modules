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
var Animators = require("../animators");
var drawer_1 = require("../drawers/drawer");
var segmentDrawer_1 = require("../drawers/segmentDrawer");
var Scales = require("../scales");
var windowUtils_1 = require("../utils/windowUtils");
var plot_1 = require("./plot");
var xyPlot_1 = require("./xyPlot");
var Segment = (function (_super) {
    __extends(Segment, _super);
    /**
     * A Segment Plot displays line segments based on the data.
     *
     * @constructor
     */
    function Segment() {
        var _this = _super.call(this) || this;
        _this.addClass("segment-plot");
        _this.attr("stroke", new Scales.Color().range()[0]);
        _this.attr("stroke-width", "2px");
        return _this;
    }
    Segment.prototype._createDrawer = function () {
        return new drawer_1.ProxyDrawer(function () { return new segmentDrawer_1.SegmentSVGDrawer(); }, function () {
            windowUtils_1.warn("canvas renderer is not supported on Segment Plot!");
        });
    };
    Segment.prototype._generateDrawSteps = function () {
        return [{ attrToProjector: this._generateAttrToProjector(), animator: new Animators.Null() }];
    };
    Segment.prototype._updateExtentsForProperty = function (property) {
        _super.prototype._updateExtentsForProperty.call(this, property);
        if (property === "x") {
            _super.prototype._updateExtentsForProperty.call(this, "x2");
        }
        else if (property === "y") {
            _super.prototype._updateExtentsForProperty.call(this, "y2");
        }
    };
    Segment.prototype._filterForProperty = function (property) {
        if (property === "x2") {
            return _super.prototype._filterForProperty.call(this, "x");
        }
        else if (property === "y2") {
            return _super.prototype._filterForProperty.call(this, "y");
        }
        return _super.prototype._filterForProperty.call(this, property);
    };
    Segment.prototype.x = function (x, xScale) {
        if (x == null) {
            return _super.prototype.x.call(this);
        }
        if (xScale == null) {
            _super.prototype.x.call(this, x);
        }
        else {
            _super.prototype.x.call(this, x, xScale);
            var x2Binding = this.x2();
            var x2 = x2Binding && x2Binding.accessor;
            if (x2 != null) {
                this._bindProperty(Segment._X2_KEY, x2, xScale);
            }
        }
        return this;
    };
    Segment.prototype.x2 = function (x2) {
        if (x2 == null) {
            return this._propertyBindings.get(Segment._X2_KEY);
        }
        var xBinding = this.x();
        var xScale = xBinding && xBinding.scale;
        this._bindProperty(Segment._X2_KEY, x2, xScale);
        this.render();
        return this;
    };
    Segment.prototype.y = function (y, yScale) {
        if (y == null) {
            return _super.prototype.y.call(this);
        }
        if (yScale == null) {
            _super.prototype.y.call(this, y);
        }
        else {
            _super.prototype.y.call(this, y, yScale);
            var y2Binding = this.y2();
            var y2 = y2Binding && y2Binding.accessor;
            if (y2 != null) {
                this._bindProperty(Segment._Y2_KEY, y2, yScale);
            }
        }
        return this;
    };
    Segment.prototype.y2 = function (y2) {
        if (y2 == null) {
            return this._propertyBindings.get(Segment._Y2_KEY);
        }
        var yBinding = this.y();
        var yScale = yBinding && yBinding.scale;
        this._bindProperty(Segment._Y2_KEY, y2, yScale);
        this.render();
        return this;
    };
    Segment.prototype._propertyProjectors = function () {
        var attrToProjector = _super.prototype._propertyProjectors.call(this);
        attrToProjector["x1"] = plot_1.Plot._scaledAccessor(this.x());
        attrToProjector["x2"] = this.x2() == null ? plot_1.Plot._scaledAccessor(this.x()) : plot_1.Plot._scaledAccessor(this.x2());
        attrToProjector["y1"] = plot_1.Plot._scaledAccessor(this.y());
        attrToProjector["y2"] = this.y2() == null ? plot_1.Plot._scaledAccessor(this.y()) : plot_1.Plot._scaledAccessor(this.y2());
        return attrToProjector;
    };
    Segment.prototype.entitiesAt = function (point) {
        var entity = this.entityNearest(point);
        if (entity != null) {
            return [entity];
        }
        else {
            return [];
        }
    };
    Segment.prototype.entitiesIn = function (xRangeOrBounds, yRange) {
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
        return this._entitiesIntersecting(dataXRange, dataYRange);
    };
    Segment.prototype._entitiesIntersecting = function (xRange, yRange) {
        var _this = this;
        var intersected = [];
        var attrToProjector = this._generateAttrToProjector();
        this.entities().forEach(function (entity) {
            if (_this._lineIntersectsBox(entity, xRange, yRange, attrToProjector)) {
                intersected.push(entity);
            }
        });
        return intersected;
    };
    Segment.prototype._lineIntersectsBox = function (entity, xRange, yRange, attrToProjector) {
        var _this = this;
        var x1 = attrToProjector["x1"](entity.datum, entity.index, entity.dataset);
        var x2 = attrToProjector["x2"](entity.datum, entity.index, entity.dataset);
        var y1 = attrToProjector["y1"](entity.datum, entity.index, entity.dataset);
        var y2 = attrToProjector["y2"](entity.datum, entity.index, entity.dataset);
        // check if any of end points of the segment is inside the box
        if ((xRange.min <= x1 && x1 <= xRange.max && yRange.min <= y1 && y1 <= yRange.max) ||
            (xRange.min <= x2 && x2 <= xRange.max && yRange.min <= y2 && y2 <= yRange.max)) {
            return true;
        }
        var startPoint = { x: x1, y: y1 };
        var endPoint = { x: x2, y: y2 };
        var corners = [
            { x: xRange.min, y: yRange.min },
            { x: xRange.min, y: yRange.max },
            { x: xRange.max, y: yRange.max },
            { x: xRange.max, y: yRange.min },
        ];
        var intersections = corners.filter(function (point, index) {
            if (index !== 0) {
                // return true if border formed by conecting current corner and previous corner intersects with the segment
                return _this._lineIntersectsSegment(startPoint, endPoint, point, corners[index - 1]) &&
                    _this._lineIntersectsSegment(point, corners[index - 1], startPoint, endPoint);
            }
            return false;
        });
        return intersections.length > 0;
    };
    Segment.prototype._lineIntersectsSegment = function (point1, point2, point3, point4) {
        // tslint:disable-next-line:no-shadowed-variable
        var calcOrientation = function (point1, point2, point) {
            return (point2.x - point1.x) * (point.y - point2.y) - (point2.y - point1.y) * (point.x - point2.x);
        };
        // point3 and point4 are on different sides of line formed by point1 and point2
        return calcOrientation(point1, point2, point3) * calcOrientation(point1, point2, point4) < 0;
    };
    return Segment;
}(xyPlot_1.XYPlot));
Segment._X2_KEY = "x2";
Segment._Y2_KEY = "y2";
exports.Segment = Segment;
