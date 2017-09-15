/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
/**
 * Shim for ES6 set.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */
var Set = (function () {
    function Set() {
        if (typeof window !== "undefined" && typeof window.Set === "function") {
            this._es6Set = new window.Set();
        }
        else {
            this._values = [];
        }
        this.size = 0;
    }
    Set.prototype.add = function (value) {
        if (this._es6Set != null) {
            this._es6Set.add(value);
            this.size = this._es6Set.size;
            return this;
        }
        if (!this.has(value)) {
            this._values.push(value);
            this.size = this._values.length;
        }
        return this;
    };
    Set.prototype.delete = function (value) {
        if (this._es6Set != null) {
            var deleted = this._es6Set.delete(value);
            this.size = this._es6Set.size;
            return deleted;
        }
        var index = this._values.indexOf(value);
        if (index !== -1) {
            this._values.splice(index, 1);
            this.size = this._values.length;
            return true;
        }
        return false;
    };
    Set.prototype.has = function (value) {
        if (this._es6Set != null) {
            return this._es6Set.has(value);
        }
        return this._values.indexOf(value) !== -1;
    };
    Set.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        if (this._es6Set != null) {
            var callbackWrapper = function (value, value2) { return callback.call(thisArg, value, value2, _this); };
            this._es6Set.forEach(callbackWrapper, thisArg);
            return;
        }
        this._values.forEach(function (value) {
            callback.call(thisArg, value, value, _this);
        });
    };
    return Set;
}());
exports.Set = Set;
