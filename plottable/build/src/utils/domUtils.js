/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var d3 = require("d3");
var nativeMath = (typeof window === "undefined") ? Math : window.Math;
/**
 * Returns whether the child is in fact a child of the parent
 */
function contains(parent, child) {
    var maybeParent = child;
    while (maybeParent != null && maybeParent !== parent) {
        maybeParent = maybeParent.parentNode;
    }
    return maybeParent === parent;
}
exports.contains = contains;
/**
 * Gets the bounding box of an element.
 * @param {d3.Selection} element
 * @returns {SVGRed} The bounding box.
 */
function elementBBox(element) {
    var bbox;
    // HACKHACK: Firefox won't correctly measure nodes with style "display: none" or their descendents (FF Bug 612118).
    try {
        bbox = element.node().getBBox();
    }
    catch (err) {
        bbox = { x: 0, y: 0, width: 0, height: 0 };
    }
    return bbox;
}
exports.elementBBox = elementBBox;
/**
 * Screen refresh rate which is assumed to be 60fps
 */
exports.SCREEN_REFRESH_RATE_MILLISECONDS = 1000 / 60;
/**
 * Polyfill for `window.requestAnimationFrame`.
 * If the function exists, then we use the function directly.
 * Otherwise, we set a timeout on `SCREEN_REFRESH_RATE_MILLISECONDS` and then perform the function.
 *
 * @param {() => void} callback The callback to call in the next animation frame
 */
function requestAnimationFramePolyfill(callback) {
    if (typeof window !== "undefined") {
        if (window.requestAnimationFrame != null) {
            window.requestAnimationFrame(callback);
        }
        else {
            setTimeout(callback, exports.SCREEN_REFRESH_RATE_MILLISECONDS);
        }
    }
}
exports.requestAnimationFramePolyfill = requestAnimationFramePolyfill;
/**
 * Calculates the width of the element.
 * The width includes the padding and the border on the element's left and right sides.
 *
 * @param {Element} element The element to query
 * @returns {number} The width of the element.
 */
function elementWidth(elementOrSelection) {
    var element = elementOrSelection instanceof d3.selection
        ? elementOrSelection.node()
        : elementOrSelection;
    var style = window.getComputedStyle(element);
    return _parseStyleValue(style, "width")
        + _parseStyleValue(style, "padding-left")
        + _parseStyleValue(style, "padding-right")
        + _parseStyleValue(style, "border-left-width")
        + _parseStyleValue(style, "border-right-width");
}
exports.elementWidth = elementWidth;
/**
 * Calculates the height of the element.
 * The height includes the padding the and the border on the element's top and bottom sides.
 *
 * @param {Element} element The element to query
 * @returns {number} The height of the element
 */
function elementHeight(elementOrSelection) {
    var element = elementOrSelection instanceof d3.selection
        ? elementOrSelection.node()
        : elementOrSelection;
    var style = window.getComputedStyle(element);
    return _parseStyleValue(style, "height")
        + _parseStyleValue(style, "padding-top")
        + _parseStyleValue(style, "padding-bottom")
        + _parseStyleValue(style, "border-top-width")
        + _parseStyleValue(style, "border-bottom-width");
}
exports.elementHeight = elementHeight;
// taken from the BNF at https://www.w3.org/TR/SVG/coords.html
var WSP = "\\s";
var NUMBER = "(?:[-+]?[0-9]*\\.?[0-9]+)";
var COMMA_WSP = "(?:(?:" + WSP + "+,?" + WSP + "*)|(?:," + WSP + "*))";
var TRANSLATE_REGEX = new RegExp("translate" + WSP + "*\\(" + WSP + "*(" + NUMBER + ")(?:" + COMMA_WSP + "(" + NUMBER + "))?" + WSP + "*\\)");
var ROTATE_REGEX = new RegExp("rotate" + WSP + "*\\(" + WSP + "*(" + NUMBER + ")" + WSP + "*\\)");
var SCALE_REGEX = new RegExp("scale" + WSP + "*\\(" + WSP + "*(" + NUMBER + ")(?:" + COMMA_WSP + "(" + NUMBER + "))?" + WSP + "*\\)");
/**
 * Accepts selections whose .transform contain a "translate(a, b)" and extracts the a and b
 */
function getTranslateValues(el) {
    var match = TRANSLATE_REGEX.exec(el.attr("transform"));
    if (match != null) {
        var translateX = match[1], _a = match[2], translateY = _a === void 0 ? 0 : _a;
        return [+translateX, +translateY];
    }
    else {
        return [0, 0];
    }
}
exports.getTranslateValues = getTranslateValues;
/**
 * Accepts selections whose .transform contain a "rotate(angle)" and returns the angle
 */
