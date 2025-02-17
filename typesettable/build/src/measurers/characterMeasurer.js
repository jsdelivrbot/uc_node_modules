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
var measurer_1 = require("./measurer");
var CharacterMeasurer = (function (_super) {
    __extends(CharacterMeasurer, _super);
    function CharacterMeasurer() {
        return _super.apply(this, arguments) || this;
    }
    CharacterMeasurer.prototype._measureCharacter = function (c) {
        return _super.prototype._measureLine.call(this, c);
    };
    CharacterMeasurer.prototype._measureLine = function (line) {
        var _this = this;
        var charactersDimensions = line.split("").map(function (c) { return _this._measureCharacter(c); });
        return {
            height: charactersDimensions.reduce(function (acc, dim) { return Math.max(acc, dim.height); }, 0),
            width: charactersDimensions.reduce(function (acc, dim) { return acc + dim.width; }, 0),
        };
    };
    return CharacterMeasurer;
}(measurer_1.Measurer));
exports.CharacterMeasurer = CharacterMeasurer;
//# sourceMappingURL=characterMeasurer.js.map