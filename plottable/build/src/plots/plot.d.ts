/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import * as d3 from "d3";
import { IAnimator } from "../animators/animator";
import { Component } from "../components/component";
import { Dataset } from "../core/dataset";
import { AttributeToProjector, IAccessor, Point, SimpleSelection } from "../core/interfaces";
import * as Drawers from "../drawers";
import { ProxyDrawer } from "../drawers/drawer";
import { AppliedDrawStep, DrawStep } from "../drawers/index";
import { IScaleCallback, Scale } from "../scales/scale";
import * as Utils from "../utils";
import * as Plots from "./commons";
export declare const Renderer: {
    svg: "svg";
    canvas: "canvas";
};
export declare type Renderer = keyof typeof Renderer;
export declare class Plot extends Component {
    static getTotalDrawTime(data: any[], drawSteps: Drawers.DrawStep[]): number;
    static applyDrawSteps(drawSteps: DrawStep[], dataset: Dataset): AppliedDrawStep[];
    protected static _ANIMATION_MAX_DURATION: number;
    /**
     * Debounces rendering and entityStore resets
     */
    protected static _DEFERRED_RENDERING_DELAY: number;
    /**
     * _cachedEntityStore is a cache of all the entities in the plot. It, at times
     * may be undefined and shouldn't be accessed directly. Instead, use _getEntityStore
     * to access the entity store.
     */
    private _cachedEntityStore;
    private _deferredResetEntityStore;
    /**
     * Whether the backing datasets have changed since this plot's last render.
     */
    private _dataChanged;
    /**
     * Stores the Drawer for each dataset attached to this plot.
     */
    private _datasetToDrawer;
    /**
     * The _renderArea is the main SVG drawing area upon which this plot should draw to.
     */
    protected _renderArea: d3.Selection<SVGGElement, any, any, any>;
    /**
     * Mapping from attribute names to the AccessorScale that defines that attribute.
     */
    private _attrBindings;
    /**
     * Mapping from attribute names to the extents ([min, max]) values that that attribute takes on.
     */
    private _attrExtents;
    /**
     * Callback that we register onto Scales that get bound to this Plot.
     *
     * TODO make this an arrow method instead of re-defining it in constructor()
     */
    private _includedValuesProvider;
    private _animate;
    /**
     * The Animators for this plot. Each plot exposes a set of "animator key" strings that
     * define how different parts of that particular Plot animates. For instance, Rectangle
     * Plots have a "rectangles" animator key which controls how the <rect>s are animated.
     * @see animator()
     *
     * There are two common animators that most Plots respect: "main" and "reset". In general,
     * Plots draw in two steps: first they "reset" their visual elements (e.g. scatter plots set
     * all the dots to size 0), and then they do the "main" animation into the correct visualization
     * (e.g. scatter plot dots grow to their specified size).
     */
    private _animators;
    /**
     * Callback that triggers when any scale that's bound to this plot Updates.
     *
     * TODO make this an arrow method instead of re-defining it in constructor()
     */
    protected _renderCallback: IScaleCallback<Scale<any, any>>;
    /**
     * Callback that triggers when any Dataset that's bound to this plot Updates.
     *
     * TODO make this an arrow method insteade of re-defining it in constructor()
     */
    private _onDatasetUpdateCallback;
    /**
     * Mapping from property names to the AccessorScale that defines that property.
     *
     * e.g. Line may register an "x" -> binding and a "y" -> binding;
     * Rectangle would register "x", "y", "x2", and "y2"
     *
     * Only subclasses control how they register properties, while attrs can be registered by the user.
     * By default, only attrs are passed to the _generateDrawStep's attrToProjector; properties are not.
     */
    protected _propertyBindings: d3.Map<Plots.IAccessorScaleBinding<any, any>>;
    /**
     * Mapping from property names to the extents ([min, max]) values that that property takes on.
     */
    protected _propertyExtents: d3.Map<any[]>;
    /**
     * The canvas element that this Plot will render to if using the canvas renderer, or null if not using the SVG
     * renderer. The node may be parent-less (which means that the plot isn't setup yet but is still using the canvas
     * renderer).
     */
    protected _canvas: d3.Selection<HTMLCanvasElement, any, any, any>;
    /**
     * A Plot draws some visualization of the inputted Datasets.
     *
     * @constructor
     */
    constructor();
    anchor(selection: d3.Selection<HTMLElement, any, any, any>): this;
    protected _setup(): void;
    private _appendCanvasNode();
    setBounds(width: number, height: number, originX?: number, originY?: number): this;
    destroy(): void;
    /**
     * Setup the DOM nodes for the given dataset. This is a separate
     * step from "creating the Drawer" since the element may not be setup yet
     * (in which case the _renderArea is null because the .element() and .content()
     * are null). Also because subclasses may do more than just configure one
     * single drawer (e.g. adding text drawing capabilities).
     */
    protected _createNodesForDataset(dataset: Dataset): ProxyDrawer;
    /**
     * Create a new Drawer. Subclasses should override this to return
     * a Drawer that draws the correct shapes for this plot.
     */
    protected _createDrawer(dataset: Dataset): ProxyDrawer;
    protected _getAnimator(key: string): IAnimator;
    protected _onDatasetUpdate(): void;
    /**
     * Gets the AccessorScaleBinding for a particular attribute.
     *
     * @param {string} attr
     */
    attr<A>(attr: string): Plots.IAccessorScaleBinding<A, number | string>;
    /**
     * Sets a particular attribute to a constant value or the result of an Accessor.
     *
     * @param {string} attr
     * @param {number|string|Accessor<number>|Accessor<string>} attrValue
     * @returns {Plot} The calling Plot.
     */
    attr(attr: string, attrValue: number | string | IAccessor<number> | IAccessor<string>): this;
    /**
     * Sets a particular attribute to a scaled constant value or scaled result of an Accessor.
     * The provided Scale will account for the attribute values when autoDomain()-ing.
     *
     * @param {string} attr
     * @param {A|Accessor<A>} attrValue
     * @param {Scale<A, number | string>} scale The Scale used to scale the attrValue.
     * @returns {Plot} The calling Plot.
     */
    attr<A>(attr: string, attrValue: A | IAccessor<A>, scale: Scale<A, number | string>): this;
    protected _bindProperty(property: string, valueOrFn: any | Function, scale: Scale<any, any>): void;
    private _bindAttr(attr, valueOrFn, scale);
    protected _generateAttrToProjector(): AttributeToProjector;
    renderImmediately(): this;
    /**
     * Returns whether the plot will be animated.
     */
    animated(): boolean;
    /**
     * Enables or disables animation.
     */
    animated(willAnimate: boolean): this;
    detach(): this;
    /**
     * @returns {Scale[]} A unique array of all scales currently used by the Plot.
     */
    private _scales();
    /**
     * Updates the extents associated with each attribute, then autodomains all scales the Plot uses.
     */
    protected _updateExtents(): void;
    private _updateExtentsForAttr(attr);
    protected _updateExtentsForProperty(property: string): void;
    protected _filterForProperty(property: string): IAccessor<boolean>;
    private _updateExtentsForKey(key, bindings, extents, filter);
    private _computeExtent(dataset, accScaleBinding, filter);
    /**
     * Override in subclass to add special extents, such as included values
     */
    protected _extentsForProperty(property: string): any[];
    private _includedValuesForScale<D>(scale);
    /**
     * Get the Animator associated with the specified Animator key.
     *
     * @return {Animator}
     */
    animator(animatorKey: string): IAnimator;
    /**
     * Set the Animator associated with the specified Animator key.
     *
     * @param {string} animatorKey
     * @param {Animator} animator
     * @returns {Plot} The calling Plot.
     */
    animator(animatorKey: string, animator: IAnimator): this;
    /**
     * Get the renderer for this Plot, either "svg" or "canvas".
     */
    renderer(): Renderer;
    /**
     * Set the Renderer to be either "svg" or "canvas" on this Plot.
     * @param renderer
     */
    renderer(renderer: Renderer): this;
    /**
     * Adds a Dataset to the Plot.
     *
     * @param {Dataset} dataset
     * @returns {Plot} The calling Plot.
     */
    addDataset(dataset: Dataset): this;
    protected _addDataset(dataset: Dataset): this;
    /**
     * Removes a Dataset from the Plot.
     *
     * @param {Dataset} dataset
     * @returns {Plot} The calling Plot.
     */
    removeDataset(dataset: Dataset): this;
    protected _removeDataset(dataset: Dataset): this;
    protected _removeDatasetNodes(dataset: Dataset): void;
    datasets(): Dataset[];
    datasets(datasets: Dataset[]): this;
    protected _generateDrawSteps(): Drawers.DrawStep[];
    protected _additionalPaint(time: number): void;
    /**
     * _buildLightweightPlotEntities constucts {LightweightPlotEntity[]} from
     * all the entities in the plot
     * @param {Dataset[]} [datasets] - datasets comprising this plot
     */
    protected _buildLightweightPlotEntities(datasets: Dataset[]): Plots.ILightweightPlotEntity[];
    protected _getDataToDraw(): Utils.Map<Dataset, any[]>;
    private _paint();
    /**
     * Retrieves the drawn visual elements for the specified Datasets as a d3 Selection.
     * Not supported on canvas renderer.
     *
     * @param {Dataset[]} [datasets] The Datasets to retrieve the Selections for.
     *   If not provided, Selections will be retrieved for all Datasets on the Plot.
     * @returns {d3.Selection}
     */
    selections(datasets?: Dataset[]): SimpleSelection<any>;
    /**
     * Gets the Entities associated with the specified Datasets.
     *
     * @param {Dataset[]} datasets The Datasets to retrieve the Entities for.
     *   If not provided, returns defaults to all Datasets on the Plot.
     * @return {Plots.PlotEntity[]}
     */
    entities(datasets?: Dataset[]): Plots.IPlotEntity[];
    /**
     * _getEntityStore returns the store of all Entities associated with the specified dataset
     *
     * @param {Dataset[]} [datasets] - The datasets with which to construct the store. If no datasets
     * are specified all datasets will be used.
     */
    protected _getEntityStore(datasets?: Dataset[]): Utils.IEntityStore<Plots.ILightweightPlotEntity>;
    protected _lightweightPlotEntityToPlotEntity(entity: Plots.ILightweightPlotEntity): Plots.IPlotEntity;
    /**
     * Gets the PlotEntities at a particular Point.
     *
     * Each plot type determines how to locate entities at or near the query
     * point. For example, line and area charts will return the nearest entity,
     * but bar charts will only return the entities that fully contain the query
     * point.
     *
     * @param {Point} point The point to query.
     * @returns {PlotEntity[]} The PlotEntities at the particular point
     */
    entitiesAt(point: Point): Plots.IPlotEntity[];
    /**
     * Returns the {Plots.PlotEntity} nearest to the query point,
     * or undefined if no {Plots.PlotEntity} can be found.
     *
     * @param {Point} queryPoint
     * @param {bounds} Bounds The bounding box within which to search. By default, bounds is the bounds of
     * the chart, relative to the parent.
     * @returns {Plots.PlotEntity} The nearest PlotEntity, or undefined if no {Plots.PlotEntity} can be found.
     */
    entityNearest(queryPoint: Point, bounds?: {
        topLeft: Point;
        bottomRight: Point;
    }): Plots.IPlotEntity;
    protected _uninstallScaleForKey(scale: Scale<any, any>, key: string): void;
    protected _installScaleForKey(scale: Scale<any, any>, key: string): void;
    protected _resetEntityStore: () => void;
    protected _propertyProjectors(): AttributeToProjector;
    protected static _scaledAccessor<D, R>(binding: Plots.IAccessorScaleBinding<D, R>): IAccessor<any>;
    protected _pixelPoint(datum: any, index: number, dataset: Dataset): Point;
    protected _animateOnNextRender(): boolean;
}
