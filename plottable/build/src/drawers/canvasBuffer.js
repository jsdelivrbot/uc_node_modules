/**
 * Copyright 2017-present Palantir Technologies
 * @license MIT
 */
"use strict";
var CanvasBuffer = (function () {
    function CanvasBuffer(screenWidth, screenHeight, devicePixelRatio) {
        if (devicePixelRatio === void 0) { devicePixelRatio = (typeof window === "undefined" ? 1 : window.devicePixelRatio); }
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.devicePixelRatio = devicePixelRatio;
        this.pixelWidth = screenWidth * devicePixelRatio;
        this.pixelHeight = screenHeight * devicePixelRatio;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        CanvasBuffer.sizePixels(this.ctx, screenWidth, screenHeight, devicePixelRatio);
    }
    /**
     * Resizes the canvas' internal pixel buffer to match the devicePixelRatio
     */
    CanvasBuffer.sizePixels = function (ctx, screenWidth, screenHeight, devicePixelRatio) {
        var canvas = ctx.canvas;
        canvas.width = screenWidth * devicePixelRatio;
        canvas.height = screenHeight * devicePixelRatio;
        canvas.style.width = screenWidth + "px";
        canvas.style.height = screenHeight + "px";
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    CanvasBuffer.prototype.blit = function (ctx, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        ctx.drawImage(this.canvas, x, y, this.screenWidth, this.screenHeight);
    };
    CanvasBuffer.prototype.blitCenter = function (ctx, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.blit(ctx, Math.floor(x - this.screenWidth / 2), Math.floor(y - this.screenHeight / 2));
    };
    /**
     * Changes the size of the underlying canvas in screen space, respecting the
     * current devicePixelRatio.
     *
     * @param center - optionally enable a translate transformation moving the
     *                 origin to the center of the canvas.
     */
    CanvasBuffer.prototype.resize = function (screenWidth, screenHeight, center) {
        if (center === void 0) { center = false; }
        var devicePixelRatio = this.devicePixelRatio;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.pixelWidth = screenWidth * devicePixelRatio;
        this.pixelHeight = screenHeight * devicePixelRatio;
        CanvasBuffer.sizePixels(this.ctx, screenWidth, screenHeight, devicePixelRatio);
        if (center) {
            this.ctx.translate(screenWidth / 2, screenWidth / 2);
        }
        return this;
    };
    /**
     * Temporarily resets the current context transformation and fills the
     * entire canvas with the provided color. If no color is provided, the
     * canvas is cleared instead.
     */
    CanvasBuffer.prototype.clear = function (color) {
        var _a = this, pixelWidth = _a.pixelWidth, pixelHeight = _a.pixelHeight, ctx = _a.ctx;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (color == null) {
            ctx.clearRect(0, 0, pixelWidth, pixelHeight);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, pixelWidth, pixelHeight);
        }
        ctx.restore();
        return this;
    };
    CanvasBuffer.prototype.getImageData = function () {
        return this.ctx.getImageData(0, 0, this.pixelWidth, this.pixelHeight);
    };
    return CanvasBuffer;
}());
exports.CanvasBuffer = CanvasBuffer;
