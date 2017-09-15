/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var Utils = require("../utils");
var Scale = (function () {
    /**
     * A Scale is a function (in the mathematical sense) that maps values from a domain to a range.
     *
     * @constructor
     */
    function Scale() {
        this._autoDomainAutomatically = true;
        this._domainModificationInProgress = false;
        this._callbacks = new Utils.CallbackSet();
        this._includedValuesProviders = new Utils.Set();
    }
    /**
     * Given an array of potential domain values, computes the extent of those values.
     *
     * @param {D[]} values
     * @returns {D[]} The extent of the input values.
     */
    Scale.prototype.extentOfValues = function (values) {
        return []; // this should be overwritten
    };
    Scale.prototype._getAllIncludedValues = function () {
        var _this = this;
        var providerArray = [];
        this._includedValuesProviders.forEach(function (provider) {
            var extents = provider(_this);
            providerArray = providerArray.concat(extents);
        });
        return providerArray;
    };
    Scale.prototype._getExtent = function () {
        return []; // this should be overwritten
    };
    /**
     * Adds a callback to be called when the Scale updates.
     *
     * @param {ScaleCallback} callback.
     * @returns {Scale} The calling Scale.
     */
    Scale.prototype.onUpdate = function (callback) {
        this._callbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the Scale updates.
     *
     * @param {ScaleCallback} callback.
     * @returns {Scale} The calling Scale.
     */
    Scale.prototype.offUpdate = function (callback) {
        this._callbacks.delete(callback);
        return this;
    };
    Scale.prototype._dispatchUpdate = function () {
        this._callbacks.callCallbacks(this);
    };
    /**
     * Sets the Scale's domain so that it spans the Extents of all its ExtentsProviders.
     *
     * @returns {Scale} The calling Scale.
     */
    Scale.prototype.autoDomain = function () {
        this._autoDomainAutomatically = true;
        this._setDomain(this._getExtent());
        return this;
    };
    Scale.prototype._autoDomainIfAutomaticMode = function () {
        if (this._autoDomainAutomatically) {
            this.autoDomain();
        }
    };
    /**
     * Computes the range value corresponding to a given domain value.
     *
     * @param {D} value
     * @returns {R} The range value corresponding to the supplied domain value.
     */
    Scale.prototype.scale = function (value) {
        throw new Error("Subclasses should override scale");
    };
    Scale.prototype.domain = function (values) {
        if (values == null) {
            return this._getDomain();
        }
        else {
            this._autoDomainAutomatically = false;
            this._setDomain(values);
            return this;
        }
    };
    Scale.prototype._getDomain = function () {
        throw new Error("Subclasses should override _getDomain");
    };
    Scale.prototype._setDomain = function (values) {
        if (!this._domainModificationInProgress) {
            this._domainModificationInProgress = true;
            this._backingScaleDomain(values);
            this._dispatchUpdate();
            this._domainModificationInProgress = false;
        }
    };
    Scale.prototype._backingScaleDomain = function (values) {
        throw new Error("Subclasses should override _backingDomain");
    };
    Scale.prototype.range = function (values) {
        if (values == null) {
            return this._getRange();
        }
        else {
            this._setRange(values);
            return this;
        }
    };
    Scale.prototype._getRange = function () {
        throw new Error("Subclasses should override _getRange");
    };
    Scale.prototype._setRange = function (values) {
        throw new Error("Subclasses should override _setRange");
    };
    /**
     * Adds an IncludedValuesProvider to the Scale.
     *
     * @param {Scales.IncludedValuesProvider} provider
     * @returns {Scale} The calling Scale.
     */
    Scale.prototype.addIncludedValuesProvider = function (provider) {
        this._includedValuesProviders.add(provider);
        this._autoDomainIfAutomaticMode();
        return this;
    };
    /**
     * Removes the IncludedValuesProvider from the Scale.
     *
     * @param {Scales.IncludedValuesProvider} provider
     * @returns {Scale} The calling Scale.
     */
    Scale.prototype.removeIncludedValuesProvider = function (provider) {
        this._includedValuesProviders.delete(provider);
        this._autoDomainIfAutomaticMode();
        return this;
    };
    return Scale;
}());
exports.Scale = Scale;
