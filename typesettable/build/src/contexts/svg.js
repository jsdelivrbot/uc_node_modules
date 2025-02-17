/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var writers_1 = require("../writers");
var html_1 = require("./html");
var SvgUtils = (function () {
    function SvgUtils() {
    }
    /**
     * Appends an SVG element with the specified tag name to the provided element.
     * The variadic classnames are added to the new element.
     *
     * Returns the new element.
     */
    SvgUtils.append = function (element, tagName) {
        var classNames = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            classNames[_i - 2] = arguments[_i];
        }
        var child = SvgUtils.create.apply(SvgUtils, [tagName].concat(classNames));
        element.appendChild(child);
        return child;
    };
    /**
     * Creates and returns a new SVGElement with the attached classnames.
     */
    SvgUtils.create = function (tagName) {
        var classNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classNames[_i - 1] = arguments[_i];
        }
        var element = document.createElementNS(SvgUtils.SVG_NS, tagName);
        html_1.HtmlUtils.addClasses.apply(html_1.HtmlUtils, [element].concat(classNames));
        return element;
    };
    /**
     * Returns the width/height of svg element's bounding box
     */
    SvgUtils.getDimensions = function (element) {
        // using feature detection, safely return the bounding box dimensions of the
        // provided svg element
        if (element.getBBox) {
            try {
                var _a = element.getBBox(), width = _a.width, height = _a.height;
                // copy to prevent NoModificationAllowedError
                return { width: width, height: height };
            }
            catch (err) {
            }
        }
        // if can't get valid bbox, return 0,0
        return { height: 0, width: 0 };
    };
    return SvgUtils;
}());
SvgUtils.SVG_NS = "http://www.w3.org/2000/svg";
exports.SvgUtils = SvgUtils;
/**
 * A typesetter context for SVG.
 *
 * @param element - The CSS font styles applied to `element` will determine the
 * size of text measurements. Also the default text block container.
 * @param className - added to new text blocks
 * @param addTitleElement - enable title tags to be added to new text blocks.
 */
var SvgContext = (function () {
    function SvgContext(element, className, addTitleElement) {
        if (addTitleElement === void 0) { addTitleElement = false; }
        var _this = this;
        this.element = element;
        this.className = className;
        this.addTitleElement = addTitleElement;
        this.createRuler = function () {
            var _a = _this.getTextElements(_this.element), parentElement = _a.parentElement, containerElement = _a.containerElement, textElement = _a.textElement;
            return function (text) {
                parentElement.appendChild(containerElement);
                textElement.textContent = text;
                var dimensions = SvgUtils.getDimensions(textElement);
                parentElement.removeChild(containerElement); // element.remove() doesn't work in IE11
                return dimensions;
            };
        };
        this.createPen = function (text, transform, element) {
            if (element == null) {
                element = _this.element;
            }
            var textContainer = SvgUtils.append(element, "g", "text-container", _this.className);
            // attach optional title
            if (_this.addTitleElement) {
                SvgUtils.append(textContainer, "title").textContent = text;
                textContainer.setAttribute("title", text);
            }
            // create and transform text block group
            var textBlockGroup = SvgUtils.append(textContainer, "g", "text-area");
            textBlockGroup.setAttribute("transform", "translate(" + transform.translate[0] + "," + transform.translate[1] + ")" +
                ("rotate(" + transform.rotate + ")"));
            return _this.createSvgLinePen(textBlockGroup);
        };
    }
    SvgContext.prototype.setAddTitleElement = function (addTitleElement) {
        this.addTitleElement = addTitleElement;
    };
    SvgContext.prototype.createSvgLinePen = function (textBlockGroup) {
        return {
            write: function (line, width, xAlign, xOffset, yOffset) {
                xOffset += width * writers_1.Writer.XOffsetFactor[xAlign];
                var element = SvgUtils.append(textBlockGroup, "text", "text-line");
                element.textContent = line;
                element.setAttribute("text-anchor", SvgContext.AnchorMap[xAlign]);
                element.setAttribute("transform", "translate(" + xOffset + "," + yOffset + ")");
                element.setAttribute("y", "-0.25em");
            },
        };
    };
    SvgContext.prototype.getTextElements = function (element) {
        // if element is already a text element, return it
        if (element.tagName === "text") {
            var parentElement = element.parentElement;
            if (parentElement == null) {
                parentElement = element.parentNode;
            }
            // must be removed from parent since we re-add it on every measurement
            parentElement.removeChild(element);
            return {
                containerElement: element,
                parentElement: parentElement,
                textElement: element,
            };
        }
        // if element has a text element descendent, select it and return it
        var selected = element.querySelector("text");
        if (selected != null) {
            var parentElement = element.parentElement;
            if (parentElement == null) {
                parentElement = element.parentNode;
            }
            // must be removed from parent since we re-add it on every measurement
            parentElement.removeChild(element);
            return {
                containerElement: element,
                parentElement: parentElement,
                textElement: selected,
            };
        }
        // otherwise create a new text element
        var created = SvgUtils.create("text", this.className);
        return {
            containerElement: created,
            parentElement: element,
            textElement: created,
        };
    };
    return SvgContext;
}());
SvgContext.AnchorMap = {
    center: "middle",
    left: "start",
    right: "end",
};
exports.SvgContext = SvgContext;
//# sourceMappingURL=svg.js.map