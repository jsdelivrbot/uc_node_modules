"use strict";
var d3 = require("d3");
/**
 * Coerce possibly external d3 instance into our own instance of d3 so we can use d3-selection-multi.
 * See https://github.com/d3/d3-selection-multi/issues/11 for why we have to do this.
 *
 * Any public facing API that accepts a d3 selection should first pass that user-supplied selection
 * through here - this ensures all selection objects that go through the Plottable codebase are "vetted".
 */
function coerceExternalD3(externalD3Selection) {
    // if .attrs isn't defined; convert the selection
    if (externalD3Selection.attrs == null) {
        if (externalD3Selection.nodes == null) {
            // nodes isn't defined; this is probably a d3v3 selection. handle it accordingly
            var nodes_1 = [];
            externalD3Selection.each(function () {
                nodes_1.push(this);
            });
            return d3.selectAll(nodes_1);
        }
        else {
            return d3.selectAll(externalD3Selection.nodes());
        }
    }
    else {
        return externalD3Selection;
    }
}
exports.coerceExternalD3 = coerceExternalD3;
