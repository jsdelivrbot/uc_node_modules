/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var coerceD3_1 = require("../utils/coerceD3");
/**
 * An animator implementation with no animation. The attributes are
 * immediately set on the selection.
 */
var Null = (function () {
    function Null() {
    }
    Null.prototype.totalTime = function (selection) {
        return 0;
    };
    Null.prototype.animate = function (selection, attrToAppliedProjector) {
        selection = coerceD3_1.coerceExternalD3(selection);
        return selection.attrs(attrToAppliedProjector);
    };
    return Null;
}());
exports.Null = Null;
