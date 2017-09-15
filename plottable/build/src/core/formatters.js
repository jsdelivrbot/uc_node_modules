/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var d3 = require("d3");
/**
 * Creates a formatter for currency values.
 *
 * @param {number} [precision] The number of decimal places to show (default 2).
 * @param {string} [symbol] The currency symbol to use (default "$").
 * @param {boolean} [prefix] Whether to prepend or append the currency symbol (default true).
 *
 * @returns {Formatter} A formatter for currency values.
 */
function currency(precision, symbol, prefix) {
    if (precision === void 0) { precision = 2; }
    if (symbol === void 0) { symbol = "$"; }
    if (prefix === void 0) { prefix = true; }
    var fixedFormatter = fixed(precision);
    return function (d) {
        var formattedValue = fixedFormatter(Math.abs(d));
        if (formattedValue !== "") {
            if (prefix) {
                formattedValue = symbol + formattedValue;
            }
            else {
                formattedValue += symbol;
            }
            if (d < 0) {
                formattedValue = "-" + formattedValue;
            }
        }
        return formattedValue;
    };
}
exports.currency = currency;
/**
 * Creates a formatter that displays exactly [precision] decimal places.
 *
 * @param {number} [precision] The number of decimal places to show (default 3).
 *
 * @returns {Formatter} A formatter that displays exactly [precision] decimal places.
 */
function fixed(precision) {
    if (precision === void 0) { precision = 3; }
    verifyPrecision(precision);
    return function (d) { return d.toFixed(precision); };
}
exports.fixed = fixed;
/**
 * Creates a formatter that formats numbers to show no more than
 * [maxNumberOfDecimalPlaces] decimal places. All other values are stringified.
 *
 * @param {number} [maxNumberOfDecimalPlaces] The number of decimal places to show (default 3).
 *
 * @returns {Formatter} A formatter for general values.
 */
function general(maxNumberOfDecimalPlaces) {
    if (maxNumberOfDecimalPlaces === void 0) { maxNumberOfDecimalPlaces = 3; }
    verifyPrecision(maxNumberOfDecimalPlaces);
    return function (d) {
        if (typeof d === "number") {
            var multiplier = Math.pow(10, maxNumberOfDecimalPlaces);
            return String(Math.round(d * multiplier) / multiplier);
        }
        else {
            return String(d);
        }
    };
}
exports.general = general;
/**
 * Creates a formatter that stringifies its input.
 *
 * @returns {Formatter} A formatter that stringifies its input.
 */
function identity() {
    return function (d) { return String(d); };
}
exports.identity = identity;
/**
 * Creates a formatter for percentage values.
 * Multiplies the input by 100 and appends "%".
 *
 * @param {number} [precision] The number of decimal places to show (default 0).
 *
 * @returns {Formatter} A formatter for percentage values.
 */
function percentage(precision) {
    if (precision === void 0) { precision = 0; }
    var fixedFormatter = fixed(precision);
    return function (d) {
        var valToFormat = d * 100;
        // Account for float imprecision
        var valString = d.toString();
        var integerPowerTen = Math.pow(10, valString.length - (valString.indexOf(".") + 1));
        valToFormat = parseInt((valToFormat * integerPowerTen).toString(), 10) / integerPowerTen;
        return fixedFormatter(valToFormat) + "%";
    };
}
exports.percentage = percentage;
/**
 * Creates a formatter for values that displays [numberOfSignificantFigures] significant figures
 * and puts SI notation.
 *
 * @param {number} [numberOfSignificantFigures] The number of significant figures to show (default 3).
 *
 * @returns {Formatter} A formatter for SI values.
 */
