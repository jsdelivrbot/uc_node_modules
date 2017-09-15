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
var Typesettable = require("typesettable");
var Configs = require("../core/config");
var Formatters = require("../core/formatters");
var SymbolFactories = require("../core/symbolFactories");
var Utils = require("../utils");
var component_1 = require("./component");
/**
 * The Legend's row representations. Stores positioning information
 * and column data.
 */
var LegendRow = (function () {
    function LegendRow(
        /**
         * Columns within the row
         * @param {LegendColumn<any>[]} columns
         */
        columns, 
        /**
         * Padding applied below the row. Affects the spacing between rows. Defaults to 0.
         * @param {bottomPadding} number
         */
        bottomPadding, 
        /**
         * Sets the maximum allowable width of this column.
         * @param {number} maxWidth
         */
        maxWidth) {
        if (columns === void 0) { columns = []; }
        if (bottomPadding === void 0) { bottomPadding = 0; }
        if (maxWidth === void 0) { maxWidth = Infinity; }
        this.columns = columns;
        this.bottomPadding = bottomPadding;
        this.maxWidth = maxWidth;
    }
    /**
     * Adds a column to the list of columns within the row. May readjust the size of the
     * column to fit within the row
     *
     * @param {LegendColumn<any>} column
     */
    LegendRow.prototype.addColumn = function (column) {
        var desiredColumnWidth = column.width;
        // choose the smaller of 1) remaining space, 2) desired width
        var widthRemaining = this.getWidthAvailable();
        column.width = Math.min(widthRemaining, desiredColumnWidth);
        this.columns.push(column);
    };
    /**
     * Returns the bounds the column, relative to the row.
     * @param {number} columnIndex The index of the column in question
     * @returns {Bounds} bounds
     */
    LegendRow.prototype.getBounds = function (columnIndex) {
        var column = this.columns[columnIndex];
        var columnXOffset = 0;
        for (var i = 0; i < columnIndex; i++) {
            columnXOffset += this.columns[i].width;
        }
        return {
            topLeft: { x: columnXOffset, y: 0 },
            bottomRight: {
                x: columnXOffset + column.width,
                y: column.height,
            },
        };
    };
    /**
     * Returns the height of the row, including the bottomPadding.
     * @return {number} height
     */
    LegendRow.prototype.getHeight = function () {
        return Utils.Math.max(this.columns.map(function (_a) {
            var height = _a.height;
            return height;
        }), 0) + this.bottomPadding;
    };
    /**
     * Returns the current width of the row constrained by maxWidth, if set.
     * @returns {number} width
     */
    LegendRow.prototype.getWidth = function () {
        return Math.min(this.columns.reduce(function (sum, _a) {
            var width = _a.width;
            return sum + width;
        }, 0), this.maxWidth);
    };
    /**
     * Returns the remaining width available in the row based on the maximum
     * width of this row.
     * @returns {number} widthRemaining
     */
    LegendRow.prototype.getWidthAvailable = function () {
        var widthConsumed = this.getWidth();
        return Math.max(this.maxWidth - widthConsumed, 0);
    };
    return LegendRow;
}());
/**
 * Stores LegendRows. Useful for calculating and maintaining
 * positioning information about the Legend.
 */
