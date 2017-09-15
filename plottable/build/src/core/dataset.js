/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var Utils = require("../utils");
var Dataset = (function () {
    /**
     * A Dataset contains an array of data and some metadata.
     * Changes to the data or metadata will cause anything subscribed to the Dataset to update.
     *
     * @constructor
     * @param {any[]} [data=[]] The data for this Dataset.
     * @param {any} [metadata={}] An object containing additional information.
     */
    function Dataset(data, metadata) {
        if (data === void 0) { data = []; }
        if (metadata === void 0) { metadata = {}; }
        this._data = data;
        this._metadata = metadata;
        this._callbacks = new Utils.CallbackSet();
    }
    /**
     * Adds a callback to be called when the Dataset updates.
     *
     * @param {DatasetCallback} callback.
     * @returns {Dataset} The calling Dataset.
     */
    Dataset.prototype.onUpdate = function (callback) {
        this._callbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called when the Dataset updates.
     *
     * @param {DatasetCallback} callback
     * @returns {Dataset} The calling Dataset.
     */
    Dataset.prototype.offUpdate = function (callback) {
        this._callbacks.delete(callback);
        return this;
    };
    Dataset.prototype.data = function (data) {
        if (data == null) {
            return this._data;
        }
        else {
            this._data = data;
            this._callbacks.callCallbacks(this);
            return this;
        }
    };
    Dataset.prototype.metadata = function (metadata) {
        if (metadata == null) {
            return this._metadata;
        }
        else {
            this._metadata = metadata;
            this._callbacks.callCallbacks(this);
            return this;
        }
    };
    return Dataset;
}());
exports.Dataset = Dataset;
