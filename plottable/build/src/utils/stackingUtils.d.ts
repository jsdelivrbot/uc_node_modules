import { Dataset } from "../core/dataset";
import { IAccessor } from "../core/interfaces";
import * as Utils from "./";
export declare type GenericStackedDatum<D> = {
    value: number;
    offset: number;
    axisValue: D;
};
export declare type StackExtent<D> = {
    extent: number;
    axisValue: D;
};
export declare type StackedDatum = GenericStackedDatum<string>;
/**
 * Option type for stacking direction. By default, stacked bar and area charts
 * put the first data series at the bottom of the axis ("bottomup"), but this
 * can be reversed with the "topdown" option, which produces a stacking order
 * that matches the order of series in the legend.
 */
export declare const IStackingOrder: {
    topdown: "topdown";
    bottomup: "bottomup";
};
export declare type IStackingOrder = keyof typeof IStackingOrder;
export declare type GenericStackingResult<D> = Utils.Map<Dataset, Utils.Map<string | number, GenericStackedDatum<D>>>;
/**
 * Map of Dataset to stacks.
 * @deprecated
 */
export declare type StackingResult = GenericStackingResult<string>;
/**
 * Computes the StackingResult (value and offset) for each data point in each Dataset.
 *
 * @param {Dataset[]} datasets The Datasets to be stacked on top of each other in the order of stacking
 * @param {Accessor<any>} keyAccessor Accessor for the key of the data
 * @param {Accessor<number>} valueAccessor Accessor for the value of the data
 * @param {IStackingOrder} stackingOrder The order of stacking (default "bottomup")
 * @return {StackingResult} value and offset for each datapoint in each Dataset
 */
export declare function stack(datasets: Dataset[], keyAccessor: IAccessor<any>, valueAccessor: IAccessor<number>, stackingOrder?: IStackingOrder): StackingResult;
/**
 * Computes the maximum and minimum extents of each stack individually.
 *
 * @param {GenericStackingResult} stackingResult The value and offset information for each datapoint in each dataset
 * @return { { maximumExtents: Utils.Map<D, number>, minimumExtents: Utils.Map<D, number> } } The maximum and minimum extents
 * of each individual stack.
 */
export declare function stackedExtents<D>(stackingResult: GenericStackingResult<D>): {
    maximumExtents: Utils.Map<string | number, StackExtent<D>>;
    minimumExtents: Utils.Map<string | number, StackExtent<D>>;
};
/**
 * Computes the total extent over all data points in all Datasets, taking stacking into consideration.
 *
 * @param {StackingResult} stackingResult The value and offset information for each datapoint in each dataset
 * @param {Accessor<any>} keyAccessor Accessor for the key of the data existent in the stackingResult
 * @param {Accessor<boolean>} filter A filter for data to be considered when computing the total extent
 * @return {[number, number]} The total extent
 */
export declare function stackedExtent(stackingResult: StackingResult, keyAccessor: IAccessor<any>, filter: IAccessor<boolean>): number[];
/**
 * Normalizes a key used for stacking
 *
 * @param {any} key The key to be normalized
 * @return {string} The stringified key
 */
export declare function normalizeKey(key: any): string;
