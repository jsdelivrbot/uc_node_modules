/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var Utils = require("../utils");
var makeEnum_1 = require("../utils/makeEnum");
var RenderPolicies = require("./renderPolicy");
/**
 * The RenderController is responsible for enqueueing and synchronizing
 * layout and render calls for Components.
 *
 * Layout and render calls occur inside an animation callback
 * (window.requestAnimationFrame if available).
 *
 * RenderController.flush() immediately lays out and renders all Components currently enqueued.
 *
 * To always have immediate rendering (useful for debugging), call
 * ```typescript
 * Plottable.RenderController.setRenderPolicy(
 *   new Plottable.RenderPolicies.Immediate()
 * );
 * ```
 */
var _componentsNeedingRender = new Utils.Set();
var _componentsNeedingComputeLayout = new Utils.Set();
var _animationRequested = false;
var _isCurrentlyFlushing = false;
exports.Policy = makeEnum_1.makeEnum(["immediate", "animationFrame", "timeout"]);
var _renderPolicy = new RenderPolicies.AnimationFrame();
function renderPolicy(renderPolicy) {
    if (renderPolicy == null) {
        return _renderPolicy;
    }
    switch (renderPolicy) {
        case exports.Policy.immediate:
            _renderPolicy = new RenderPolicies.Immediate();
            break;
        case exports.Policy.animationFrame:
            _renderPolicy = new RenderPolicies.AnimationFrame();
            break;
        case exports.Policy.timeout:
            _renderPolicy = new RenderPolicies.Timeout();
            break;
        default:
            Utils.Window.warn("Unrecognized renderPolicy: " + renderPolicy);
    }
}
exports.renderPolicy = renderPolicy;
/**
 * Enqueues the Component for rendering.
 *
 * @param {Component} component
 */
function registerToRender(component) {
    if (_isCurrentlyFlushing) {
        Utils.Window.warn("Registered to render while other components are flushing: request may be ignored");
    }
    _componentsNeedingRender.add(component);
    requestRender();
}
exports.registerToRender = registerToRender;
/**
 * Enqueues the Component for layout and rendering.
 *
 * @param {Component} component
 */
function registerToComputeLayoutAndRender(component) {
    _componentsNeedingComputeLayout.add(component);
    _componentsNeedingRender.add(component);
    requestRender();
}
exports.registerToComputeLayoutAndRender = registerToComputeLayoutAndRender;
/**
 * Enqueues the Component for layout and rendering.
 *
 * @param {Component} component
 * @deprecated This method has been renamed to `RenderController.registerToComputeLayoutAndRender()`.
 */
function registerToComputeLayout(component) {
    registerToComputeLayoutAndRender(component);
}
exports.registerToComputeLayout = registerToComputeLayout;
function requestRender() {
    // Only run or enqueue flush on first request.
    if (!_animationRequested) {
        _animationRequested = true;
        _renderPolicy.render();
    }
}
/**
 * Renders all Components waiting to be rendered immediately
 * instead of waiting until the next frame. Flush is idempotent (given there are no intermediate registrations).
 *
 * Useful to call when debugging.
 */
function flush() {
    if (_animationRequested) {
        // Layout
        _componentsNeedingComputeLayout.forEach(function (component) { return component.computeLayout(); });
        // Top level render; Containers will put their children in the toRender queue
        _componentsNeedingRender.forEach(function (component) { return component.render(); });
        _isCurrentlyFlushing = true;
        var failed_1 = new Utils.Set();
        _componentsNeedingRender.forEach(function (component) {
            try {
                component.renderImmediately();
            }
            catch (err) {
                // throw error with timeout to avoid interrupting further renders
                window.setTimeout(function () {
                    throw err;
                }, 0);
                failed_1.add(component);
            }
        });
        _componentsNeedingComputeLayout = new Utils.Set();
        _componentsNeedingRender = failed_1;
        _animationRequested = false;
        _isCurrentlyFlushing = false;
    }
}
exports.flush = flush;