var LegendTable = (function () {
    function LegendTable(maxWidth, maxHeight, padding, rows) {
        if (maxWidth === void 0) { maxWidth = Infinity; }
        if (maxHeight === void 0) { maxHeight = Infinity; }
        if (padding === void 0) { padding = 0; }
        if (rows === void 0) { rows = []; }
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.padding = padding;
        this.rows = rows;
    }
    LegendTable.prototype.addRow = function (row) {
        row.maxWidth = this.maxWidth - this.padding * 2;
        this.rows.push(row);
    };
    /**
     * Returns the bounds of the column relative to the parent and siblings of the
     * column.
     *
     * @param {number} rowIndex The parent row containing the desired column.
     * @param {number} columnIndex The column to calculate bounds.
     * @returns {Bounds}
     */
    LegendTable.prototype.getColumnBounds = function (rowIndex, columnIndex) {
        var rowBounds = this.getRowBounds(rowIndex);
        var columnBounds = this.rows[rowIndex].getBounds(columnIndex);
        columnBounds.topLeft.x += rowBounds.topLeft.x;
        columnBounds.bottomRight.x += rowBounds.topLeft.x;
        columnBounds.topLeft.y += rowBounds.topLeft.y;
        columnBounds.bottomRight.y += rowBounds.topLeft.y;
        return columnBounds;
    };
    /**
     * Returns the bounds relative to the parent and siblings of the row.
     *
     * @param {number} rowIndex The row to calculate bounds
     * @returns {Bounds}
     */
    LegendTable.prototype.getRowBounds = function (rowIndex) {
        var rowXOffset = this.padding;
        var rowYOffset = this.padding;
        for (var i = 0; i < rowIndex; i++) {
            rowYOffset += this.rows[i].getHeight();
        }
        var rowBounds = {
            topLeft: { x: rowXOffset, y: rowYOffset },
            bottomRight: {
                x: rowXOffset + this.rows[rowIndex].getWidth(),
                y: rowYOffset + this.rows[rowIndex].getHeight(),
            },
        };
        return rowBounds;
    };
    /**
     * Returns the height of the Table, constrained by a maximum height, if set.
     * The height includes the padding, if set.
     * @returns {number} height
     */
    LegendTable.prototype.getHeight = function () {
        return Math.min(this.rows.reduce(function (sum, row) { return sum + row.getHeight(); }, 0) + this.padding * 2, this.maxHeight);
    };
    /**
     * Returns the width of the table, constrained by the maximum width, if set.
     * The width includes the padding, if set.
     * @returns {number} width
     */
    LegendTable.prototype.getWidth = function () {
        return Math.min(Utils.Math.max(this.rows.map(function (row) { return row.getWidth(); }), 0) + this.padding * 2, this.maxWidth);
    };
    return LegendTable;
}());
var Legend = (function (_super) {
    __extends(Legend, _super);
    /**
     * The Legend consists of a series of entries, each with a color and label taken from the Color Scale.
     *
     * @constructor
     * @param {Scale.Color} scale
     */
    function Legend(colorScale) {
        var _this = _super.call(this) || this;
        _this._padding = 5;
        _this._rowBottomPadding = 3;
        _this.addClass("legend");
        _this.maxEntriesPerRow(1);
        if (colorScale == null) {
            throw new Error("Legend requires a colorScale");
        }
        _this._colorScale = colorScale;
        _this._redrawCallback = function (scale) { return _this.redraw(); };
        _this._colorScale.onUpdate(_this._redrawCallback);
        _this._formatter = Formatters.identity();
        _this.maxLinesPerEntry(1);
        _this.xAlignment("right").yAlignment("top");
        _this.comparator(function (a, b) {
            var formattedText = _this._colorScale.domain().slice().map(function (d) { return _this._formatter(d); });
            return formattedText.indexOf(a) - formattedText.indexOf(b);
        });
        _this._symbolFactoryAccessor = function () { return SymbolFactories.circle(); };
        _this._symbolOpacityAccessor = function () { return 1; };
        return _this;
    }
    Legend.prototype._setup = function () {
        _super.prototype._setup.call(this);
        var fakeLegendRow = this.content().append("g").classed(Legend.LEGEND_ROW_CLASS, true);
        var fakeLegendEntry = fakeLegendRow.append("g").classed(Legend.LEGEND_ENTRY_CLASS, true);
        fakeLegendEntry.append("text");
        var context = new Typesettable.SvgContext(fakeLegendRow.node(), null, Configs.ADD_TITLE_ELEMENTS);
        this._measurer = new Typesettable.CacheMeasurer(context);
        this._wrapper = new Typesettable.Wrapper().maxLines(this.maxLinesPerEntry());
        this._writer = new Typesettable.Writer(this._measurer, context, this._wrapper);
    };
    Legend.prototype.formatter = function (formatter) {
        if (formatter == null) {
            return this._formatter;
        }
        this._formatter = formatter;
        this.redraw();
        return this;
    };
    Legend.prototype.maxEntriesPerRow = function (maxEntriesPerRow) {
        if (maxEntriesPerRow == null) {
            return this._maxEntriesPerRow;
        }
        else {
            this._maxEntriesPerRow = maxEntriesPerRow;
            this.redraw();
            return this;
        }
    };
    Legend.prototype.maxLinesPerEntry = function (maxLinesPerEntry) {
        if (maxLinesPerEntry == null) {
            return this._maxLinesPerEntry;
        }
        else {
            this._maxLinesPerEntry = maxLinesPerEntry;
            this.redraw();
            return this;
        }
    };
    Legend.prototype.maxWidth = function (maxWidth) {
        if (maxWidth == null) {
            return this._maxWidth;
        }
        else {
            this._maxWidth = maxWidth;
            this.redraw();
            return this;
        }
    };
    Legend.prototype.comparator = function (comparator) {
        if (comparator == null) {
            return this._comparator;
        }
        else {
            this._comparator = comparator;
            this.redraw();
            return this;
        }
    };
    Legend.prototype.colorScale = function (colorScale) {
        if (colorScale != null) {
            this._colorScale.offUpdate(this._redrawCallback);
            this._colorScale = colorScale;
            this._colorScale.onUpdate(this._redrawCallback);
            this.redraw();
            return this;
        }
        else {
            return this._colorScale;
        }
    };
    Legend.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._colorScale.offUpdate(this._redrawCallback);
    };
    Legend.prototype._buildLegendTable = function (width, height) {
        var _this = this;
        var textHeight = this._measurer.measure().height;
        var table = new LegendTable(width, height, this._padding);
        var entryNames = this._colorScale.domain().slice().sort(function (a, b) { return _this._comparator(_this._formatter(a), _this._formatter(b)); });
        var row = new LegendRow();
        table.addRow(row);
        row.bottomPadding = this._rowBottomPadding;
        entryNames.forEach(function (name, index) {
            if (row.columns.length / 2 === _this.maxEntriesPerRow()) {
                // we add two columns per entry, a symbol column and a name column
                // if the current row is full, according to the number of entries
                // we're allowed to have per row, we need to allocate new space
                row = new LegendRow();
                row.bottomPadding = _this._rowBottomPadding;
                table.addRow(row);
            }
            var availableWidth = row.getWidthAvailable();
            var formattedName = _this._formatter(name);
            // this is the width of the series name without any line wrapping
            // it is the most optimal presentation of the name
            var unwrappedNameWidth = _this._measurer.measure(formattedName).width;
            var willBeSquished = (availableWidth - textHeight - unwrappedNameWidth) < 0;
            if (willBeSquished && row.columns.length > 1) {
                // adding the entry to this row will squish this
                // entry. The row already contains entries so create
                // a new row to add this entry to for optimal display
                row = new LegendRow();
                row.bottomPadding = _this._rowBottomPadding;
                table.addRow(row);
            }
            var symbolColumn = { width: textHeight, height: textHeight, data: { name: name, type: "symbol" } };
            row.addColumn(symbolColumn);
            // the space consumed by the name field is the minimum of the space available in the table
            // and the actual width consumed by the name
            availableWidth = row.getWidthAvailable();
            var usedNameWidth = Math.min(availableWidth, unwrappedNameWidth);
            _this._wrapper.maxLines(_this.maxLinesPerEntry());
            var numberOfRows = _this._wrapper.wrap(formattedName, _this._measurer, usedNameWidth).noLines;
            var nameColumnHeight = numberOfRows * textHeight;
            var nameColumn = { width: usedNameWidth, height: nameColumnHeight, data: { name: name, type: "text" } };
            row.addColumn(nameColumn);
        });
        return table;
    };
    Legend.prototype.requestedSpace = function (offeredWidth, offeredHeight) {
        // if max width is set, the table is guaranteed to be at most maxWidth wide.
        // if max width is not set, the table will be as wide as the longest untruncated row
        var table = this._buildLegendTable(Utils.Math.min([this.maxWidth(), offeredWidth], offeredWidth), offeredHeight);
        return {
            minHeight: table.getHeight(),
            minWidth: table.getWidth(),
        };
    };
    /**
     * Gets the Entities (representing Legend entries) at a particular point.
     * Returns an empty array if no Entities are present at that location.
     *
     * @param {Point} p
     * @returns {Entity<Legend>[]}
     */
    Legend.prototype.entitiesAt = function (p) {
        var _this = this;
        if (!this._isSetup) {
            return [];
        }
        var table = this._buildLegendTable(this.width(), this.height());
        return table.rows.reduce(function (entity, row, rowIndex) {
            if (entity.length !== 0) {
                // we've already found the nearest entity; just return it.
                return entity;
            }
            var rowBounds = table.getRowBounds(rowIndex);
            var withinRow = Utils.Math.within(p, rowBounds);
            if (!withinRow) {
                // the nearest entity isn't within this row, continue;
                return entity;
            }
            return row.columns.reduce(function (entity, column, columnIndex) {
                var columnBounds = table.getColumnBounds(rowIndex, columnIndex);
                var withinColumn = Utils.Math.within(p, columnBounds);
                if (withinColumn) {
                    var rowElement = _this.content().selectAll("." + Legend.LEGEND_ROW_CLASS).nodes()[rowIndex];
                    // HACKHACK The 2.x API chooses the symbol element as the "selection" to return, regardless of what
                    // was actually selected
                    var entryElement = d3.select(rowElement)
                        .selectAll("." + Legend.LEGEND_ENTRY_CLASS).nodes()[Math.floor(columnIndex / 2)];
                    var symbolElement = d3.select(entryElement).select("." + Legend.LEGEND_SYMBOL_CLASS);
                    // HACKHACK The 2.x API returns the center {x, y} of the symbol as the position.
                    var rowTranslate = Utils.DOM.getTranslateValues(d3.select(rowElement));
                    var symbolTranslate = Utils.DOM.getTranslateValues(symbolElement);
                    return [{
                            datum: column.data.name,
                            position: {
                                x: rowTranslate[0] + symbolTranslate[0],
                                y: rowTranslate[1] + symbolTranslate[1],
                            },
                            selection: d3.select(entryElement),
                            component: _this,
                        }];
                }
                return entity;
            }, entity);
        }, []);
    };
    Legend.prototype.renderImmediately = function () {
        _super.prototype.renderImmediately.call(this);
        var table = this._buildLegendTable(this.width(), this.height());
        // clear content from previous renders
        this.content().selectAll("*").remove();
        var rowsUpdate = this.content().selectAll("g." + Legend.LEGEND_ROW_CLASS).data(table.rows);
        var rows = rowsUpdate
            .enter()
            .append("g")
            .classed(Legend.LEGEND_ROW_CLASS, true)
            .merge(rowsUpdate);
        rowsUpdate.exit().remove();
        rows.attr("transform", function (row, rowIndex) {
            var rowBounds = table.getRowBounds(rowIndex);
            return "translate(" + rowBounds.topLeft.x + ", " + rowBounds.topLeft.y + ")";
        });
        var self = this;
        rows.each(function (row, rowIndex) {
            var symbolEntryPairs = [];
            for (var i = 0; i < row.columns.length; i += 2) {
                symbolEntryPairs.push([row.columns[i], row.columns[i + 1]]);
            }
            var entriesUpdate = d3.select(this).selectAll("g." + Legend.LEGEND_ENTRY_CLASS).data(symbolEntryPairs);
            var entriesEnter = entriesUpdate
                .enter()
                .append("g")
                .classed(Legend.LEGEND_ENTRY_CLASS, true)
                .merge(entriesUpdate);
            entriesEnter.append("path")
                .attr("d", function (symbolEntryPair, columnIndex) {
                var symbol = symbolEntryPair[0];
                return self.symbol()(symbol.data.name, rowIndex)(symbol.height * 0.6)(null);
            })
                .attr("transform", function (symbolEntryPair, i) {
                var symbol = symbolEntryPair[0];
                var columnIndex = table.rows[rowIndex].columns.indexOf(symbol);
                var columnBounds = table.getColumnBounds(rowIndex, columnIndex);
                return "translate(" + (columnBounds.topLeft.x + symbol.width / 2) + ", " + symbol.height / 2 + ")";
            })
                .attr("fill", function (symbolEntryPair) { return self._colorScale.scale(symbolEntryPair[0].data.name); })
                .attr("opacity", function (symbolEntryPair, _columnIndex) {
                return self.symbolOpacity()(symbolEntryPair[0].data.name, rowIndex);
            })
                .classed(Legend.LEGEND_SYMBOL_CLASS, true);
            entriesEnter.append("g").classed("text-container", true)
                .attr("transform", function (symbolEntryPair, i) {
                var entry = symbolEntryPair[1];
                var columnIndex = table.rows[rowIndex].columns.indexOf(entry);
                var columnBounds = table.getColumnBounds(rowIndex, columnIndex);
                return "translate(" + columnBounds.topLeft.x + ", 0)";
            })
                .each(function (symbolEntryPair, i, rowIndex) {
                var textContainer = d3.select(this);
                var column = symbolEntryPair[1];
                var writeOptions = {
                    xAlign: "left",
                    yAlign: "top",
                    textRotation: 0,
                };
                self._writer.write(self._formatter(column.data.name), column.width, self.height(), writeOptions, textContainer.node());
            });
            entriesUpdate.exit().remove();
        });
        return this;
    };
    Legend.prototype.symbol = function (symbol) {
        if (symbol == null) {
            return this._symbolFactoryAccessor;
        }
        else {
            this._symbolFactoryAccessor = symbol;
            this.render();
            return this;
        }
    };
    Legend.prototype.symbolOpacity = function (symbolOpacity) {
        if (symbolOpacity == null) {
            return this._symbolOpacityAccessor;
        }
        else if (typeof symbolOpacity === "number") {
            this._symbolOpacityAccessor = function () { return symbolOpacity; };
        }
        else {
            this._symbolOpacityAccessor = symbolOpacity;
        }
        this.render();
        return this;
    };
    Legend.prototype.fixedWidth = function () {
        return true;
    };
    Legend.prototype.fixedHeight = function () {
        return true;
    };
    Legend.prototype.invalidateCache = function () {
        this._measurer.reset();
    };
    return Legend;
}(component_1.Component));
/**
 * The css class applied to each legend row
 */
Legend.LEGEND_ROW_CLASS = "legend-row";
/**
 * The css class applied to each legend entry
 */
Legend.LEGEND_ENTRY_CLASS = "legend-entry";
/**
 * The css class applied to each legend symbol
 */
Legend.LEGEND_SYMBOL_CLASS = "legend-symbol";
exports.Legend = Legend;
