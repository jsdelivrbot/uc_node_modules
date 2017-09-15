/**
 * Copyright 2017-present Palantir Technologies
 * @license MIT
 */
"use strict";
/**
 * This class keeps track of bucketing state while collapsing dense line
 * geometry in a line and area plots.
 */
var Bucket = (function () {
    function Bucket(index, xValue, yValue) {
        this.entryIndex = index;
        this.exitIndex = index;
        this.minIndex = index;
        this.maxIndex = index;
        this.bucketValue = xValue;
        this.minValue = yValue;
        this.maxValue = yValue;
    }
    Bucket.prototype.isInBucket = function (value) {
        return value == this.bucketValue;
    };
    Bucket.prototype.addToBucket = function (value, index) {
        if (value < this.minValue) {
            this.minValue = value;
            this.minIndex = index;
        }
        if (value > this.maxValue) {
            this.maxValue = value;
            this.maxIndex = index;
        }
        this.exitIndex = index;
    };
    Bucket.prototype.getUniqueIndices = function () {
        var idxs = [this.entryIndex, this.maxIndex, this.minIndex, this.exitIndex];
        return idxs.filter(function (idx, i) { return i == 0 || idx != idxs[i - 1]; });
    };
    return Bucket;
}());
exports.Bucket = Bucket;
