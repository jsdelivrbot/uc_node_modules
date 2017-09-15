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
var Utils = require("../utils");
var Scales = require("./");
var quantitativeScale_1 = require("./quantitativeScale");
var ModifiedLog = (function (_super) {
    __extends(ModifiedLog, _super);
    /**
     * A ModifiedLog Scale acts as a regular log scale for large numbers.
     * As it approaches 0, it gradually becomes linear.
     * Consequently, a ModifiedLog Scale can process 0 and negative numbers.
     *
     * For x >= base, scale(x) = log(x).
     *
     * For 0 < x < base, scale(x) will become more and more
     * linear as it approaches 0.
     *
     * At x == 0, scale(x) == 0.
     *
     * For negative values, scale(-x) = -scale(x).
     *
     * The range and domain for the scale should also be set, using the
     * range() and domain() accessors, respectively.
     *
     * For `range`, provide a two-element array giving the minimum and
     * maximum of values produced when scaling.
     *
     * For `domain` provide a two-element array giving the minimum and
     * maximum of the values that will be scaled.
     *
     * @constructor
     * @param {number} [base=10]
     *        The base of the log. Must be > 1.
     *
     */
    function ModifiedLog(base) {
        if (base === void 0) { base = 10; }
        var _this = _super.call(this) || this;
        _this._d3Scale = d3.scaleLinear();
        _this._base = base;
        _this._pivot = _this._base;
        _this._setDomain(_this._defaultExtent());
        if (base <= 1) {
            throw new Error("ModifiedLogScale: The base must be > 1");
        }
        return _this;
    }
    /**
     * Returns an adjusted log10 value for graphing purposes.  The first
     * adjustment is that negative values are changed to positive during
     * the calculations, and then the answer is negated at the end.  The
     * second is that, for values less than 10, an increasingly large
     * (0 to 1) scaling factor is added such that at 0 the value is
     * adjusted to 1, resulting in a returned result of 0.
     */
    ModifiedLog.prototype._adjustedLog = function (x) {
        var negationFactor = x < 0 ? -1 : 1;
        x *= negationFactor;
        if (x < this._pivot) {
            x += (this._pivot - x) / this._pivot;
        }
        x = Math.log(x) / Math.log(this._base);
        x *= negationFactor;
        return x;
    };
    ModifiedLog.prototype._invertedAdjustedLog = function (x) {
        var negationFactor = x < 0 ? -1 : 1;
        x *= negationFactor;
        x = Math.pow(this._base, x);
        if (x < this._pivot) {
            x = (this._pivot * (x - 1)) / (this._pivot - 1);
        }
        x *= negationFactor;
        return x;
    };
    ModifiedLog.prototype.scale = function (x) {
        return this._d3Scale(this._adjustedLog(x));
    };
    ModifiedLog.prototype.invert = function (x) {
        return this._invertedAdjustedLog(this._d3Scale.invert(x));
    };
    ModifiedLog.prototype.scaleTransformation = function (value) {
        return this.scale(value);
    };
    ModifiedLog.prototype.invertedTransformation = function (value) {
        return this.invert(value);
    };
    ModifiedLog.prototype.getTransformationDomain = function () {
        return this.domain();
    };
    ModifiedLog.prototype._getDomain = function () {
        return this._untransformedDomain;
    };
    ModifiedLog.prototype._setDomain = function (values) {
        this._untransformedDomain = values;
        var transformedDomain = [this._adjustedLog(values[0]), this._adjustedLog(values[1])];
        _super.prototype._setDomain.call(this, transformedDomain);
    };
    ModifiedLog.prototype._backingScaleDomain = function (values) {
        if (values == null) {
            return this._d3Scale.domain();
        }
        else {
            this._d3Scale.domain(values);
            return this;
        }
    };
    ModifiedLog.prototype.ticks = function () {
        // Say your domain is [-100, 100] and your pivot is 10.
        // then we're going to draw negative log ticks from -100 to -10,
        // linear ticks from -10 to 10, and positive log ticks from 10 to 100.
        var middle = function (x, y, z) { return [x, y, z].sort(function (a, b) { return a - b; })[1]; };
        var min = Utils.Math.min(this._untransformedDomain, 0);
        var max = Utils.Math.max(this._untransformedDomain, 0);
        var negativeLower = min;
        var negativeUpper = middle(min, max, -this._pivot);
        var positiveLower = middle(min, max, this._pivot);
        var positiveUpper = max;
        var negativeLogTicks = this._logTicks(-negativeUpper, -negativeLower).map(function (x) { return -x; }).reverse();
        var positiveLogTicks = this._logTicks(positiveLower, positiveUpper);
        var linearMin = Math.max(min, -this._pivot);
        var linearMax = Math.min(max, this._pivot);
        var linearTicks = d3.scaleLinear().domain([linearMin, linearMax]).ticks(this._howManyTicks(linearMin, linearMax));
        var ticks = negativeLogTicks.concat(linearTicks).concat(positiveLogTicks);
        // If you only have 1 tick, you can't tell how big the scale is.
        if (ticks.length <= 1) {
            ticks = d3.scaleLinear().domain([min, max]).ticks(Scales.ModifiedLog._DEFAULT_NUM_TICKS);
        }
        return ticks;
    };
    /**
     * Return an appropriate number of ticks from lower to upper.
     *
     * This will first try to fit as many powers of this.base as it can from
     * lower to upper.
     *
     * If it still has ticks after that, it will generate ticks in "clusters",
     * e.g. [20, 30, ... 90, 100] would be a cluster, [200, 300, ... 900, 1000]
     * would be another cluster.
     *
     * This function will generate clusters as large as it can while not
     * drastically exceeding its number of ticks.
     */
    ModifiedLog.prototype._logTicks = function (lower, upper) {
        var _this = this;
        var nTicks = this._howManyTicks(lower, upper);
        if (nTicks === 0) {
            return [];
        }
        var startLogged = Math.floor(Math.log(lower) / Math.log(this._base));
        var endLogged = Math.ceil(Math.log(upper) / Math.log(this._base));
        var bases = d3.range(endLogged, startLogged, -Math.ceil((endLogged - startLogged) / nTicks));
        var multiples = d3.range(this._base, 1, -(this._base - 1)).map(Math.floor);
        var uniqMultiples = Utils.Array.uniq(multiples);
        var clusters = bases.map(function (b) { return uniqMultiples.map(function (x) { return Math.pow(_this._base, b - 1) * x; }); });
        var flattened = Utils.Array.flatten(clusters);
        var filtered = flattened.filter(function (x) { return lower <= x && x <= upper; });
        var sorted = filtered.sort(function (x, y) { return x - y; });
        return sorted;
    };
    /**
     * How many ticks does the range [lower, upper] deserve?
     *
     * e.g. if your domain was [10, 1000] and I asked _howManyTicks(10, 100),
     * I would get 1/2 of the ticks. The range 10, 100 takes up 1/2 of the
     * distance when plotted.
     */
    ModifiedLog.prototype._howManyTicks = function (lower, upper) {
        var adjustedMin = this._adjustedLog(Utils.Math.min(this._untransformedDomain, 0));
        var adjustedMax = this._adjustedLog(Utils.Math.max(this._untransformedDomain, 0));
        var adjustedLower = this._adjustedLog(lower);
        var adjustedUpper = this._adjustedLog(upper);
        var proportion = (adjustedUpper - adjustedLower) / (adjustedMax - adjustedMin);
        var ticks = Math.ceil(proportion * Scales.ModifiedLog._DEFAULT_NUM_TICKS);
        return ticks;
    };
    ModifiedLog.prototype._niceDomain = function (domain, count) {
        return domain;
    };
    ModifiedLog.prototype._defaultExtent = function () {
        return [0, this._base];
    };
    ModifiedLog.prototype._expandSingleValueDomain = function (singleValueDomain) {
        if (singleValueDomain[0] === singleValueDomain[1]) {
            var singleValue = singleValueDomain[0];
            if (singleValue > 0) {
                return [singleValue / this._base, singleValue * this._base];
            }
            else if (singleValue === 0) {
                return [-this._base, this._base];
            }
            else {
                return [singleValue * this._base, singleValue / this._base];
            }
        }
        return singleValueDomain;
    };
    ModifiedLog.prototype._getRange = function () {
        return this._d3Scale.range();
    };
    ModifiedLog.prototype._setRange = function (values) {
        this._d3Scale.range(values);
    };
    ModifiedLog.prototype.defaultTicks = function () {
        return this._d3Scale.ticks(Scales.ModifiedLog._DEFAULT_NUM_TICKS);
    };
    return ModifiedLog;
}(quantitativeScale_1.QuantitativeScale));
exports.ModifiedLog = ModifiedLog;
