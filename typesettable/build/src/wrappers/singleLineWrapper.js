/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wrapper_1 = require("./wrapper");
var SingleLineWrapper = (function (_super) {
    __extends(SingleLineWrapper, _super);
    function SingleLineWrapper() {
        return _super.apply(this, arguments) || this;
    }
    SingleLineWrapper.prototype.wrap = function (text, measurer, width, height) {
        var _this = this;
        if (height === void 0) { height = Infinity; }
        var lines = text.split("\n");
        if (lines.length > 1) {
            throw new Error("SingleLineWrapper is designed to work only on single line");
        }
        var wrapFN = function (w) { return _super.prototype.wrap.call(_this, text, measurer, w, height); };
        var result = wrapFN(width);
        if (result.noLines < 2) {
            return result;
        }
        var left = 0;
        var right = width;
        for (var i = 0; i < SingleLineWrapper.NO_WRAP_ITERATIONS && right > left; ++i) {
            var currentWidth = (right + left) / 2;
            var currentResult = wrapFN(currentWidth);
            if (this.areSameResults(result, currentResult)) {
                right = currentWidth;
                result = currentResult;
            }
            else {
                left = currentWidth;
            }
        }
        return result;
    };
    SingleLineWrapper.prototype.areSameResults = function (one, two) {
        return one.noLines === two.noLines && one.truncatedText === two.truncatedText;
    };
    return SingleLineWrapper;
}(wrapper_1.Wrapper));
SingleLineWrapper.NO_WRAP_ITERATIONS = 5;
exports.SingleLineWrapper = SingleLineWrapper;
//# sourceMappingURL=singleLineWrapper.js.map