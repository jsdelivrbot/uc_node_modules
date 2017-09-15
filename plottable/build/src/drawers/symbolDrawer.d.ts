/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Dataset } from "../core/dataset";
import { IAccessor } from "../core/interfaces";
import { SymbolFactory } from "../core/symbolFactories";
import { CanvasBuffer } from "./canvasBuffer";
import { CanvasDrawStep } from "./canvasDrawer";
import { SVGDrawer } from "./svgDrawer";
export declare class SymbolSVGDrawer extends SVGDrawer {
    constructor();
}
export declare function makeSymbolCanvasDrawStep(dataset: Dataset, symbolProjector: () => IAccessor<SymbolFactory>, sizeProjector: () => IAccessor<number>, stepBuffer?: CanvasBuffer): CanvasDrawStep;
