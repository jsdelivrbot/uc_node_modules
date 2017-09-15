/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import * as d3 from "d3";
import { SimpleSelection } from "../core/interfaces";
import { IDrawer } from "./drawer";
import { AppliedDrawStep } from "./drawStep";
/**
 * An SVGDrawer draws data by creating DOM elements and setting specific attributes on them
 * to accurately reflect the data being passed in.
 *
 * This class is immutable (but has internal state).
 */
export declare class SVGDrawer implements IDrawer {
    protected _className: string;
    protected _svgElementName: string;
    /**
     * The root element holding the visual elements. The SVGDrawer owns
     * this variable and manipulates it accordingly.
     */
    protected _root: d3.Selection<SVGElement, any, any, any>;
    /**
     * All of the DOM elements from the last draw.
     */
    private _selection;
    /**
     * Cache of the _selection.nodes().
     */
    private _cachedVisualPrimitivesNodes;
    /**
     * @param svgElementName an HTML/SVG tag name to be created, one per datum.
     * @param className CSS classes to be applied to the drawn primitives.
     * @param applyDefaultAttributes
     */
    constructor(svgElementName: string, className: string);
    draw(data: any[], appliedDrawSteps: AppliedDrawStep[]): void;
    getVisualPrimitives(): Element[];
    getVisualPrimitiveAtIndex(index: number): Element;
    remove(): void;
    attachTo(parent: d3.Selection<SVGElement, any, any, any>): void;
    getRoot(): d3.Selection<SVGElement, any, any, any>;
    /**
     * Returns the CSS selector for this Drawer's visual elements.
     */
    selector(): string;
    protected _applyDefaultAttributes(selection: SimpleSelection<any>): void;
    private _createAndDestroyDOMElements(data);
    /**
     * Draws data using one step
     *
     * @param{AppliedDrawStep} step The step, how data should be drawn.
     */
    private _drawStep(step);
}
