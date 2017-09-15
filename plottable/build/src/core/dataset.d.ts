export declare type DatasetCallback = (dataset: Dataset) => void;
export declare class Dataset {
    private _data;
    private _metadata;
    private _callbacks;
    /**
     * A Dataset contains an array of data and some metadata.
     * Changes to the data or metadata will cause anything subscribed to the Dataset to update.
     *
     * @constructor
     * @param {any[]} [data=[]] The data for this Dataset.
     * @param {any} [metadata={}] An object containing additional information.
     */
    constructor(data?: any[], metadata?: any);
    /**
     * Adds a callback to be called when the Dataset updates.
     *
     * @param {DatasetCallback} callback.
     * @returns {Dataset} The calling Dataset.
     */
    onUpdate(callback: DatasetCallback): this;
    /**
     * Removes a callback that would be called when the Dataset updates.
     *
     * @param {DatasetCallback} callback
     * @returns {Dataset} The calling Dataset.
     */
    offUpdate(callback: DatasetCallback): this;
    /**
     * Gets the data.
     *
     * @returns {any[]}
     */
    data(): any[];
    /**
     * Sets the data.
     *
     * @param {any[]} data
     * @returns {Dataset} The calling Dataset.
     */
    data(data: any[]): this;
    /**
     * Gets the metadata.
     *
     * @returns {any}
     */
    metadata(): any;
    /**
     * Sets the metadata.
     *
     * @param {any} metadata
     * @returns {Dataset} The calling Dataset.
     */
    metadata(metadata: any): this;
}
