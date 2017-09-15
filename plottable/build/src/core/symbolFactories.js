/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var d3 = require("d3");
function circle() {
    return function (symbolSize) {
        return d3.symbol().type(d3.symbolCircle).size(Math.PI * Math.pow(symbolSize / 2, 2));
    };
}
exports.circle = circle;
function square() {
    return function (symbolSize) {
        return d3.symbol().type(d3.symbolSquare).size(Math.pow(symbolSize, 2));
    };
}
exports.square = square;
function cross() {
    return function (symbolSize) {
        return d3.symbol().type(d3.symbolCross).size((5 / 9) * Math.pow(symbolSize, 2));
    };
}
exports.cross = cross;
function diamond() {
    return function (symbolSize) {
        return d3.symbol().type(d3.symbolDiamond).size(Math.tan(Math.PI / 6) * Math.pow(symbolSize, 2) / 2);
    };
}
exports.diamond = diamond;
function triangle() {
    return function (symbolSize) {
        return d3.symbol().type(d3.symbolTriangle).size(Math.sqrt(3) * Math.pow(symbolSize / 2, 2));
    };
}
exports.triangle = triangle;
// copied from https://github.com/d3/d3-shape/blob/e2e57722004acba754ed9edff020282682450c5c/src/symbol/star.js#L3
var ka = 0.89081309152928522810;
function star() {
    return function (symbolSize) {
        return d3.symbol().type(d3.symbolStar).size(ka * Math.pow(symbolSize / 2, 2));
    };
}
exports.star = star;
// copied from https://github.com/d3/d3-shape/blob/c35b2303eb4836aba3171642f01c2653e4228b9c/src/symbol/wye.js#L2
var a = ((1 / Math.sqrt(12)) / 2 + 1) * 3;
function wye() {
    return function (symbolSize) {
        return d3.symbol().type(d3.symbolWye).size(a * Math.pow(symbolSize / 2.4, 2));
    };
}
exports.wye = wye;
