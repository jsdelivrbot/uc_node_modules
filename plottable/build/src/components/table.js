/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var d3 = require("d3");
var Utils = require("../utils");
var componentContainer_1 = require("./componentContainer");
var Table = (function (_super) {
    __extends(Table, _super);
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
    function Table(rows) {
        if (rows === void 0) { rows = []; }
        var _this = _super.call(this) || this;
        _this._rowPadding = 0;
        _this._columnPadding = 0;
        _this._rows = [];
        _this._rowWeights = [];
        _this._columnWeights = [];
        _this._nRows = 0;
        _this._nCols = 0;
        _this._calculatedLayout = null;
        _this.addClass("table");
        rows.forEach(function (row, rowIndex) {
            row.forEach(function (component, colIndex) {
                if (component != null) {
                    _this.add(component, rowIndex, colIndex);
                }
            });
        });
        return _this;
    }
    Table.prototype._forEach = function (callback) {
        for (var r = 0; r < this._nRows; r++) {
            for (var c = 0; c < this._nCols; c++) {
                if (this._rows[r][c] != null) {
                    callback(this._rows[r][c]);
                }
            }
        }
    };
    /**
     * Checks whether the specified Component is in the Table.
     */
    Table.prototype.has = function (component) {
        for (var r = 0; r < this._nRows; r++) {
            for (var c = 0; c < this._nCols; c++) {
                if (this._rows[r][c] === component) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Returns the Component at the specified row and column index.
     *
     * @param {number} rowIndex
     * @param {number} columnIndex
     * @returns {Component} The Component at the specified position, or null if no Component is there.
     */
    Table.prototype.componentAt = function (rowIndex, columnIndex) {
        if (rowIndex < 0 || rowIndex >= this._nRows || columnIndex < 0 || columnIndex >= this._nCols) {
            return null;
        }
        return this._rows[rowIndex][columnIndex];
    };
    ;
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
    Table.prototype.add = function (component, row, col) {
        if (component == null) {
            throw Error("Cannot add null to a table cell");
        }
        if (!this.has(component)) {
            var currentComponent = this._rows[row] && this._rows[row][col];
            if (currentComponent != null) {
                throw new Error("cell is occupied");
            }
            component.detach();
            this._nRows = Math.max(row + 1, this._nRows);
            this._nCols = Math.max(col + 1, this._nCols);
            this._padTableToSize(this._nRows, this._nCols);
            this._rows[row][col] = component;
            this._adoptAndAnchor(component);
            this.redraw();
        }
        return this;
    };
    Table.prototype._remove = function (component) {
        for (var r = 0; r < this._nRows; r++) {
            for (var c = 0; c < this._nCols; c++) {
                if (this._rows[r][c] === component) {
                    this._rows[r][c] = null;
                    return true;
                }
            }
        }
        return false;
    };
    Table.prototype._iterateLayout = function (availableWidth, availableHeight, isFinalOffer) {
        if (isFinalOffer === void 0) { isFinalOffer = false; }
        /*
         * Given availableWidth and availableHeight, figure out how to allocate it between rows and columns using an iterative algorithm.
         *
         * For both dimensions, keeps track of "guaranteedSpace", which the fixed-size components have requested, and
         * "proportionalSpace", which is being given to proportionally-growing components according to the weights on the table.
         * Here is how it works (example uses width but it is the same for height). First, columns are guaranteed no width, and
         * the free width is allocated to columns based on their colWeights. Then, in determineGuarantees, every component is
         * offered its column's width and may request some amount of it, which increases that column's guaranteed
         * width. If there are some components that were not satisfied with the width they were offered, and there is free
         * width that has not already been guaranteed, then the remaining width is allocated to the unsatisfied columns and the
         * algorithm runs again. If all components are satisfied, then the remaining width is allocated as proportional space
         * according to the colWeights.
         *
         * The guaranteed width for each column is monotonically increasing as the algorithm iterates. Since it is deterministic
         * and monotonically increasing, if the freeWidth does not change during an iteration it implies that no further progress
         * is possible, so the algorithm will not continue iterating on that dimension's account.
         *
         * If the algorithm runs more than 5 times, we stop and just use whatever we arrived at. It's not clear under what
         * circumstances this will happen or if it will happen at all. A message will be printed to the console if this occurs.
         *
         */
        var rows = this._rows;
        var cols = d3.transpose(this._rows);
        var availableWidthAfterPadding = availableWidth - this._columnPadding * (this._nCols - 1);
        var availableHeightAfterPadding = availableHeight - this._rowPadding * (this._nRows - 1);
        var rowWeights = Table._calcComponentWeights(this._rowWeights, rows, function (c) { return (c == null) || c.fixedHeight(); });
        var colWeights = Table._calcComponentWeights(this._columnWeights, cols, function (c) { return (c == null) || c.fixedWidth(); });
        // To give the table a good starting position to iterate from, we give the fixed-width components half-weight
        // so that they will get some initial space allocated to work with
        var heuristicColWeights = colWeights.map(function (c) { return c === 0 ? 0.5 : c; });
        var heuristicRowWeights = rowWeights.map(function (c) { return c === 0 ? 0.5 : c; });
        var colProportionalSpace = Table._calcProportionalSpace(heuristicColWeights, availableWidthAfterPadding);
        var rowProportionalSpace = Table._calcProportionalSpace(heuristicRowWeights, availableHeightAfterPadding);
        var guaranteedWidths = Utils.Array.createFilledArray(0, this._nCols);
        var guaranteedHeights = Utils.Array.createFilledArray(0, this._nRows);
        var freeWidth;
        var freeHeight;
        var nIterations = 0;
        var guarantees;
        var wantsWidth;
        var wantsHeight;
        while (true) {
            var offeredHeights = Utils.Array.add(guaranteedHeights, rowProportionalSpace);
            var offeredWidths = Utils.Array.add(guaranteedWidths, colProportionalSpace);
            guarantees = this._determineGuarantees(offeredWidths, offeredHeights, isFinalOffer);
            guaranteedWidths = guarantees.guaranteedWidths;
            guaranteedHeights = guarantees.guaranteedHeights;
            wantsWidth = guarantees.wantsWidthArr.some(function (x) { return x; });
            wantsHeight = guarantees.wantsHeightArr.some(function (x) { return x; });
            var lastFreeWidth = freeWidth;
            var lastFreeHeight = freeHeight;
            freeWidth = availableWidthAfterPadding - d3.sum(guarantees.guaranteedWidths);
            freeHeight = availableHeightAfterPadding - d3.sum(guarantees.guaranteedHeights);
            var xWeights = void 0;
            if (wantsWidth) {
                xWeights = guarantees.wantsWidthArr.map(function (x) { return x ? 0.1 : 0; });
                xWeights = Utils.Array.add(xWeights, colWeights);
            }
            else {
                xWeights = colWeights;
            }
            var yWeights = void 0;
            if (wantsHeight) {
                yWeights = guarantees.wantsHeightArr.map(function (x) { return x ? 0.1 : 0; });
                yWeights = Utils.Array.add(yWeights, rowWeights);
            }
            else {
                yWeights = rowWeights;
            }
            colProportionalSpace = Table._calcProportionalSpace(xWeights, freeWidth);
            rowProportionalSpace = Table._calcProportionalSpace(yWeights, freeHeight);
            nIterations++;
            var canImproveWidthAllocation = freeWidth > 0 && freeWidth !== lastFreeWidth;
            var canImproveHeightAllocation = freeHeight > 0 && freeHeight !== lastFreeHeight;
            if (!(canImproveWidthAllocation || canImproveHeightAllocation)) {
                break;
            }
            if (nIterations > 5) {
                break;
            }
        }
        // Redo the proportional space one last time, to ensure we use the real weights not the wantsWidth/Height weights
        freeWidth = availableWidthAfterPadding - d3.sum(guarantees.guaranteedWidths);
        freeHeight = availableHeightAfterPadding - d3.sum(guarantees.guaranteedHeights);
        colProportionalSpace = Table._calcProportionalSpace(colWeights, freeWidth);
        rowProportionalSpace = Table._calcProportionalSpace(rowWeights, freeHeight);
        return {
            colProportionalSpace: colProportionalSpace,
            rowProportionalSpace: rowProportionalSpace,
            guaranteedWidths: guarantees.guaranteedWidths,
            guaranteedHeights: guarantees.guaranteedHeights,
            wantsWidth: wantsWidth,
            wantsHeight: wantsHeight,
        };
    };
    Table.prototype._determineGuarantees = function (offeredWidths, offeredHeights, isFinalOffer) {
        if (isFinalOffer === void 0) { isFinalOffer = false; }
        var requestedWidths = Utils.Array.createFilledArray(0, this._nCols);
        var requestedHeights = Utils.Array.createFilledArray(0, this._nRows);
        var columnNeedsWidth = Utils.Array.createFilledArray(false, this._nCols);
        var rowNeedsHeight = Utils.Array.createFilledArray(false, this._nRows);
        this._rows.forEach(function (row, rowIndex) {
            row.forEach(function (component, colIndex) {
                var spaceRequest;
                if (component != null) {
                    spaceRequest = component.requestedSpace(offeredWidths[colIndex], offeredHeights[rowIndex]);
                }
                else {
                    spaceRequest = {
                        minWidth: 0,
                        minHeight: 0,
                    };
                }
                var columnWidth = isFinalOffer ? Math.min(spaceRequest.minWidth, offeredWidths[colIndex]) : spaceRequest.minWidth;
                requestedWidths[colIndex] = Math.max(requestedWidths[colIndex], columnWidth);
                var rowHeight = isFinalOffer ? Math.min(spaceRequest.minHeight, offeredHeights[rowIndex]) : spaceRequest.minHeight;
                requestedHeights[rowIndex] = Math.max(requestedHeights[rowIndex], rowHeight);
                var componentNeedsWidth = spaceRequest.minWidth > offeredWidths[colIndex];
                columnNeedsWidth[colIndex] = columnNeedsWidth[colIndex] || componentNeedsWidth;
                var componentNeedsHeight = spaceRequest.minHeight > offeredHeights[rowIndex];
                rowNeedsHeight[rowIndex] = rowNeedsHeight[rowIndex] || componentNeedsHeight;
            });
        });
        return {
            guaranteedWidths: requestedWidths,
            guaranteedHeights: requestedHeights,
            wantsWidthArr: columnNeedsWidth,
            wantsHeightArr: rowNeedsHeight,
        };
    };
    Table.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
        this._calculatedLayout = this._iterateLayout(offeredWidth, offeredHeight);
        return {
            minWidth: d3.sum(this._calculatedLayout.guaranteedWidths),
            minHeight: d3.sum(this._calculatedLayout.guaranteedHeights),
        };
    };
    Table.prototype.computeLayout = function (origin, availableWidth, availableHeight) {
        var _this = this;
        _super.prototype.computeLayout.call(this, origin, availableWidth, availableHeight);
        var lastLayoutWidth = d3.sum(this._calculatedLayout.guaranteedWidths);
        var lastLayoutHeight = d3.sum(this._calculatedLayout.guaranteedHeights);
        var layout = this._calculatedLayout;
        if (lastLayoutWidth > this.width() || lastLayoutHeight > this.height()) {
            layout = this._iterateLayout(this.width(), this.height(), true);
        }
        var childYOrigin = 0;
        var rowHeights = Utils.Array.add(layout.rowProportionalSpace, layout.guaranteedHeights);
        var colWidths = Utils.Array.add(layout.colProportionalSpace, layout.guaranteedWidths);
        this._rows.forEach(function (row, rowIndex) {
            var childXOrigin = 0;
            row.forEach(function (component, colIndex) {
                // recursively compute layout
                if (component != null) {
                    component.computeLayout({ x: childXOrigin, y: childYOrigin }, colWidths[colIndex], rowHeights[rowIndex]);
                }
                childXOrigin += colWidths[colIndex] + _this._columnPadding;
            });
            childYOrigin += rowHeights[rowIndex] + _this._rowPadding;
        });
        return this;
    };
    Table.prototype.rowPadding = function (rowPadding) {
        if (rowPadding == null) {
            return this._rowPadding;
        }
        if (!Utils.Math.isValidNumber(rowPadding) || rowPadding < 0) {
            throw Error("rowPadding must be a non-negative finite value");
        }
        this._rowPadding = rowPadding;
        this.redraw();
        return this;
    };
    Table.prototype.columnPadding = function (columnPadding) {
        if (columnPadding == null) {
            return this._columnPadding;
        }
        if (!Utils.Math.isValidNumber(columnPadding) || columnPadding < 0) {
            throw Error("columnPadding must be a non-negative finite value");
        }
        this._columnPadding = columnPadding;
        this.redraw();
        return this;
    };
    Table.prototype.rowWeight = function (index, weight) {
        if (weight == null) {
            return this._rowWeights[index];
        }
        if (!Utils.Math.isValidNumber(weight) || weight < 0) {
            throw Error("rowWeight must be a non-negative finite value");
        }
        this._rowWeights[index] = weight;
        this.redraw();
        return this;
    };
    Table.prototype.columnWeight = function (index, weight) {
        if (weight == null) {
            return this._columnWeights[index];
        }
        if (!Utils.Math.isValidNumber(weight) || weight < 0) {
            throw Error("columnWeight must be a non-negative finite value");
        }
        this._columnWeights[index] = weight;
        this.redraw();
        return this;
    };
    Table.prototype.fixedWidth = function () {
        var cols = d3.transpose(this._rows);
        return Table._fixedSpace(cols, function (c) { return (c == null) || c.fixedWidth(); });
    };
    Table.prototype.fixedHeight = function () {
        return Table._fixedSpace(this._rows, function (c) { return (c == null) || c.fixedHeight(); });
    };
    Table.prototype._padTableToSize = function (nRows, nCols) {
        for (var i = 0; i < nRows; i++) {
            if (this._rows[i] === undefined) {
                this._rows[i] = [];
                this._rowWeights[i] = null;
            }
            for (var j = 0; j < nCols; j++) {
                if (this._rows[i][j] === undefined) {
                    this._rows[i][j] = null;
                }
            }
        }
        for (var j = 0; j < nCols; j++) {
            if (this._columnWeights[j] === undefined) {
                this._columnWeights[j] = null;
            }
        }
    };
    Table._calcComponentWeights = function (setWeights, componentGroups, fixityAccessor) {
        // If the row/col weight was explicitly set, then return it outright
        // If the weight was not explicitly set, then guess it using the heuristic that if all components are fixed-space
        // then weight is 0, otherwise weight is 1
        return setWeights.map(function (w, i) {
            if (w != null) {
                return w;
            }
            var fixities = componentGroups[i].map(fixityAccessor);
            var allFixed = fixities.reduce(function (a, b) { return a && b; }, true);
            return allFixed ? 0 : 1;
        });
    };
    Table._calcProportionalSpace = function (weights, freeSpace) {
        var weightSum = d3.sum(weights);
        if (weightSum === 0) {
            return Utils.Array.createFilledArray(0, weights.length);
        }
        else {
            return weights.map(function (w) { return freeSpace * w / weightSum; });
        }
    };
    Table._fixedSpace = function (componentGroup, fixityAccessor) {
        var all = function (bools) { return bools.reduce(function (a, b) { return a && b; }, true); };
        var groupIsFixed = function (components) { return all(components.map(fixityAccessor)); };
        return all(componentGroup.map(groupIsFixed));
    };
    return Table;
}(componentContainer_1.ComponentContainer));
exports.Table = Table;
