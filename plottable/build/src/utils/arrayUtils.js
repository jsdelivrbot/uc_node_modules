/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var d3 = require("d3");
var nativeArray = (typeof window === "undefined") ? Array : window.Array;
/**
 * Takes two arrays of numbers and adds them together
 *
 * @param {number[]} aList The first array of numbers
 * @param {number[]} bList The second array of numbers
 * @return {number[]} An array of numbers where x[i] = aList[i] + bList[i]
 */
function add(aList, bList) {
    if (aList.length !== bList.length) {
        throw new Error("attempted to add arrays of unequal length");
    }
    return aList.map(function (_, i) { return aList[i] + bList[i]; });
}
exports.add = add;
/**
 * Take an array of values, and return the unique values.
 * Will work iff ∀ a, b, a.toString() == b.toString() => a == b; will break on Object inputs
 *
 * @param {T[]} values The values to find uniqueness for
 * @return {T[]} The unique values
 */
function uniq(arr) {
    var seen = d3.set();
    var result = [];
    arr.forEach(function (x) {
        if (!seen.has(String(x))) {
            seen.add(String(x));
            result.push(x);
        }
    });
    return result;
}
exports.uniq = uniq;
/**
 * @param {T[][]} a The 2D array that will have its elements joined together.
 * @return {T[]} Every array in a, concatenated together in the order they appear.
 */
function flatten(a) {
    return nativeArray.prototype.concat.apply([], a);
}
exports.flatten = flatten;
/**
 * Creates an array of length `count`, filled with value or (if value is a function), value()
 *
 * @param {T | ((index?: number) => T)} value The value to fill the array with or a value generator (called with index as arg)
 * @param {number} count The length of the array to generate
 * @return {any[]}
 */
function createFilledArray(value, count) {
    var out = [];
    for (var i = 0; i < count; i++) {
        out[i] = typeof (value) === "function" ? value(i) : value;
    }
    return out;
}
exports.createFilledArray = createFilledArray;
