/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var writers_1 = require("../writers");
var DEFAULT_FILL_COLOR = "#444";
/**
 * A typesetter context for HTML5 Canvas.
 *
 * Due to the Canvas API, you must explicitly define the line height, and any
 * styling for the font must also be explicitly defined in the optional
 * `ICanvasFontStyle` object.
 */
var CanvasContext = (function () {
    function CanvasContext(ctx, lineHeight, style) {
        if (lineHeight === void 0) { lineHeight = 10; }
        if (style === void 0) { style = {}; }
        var _this = this;
        this.ctx = ctx;
        this.lineHeight = lineHeight;
        this.style = style;
        this.createRuler = function () {
            return function (text) {
                _this.ctx.font = _this.style.font;
                var width = _this.ctx.measureText(text).width;
                return { width: width, height: _this.lineHeight };
            };
        };
        this.createPen = function (_text, transform, ctx) {
            if (ctx == null) {
                ctx = _this.ctx;
            }
            ctx.save();
            ctx.translate(transform.translate[0], transform.translate[1]);
            ctx.rotate(transform.rotate * Math.PI / 180.0);
            return _this.createCanvasPen(ctx);
        };
        if (this.style.fill === undefined) {
            this.style.fill = DEFAULT_FILL_COLOR;
        }
    }
    CanvasContext.prototype.createCanvasPen = function (ctx) {
        var _this = this;
        return {
            destroy: function () {
                ctx.restore();
            },
            write: function (line, width, xAlign, xOffset, yOffset) {
                xOffset += width * writers_1.Writer.XOffsetFactor[xAlign];
                ctx.textAlign = xAlign;
                if (_this.style.font != null) {
                    ctx.font = _this.style.font;
                }
                if (_this.style.fill != null) {
                    ctx.fillStyle = _this.style.fill;
                    ctx.fillText(line, xOffset, yOffset);
                }
                if (_this.style.stroke != null) {
                    ctx.strokeStyle = _this.style.fill;
                    ctx.strokeText(line, xOffset, yOffset);
                }
            },
        };
    };
    return CanvasContext;
}());
exports.CanvasContext = CanvasContext;
//# sourceMappingURL=canvas.js.map