/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var Utils = require("../utils");
/**
 * Creates a TickGenerator using the specified interval.
 *
 * Generates ticks at multiples of the interval while also including the domain boundaries.
 *
 * @param {number} interval
 * @returns {TickGenerator}
 */
function intervalTickGenerator(interval) {
    if (interval <= 0) {
        throw new Error("interval must be positive number");
    }
    return function (s) {
        var domain = s.domain();
        var low = Math.min(domain[0], domain[1]);
        var high = Math.max(domain[0], domain[1]);
        var firstTick = Math.ceil(low / interval) * interval;
        var numTicks = Math.floor((high - firstTick) / interval) + 1;
        var lowTicks = low % interval === 0 ? [] : [low];
        var middleTicks = Utils.Math.range(0, numTicks).map(function (t) { return firstTick + t * interval; });
        var highTicks = high % interval === 0 ? [] : [high];
        return lowTicks.concat(middleTicks).concat(highTicks);
    };
}
exports.intervalTickGenerator = intervalTickGenerator;
/**
 * Creates a TickGenerator returns only integer tick values.
 *
 * @returns {TickGenerator}
 */
function integerTickGenerator() {
    return function (s) {
        var defaultTicks = s.defaultTicks();
        return defaultTicks.filter(function (tick, i) { return (tick % 1 === 0) || (i === 0) || (i === defaultTicks.length - 1); });
    };
}
exports.integerTickGenerator = integerTickGenerator;
