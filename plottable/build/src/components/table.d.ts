import { Point, SpaceRequest } from "../core/interfaces";
import { Component } from "./component";
import { ComponentContainer } from "./componentContainer";
export declare class Table extends ComponentContainer {
    private _rowPadding;
    private _columnPadding;
    private _rows;
    private _rowWeights;
    private _columnWeights;
    private _nRows;
    private _nCols;
    private _calculatedLayout;
    /**
     * A Table combines Components in the form of a grid. A
     * common case is combining a y-axis, x-axis, and the plotted data via
     * ```typescript
     * new Table([[yAxis, plot],
     *            [null,  xAxis]]);
     * ```
     *
     * @constructor
     * @param {(Component|null|undefined)[][]} [rows=[]] A 2-D array of Components to be added to the Table.
     *   null can be used if a cell is empty.
     */
    constructor(rows?: (Component | null | undefined)[][]);
    protected _forEach(callback: (component: Component) => any): void;
    /**
     * Checks whether the specified Component is in the Table.
     */
    has(component: Component): boolean;
    /**
     * Returns the Component at the specified row and column index.
     *
     * @param {number} rowIndex
     * @param {number} columnIndex
     * @returns {Component} The Component at the specified position, or null if no Component is there.
     */
    componentAt(rowIndex: number, columnIndex: number): Component;
    /**
     * Adds a Component in the specified row and column position.
     *
     * For example, instead of calling `new Table([[a, b], [null, c]])`, you
     * could call
     * var table = new Plottable.Components.Table();
     * table.add(a, 0, 0);
     * table.add(b, 0, 1);
     * table.add(c, 1, 1);
     *
     * @param {Component} component The Component to be added.
     * @param {number} row
     * @param {number} col
     * @returns {Table} The calling Table.
     */
    add(component: Component, row: number, col: number): this;
    protected _remove(component: Component): boolean;
    private _iterateLayout(availableWidth, availableHeight, isFinalOffer?);
    private _determineGuarantees(offeredWidths, offeredHeights, isFinalOffer?);
    requestedSpace(offeredWidth: number, offeredHeight: number): SpaceRequest;
    computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): this;
    /**
     * Gets the padding above and below each row in pixels.
     */
    rowPadding(): number;
    /**
     * Sets the padding above and below each row in pixels.
     *
     * @param {number} rowPadding
     * @returns {Table} The calling Table.
     */
    rowPadding(rowPadding: number): this;
    /**
     * Gets the padding to the left and right of each column in pixels.
     */
    columnPadding(): number;
    /**
     * Sets the padding to the left and right of each column in pixels.
     *
     * @param {number} columnPadding
     * @returns {Table} The calling Table.
     */
    columnPadding(columnPadding: number): this;
    /**
     * Gets the weight of the specified row.
     *
     * @param {number} index
     */
    rowWeight(index: number): number;
    /**
     * Sets the weight of the specified row.
     * Space is allocated to rows based on their weight. Rows with higher weights receive proportionally more space.
     *
     * A common case would be to have one row take up 2/3rds of the space,
     * and the other row take up 1/3rd.
     *
     * Example:
     *
     * ```JavaScript
     * plot = new Plottable.Component.Table([
     *  [row1],
     *  [row2]
     * ]);
     *
     * // assign twice as much space to the first row
     * plot
     *  .rowWeight(0, 2)
     *  .rowWeight(1, 1)
     * ```
     *
     * @param {number} index
     * @param {number} weight
     * @returns {Table} The calling Table.
     */
    rowWeight(index: number, weight: number): this;
    /**
     * Gets the weight of the specified column.
     *
     * @param {number} index
     */
    columnWeight(index: number): number;
    /**
     * Sets the weight of the specified column.
     * Space is allocated to columns based on their weight. Columns with higher weights receive proportionally more space.
     *
     * Please see `rowWeight` docs for an example.
     *
     * @param {number} index
     * @param {number} weight
     * @returns {Table} The calling Table.
     */
    columnWeight(index: number, weight: number): this;
    fixedWidth(): boolean;
    fixedHeight(): boolean;
    private _padTableToSize(nRows, nCols);
    private static _calcComponentWeights(setWeights, componentGroups, fixityAccessor);
    private static _calcProportionalSpace(weights, freeSpace);
    private static _fixedSpace(componentGroup, fixityAccessor);
}
