/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var d3 = require("d3");
var nativeMath = (typeof window === "undefined") ? Math : window.Math;
/**
 * Return contrast ratio between two colors
 * Based on implementation from chroma.js by Gregor Aisch (gka) (licensed under BSD)
 * chroma.js may be found here: https://github.com/gka/chroma.js
 * License may be found here: https://github.com/gka/chroma.js/blob/master/LICENSE
 * see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 */
function contrast(a, b) {
    var l1 = luminance(a) + 0.05;
    var l2 = luminance(b) + 0.05;
    return l1 > l2 ? l1 / l2 : l2 / l1;
}
exports.contrast = contrast;
/**
 * Returns a brighter copy of this color. Each channel is multiplied by 0.7 ^ -factor.
 * Channel values are capped at the maximum value of 255, and the minimum value of 30.
 */
function lightenColor(color, factor) {
    var brightened = d3.color(color).brighter(factor);
    return brightened.rgb().toString();
}
exports.lightenColor = lightenColor;
/**
 * Gets the Hex Code of the color resulting by applying the className CSS class to the
 * colorTester selection. Returns null if the tester is transparent.
 *
 * @param {d3.Selection<void>} colorTester The d3 selection to apply the CSS class to
 * @param {string} className The name of the class to be applied
 * @return {string} The hex code of the computed color
 */
function colorTest(colorTester, className) {
    colorTester.classed(className, true);
    // Use regex to get the text inside the rgb parentheses
    var colorStyle = colorTester.style("background-color");
    if (colorStyle === "transparent") {
        return null;
    }
    var rgb = /\((.+)\)/.exec(colorStyle)[1]
        .split(",")
        .map(function (colorValue) {
        var colorNumber = +colorValue;
        var hexValue = colorNumber.toString(16);
        return colorNumber < 16 ? "0" + hexValue : hexValue;
    });
    if (rgb.length === 4 && rgb[3] === "00") {
        return null;
    }
    var hexCode = "#" + rgb.join("");
    colorTester.classed(className, false);
    return hexCode;
}
exports.colorTest = colorTest;
/**
 * Return relative luminance (defined here: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef)
 * Based on implementation from chroma.js by Gregor Aisch (gka) (licensed under BSD)
 * chroma.js may be found here: https://github.com/gka/chroma.js
 * License may be found here: https://github.com/gka/chroma.js/blob/master/LICENSE
 */
function luminance(color) {
    var rgb = d3.rgb(color);
    var lum = function (x) {
        x = x / 255;
        return x <= 0.03928 ? x / 12.92 : nativeMath.pow((x + 0.055) / 1.055, 2.4);
    };
    var r = lum(rgb.r);
    var g = lum(rgb.g);
    var b = lum(rgb.b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
