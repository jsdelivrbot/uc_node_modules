/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 *
 * @fileoverview manually add d3-selection-multi to d3 default bundle. Most of this code is
 * copied from d3-selection-multi@1.0.0.
 * See https://github.com/d3/d3-selection-multi/issues/11 for why we have to do this
 */
"use strict";
var d3 = require("d3");
var d3Selection = d3;
var d3Transition = d3;
function attrsFunction(selection, map) {
    return selection.each(function () {
        var x = map.apply(this, arguments), s = d3Selection.select(this);
        for (var name_1 in x)
            s.attr(name_1, x[name_1]);
    });
}
function attrsObject(selection, map) {
    for (var name_2 in map)
        selection.attr(name_2, map[name_2]);
    return selection;
}
function selection_attrs(map) {
    return (typeof map === "function" ? attrsFunction : attrsObject)(this, map);
}
function stylesFunction(selection, map, priority) {
    return selection.each(function () {
        var x = map.apply(this, arguments), s = d3Selection.select(this);
        for (var name_3 in x)
            s.style(name_3, x[name_3], priority);
    });
}
function stylesObject(selection, map, priority) {
    for (var name_4 in map)
        selection.style(name_4, map[name_4], priority);
    return selection;
}
function selection_styles(map, priority) {
    return (typeof map === "function" ? stylesFunction : stylesObject)(this, map, priority == null ? "" : priority);
}
function propertiesFunction(selection, map) {
    return selection.each(function () {
        var x = map.apply(this, arguments), s = d3Selection.select(this);
        for (var name_5 in x)
            s.property(name_5, x[name_5]);
    });
}
function propertiesObject(selection, map) {
    for (var name_6 in map)
        selection.property(name_6, map[name_6]);
    return selection;
}
function selection_properties(map) {
    return (typeof map === "function" ? propertiesFunction : propertiesObject)(this, map);
}
function attrsFunction$1(transition, map) {
    return transition.each(function () {
        var x = map.apply(this, arguments), t = d3Selection.select(this).transition(transition);
        for (var name_7 in x)
            t.attr(name_7, x[name_7]);
    });
}
function attrsObject$1(transition, map) {
    for (var name_8 in map)
        transition.attr(name_8, map[name_8]);
    return transition;
}
function transition_attrs(map) {
    return (typeof map === "function" ? attrsFunction$1 : attrsObject$1)(this, map);
}
function stylesFunction$1(transition, map, priority) {
    return transition.each(function () {
        var x = map.apply(this, arguments), t = d3Selection.select(this).transition(transition);
        for (var name_9 in x)
            t.style(name_9, x[name_9], priority);
    });
}
function stylesObject$1(transition, map, priority) {
    for (var name_10 in map)
        transition.style(name_10, map[name_10], priority);
    return transition;
}
function transition_styles(map, priority) {
    return (typeof map === "function" ? stylesFunction$1 : stylesObject$1)(this, map, priority == null ? "" : priority);
}
d3Selection.selection.prototype.attrs = selection_attrs;
d3Selection.selection.prototype.styles = selection_styles;
d3Selection.selection.prototype.properties = selection_properties;
d3Transition.transition.prototype.attrs = transition_attrs;
d3Transition.transition.prototype.styles = transition_styles;
