/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var Methods = (function () {
    function Methods() {
    }
    /**
     * Check if two arrays are equal by strict equality.
     */
    Methods.arrayEq = function (a, b) {
        // Technically, null and undefined are arrays too
        if (a == null || b == null) {
            return a === b;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * @param {any} a Object to check against b for equality.
     * @param {any} b Object to check against a for equality.
     *
     * @returns {boolean} whether or not two objects share the same keys, and
     *          values associated with those keys. Values will be compared
     *          with ===.
     */
    Methods.objEq = function (a, b) {
        if (a == null || b == null) {
            return a === b;
        }
        var keysA = Object.keys(a).sort();
        var keysB = Object.keys(b).sort();
        var valuesA = keysA.map(function (k) { return a[k]; });
        var valuesB = keysB.map(function (k) { return b[k]; });
        return Methods.arrayEq(keysA, keysB) && Methods.arrayEq(valuesA, valuesB);
    };
    Methods.strictEq = function (a, b) {
        return a === b;
    };
    /**
     * Shim for _.defaults
     */
    Methods.defaults = function (target) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        if (target == null) {
            throw new TypeError("Cannot convert undefined or null to object");
        }
        var result = Object(target);
        objects.forEach(function (obj) {
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        result[key] = obj[key];
                    }
                }
            }
        });
        return result;
    };
    return Methods;
}());
exports.Methods = Methods;
//# sourceMappingURL=methods.js.map