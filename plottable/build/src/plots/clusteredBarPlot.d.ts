/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Dataset } from "../core/dataset";
import * as Utils from "../utils";
import { Bar, BarOrientation } from "./barPlot";
export declare class ClusteredBar<X, Y> extends Bar<X, Y> {
    private _clusterOffsets;
    /**
     * A ClusteredBar Plot groups bars across Datasets based on the primary value of the bars.
     *   On a vertical ClusteredBar Plot, the bars with the same X value are grouped.
     *   On a horizontal ClusteredBar Plot, the bars with the same Y value are grouped.
     *
     * @constructor
     * @param {string} [orientation="vertical"] One of "vertical"/"horizontal".
     */
    constructor(orientation?: BarOrientation);
    protected _generateAttrToProjector(): {
        [attr: string]: (datum: any, index: number, dataset: Dataset) => any;
    };
    private _updateClusterPosition();
    private _makeInnerScale();
    protected _getDataToDraw(): Utils.Map<Dataset, any[]>;
}
