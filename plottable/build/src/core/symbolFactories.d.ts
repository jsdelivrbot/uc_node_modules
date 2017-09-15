import * as d3Shape from "d3-shape";
/**
 * A SymbolFactory is a function that takes in a symbolSize which is the edge length of the render area
 * and returns a d3 symbol generator.
 */
export declare type SymbolFactory = (symbolSize: number) => d3Shape.Symbol<any, any>;
export declare function circle(): SymbolFactory;
export declare function square(): SymbolFactory;
export declare function cross(): SymbolFactory;
export declare function diamond(): SymbolFactory;
export declare function triangle(): SymbolFactory;
export declare function star(): SymbolFactory;
export declare function wye(): SymbolFactory;
