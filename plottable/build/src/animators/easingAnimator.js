/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var d3Ease = require("d3-ease");
var coerceD3_1 = require("../utils/coerceD3");
var makeEnum_1 = require("../utils/makeEnum");
var EASE_NAME_MAPPING = {
    linear: d3Ease.easeLinear,
    quad: d3Ease.easeQuad,
    quadIn: d3Ease.easeQuadIn,
    quadOut: d3Ease.easeQuadOut,
    quadInOut: d3Ease.easeQuadInOut,
    cubic: d3Ease.easeCubic,
    cubicIn: d3Ease.easeCubicIn,
    cubicOut: d3Ease.easeCubicOut,
    cubicInOut: d3Ease.easeCubicInOut,
    poly: d3Ease.easePoly,
    polyIn: d3Ease.easePolyIn,
    polyOut: d3Ease.easePolyOut,
    polyInOut: d3Ease.easePolyInOut,
    sin: d3Ease.easeSin,
    sinIn: d3Ease.easeSinIn,
    sinOut: d3Ease.easeSinOut,
    sinInOut: d3Ease.easeSinInOut,
    exp: d3Ease.easeExp,
    expIn: d3Ease.easeExpIn,
    expOut: d3Ease.easeExpOut,
    expInOut: d3Ease.easeExpInOut,
    circle: d3Ease.easeCircle,
    circleIn: d3Ease.easeCircleIn,
    circleOut: d3Ease.easeCircleOut,
    circleInOut: d3Ease.easeCircleInOut,
    bounce: d3Ease.easeBounce,
    bounceIn: d3Ease.easeBounceIn,
    bounceOut: d3Ease.easeBounceOut,
    bounceInOut: d3Ease.easeBounceInOut,
    back: d3Ease.easeBack,
    backIn: d3Ease.easeBackIn,
    backOut: d3Ease.easeBackOut,
    backInOut: d3Ease.easeBackInOut,
    elastic: d3Ease.easeElastic,
    elasticIn: d3Ease.easeElasticIn,
    elasticOut: d3Ease.easeElasticOut,
    elasticInOut: d3Ease.easeElasticInOut,
};
exports.EaseName = makeEnum_1.makeEnum([
    "linear",
    "quad",
    "quadIn",
    "quadOut",
    "quadInOut",
    "cubic",
    "cubicIn",
    "cubicOut",
    "cubicInOut",
    "poly",
    "polyIn",
    "polyOut",
    "polyInOut",
    "sin",
    "sinIn",
    "sinOut",
    "sinInOut",
    "exp",
    "expIn",
    "expOut",
    "expInOut",
    "circle",
    "circleIn",
    "circleOut",
    "circleInOut",
    "bounce",
    "bounceIn",
    "bounceOut",
    "bounceInOut",
    "back",
    "backIn",
    "backOut",
    "backInOut",
    "elastic",
    "elasticIn",
    "elasticOut",
    "elasticInOut",
]);
/**
 * An Animator with easing and configurable durations and delays.
 */
var Easing = (function () {
    /**
     * Constructs the default animator
     *
     * @constructor
     */
    function Easing() {
        this._startDelay = Easing._DEFAULT_START_DELAY_MILLISECONDS;
        this._stepDuration = Easing._DEFAULT_STEP_DURATION_MILLISECONDS;
        this._stepDelay = Easing._DEFAULT_ITERATIVE_DELAY_MILLISECONDS;
        this._maxTotalDuration = Easing._DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS;
        this._easingMode = Easing._DEFAULT_EASING_MODE;
    }
    Easing.prototype.totalTime = function (numberOfSteps) {
        var adjustedIterativeDelay = this._getAdjustedIterativeDelay(numberOfSteps);
        return this.startDelay() + adjustedIterativeDelay * (Math.max(numberOfSteps - 1, 0)) + this.stepDuration();
    };
    Easing.prototype.animate = function (selection, attrToAppliedProjector) {
        var _this = this;
        selection = coerceD3_1.coerceExternalD3(selection);
        var numberOfSteps = selection.size();
        var adjustedIterativeDelay = this._getAdjustedIterativeDelay(numberOfSteps);
        return selection.transition()
            .ease(this._getEaseFactory())
            .duration(this.stepDuration())
            .delay(function (d, i) { return _this.startDelay() + adjustedIterativeDelay * i; })
            .attrs(attrToAppliedProjector);
    };
    Easing.prototype.startDelay = function (startDelay) {
        if (startDelay == null) {
            return this._startDelay;
        }
        else {
            this._startDelay = startDelay;
            return this;
        }
    };
    Easing.prototype.stepDuration = function (stepDuration) {
        if (stepDuration == null) {
            return Math.min(this._stepDuration, this._maxTotalDuration);
        }
        else {
            this._stepDuration = stepDuration;
            return this;
        }
    };
    Easing.prototype.stepDelay = function (stepDelay) {
        if (stepDelay == null) {
            return this._stepDelay;
        }
        else {
            this._stepDelay = stepDelay;
            return this;
        }
    };
    Easing.prototype.maxTotalDuration = function (maxTotalDuration) {
        if (maxTotalDuration == null) {
            return this._maxTotalDuration;
        }
        else {
            this._maxTotalDuration = maxTotalDuration;
            return this;
        }
    };
    Easing.prototype.easingMode = function (easingMode) {
        if (easingMode == null) {
            return this._easingMode;
        }
        else {
            this._easingMode = easingMode;
            return this;
        }
    };
    Easing.prototype._getEaseFactory = function () {
        var ease = this.easingMode();
        if (typeof ease === "string") {
            var maybeEaseFunction = EASE_NAME_MAPPING[ease];
            if (maybeEaseFunction == null) {
                // oops; name is wrong - default to linear instead
                return EASE_NAME_MAPPING["linear"];
            }
            else {
                return maybeEaseFunction;
            }
        }
        else {
            return ease;
        }
    };
    /**
     * Adjust the iterative delay, such that it takes into account the maxTotalDuration constraint
     */
    Easing.prototype._getAdjustedIterativeDelay = function (numberOfSteps) {
        var stepStartTimeInterval = this.maxTotalDuration() - this.stepDuration();
        stepStartTimeInterval = Math.max(stepStartTimeInterval, 0);
        var maxPossibleIterativeDelay = stepStartTimeInterval / Math.max(numberOfSteps - 1, 1);
        return Math.min(this.stepDelay(), maxPossibleIterativeDelay);
    };
    return Easing;
}());
/**
 * The default starting delay of the animation in milliseconds
 */
Easing._DEFAULT_START_DELAY_MILLISECONDS = 0;
/**
 * The default duration of one animation step in milliseconds
 */
Easing._DEFAULT_STEP_DURATION_MILLISECONDS = 300;
/**
 * The default maximum start delay between each step of an animation
 */
Easing._DEFAULT_ITERATIVE_DELAY_MILLISECONDS = 15;
/**
 * The default maximum total animation duration
 */
Easing._DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS = Infinity;
/**
 * The default easing of the animation
 */
Easing._DEFAULT_EASING_MODE = "expOut";
exports.Easing = Easing;
