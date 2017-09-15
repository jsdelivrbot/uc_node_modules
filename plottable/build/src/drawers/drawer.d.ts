/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import * as d3 from "d3";
import { CanvasDrawStep } from "./canvasDrawer";
import { AppliedDrawStep } from "./drawStep";
import { SVGDrawer } from "./svgDrawer";
/**
 * Drawers draw data onto an output of some sort, usually a DOM element.
 */
export interface IDrawer {
    /**
     * Mutate the surface to reflect the data being passed in. This method is responsible
     * for calling the animators at the right time and order.
     * @param data The data to be drawn.
     * @param drawSteps The draw steps that the data go through.
     */
    draw(data: any[], drawSteps: AppliedDrawStep[]): void;
    /**
     * Get the the last drawn visual primitives.
     */
    getVisualPrimitives(): Element[];
    /**
     * Get the visual primitive for the given *data* index.
     */
    getVisualPrimitiveAtIndex(index: number): Element;
    /**
     * Called when the Drawer is no longer needed - implementors may use this to cleanup
     * any resources they've created
     */
    remove(): void;
}
/**
 * A Drawer is a stateful class that holds one SVGDrawer and one CanvasDrawer, and can switch between
 * the two.
 */
export declare class ProxyDrawer implements IDrawer {
    private _svgDrawerFactory;
    private _canvasDrawStep;
    private _currentDrawer;
    /**
     * A Drawer draws svg elements based on the input Dataset.
     *
     * @constructor
     * @param _svgDrawerFactory A factory that will be invoked to create an SVGDrawer whenever useSVG is called
     * @param _canvasDrawStep The DrawStep to be fed into a new CanvasDrawer whenever useCanvas is called
     */
    constructor(_svgDrawerFactory: () => SVGDrawer, _canvasDrawStep: CanvasDrawStep);
    /**
     * Remove the old drawer and use SVG rendering from now on.
     */
    useSVG(parent: d3.Selection<SVGElement, any, any, any>): void;
    /**
     * Remove the old drawer and use Canvas rendering from now on.
     */
    useCanvas(canvas: d3.Selection<HTMLCanvasElement, any, any, any>): void;
    getDrawer(): IDrawer;
    /**
     * Removes this Drawer's renderArea
     */
    remove(): void;
    draw(data: any[], drawSteps: AppliedDrawStep[]): void;
    getVisualPrimitives(): Element[];
    getVisualPrimitiveAtIndex(index: number): Element;
}
