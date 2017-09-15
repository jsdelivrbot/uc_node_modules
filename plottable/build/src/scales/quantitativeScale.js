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
var QuantitativeScale = (function (_super) {
    __extends(QuantitativeScale, _super);
    /**
     * A QuantitativeScale is a Scale that maps number-like values to numbers.
     * It is invertible and continuous.
     *
     * @constructor
     */
    function QuantitativeScale() {
        var _this = _super.call(this) || this;
        _this._tickGenerator = function (scale) { return scale.defaultTicks(); };
        _this._padProportion = 0.05;
        _this._snappingDomainEnabled = true;
        _this._paddingExceptionsProviders = new Utils.Set();
        return _this;
    }
    QuantitativeScale.prototype.autoDomain = function () {
        this._domainMin = null;
        this._domainMax = null;
        _super.prototype.autoDomain.call(this);
        return this;
    };
    QuantitativeScale.prototype._autoDomainIfAutomaticMode = function () {
        if (this._domainMin != null && this._domainMax != null) {
            this._setDomain([this._domainMin, this._domainMax]);
            return;
        }
        var computedExtent = this._getExtent();
        if (this._domainMin != null) {
            var maxValue = computedExtent[1];
            if (this._domainMin >= maxValue) {
                maxValue = this._expandSingleValueDomain([this._domainMin, this._domainMin])[1];
            }
            this._setDomain([this._domainMin, maxValue]);
            return;
        }
        if (this._domainMax != null) {
            var minValue = computedExtent[0];
            if (this._domainMax <= minValue) {
                minValue = this._expandSingleValueDomain([this._domainMax, this._domainMax])[0];
            }
            this._setDomain([minValue, this._domainMax]);
            return;
        }
        _super.prototype._autoDomainIfAutomaticMode.call(this);
    };
    QuantitativeScale.prototype._getExtent = function () {
        var includedValues = this._getAllIncludedValues();
        var extent = this._defaultExtent();
        if (includedValues.length !== 0) {
            var combinedExtent = [
                Utils.Math.min(includedValues, extent[0]),
                Utils.Math.max(includedValues, extent[1]),
            ];
            extent = this._padDomain(combinedExtent);
        }
        if (this._domainMin != null) {
            extent[0] = this._domainMin;
        }
        if (this._domainMax != null) {
            extent[1] = this._domainMax;
        }
        return extent;
    };
    /**
     * Adds a padding exception provider.
     * If one end of the domain is set to an excepted value as a result of autoDomain()-ing,
     * that end of the domain will not be padded.
     *
     * @param {Scales.PaddingExceptionProvider<D>} provider The provider function.
     * @returns {QuantitativeScale} The calling QuantitativeScale.
     */
    QuantitativeScale.prototype.addPaddingExceptionsProvider = function (provider) {
        this._paddingExceptionsProviders.add(provider);
        this._autoDomainIfAutomaticMode();
        return this;
    };
    /**
     * Removes the padding exception provider.
     *
     * @param {Scales.PaddingExceptionProvider<D>} provider The provider function.
     * @returns {QuantitativeScale} The calling QuantitativeScale.
     */
    QuantitativeScale.prototype.removePaddingExceptionsProvider = function (provider) {
        this._paddingExceptionsProviders.delete(provider);
        this._autoDomainIfAutomaticMode();
        return this;
    };
    QuantitativeScale.prototype.padProportion = function (padProportion) {
        if (padProportion == null) {
            return this._padProportion;
        }
        if (padProportion < 0) {
            throw new Error("padProportion must be non-negative");
        }
        this._padProportion = padProportion;
        this._autoDomainIfAutomaticMode();
        return this;
    };
    QuantitativeScale.prototype._padDomain = function (domain) {
        var _this = this;
        if (domain[0].valueOf() === domain[1].valueOf()) {
            return this._expandSingleValueDomain(domain);
        }
        if (this._padProportion === 0) {
            return domain;
        }
        var p = this._padProportion / 2;
        var min = domain[0];
        var max = domain[1];
        var minExistsInExceptions = false;
        var maxExistsInExceptions = false;
        this._paddingExceptionsProviders.forEach(function (provider) {
            var values = provider(_this);
            values.forEach(function (value) {
                if (value.valueOf() === min.valueOf()) {
                    minExistsInExceptions = true;
                }
                if (value.valueOf() === max.valueOf()) {
                    maxExistsInExceptions = true;
                }
            });
        });
        var originalDomain = this._backingScaleDomain();
        this._backingScaleDomain(domain);
        var newMin = minExistsInExceptions ? min : this.invert(this.scale(min) - (this.scale(max) - this.scale(min)) * p);
        var newMax = maxExistsInExceptions ? max : this.invert(this.scale(max) + (this.scale(max) - this.scale(min)) * p);
        this._backingScaleDomain(originalDomain);
        if (this._snappingDomainEnabled) {
            return this._niceDomain([newMin, newMax]);
        }
        return ([newMin, newMax]);
    };
    QuantitativeScale.prototype.snappingDomainEnabled = function (snappingDomainEnabled) {
        if (snappingDomainEnabled == null) {
            return this._snappingDomainEnabled;
        }
        this._snappingDomainEnabled = snappingDomainEnabled;
        this._autoDomainIfAutomaticMode();
        return this;
    };
    QuantitativeScale.prototype._expandSingleValueDomain = function (singleValueDomain) {
        return singleValueDomain;
    };
    /**
     * Computes the domain value corresponding to a supplied range value.
     *
     * @param {number} value: A value from the Scale's range.
     * @returns {D} The domain value corresponding to the supplied range value.
     */
    QuantitativeScale.prototype.invert = function (value) {
        throw new Error("Subclasses should override invert");
    };
    QuantitativeScale.prototype.domain = function (values) {
        if (values != null) {
            this._domainMin = values[0];
            this._domainMax = values[1];
        }
        return _super.prototype.domain.call(this, values);
    };
    QuantitativeScale.prototype.domainMin = function (domainMin) {
        if (domainMin == null) {
            return this.domain()[0];
        }
        this._domainMin = domainMin;
        this._autoDomainIfAutomaticMode();
        return this;
    };
    QuantitativeScale.prototype.domainMax = function (domainMax) {
        if (domainMax == null) {
            return this.domain()[1];
        }
        this._domainMax = domainMax;
        this._autoDomainIfAutomaticMode();
        return this;
    };
    QuantitativeScale.prototype.extentOfValues = function (values) {
        // HACKHACK: TS1.4 doesn't consider numbers to be Number-like (valueOf() returning number), so D can't be typed correctly
        var extent = d3.extent(values.filter(function (value) { return Utils.Math.isValidNumber(+value); }));
        if (extent[0] == null || extent[1] == null) {
            return [];
        }
        else {
            return extent;
        }
    };
    QuantitativeScale.prototype.zoom = function (magnifyAmount, centerValue) {
        var _this = this;
        var magnifyTransform = function (rangeValue) { return _this.invert(Interactions.zoomAt(rangeValue, magnifyAmount, centerValue)); };
        this.domain(this.range().map(magnifyTransform));
    };
    QuantitativeScale.prototype.pan = function (translateAmount) {
        var _this = this;
        var translateTransform = function (rangeValue) { return _this.invert(rangeValue + translateAmount); };
        this.domain(this.range().map(translateTransform));
    };
    QuantitativeScale.prototype.scaleTransformation = function (value) {
        throw new Error("Subclasses should override scaleTransformation");
    };
    QuantitativeScale.prototype.invertedTransformation = function (value) {
        throw new Error("Subclasses should override invertedTransformation");
    };
    QuantitativeScale.prototype.getTransformationDomain = function () {
        throw new Error("Subclasses should override getTransformationDomain");
    };
    QuantitativeScale.prototype._setDomain = function (values) {
        var isNaNOrInfinity = function (x) { return Utils.Math.isNaN(x) || x === Infinity || x === -Infinity; };
        if (isNaNOrInfinity(values[0]) || isNaNOrInfinity(values[1])) {
            Utils.Window.warn("Warning: QuantitativeScales cannot take NaN or Infinity as a domain value. Ignoring.");
            return;
        }
        _super.prototype._setDomain.call(this, values);
    };
    /**
     * Gets the array of tick values generated by the default algorithm.
     */
    QuantitativeScale.prototype.defaultTicks = function () {
        throw new Error("Subclasses should override _getDefaultTicks");
    };
    /**
     * Gets an array of tick values spanning the domain.
     *
     * @returns {D[]}
     */
    QuantitativeScale.prototype.ticks = function () {
        return this._tickGenerator(this);
    };
    /**
     * Given a domain, expands its domain onto "nice" values, e.g. whole
     * numbers.
     */
    QuantitativeScale.prototype._niceDomain = function (domain, count) {
        throw new Error("Subclasses should override _niceDomain");
    };
    QuantitativeScale.prototype._defaultExtent = function () {
        throw new Error("Subclasses should override _defaultExtent");
    };
    QuantitativeScale.prototype.tickGenerator = function (generator) {
        if (generator == null) {
            return this._tickGenerator;
        }
        else {
            this._tickGenerator = generator;
            return this;
        }
    };
    return QuantitativeScale;
}(scale_1.Scale));
QuantitativeScale._DEFAULT_NUM_TICKS = 10;
exports.QuantitativeScale = QuantitativeScale;