function siSuffix(numberOfSignificantFigures) {
    if (numberOfSignificantFigures === void 0) { numberOfSignificantFigures = 3; }
    verifyPrecision(numberOfSignificantFigures);
    return function (d) { return d3.format("." + numberOfSignificantFigures + "s")(d); };
}
exports.siSuffix = siSuffix;
/**
 * Creates a formatter for values that displays abbreviated values
 * and uses standard short scale suffixes
 * - K - thousands - 10 ^ 3
 * - M - millions - 10 ^ 6
 * - B - billions - 10 ^ 9
 * - T - trillions - 10 ^ 12
 * - Q - quadrillions - 10 ^ 15
 *
 * Numbers with a magnitude outside of (10 ^ (-precision), 10 ^ 15) are shown using
 * scientific notation to avoid creating extremely long decimal strings.
 *
 * @param {number} [precision] the number of decimal places to show (default 3)
 * @returns {Formatter} A formatter with short scale formatting
 */
function shortScale(precision) {
    if (precision === void 0) { precision = 3; }
    verifyPrecision(precision);
    var suffixes = "KMBTQ";
    var exponentFormatter = d3.format("." + precision + "e");
    var fixedFormatter = d3.format("." + precision + "f");
    var max = Math.pow(10, (3 * (suffixes.length + 1)));
    var min = Math.pow(10, -precision);
    return function (num) {
        var absNum = Math.abs(num);
        if ((absNum < min || absNum >= max) && absNum !== 0) {
            return exponentFormatter(num);
        }
        var idx = -1;
        while (absNum >= Math.pow(1000, idx + 2) && idx < (suffixes.length - 1)) {
            idx++;
        }
        var output = "";
        if (idx === -1) {
            output = fixedFormatter(num);
        }
        else {
            output = fixedFormatter(num / Math.pow(1000, idx + 1)) + suffixes[idx];
        }
        // catch rounding by the underlying d3 formatter
        if ((num > 0 && output.substr(0, 4) === "1000") || (num < 0 && output.substr(0, 5) === "-1000")) {
            if (idx < suffixes.length - 1) {
                idx++;
                output = fixedFormatter(num / Math.pow(1000, idx + 1)) + suffixes[idx];
            }
            else {
                output = exponentFormatter(num);
            }
        }
        return output;
    };
}
exports.shortScale = shortScale;
/**
 * Creates a multi time formatter that displays dates.
 *
 * @returns {Formatter} A formatter for time/date values.
 */
function multiTime() {
    // Formatter tiers going from shortest time scale to largest - these were taken from d3
    // https://github.com/mbostock/d3/wiki/Time-Formatting#format_multi
    var candidateFormats = [
        {
            specifier: ".%L",
            predicate: function (d) { return d.getMilliseconds() !== 0; },
        },
        {
            specifier: ":%S",
            predicate: function (d) { return d.getSeconds() !== 0; },
        },
        {
            specifier: "%I:%M",
            predicate: function (d) { return d.getMinutes() !== 0; },
        },
        {
            specifier: "%I %p",
            predicate: function (d) { return d.getHours() !== 0; },
        },
        {
            specifier: "%a %d",
            predicate: function (d) { return d.getDay() !== 0 && d.getDate() !== 1; },
        },
        {
            specifier: "%b %d",
            predicate: function (d) { return d.getDate() !== 1; },
        },
        {
            specifier: "%b",
            predicate: function (d) { return d.getMonth() !== 0; },
        },
    ];
    return function (d) {
        var acceptableFormats = candidateFormats.filter(function (candidate) { return candidate.predicate(d); });
        var specifier = acceptableFormats.length > 0
            ? acceptableFormats[0].specifier
            : "%Y";
        return d3.timeFormat(specifier)(d);
    };
}
exports.multiTime = multiTime;
/**
 * Creates a time formatter that displays time/date using given specifier.
 *
 * List of directives can be found on: https://github.com/mbostock/d3/wiki/Time-Formatting#format
 *
 * @param {string} [specifier] The specifier for the formatter.
 *
 * @returns {Formatter} A formatter for time/date values.
 */
function time(specifier) {
    return d3.timeFormat(specifier);
}
exports.time = time;
function verifyPrecision(precision) {
    if (precision < 0 || precision > 20) {
        throw new RangeError("Formatter precision must be between 0 and 20");
    }
    if (precision !== Math.floor(precision)) {
        throw new RangeError("Formatter precision must be an integer");
    }
}
