/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var Utils = require("../utils");
var RenderController = require("./renderController");
/**
 * Renders Components immediately after they are enqueued.
 * Useful for debugging, horrible for performance.
 */
var Immediate = (function () {
    function Immediate() {
    }
    Immediate.prototype.render = function () {
        RenderController.flush();
    };
    return Immediate;
}());
exports.Immediate = Immediate;
/**
 * The default way to render, which only tries to render every frame
 * (usually, 1/60th of a second).
 */
var AnimationFrame = (function () {
    function AnimationFrame() {
    }
    AnimationFrame.prototype.render = function () {
        Utils.DOM.requestAnimationFramePolyfill(RenderController.flush);
    };
    return AnimationFrame;
}());
exports.AnimationFrame = AnimationFrame;
/**
 * Renders with `setTimeout()`.
 * Generally an inferior way to render compared to `requestAnimationFrame`,
 * but useful for browsers that don't suppoort `requestAnimationFrame`.
 */
var Timeout = (function () {
    function Timeout() {
        this._timeoutMsec = Utils.DOM.SCREEN_REFRESH_RATE_MILLISECONDS;
    }
    Timeout.prototype.render = function () {
        setTimeout(RenderController.flush, this._timeoutMsec);
    };
    return Timeout;
}());
exports.Timeout = Timeout;
