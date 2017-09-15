/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import * as d3 from "d3";
import { Bounds, Point, SimpleSelection, SpaceRequest } from "../core/interfaces";
import { ComponentContainer } from "./componentContainer";
export declare type ComponentCallback = (component: Component) => void;
export declare type IResizeHandler = (size: {
    height: number;
    width: number;
}) => void;
export declare const XAlignment: {
    center: "center";
    left: "left";
    right: "right";
};
export declare type XAlignment = keyof typeof XAlignment;
export declare const YAlignment: {
    center: "center";
    top: "top";
    bottom: "bottom";
};
export declare type YAlignment = keyof typeof YAlignment;
/**
 * Components are the core logical units that build Plottable visualizations.
 *
 * This class deals with Component lifecycle (anchoring, getting a size, and rendering
 * infrastructure), as well as building the framework of DOM elements for all Components.
 */
export declare class Component {
    /**
     * Holds all the DOM associated with this component. A direct child of the element we're
     * anchored to.
     */
    private _element;
    /**
     * Container for the visual content that this Component displays. Subclasses should attach
     * elements onto the _content. Located in between the background and the foreground.
     */
    private _content;
    /**
     * Place more objects just behind this Component's Content by appending them to the _backgroundContainer.
     */
    private _backgroundContainer;
    /**
     * Place more objects just in front of this Component's Content by appending them to the _foregroundContainer.
     */
    private _foregroundContainer;
    /**
     * Subclasses should set this to true in their constructor to prevent content from overflowing.
     */
    protected _overflowHidden: boolean;
    private _resizeHandler;
    /**
     * Origin of this Component relative to its parent.
     */
    private _origin;
    /**
     * The ComponentContainer that holds this Component in its children, or null, if this
     * Component is top-level.
     */
    private _parent;
    private _xAlignment;
    private static _xAlignToProportion;
    private _yAlignment;
    private static _yAlignToProportion;
    protected _isSetup: boolean;
    protected _isAnchored: boolean;
    /**
     * If we're the root Component (top-level), this is the HTMLElement we've anchored to (user-supplied).
     */
    private _rootElement;
    /**
     * width of the Component as computed in computeLayout. Used to size the hitbox, bounding box, etc
     */
    private _width;
    /**
     * height of the Component as computed in computeLayout. Used to size the hitbox, bounding box, etc
     */
    private _height;
    private _cssClasses;
    /**
     * If .destroy() has been called on this Component.
     */
    private _destroyed;
    private _onAnchorCallbacks;
    private _onDetachCallbacks;
    constructor();
    /**
     * Attaches the Component as a child of a given d3 Selection.
     *
     * @param {d3.Selection} selection.
     * @returns {Component} The calling Component.
     */
    anchor(selection: d3.Selection<HTMLElement, any, any, any>): this;
    /**
     * Adds a callback to be called on anchoring the Component to the DOM.
     * If the Component is already anchored, the callback is called immediately.
     *
     * @param {ComponentCallback} callback
     * @return {Component}
     */
    onAnchor(callback: ComponentCallback): this;
    /**
     * Removes a callback that would be called on anchoring the Component to the DOM.
     * The callback is identified by reference equality.
     *
     * @param {ComponentCallback} callback
     * @return {Component}
     */
    offAnchor(callback: ComponentCallback): this;
    /**
     * Creates additional elements as necessary for the Component to function.
     * Called during anchor() if the Component's element has not been created yet.
     * Override in subclasses to provide additional functionality.
     */
    protected _setup(): void;
    /**
     * Given available space in pixels, returns the minimum width and height this Component will need.
     *
     * @param {number} availableWidth
     * @param {number} availableHeight
     * @returns {SpaceRequest}
     */
    requestedSpace(availableWidth: number, availableHeight: number): SpaceRequest;
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
    computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): this;
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
    setBounds(width: number, height: number, originX?: number, originY?: number): this;
    protected _sizeFromOffer(availableWidth: number, availableHeight: number): {
        width: number;
        height: number;
    };
    /**
     * Queues the Component for rendering.
     *
     * @returns {Component} The calling Component.
     */
    render(): this;
    private _scheduleComputeLayout();
    /**
     * Sets a callback that gets called when the component resizes. The size change
     * is not guaranteed to be reflected by the DOM at the time the callback is fired.
     *
     * @param {IResizeHandler} [resizeHandler] Callback to be called when component resizes
     */
    onResize(resizeHandler: IResizeHandler): this;
    /**
     * Renders the Component without waiting for the next frame. This method is a no-op on
     * Component, Table, and Group; render them immediately with .renderTo() instead.
     */
    renderImmediately(): this;
    /**
     * Causes the Component to re-layout and render.
     *
     * @returns {Component} The calling Component.
     */
    redraw(): this;
    /**
     * Tell this component to invalidate any caching. This function should be
     * called when a CSS change has occurred that could influence the layout
     * of the Component, such as changing the font size.
     *
     * Subclasses should override.
     */
    invalidateCache(): void;
    /**
     * Renders the Component to a given HTML Element.
     *
     * @param {String|d3.Selection} element The element, a selector string for the element, or a d3.Selection for the element.
     * @returns {Component} The calling Component.
     */
    renderTo(element: string | HTMLElement | d3.Selection<HTMLElement, any, any, any>): this;
    /**
     * Gets the x alignment of the Component.
     */
    xAlignment(): XAlignment;
    /**
     * Sets the x alignment of the Component.
     *
     * @param {string} xAlignment The x alignment of the Component ("left"/"center"/"right").
     * @returns {Component} The calling Component.
     */
    xAlignment(xAlignment: XAlignment): this;
    /**
     * Gets the y alignment of the Component.
     */
    yAlignment(): YAlignment;
    /**
     * Sets the y alignment of the Component.
     *
     * @param {string} yAlignment The y alignment of the Component ("top"/"center"/"bottom").
     * @returns {Component} The calling Component.
     */
    yAlignment(yAlignment: YAlignment): this;
    /**
     * Checks if the Component has a given CSS class.
     *
     * @param {string} cssClass The CSS class to check for.
     */
    hasClass(cssClass: string): boolean;
    /**
     * Adds a given CSS class to the Component.
     *
     * @param {string} cssClass The CSS class to add.
     * @returns {Component} The calling Component.
     */
    addClass(cssClass: string): this;
    /**
     * Removes a given CSS class from the Component.
     *
     * @param {string} cssClass The CSS class to remove.
     * @returns {Component} The calling Component.
     */
    removeClass(cssClass: string): this;
    /**
     * Checks if the Component has a fixed width or if it grows to fill available space.
     * Returns false by default on the base Component class.
     */
    fixedWidth(): boolean;
    /**
     * Checks if the Component has a fixed height or if it grows to fill available space.
     * Returns false by default on the base Component class.
     */
    fixedHeight(): boolean;
    /**
     * Detaches a Component from the DOM. The Component can be reused.
     *
     * This should only be used if you plan on reusing the calling Component. Otherwise, use destroy().
     *
     * @returns The calling Component.
     */
    detach(): this;
    /**
     * Adds a callback to be called when the Component is detach()-ed.
     *
     * @param {ComponentCallback} callback
     * @return {Component} The calling Component.
     */
    onDetach(callback: ComponentCallback): this;
    /**
     * Removes a callback to be called when the Component is detach()-ed.
     * The callback is identified by reference equality.
     *
     * @param {ComponentCallback} callback
     * @return {Component} The calling Component.
     */
    offDetach(callback: ComponentCallback): this;
    /**
     * Gets the parent ComponentContainer for this Component.
     */
    parent(): ComponentContainer;
    /**
     * Sets the parent ComponentContainer for this Component.
     * An error will be thrown if the parent does not contain this Component.
     * Adding a Component to a ComponentContainer should be done
     * using the appropriate method on the ComponentContainer.
     */
    parent(parent: ComponentContainer): this;
    /**
     * @returns {Bounds} for the component in pixel space, where the topLeft
     * represents the component's minimum x and y values and the bottomRight represents
     * the component's maximum x and y values.
     */
    bounds(): Bounds;
    /**
     * Removes a Component from the DOM and disconnects all listeners.
     */
    destroy(): void;
    /**
     * Gets the width of the Component in pixels.
     */
    width(): number;
    /**
     * Gets the height of the Component in pixels.
     */
    height(): number;
    /**
     * Gets the origin of the Component relative to its parent.
     *
     * @return {Point}
     */
    origin(): Point;
    /**
     * Gets the origin of the Component relative to the root Component.
     *
     * @return {Point}
     */
    originToRoot(): Point;
    /**
     * Gets the root component of the hierarchy. If the provided
     * component is the root, that component will be returned.
     */
    root(): Component;
    isRoot(): boolean;
    /**
     * Gets the Selection containing the <g> in front of the visual elements of the Component.
     *
     * Will return undefined if the Component has not been anchored.
     *
     * @return {d3.Selection}
     */
    foreground(): SimpleSelection<void>;
    /**
     * Gets the SVG that holds the visual elements of the Component.
     *
     * Will return undefined if the Component has not been anchored.
     *
     * @return {d3.Selection} content selection for the Component
     */
    content(): SimpleSelection<void>;
    /**
     * Returns the HTML Element at the root of this component's DOM tree.
     */
    element(): d3.Selection<HTMLElement, any, any, any>;
    /**
     * Returns the top-level user supplied element that roots the tree that this Component lives in.
     */
    rootElement(): SimpleSelection<void>;
    /**
     * Gets the Selection containing the <g> behind the visual elements of the Component.
     *
     * Will return undefined if the Component has not been anchored.
     *
     * @return {d3.Selection} background selection for the Component
     */
    background(): SimpleSelection<void>;
}
