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
var abstractMeasurer_1 = require("./abstractMeasurer");
var Measurer = (function (_super) {
    __extends(Measurer, _super);
    function Measurer(ruler, useGuards) {
        if (useGuards === void 0) { useGuards = false; }
        var _this = _super.call(this, ruler) || this;
        _this.useGuards = useGuards;
        return _this;
    }
    // Guards assures same line height and width of whitespaces on both ends.
    Measurer.prototype._addGuards = function (text) {
        return abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT + text + abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT;
    };
    Measurer.prototype._measureLine = function (line, forceGuards) {
        if (forceGuards === void 0) { forceGuards = false; }
        var useGuards = this.useGuards || forceGuards || /^[\t ]$/.test(line);
        var measuredLine = useGuards ? this._addGuards(line) : line;
        var measuredLineDimensions = _super.prototype.measure.call(this, measuredLine);
        measuredLineDimensions.width -= useGuards ? (2 * this.getGuardWidth()) : 0;
        return measuredLineDimensions;
    };
    Measurer.prototype.measure = function (text) {
        var _this = this;
        if (text === void 0) { text = abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT; }
        if (text.trim() === "") {
            return { width: 0, height: 0 };
        }
        var linesDimensions = text.trim().split("\n").map(function (line) { return _this._measureLine(line); });
        return {
            height: linesDimensions.reduce(function (acc, dim) { return acc + dim.height; }, 0),
            width: linesDimensions.reduce(function (acc, dim) { return Math.max(acc, dim.width); }, 0),
        };
    };
    Measurer.prototype.getGuardWidth = function () {
        if (this.guardWidth == null) {
            this.guardWidth = _super.prototype.measure.call(this).width;
        }
        return this.guardWidth;
    };
    return Measurer;
}(abstractMeasurer_1.AbstractMeasurer));
exports.Measurer = Measurer;
//# sourceMappingURL=measurer.js.map