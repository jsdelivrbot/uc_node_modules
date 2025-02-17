/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var HtmlUtils = (function () {
    function HtmlUtils() {
    }
    /**
     * Appends an HTML element with the specified tag name to the provided element.
     * The variadic classnames are added to the new element.
     *
     * Returns the new element.
     */
    HtmlUtils.append = function (element, tagName) {
        var classNames = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            classNames[_i - 2] = arguments[_i];
        }
        var child = HtmlUtils.create.apply(HtmlUtils, [tagName].concat(classNames));
        element.appendChild(child);
        return child;
    };
    /**
     * Creates and returns a new HTMLElement with the attached classnames.
     */
    HtmlUtils.create = function (tagName) {
        var classNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classNames[_i - 1] = arguments[_i];
        }
        var element = document.createElement(tagName);
        HtmlUtils.addClasses.apply(HtmlUtils, [element].concat(classNames));
        return element;
    };
    /**
     * Adds the variadic classnames to the Element
     */
    HtmlUtils.addClasses = function (element) {
        var classNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classNames[_i - 1] = arguments[_i];
        }
        classNames = classNames.filter(function (c) { return c != null; });
        if (element.classList != null) {
            classNames.forEach(function (className) {
                element.classList.add(className);
            });
        }
        else {
            // IE 11 does not support classList
            element.setAttribute("class", classNames.join(" "));
        }
    };
    /**
     * Returns the width/height of HTMLElement's bounding box
     */
    HtmlUtils.getDimensions = function (element) {
        // using feature detection, safely return the bounding box dimensions of the
        // provided html element
        if (element.getBoundingClientRect) {
            try {
                var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height;
                // copy to prevent NoModificationAllowedError
                return { width: width, height: height };
            }
            catch (err) {
            }
        }
        // if can't get valid bbox, return 0,0
        return { height: 0, width: 0 };
    };
    return HtmlUtils;
}());
exports.HtmlUtils = HtmlUtils;
/**
 * A typesetter context for HTML.
 */
var HtmlContext = (function () {
    /**
     * @param element - The CSS font styles applied to `element` will determine the
     * size of text measurements. Also the default text block container.
     * @param className - added to new text blocks
     * @param addTitle - enable title attribute to be added to new text blocks.
     */
    function HtmlContext(element, className, addTitle) {
        if (addTitle === void 0) { addTitle = false; }
        var _this = this;
        this.element = element;
        this.className = className;
        this.addTitle = addTitle;
        this.createRuler = function () {
            return function (text) {
                var textElement = HtmlUtils.append(_this.element, "span", "text-tmp", _this.className);
                textElement.textContent = text;
                var dimensions = HtmlUtils.getDimensions(textElement);
                _this.element.removeChild(textElement); // element.remove() doesn't work in IE11
                return dimensions;
            };
        };
        this.createPen = function (text, transform, element) {
            if (element == null) {
                element = _this.element;
            }
            var textBlock = HtmlUtils.append(element, "div", "text-block", _this.className);
            textBlock.style.position = "relative";
            textBlock.style.transform =
                "translate(0, -1em) " +
                    ("translate(" + transform.translate[0] + "px, " + transform.translate[1] + "px) ") +
                    ("rotate(" + transform.rotate + "deg)");
            // This awkward transform origin matches the SVG origin
            textBlock.style.transformOrigin = "0 1.2em";
            // attach optional title
            if (_this.addTitle) {
                textBlock.setAttribute("title", text);
            }
            return _this.createHtmlLinePen(textBlock);
        };
    }
    HtmlContext.prototype.setAddTitle = function (addTitle) {
        this.addTitle = addTitle;
    };
    HtmlContext.prototype.createHtmlLinePen = function (textBlock) {
        return {
            write: function (line, width, xAlign, xOffset, yOffset) {
                var textLine = HtmlUtils.append(textBlock, "div", "text-line");
                textLine.textContent = line;
                textLine.style.width = width + "px";
                textLine.style.textAlign = xAlign;
                textLine.style.position = "absolute";
                textLine.style.whiteSpace = "nowrap";
                textLine.style.top = yOffset + "px";
                textLine.style.left = xOffset + "px";
            },
        };
    };
    return HtmlContext;
}());
exports.HtmlContext = HtmlContext;
//# sourceMappingURL=html.js.map