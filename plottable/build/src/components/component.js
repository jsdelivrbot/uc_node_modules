/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var d3 = require("d3");
var RenderController = require("../core/renderController");
var Utils = require("../utils");
var coerceD3_1 = require("../utils/coerceD3");
var makeEnum_1 = require("../utils/makeEnum");
exports.XAlignment = makeEnum_1.makeEnum(["left", "center", "right"]);
exports.YAlignment = makeEnum_1.makeEnum(["top", "center", "bottom"]);
/**
 * Components are the core logical units that build Plottable visualizations.
 *
 * This class deals with Component lifecycle (anchoring, getting a size, and rendering
 * infrastructure), as well as building the framework of DOM elements for all Components.
 */
var Component = (function () {
    function Component() {
        /**
         * Subclasses should set this to true in their constructor to prevent content from overflowing.
         */
        this._overflowHidden = false;
        /**
         * Origin of this Component relative to its parent.
         */
        this._origin = { x: 0, y: 0 };
        this._xAlignment = "left";
        this._yAlignment = "top";
        this._isSetup = false;
        this._isAnchored = false;
        this._cssClasses = new Utils.Set();
        /**
         * If .destroy() has been called on this Component.
         */
        this._destroyed = false;
        this._onAnchorCallbacks = new Utils.CallbackSet();
        this._onDetachCallbacks = new Utils.CallbackSet();
        this._cssClasses.add("component");
    }
    /**
     * Attaches the Component as a child of a given d3 Selection.
     *
     * @param {d3.Selection} selection.
     * @returns {Component} The calling Component.
     */
    Component.prototype.anchor = function (selection) {
        selection = coerceD3_1.coerceExternalD3(selection);
        if (this._destroyed) {
            throw new Error("Can't reuse destroy()-ed Components!");
        }
        if (this.isRoot()) {
            this._rootElement = selection;
            // rootElement gets the "plottable" CSS class
            this._rootElement.classed("plottable", true);
        }
        if (this._element != null) {
            // reattach existing element
            selection.node().appendChild(this._element.node());
        }
        else {
            this._element = selection.append("div");
            this._setup();
        }
        this._isAnchored = true;
        this._onAnchorCallbacks.callCallbacks(this);
        return this;
    };
    /**
     * Adds a callback to be called on anchoring the Component to the DOM.
     * If the Component is already anchored, the callback is called immediately.
     *
     * @param {ComponentCallback} callback
     * @return {Component}
     */
    Component.prototype.onAnchor = function (callback) {
        if (this._isAnchored) {
            callback(this);
        }
        this._onAnchorCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback that would be called on anchoring the Component to the DOM.
     * The callback is identified by reference equality.
     *
     * @param {ComponentCallback} callback
     * @return {Component}
     */
    Component.prototype.offAnchor = function (callback) {
        this._onAnchorCallbacks.delete(callback);
        return this;
    };
    /**
     * Creates additional elements as necessary for the Component to function.
     * Called during anchor() if the Component's element has not been created yet.
     * Override in subclasses to provide additional functionality.
     */
    Component.prototype._setup = function () {
        var _this = this;
        if (this._isSetup) {
            return;
        }
        this._cssClasses.forEach(function (cssClass) {
            _this._element.classed(cssClass, true);
        });
        this._cssClasses = new Utils.Set();
        this._backgroundContainer = this._element.append("svg").classed("background-container", true);
        this._content = this._element.append("svg").classed("content", true);
        this._foregroundContainer = this._element.append("svg").classed("foreground-container", true);
        if (this._overflowHidden) {
            this._content.classed("component-overflow-hidden", true);
        }
        else {
            this._content.classed("component-overflow-visible", true);
        }
        this._isSetup = true;
    };
    /**
     * Given available space in pixels, returns the minimum width and height this Component will need.
     *
     * @param {number} availableWidth
     * @param {number} availableHeight
     * @returns {SpaceRequest}
     */
    Component.prototype.requestedSpace = function (availableWidth, availableHeight) {
        return {
            minWidth: 0,
            minHeight: 0,
        };
    };
    /**
     * Computes and sets the size, position, and alignment of the Component from the specified values.
     * If no parameters are supplied and the Component is a root node,
     * they are inferred from the size of the Component's element.
     *
     * @param {Point} [origin] Origin of the space offered to the Component.
     * @param {number} [availableWidth] Available width in pixels.
     * @param {number} [availableHeight] Available height in pixels.
     * @returns {Component} The calling Component.
     */
    Component.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        if (origin == null || availableWidth == null || availableHeight == null) {
            if (this._element == null) {
                throw new Error("anchor() must be called before computeLayout()");
            }
            else if (this._rootElement != null) {
                // retrieve height/width from rootElement
                origin = { x: 0, y: 0 };
                var elem = this._rootElement.node();
                availableWidth = Utils.DOM.elementWidth(elem);
                availableHeight = Utils.DOM.elementHeight(elem);
            }
            else {
                throw new Error("null arguments cannot be passed to computeLayout() on a non-root, unanchored node");
            }
        }
        var _a = this._sizeFromOffer(availableWidth, availableHeight), height = _a.height, width = _a.width;
        var xAlignProportion = Component._xAlignToProportion[this._xAlignment];
        var yAlignProportion = Component._yAlignToProportion[this._yAlignment];
        var originX = origin.x + (availableWidth - width) * xAlignProportion;
        var originY = origin.y + (availableHeight - height) * yAlignProportion;
        this.setBounds(width, height, originX, originY);
        return this;
    };
    /**
     * Directly sets component size and, optionally, its origin.
     *
     * Preferably, layout is accomplished by placing components in a table.
     * However, if you need to directly override the component size, you may call
     * this method.
     *
     * Note that this method styles the anchored element, so this is usually only
     * useful after the component has been anchored. If the component has not been
     * anchored to an element, the internal properties will be set but no styles
     * will be applied.
     *
     * @param {number} [width] width in pixels
     * @param {number} [height] height in pixels
     * @param {number} [originX] left offset in pixels
     * @param {number} [originY] top offset in pixels
     */
    Component.prototype.setBounds = function (width, height, originX, originY) {
        if (originX === void 0) { originX = 0; }
        if (originY === void 0) { originY = 0; }
        this._width = width;
        this._height = height;
        this._origin = {
            x: originX,
            y: originY,
        };
        if (this._element != null) {
            this._element.styles({
                left: originX + "px",
                height: height + "px",
                top: originY + "px",
                width: width + "px",
            });
        }
        if (this._resizeHandler != null) {
            this._resizeHandler({ width: width, height: height });
        }
        return this;
    };
    Component.prototype._sizeFromOffer = function (availableWidth, availableHeight) {
        var requestedSpace = this.requestedSpace(availableWidth, availableHeight);
        return {
            width: this.fixedWidth() ? Math.min(availableWidth, requestedSpace.minWidth) : availableWidth,
            height: this.fixedHeight() ? Math.min(availableHeight, requestedSpace.minHeight) : availableHeight,
        };
    };
    /**
     * Queues the Component for rendering.
     *
     * @returns {Component} The calling Component.
     */
    Component.prototype.render = function () {
        if (this._isAnchored && this._isSetup && this.width() >= 0 && this.height() >= 0) {
            RenderController.registerToRender(this);
        }
        return this;
    };
    Component.prototype._scheduleComputeLayout = function () {
        if (this._isAnchored && this._isSetup) {
            RenderController.registerToComputeLayoutAndRender(this);
        }
    };
    /**
     * Sets a callback that gets called when the component resizes. The size change
     * is not guaranteed to be reflected by the DOM at the time the callback is fired.
     *
     * @param {IResizeHandler} [resizeHandler] Callback to be called when component resizes
     */
    Component.prototype.onResize = function (resizeHandler) {
        this._resizeHandler = resizeHandler;
        return this;
    };
    /**
     * Renders the Component without waiting for the next frame. This method is a no-op on
     * Component, Table, and Group; render them immediately with .renderTo() instead.
     */
    Component.prototype.renderImmediately = function () {
        return this;
    };
    /**
     * Causes the Component to re-layout and render.
     *
     * @returns {Component} The calling Component.
     */
    Component.prototype.redraw = function () {
        if (this._isAnchored && this._isSetup) {
            if (this.isRoot()) {
                this._scheduleComputeLayout();
            }
            else {
                this.parent().redraw();
            }
        }
        return this;
    };
    /**
     * Tell this component to invalidate any caching. This function should be
     * called when a CSS change has occurred that could influence the layout
     * of the Component, such as changing the font size.
     *
     * Subclasses should override.
     */
    Component.prototype.invalidateCache = function () {
        // Core component has no caching.
    };
    /**
     * Renders the Component to a given HTML Element.
     *
     * @param {String|d3.Selection} element The element, a selector string for the element, or a d3.Selection for the element.
     * @returns {Component} The calling Component.
     */
    Component.prototype.renderTo = function (element) {
        this.detach();
        if (element != null) {
            var selection = void 0;
            if (typeof (element) === "string") {
                selection = d3.select(element);
            }
            else if (element instanceof Element) {
                selection = d3.select(element);
            }
            else {
                selection = coerceD3_1.coerceExternalD3(element);
            }
            if (!selection.node() || selection.node().nodeName == null) {
                throw new Error("Plottable requires a valid Element to renderTo");
            }
            if (selection.node().nodeName === "svg") {
                throw new Error("Plottable 3.x and later can only renderTo an HTML component; pass a div instead!");
            }
            this.anchor(selection);
        }
        if (this._element == null) {
            throw new Error("If a Component has never been rendered before, then renderTo must be given a node to render to, " +
                "or a d3.Selection, or a selector string");
        }
        RenderController.registerToComputeLayoutAndRender(this);
        // flush so that consumers can immediately attach to stuff we create in the DOM
        RenderController.flush();
        return this;
    };
    Component.prototype.xAlignment = function (xAlignment) {
        if (xAlignment == null) {
            return this._xAlignment;
        }
        xAlignment = xAlignment.toLowerCase();
        if (Component._xAlignToProportion[xAlignment] == null) {
            throw new Error("Unsupported alignment: " + xAlignment);
        }
        this._xAlignment = xAlignment;
        this.redraw();
        return this;
    };
    Component.prototype.yAlignment = function (yAlignment) {
        if (yAlignment == null) {
            return this._yAlignment;
        }
        yAlignment = yAlignment.toLowerCase();
        if (Component._yAlignToProportion[yAlignment] == null) {
            throw new Error("Unsupported alignment: " + yAlignment);
        }
        this._yAlignment = yAlignment;
        this.redraw();
        return this;
    };
    /**
     * Checks if the Component has a given CSS class.
     *
     * @param {string} cssClass The CSS class to check for.
     */
    Component.prototype.hasClass = function (cssClass) {
        if (cssClass == null) {
            return false;
        }
        if (this._element == null) {
            return this._cssClasses.has(cssClass);
        }
        else {
            return this._element.classed(cssClass);
        }
    };
    /**
     * Adds a given CSS class to the Component.
     *
     * @param {string} cssClass The CSS class to add.
     * @returns {Component} The calling Component.
     */
    Component.prototype.addClass = function (cssClass) {
        if (cssClass == null) {
            return this;
        }
        if (this._element == null) {
            this._cssClasses.add(cssClass);
        }
        else {
            this._element.classed(cssClass, true);
        }
        return this;
    };
    /**
     * Removes a given CSS class from the Component.
     *
     * @param {string} cssClass The CSS class to remove.
     * @returns {Component} The calling Component.
     */
    Component.prototype.removeClass = function (cssClass) {
        if (cssClass == null) {
            return this;
        }
        if (this._element == null) {
            this._cssClasses.delete(cssClass);
        }
        else {
            this._element.classed(cssClass, false);
        }
        return this;
    };
    /**
     * Checks if the Component has a fixed width or if it grows to fill available space.
     * Returns false by default on the base Component class.
     */
    Component.prototype.fixedWidth = function () {
        return false;
    };
    /**
     * Checks if the Component has a fixed height or if it grows to fill available space.
     * Returns false by default on the base Component class.
     */
    Component.prototype.fixedHeight = function () {
        return false;
    };
    /**
     * Detaches a Component from the DOM. The Component can be reused.
     *
     * This should only be used if you plan on reusing the calling Component. Otherwise, use destroy().
     *
     * @returns The calling Component.
     */
    Component.prototype.detach = function () {
        this.parent(null);
        if (this._isAnchored) {
            this._element.remove();
        }
        this._isAnchored = false;
        this._onDetachCallbacks.callCallbacks(this);
        return this;
    };
    /**
     * Adds a callback to be called when the Component is detach()-ed.
     *
     * @param {ComponentCallback} callback
     * @return {Component} The calling Component.
     */
    Component.prototype.onDetach = function (callback) {
        this._onDetachCallbacks.add(callback);
        return this;
    };
    /**
     * Removes a callback to be called when the Component is detach()-ed.
     * The callback is identified by reference equality.
     *
     * @param {ComponentCallback} callback
     * @return {Component} The calling Component.
     */
    Component.prototype.offDetach = function (callback) {
        this._onDetachCallbacks.delete(callback);
        return this;
    };
    Component.prototype.parent = function (parent) {
        if (parent === undefined) {
            return this._parent;
        }
        if (parent !== null && !parent.has(this)) {
            throw new Error("Passed invalid parent");
        }
        this._parent = parent;
        return this;
    };
    /**
     * @returns {Bounds} for the component in pixel space, where the topLeft
     * represents the component's minimum x and y values and the bottomRight represents
     * the component's maximum x and y values.
     */
    Component.prototype.bounds = function () {
        var topLeft = this.origin();
        return {
            topLeft: topLeft,
            bottomRight: {
                x: topLeft.x + this.width(),
                y: topLeft.y + this.height(),
            },
        };
    };
    /**
     * Removes a Component from the DOM and disconnects all listeners.
     */
    Component.prototype.destroy = function () {
        this._destroyed = true;
        this.detach();
    };
    /**
     * Gets the width of the Component in pixels.
     */
    Component.prototype.width = function () {
        return this._width;
    };
    /**
     * Gets the height of the Component in pixels.
     */
    Component.prototype.height = function () {
        return this._height;
    };
    /**
     * Gets the origin of the Component relative to its parent.
     *
     * @return {Point}
     */
    Component.prototype.origin = function () {
        return {
            x: this._origin.x,
            y: this._origin.y,
        };
    };
    /**
     * Gets the origin of the Component relative to the root Component.
     *
     * @return {Point}
     */
    Component.prototype.originToRoot = function () {
        var origin = this.origin();
        var ancestor = this.parent();
        while (ancestor != null) {
            var ancestorOrigin = ancestor.origin();
            origin.x += ancestorOrigin.x;
            origin.y += ancestorOrigin.y;
            ancestor = ancestor.parent();
        }
        return origin;
    };
    /**
     * Gets the root component of the hierarchy. If the provided
     * component is the root, that component will be returned.
     */
    Component.prototype.root = function () {
        var component = this;
        while (!component.isRoot()) {
            component = component.parent();
        }
        return component;
    };
    Component.prototype.isRoot = function () {
        return this.parent() == null;
    };
    /**
     * Gets the Selection containing the <g> in front of the visual elements of the Component.
     *
     * Will return undefined if the Component has not been anchored.
     *
     * @return {d3.Selection}
     */
    Component.prototype.foreground = function () {
        return this._foregroundContainer;
    };
    /**
     * Gets the SVG that holds the visual elements of the Component.
     *
     * Will return undefined if the Component has not been anchored.
     *
     * @return {d3.Selection} content selection for the Component
     */
    Component.prototype.content = function () {
        return this._content;
    };
    /**
     * Returns the HTML Element at the root of this component's DOM tree.
     */
    Component.prototype.element = function () {
        return this._element;
    };
    /**
     * Returns the top-level user supplied element that roots the tree that this Component lives in.
     */
    Component.prototype.rootElement = function () {
        return this.root()._rootElement;
    };
    /**
     * Gets the Selection containing the <g> behind the visual elements of the Component.
     *
     * Will return undefined if the Component has not been anchored.
     *
     * @return {d3.Selection} background selection for the Component
     */
    Component.prototype.background = function () {
        return this._backgroundContainer;
    };
    return Component;
}());
Component._xAlignToProportion = {
    left: 0,
    center: 0.5,
    right: 1,
};
Component._yAlignToProportion = {
    top: 0,
    center: 0.5,
    bottom: 1,
};
exports.Component = Component;
