/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var canvasDrawer_1 = require("./canvasDrawer");
/**
 * A Drawer is a stateful class that holds one SVGDrawer and one CanvasDrawer, and can switch between
 * the two.
 */
var ProxyDrawer = (function () {
    /**
     * A Drawer draws svg elements based on the input Dataset.
     *
     * @constructor
     * @param _svgDrawerFactory A factory that will be invoked to create an SVGDrawer whenever useSVG is called
     * @param _canvasDrawStep The DrawStep to be fed into a new CanvasDrawer whenever useCanvas is called
     */
    function ProxyDrawer(_svgDrawerFactory, _canvasDrawStep) {
        this._svgDrawerFactory = _svgDrawerFactory;
        this._canvasDrawStep = _canvasDrawStep;
    }
    /**
     * Remove the old drawer and use SVG rendering from now on.
     */
    ProxyDrawer.prototype.useSVG = function (parent) {
        if (this._currentDrawer != null) {
            this._currentDrawer.remove();
        }
        var svgDrawer = this._svgDrawerFactory();
        svgDrawer.attachTo(parent);
        this._currentDrawer = svgDrawer;
    };
    /**
     * Remove the old drawer and use Canvas rendering from now on.
     */
    ProxyDrawer.prototype.useCanvas = function (canvas) {
        if (this._currentDrawer != null) {
            this._currentDrawer.remove();
        }
        this._currentDrawer = new canvasDrawer_1.CanvasDrawer(canvas.node().getContext("2d"), this._canvasDrawStep);
    };
    // public for testing
    ProxyDrawer.prototype.getDrawer = function () {
        return this._currentDrawer;
    };
    /**
     * Removes this Drawer's renderArea
     */
    ProxyDrawer.prototype.remove = function () {
        if (this._currentDrawer != null) {
            this._currentDrawer.remove();
        }
    };
    ProxyDrawer.prototype.draw = function (data, drawSteps) {
        this._currentDrawer.draw(data, drawSteps);
    };
    ProxyDrawer.prototype.getVisualPrimitives = function () {
        return this._currentDrawer.getVisualPrimitives();
    };
    ProxyDrawer.prototype.getVisualPrimitiveAtIndex = function (index) {
        return this._currentDrawer.getVisualPrimitiveAtIndex(index);
    };
    return ProxyDrawer;
}());
exports.ProxyDrawer = ProxyDrawer;
