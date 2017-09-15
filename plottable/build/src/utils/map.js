/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var Math = require("./mathUtils");
/**
 * Shim for ES6 map.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
var Map = (function () {
    function Map() {
        if (typeof window !== "undefined" && typeof window.Map === "function") {
            this._es6Map = new window.Map();
        }
        else {
            this._keyValuePairs = [];
        }
    }
    Map.prototype.set = function (key, value) {
        if (Math.isNaN(key)) {
            throw new Error("NaN may not be used as a key to the Map");
        }
        if (this._es6Map != null) {
            this._es6Map.set(key, value);
            return this;
        }
        for (var i = 0; i < this._keyValuePairs.length; i++) {
            if (this._keyValuePairs[i].key === key) {
                this._keyValuePairs[i].value = value;
                return this;
            }
        }
        this._keyValuePairs.push({ key: key, value: value });
        return this;
    };
    Map.prototype.get = function (key) {
        if (this._es6Map != null) {
            return this._es6Map.get(key);
        }
        for (var i = 0; i < this._keyValuePairs.length; i++) {
            if (this._keyValuePairs[i].key === key) {
                return this._keyValuePairs[i].value;
            }
        }
        return undefined;
    };
    Map.prototype.has = function (key) {
        if (this._es6Map != null) {
            return this._es6Map.has(key);
        }
        for (var i = 0; i < this._keyValuePairs.length; i++) {
            if (this._keyValuePairs[i].key === key) {
                return true;
            }
        }
        return false;
    };
    Map.prototype.forEach = function (callbackFn, thisArg) {
        var _this = this;
        if (this._es6Map != null) {
            var callbackWrapper = function (value, key) { return callbackFn.call(thisArg, value, key, _this); };
            this._es6Map.forEach(callbackWrapper, thisArg);
            return;
        }
        this._keyValuePairs.forEach(function (keyValuePair) {
            callbackFn.call(thisArg, keyValuePair.value, keyValuePair.key, _this);
        });
    };
    Map.prototype.delete = function (key) {
        if (this._es6Map != null) {
            return this._es6Map.delete(key);
        }
        for (var i = 0; i < this._keyValuePairs.length; i++) {
            if (this._keyValuePairs[i].key === key) {
                this._keyValuePairs.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    return Map;
}());
exports.Map = Map;
