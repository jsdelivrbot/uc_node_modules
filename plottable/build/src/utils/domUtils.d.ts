/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import * as d3 from "d3";
import { Range, SimpleSelection } from "../core/interfaces";
/**
 * Returns whether the child is in fact a child of the parent
 */
export declare function contains(parent: Element, child: Element): boolean;
/**
 * Gets the bounding box of an element.
 * @param {d3.Selection} element
 * @returns {SVGRed} The bounding box.
 */
export declare function elementBBox(element: SimpleSelection<any>): SVGRect;
/**
 * Screen refresh rate which is assumed to be 60fps
 */
export declare let SCREEN_REFRESH_RATE_MILLISECONDS: number;
/**
 * Polyfill for `window.requestAnimationFrame`.
 * If the function exists, then we use the function directly.
 * Otherwise, we set a timeout on `SCREEN_REFRESH_RATE_MILLISECONDS` and then perform the function.
 *
 * @param {() => void} callback The callback to call in the next animation frame
 */
export declare function requestAnimationFramePolyfill(callback: () => void): void;
/**
 * Calculates the width of the element.
 * The width includes the padding and the border on the element's left and right sides.
 *
 * @param {Element} element The element to query
 * @returns {number} The width of the element.
 */
export declare function elementWidth(elementOrSelection: Element | d3.Selection<Element, any, any, any>): number;
/**
 * Calculates the height of the element.
 * The height includes the padding the and the border on the element's top and bottom sides.
 *
 * @param {Element} element The element to query
 * @returns {number} The height of the element
 */
export declare function elementHeight(elementOrSelection: Element | d3.Selection<Element, any, any, any>): number;
/**
 * Accepts selections whose .transform contain a "translate(a, b)" and extracts the a and b
 */
export declare function getTranslateValues(el: SimpleSelection<any>): [number, number];
/**
 * Accepts selections whose .transform contain a "rotate(angle)" and returns the angle
 */
export declare function getRotate(el: SimpleSelection<any>): number;
export declare function getScaleValues(el: SimpleSelection<any>): [number, number];
/**
 * Checks if the first ClientRect overlaps the second.
 *
 * @param {ClientRect} clientRectA The first ClientRect
 * @param {ClientRect} clientRectB The second ClientRect
 * @returns {boolean} If the ClientRects overlap each other.
 */
export declare function clientRectsOverlap(clientRectA: ClientRect, clientRectB: ClientRect): boolean;
/**
 * Return a new ClientRect that is the old ClientRect expanded by amount in all directions.
 * @param rect
 * @param amount
 */
export declare function expandRect(rect: ClientRect, amount: number): {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
};
/**
 * Returns true if and only if innerClientRect is inside outerClientRect.
 *
 * @param {ClientRect} innerClientRect The first ClientRect
 * @param {ClientRect} outerClientRect The second ClientRect
 * @returns {boolean} If and only if the innerClientRect is inside outerClientRect.
 */
export declare function clientRectInside(innerClientRect: ClientRect, outerClientRect: ClientRect): boolean;
/**
 * Returns true if the supplied coordinates or Ranges intersect or are contained by bbox.
 *
 * @param {number | Range} xValOrRange The x coordinate or Range to test
 * @param {number | Range} yValOrRange The y coordinate or Range to test
 * @param {SVGRect} bbox The bbox
 * @param {number} tolerance Amount by which to expand bbox, in each dimension, before
 * testing intersection
 *
 * @returns {boolean} True if the supplied coordinates or Ranges intersect or are
 * contained by bbox, false otherwise.
 */
export declare function intersectsBBox(xValOrRange: number | Range, yValOrRange: number | Range, bbox: SVGRect, tolerance?: number): boolean;