function getRotate(el) {
    var match = ROTATE_REGEX.exec(el.attr("transform"));
    if (match != null) {
        var rotation = match[1];
        return +rotation;
    }
    else {
        return 0;
    }
}
exports.getRotate = getRotate;
function getScaleValues(el) {
    var match = SCALE_REGEX.exec(el.attr("transform"));
    if (match != null) {
        var scaleX = match[1], scaleY = match[2];
        return [+scaleX, scaleY == null ? +scaleX : +scaleY];
    }
    else {
        return [0, 0];
    }
}
exports.getScaleValues = getScaleValues;
/**
 * Checks if the first ClientRect overlaps the second.
 *
 * @param {ClientRect} clientRectA The first ClientRect
 * @param {ClientRect} clientRectB The second ClientRect
 * @returns {boolean} If the ClientRects overlap each other.
 */
function clientRectsOverlap(clientRectA, clientRectB) {
    if (nativeMath.floor(clientRectA.right) <= nativeMath.ceil(clientRectB.left)) {
        return false;
    }
    if (nativeMath.ceil(clientRectA.left) >= nativeMath.floor(clientRectB.right)) {
        return false;
    }
    if (nativeMath.floor(clientRectA.bottom) <= nativeMath.ceil(clientRectB.top)) {
        return false;
    }
    if (nativeMath.ceil(clientRectA.top) >= nativeMath.floor(clientRectB.bottom)) {
        return false;
    }
    return true;
}
exports.clientRectsOverlap = clientRectsOverlap;
/**
 * Return a new ClientRect that is the old ClientRect expanded by amount in all directions.
 * @param rect
 * @param amount
 */
function expandRect(rect, amount) {
    return {
        left: rect.left - amount,
        top: rect.top - amount,
        right: rect.right + amount,
        bottom: rect.bottom + amount,
        width: rect.width + amount * 2,
        height: rect.height + amount * 2,
    };
}
exports.expandRect = expandRect;
/**
 * Returns true if and only if innerClientRect is inside outerClientRect.
 *
 * @param {ClientRect} innerClientRect The first ClientRect
 * @param {ClientRect} outerClientRect The second ClientRect
 * @returns {boolean} If and only if the innerClientRect is inside outerClientRect.
 */
function clientRectInside(innerClientRect, outerClientRect) {
    return (nativeMath.floor(outerClientRect.left) <= nativeMath.ceil(innerClientRect.left) &&
        nativeMath.floor(outerClientRect.top) <= nativeMath.ceil(innerClientRect.top) &&
        nativeMath.floor(innerClientRect.right) <= nativeMath.ceil(outerClientRect.right) &&
        nativeMath.floor(innerClientRect.bottom) <= nativeMath.ceil(outerClientRect.bottom));
}
exports.clientRectInside = clientRectInside;
/**
 * Returns true if the supplied coordinates or Ranges intersect or are contained by bbox.
 *
 * @param {number | Range} xValOrRange The x coordinate or Range to test
 * @param {number | Range} yValOrRange The y coordinate or Range to test
 * @param {SVGRect} bbox The bbox
 * @param {number} tolerance Amount by which to expand bbox, in each dimension, before
 * testing intersection
 *
 * @returns {boolean} True if the supplied coordinates or Ranges intersect or are
 * contained by bbox, false otherwise.
 */
function intersectsBBox(xValOrRange, yValOrRange, bbox, tolerance) {
    if (tolerance === void 0) { tolerance = 0.5; }
    var xRange = _parseRange(xValOrRange);
    var yRange = _parseRange(yValOrRange);
    // SVGRects are positioned with sub-pixel accuracy (the default unit
    // for the x, y, height & width attributes), but user selections (e.g. via
    // mouse events) usually have pixel accuracy. A tolerance of half-a-pixel
    // seems appropriate.
    return bbox.x + bbox.width >= xRange.min - tolerance &&
        bbox.x <= xRange.max + tolerance &&
        bbox.y + bbox.height >= yRange.min - tolerance &&
        bbox.y <= yRange.max + tolerance;
}
exports.intersectsBBox = intersectsBBox;
/**
 * Create a Range from a number or an object with "min" and "max" defined.
 *
 * @param {any} input The object to parse
 *
 * @returns {Range} The generated Range
 */
function _parseRange(input) {
    if (typeof (input) === "number") {
        var value = input;
        return { min: value, max: value };
    }
    var range = input;
    if (range instanceof Object && "min" in range && "max" in range) {
        return range;
    }
    throw new Error("input '" + input + "' can't be parsed as an Range");
}
function _parseStyleValue(style, property) {
    var value = style.getPropertyValue(property);
    var parsedValue = parseFloat(value);
    return parsedValue || 0;
}
