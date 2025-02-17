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
var utils_1 = require("../utils");
var abstractMeasurer_1 = require("./abstractMeasurer");
var cacheCharacterMeasurer_1 = require("./cacheCharacterMeasurer");
var CacheMeasurer = (function (_super) {
    __extends(CacheMeasurer, _super);
    function CacheMeasurer(ruler) {
        var _this = _super.call(this, ruler) || this;
        _this.dimCache = new utils_1.Cache(function (s) {
            return _this._measureNotFromCache(s);
        });
        return _this;
    }
    CacheMeasurer.prototype._measureNotFromCache = function (s) {
        return _super.prototype.measure.call(this, s);
    };
    CacheMeasurer.prototype.measure = function (s) {
        if (s === void 0) { s = abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT; }
        return this.dimCache.get(s);
    };
    CacheMeasurer.prototype.reset = function () {
        this.dimCache.clear();
        _super.prototype.reset.call(this);
    };
    return CacheMeasurer;
}(cacheCharacterMeasurer_1.CacheCharacterMeasurer));
exports.CacheMeasurer = CacheMeasurer;
//# sourceMappingURL=cacheMeasurer.js.map