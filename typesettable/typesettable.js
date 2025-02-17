(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Typesetter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var writers_1 = require("../writers");
var DEFAULT_FILL_COLOR = "#444";
/**
 * A typesetter context for HTML5 Canvas.
 *
 * Due to the Canvas API, you must explicitly define the line height, and any
 * styling for the font must also be explicitly defined in the optional
 * `ICanvasFontStyle` object.
 */
var CanvasContext = (function () {
    function CanvasContext(ctx, lineHeight, style) {
        if (lineHeight === void 0) { lineHeight = 10; }
        if (style === void 0) { style = {}; }
        var _this = this;
        this.ctx = ctx;
        this.lineHeight = lineHeight;
        this.style = style;
        this.createRuler = function () {
            return function (text) {
                _this.ctx.font = _this.style.font;
                var width = _this.ctx.measureText(text).width;
                return { width: width, height: _this.lineHeight };
            };
        };
        this.createPen = function (_text, transform, ctx) {
            if (ctx == null) {
                ctx = _this.ctx;
            }
            ctx.save();
            ctx.translate(transform.translate[0], transform.translate[1]);
            ctx.rotate(transform.rotate * Math.PI / 180.0);
            return _this.createCanvasPen(ctx);
        };
        if (this.style.fill === undefined) {
            this.style.fill = DEFAULT_FILL_COLOR;
        }
    }
    CanvasContext.prototype.createCanvasPen = function (ctx) {
        var _this = this;
        return {
            destroy: function () {
                ctx.restore();
            },
            write: function (line, width, xAlign, xOffset, yOffset) {
                xOffset += width * writers_1.Writer.XOffsetFactor[xAlign];
                ctx.textAlign = xAlign;
                if (_this.style.font != null) {
                    ctx.font = _this.style.font;
                }
                if (_this.style.fill != null) {
                    ctx.fillStyle = _this.style.fill;
                    ctx.fillText(line, xOffset, yOffset);
                }
                if (_this.style.stroke != null) {
                    ctx.strokeStyle = _this.style.fill;
                    ctx.strokeText(line, xOffset, yOffset);
                }
            },
        };
    };
    return CanvasContext;
}());
exports.CanvasContext = CanvasContext;

},{"../writers":21}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./svg"));
__export(require("./canvas"));
__export(require("./html"));

},{"./canvas":1,"./html":2,"./svg":4}],4:[function(require,module,exports){
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

},{"../writers":21,"./html":2}],5:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./contexts"));
__export(require("./measurers"));
__export(require("./typesetter"));
__export(require("./utils"));
__export(require("./wrappers"));
__export(require("./writers"));

},{"./contexts":3,"./measurers":10,"./typesetter":12,"./utils":14,"./wrappers":18,"./writers":21}],6:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
;
var AbstractMeasurer = (function () {
    function AbstractMeasurer(ruler) {
        if (ruler.createRuler != null) {
            this.ruler = ruler.createRuler();
        }
        else {
            this.ruler = ruler;
        }
    }
    AbstractMeasurer.prototype.measure = function (text) {
        if (text === void 0) { text = AbstractMeasurer.HEIGHT_TEXT; }
        return this.ruler(text);
    };
    return AbstractMeasurer;
}());
/**
 * A string representing the full ascender/descender range of your text.
 *
 * Note that this is really only applicable to western alphabets. If you are
 * using a different locale language such as arabic or chinese, you may want
 * to override this.
 */
AbstractMeasurer.HEIGHT_TEXT = "bdpql";
exports.AbstractMeasurer = AbstractMeasurer;

},{}],7:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("../utils");
var characterMeasurer_1 = require("./characterMeasurer");
var CacheCharacterMeasurer = (function (_super) {
    __extends(CacheCharacterMeasurer, _super);
    function CacheCharacterMeasurer(ruler, useGuards) {
        var _this = _super.call(this, ruler, useGuards) || this;
        _this.cache = new utils_1.Cache(function (c) {
            return _this._measureCharacterNotFromCache(c);
        });
        return _this;
    }
    CacheCharacterMeasurer.prototype._measureCharacterNotFromCache = function (c) {
        return _super.prototype._measureCharacter.call(this, c);
    };
    CacheCharacterMeasurer.prototype._measureCharacter = function (c) {
        return this.cache.get(c);
    };
    CacheCharacterMeasurer.prototype.reset = function () {
        this.cache.clear();
    };
    return CacheCharacterMeasurer;
}(characterMeasurer_1.CharacterMeasurer));
exports.CacheCharacterMeasurer = CacheCharacterMeasurer;

},{"../utils":14,"./characterMeasurer":9}],8:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils_1 = require("../utils");
var abstractMeasurer_1 = require("./abstractMeasurer");
var cacheCharacterMeasurer_1 = require("./cacheCharacterMeasurer");
var CacheMeasurer = (function (_super) {
    __extends(CacheMeasurer, _super);
    function CacheMeasurer(ruler) {
        var _this = _super.call(this, ruler) || this;
        _this.dimCache = new utils_1.Cache(function (s) {
            return _this._measureNotFromCache(s);
        });
        return _this;
    }
    CacheMeasurer.prototype._measureNotFromCache = function (s) {
        return _super.prototype.measure.call(this, s);
    };
    CacheMeasurer.prototype.measure = function (s) {
        if (s === void 0) { s = abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT; }
        return this.dimCache.get(s);
    };
    CacheMeasurer.prototype.reset = function () {
        this.dimCache.clear();
        _super.prototype.reset.call(this);
    };
    return CacheMeasurer;
}(cacheCharacterMeasurer_1.CacheCharacterMeasurer));
exports.CacheMeasurer = CacheMeasurer;

},{"../utils":14,"./abstractMeasurer":6,"./cacheCharacterMeasurer":7}],9:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var measurer_1 = require("./measurer");
var CharacterMeasurer = (function (_super) {
    __extends(CharacterMeasurer, _super);
    function CharacterMeasurer() {
        return _super.apply(this, arguments) || this;
    }
    CharacterMeasurer.prototype._measureCharacter = function (c) {
        return _super.prototype._measureLine.call(this, c);
    };
    CharacterMeasurer.prototype._measureLine = function (line) {
        var _this = this;
        var charactersDimensions = line.split("").map(function (c) { return _this._measureCharacter(c); });
        return {
            height: charactersDimensions.reduce(function (acc, dim) { return Math.max(acc, dim.height); }, 0),
            width: charactersDimensions.reduce(function (acc, dim) { return acc + dim.width; }, 0),
        };
    };
    return CharacterMeasurer;
}(measurer_1.Measurer));
exports.CharacterMeasurer = CharacterMeasurer;

},{"./measurer":11}],10:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./abstractMeasurer"));
__export(require("./cacheCharacterMeasurer"));
__export(require("./cacheMeasurer"));
__export(require("./characterMeasurer"));
__export(require("./measurer"));

},{"./abstractMeasurer":6,"./cacheCharacterMeasurer":7,"./cacheMeasurer":8,"./characterMeasurer":9,"./measurer":11}],11:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstractMeasurer_1 = require("./abstractMeasurer");
var Measurer = (function (_super) {
    __extends(Measurer, _super);
    function Measurer(ruler, useGuards) {
        if (useGuards === void 0) { useGuards = false; }
        var _this = _super.call(this, ruler) || this;
        _this.useGuards = useGuards;
        return _this;
    }
    // Guards assures same line height and width of whitespaces on both ends.
    Measurer.prototype._addGuards = function (text) {
        return abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT + text + abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT;
    };
    Measurer.prototype._measureLine = function (line, forceGuards) {
        if (forceGuards === void 0) { forceGuards = false; }
        var useGuards = this.useGuards || forceGuards || /^[\t ]$/.test(line);
        var measuredLine = useGuards ? this._addGuards(line) : line;
        var measuredLineDimensions = _super.prototype.measure.call(this, measuredLine);
        measuredLineDimensions.width -= useGuards ? (2 * this.getGuardWidth()) : 0;
        return measuredLineDimensions;
    };
    Measurer.prototype.measure = function (text) {
        var _this = this;
        if (text === void 0) { text = abstractMeasurer_1.AbstractMeasurer.HEIGHT_TEXT; }
        if (text.trim() === "") {
            return { width: 0, height: 0 };
        }
        var linesDimensions = text.trim().split("\n").map(function (line) { return _this._measureLine(line); });
        return {
            height: linesDimensions.reduce(function (acc, dim) { return acc + dim.height; }, 0),
            width: linesDimensions.reduce(function (acc, dim) { return Math.max(acc, dim.width); }, 0),
        };
    };
    Measurer.prototype.getGuardWidth = function () {
        if (this.guardWidth == null) {
            this.guardWidth = _super.prototype.measure.call(this).width;
        }
        return this.guardWidth;
    };
    return Measurer;
}(abstractMeasurer_1.AbstractMeasurer));
exports.Measurer = Measurer;

},{"./abstractMeasurer":6}],12:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var contexts_1 = require("./contexts");
var measurers_1 = require("./measurers");
var wrappers_1 = require("./wrappers");
var writers_1 = require("./writers");
/**
 * This is a convenience interface for typesetting strings using the default
 * measurer/wrapper/writer setup.
 */
var Typesetter = (function () {
    function Typesetter(context) {
        this.context = context;
        this.measurer = new measurers_1.CacheMeasurer(this.context);
        this.wrapper = new wrappers_1.Wrapper();
        this.writer = new writers_1.Writer(this.measurer, this.context, this.wrapper);
    }
    Typesetter.svg = function (element, className, addTitleElement) {
        return new Typesetter(new contexts_1.SvgContext(element, className, addTitleElement));
    };
    Typesetter.canvas = function (ctx, lineHeight, style) {
        return new Typesetter(new contexts_1.CanvasContext(ctx, lineHeight, style));
    };
    Typesetter.html = function (element, className, addTitle) {
        return new Typesetter(new contexts_1.HtmlContext(element, className, addTitle));
    };
    /**
     * Wraps the given string into the width/height and writes it into the
     * canvas or SVG (depending on context).
     *
     * Delegates to `Writer.write` using the internal `ITypesetterContext`.
     */
    Typesetter.prototype.write = function (text, width, height, options, into) {
        this.writer.write(text, width, height, options, into);
    };
    /**
     * Clears the `Measurer`'s CacheMeasurer.
     *
     * Call this if your font style changee in SVG.
     */
    Typesetter.prototype.clearMeasurerCache = function () {
        this.measurer.reset();
    };
    return Typesetter;
}());
exports.Typesetter = Typesetter;

},{"./contexts":3,"./measurers":10,"./wrappers":18,"./writers":21}],13:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var Cache = (function () {
    /**
     * @constructor
     *
     * @param {string} compute The function whose results will be cached.
     */
    function Cache(compute) {
        this.cache = {};
        this.compute = compute;
    }
    /**
     * Attempt to look up k in the cache, computing the result if it isn't
     * found.
     *
     * @param {string} k The key to look up in the cache.
     * @return {T} The value associated with k; the result of compute(k).
     */
    Cache.prototype.get = function (k) {
        if (!this.cache.hasOwnProperty(k)) {
            this.cache[k] = this.compute(k);
        }
        return this.cache[k];
    };
    /**
     * Reset the cache empty.
     *
     * @return {Cache<T>} The calling Cache.
     */
    Cache.prototype.clear = function () {
        this.cache = {};
        return this;
    };
    return Cache;
}());
exports.Cache = Cache;

},{}],14:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./cache"));
__export(require("./methods"));
__export(require("./stringMethods"));
__export(require("./tokenizer"));

},{"./cache":13,"./methods":15,"./stringMethods":16,"./tokenizer":17}],15:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var Methods = (function () {
    function Methods() {
    }
    /**
     * Check if two arrays are equal by strict equality.
     */
    Methods.arrayEq = function (a, b) {
        // Technically, null and undefined are arrays too
        if (a == null || b == null) {
            return a === b;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * @param {any} a Object to check against b for equality.
     * @param {any} b Object to check against a for equality.
     *
     * @returns {boolean} whether or not two objects share the same keys, and
     *          values associated with those keys. Values will be compared
     *          with ===.
     */
    Methods.objEq = function (a, b) {
        if (a == null || b == null) {
            return a === b;
        }
        var keysA = Object.keys(a).sort();
        var keysB = Object.keys(b).sort();
        var valuesA = keysA.map(function (k) { return a[k]; });
        var valuesB = keysB.map(function (k) { return b[k]; });
        return Methods.arrayEq(keysA, keysB) && Methods.arrayEq(valuesA, valuesB);
    };
    Methods.strictEq = function (a, b) {
        return a === b;
    };
    /**
     * Shim for _.defaults
     */
    Methods.defaults = function (target) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        if (target == null) {
            throw new TypeError("Cannot convert undefined or null to object");
        }
        var result = Object(target);
        objects.forEach(function (obj) {
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        result[key] = obj[key];
                    }
                }
            }
        });
        return result;
    };
    return Methods;
}());
exports.Methods = Methods;

},{}],16:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var StringMethods = (function () {
    function StringMethods() {
    }
    /**
     * Treat all sequences of consecutive spaces as a single " ".
     */
    StringMethods.combineWhitespace = function (str) {
        return str.replace(/[ \t]+/g, " ");
    };
    StringMethods.isNotEmptyString = function (str) {
        return str && str.trim() !== "";
    };
    StringMethods.trimStart = function (str, splitter) {
        if (!str) {
            return str;
        }
        var chars = str.split("");
        var reduceFunction = splitter ? function (s) { return s.split(splitter).some(StringMethods.isNotEmptyString); }
            : StringMethods.isNotEmptyString;
        return chars.reduce(function (s, c) { return reduceFunction(s + c) ? s + c : s; }, "");
    };
    StringMethods.trimEnd = function (str, c) {
        if (!str) {
            return str;
        }
        var reversedChars = str.split("");
        reversedChars.reverse();
        reversedChars = StringMethods.trimStart(reversedChars.join(""), c).split("");
        reversedChars.reverse();
        return reversedChars.join("");
    };
    return StringMethods;
}());
exports.StringMethods = StringMethods;

},{}],17:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var Tokenizer = (function () {
    function Tokenizer() {
        this.WordDividerRegExp = new RegExp("\\W");
        this.WhitespaceRegExp = new RegExp("\\s");
    }
    Tokenizer.prototype.tokenize = function (line) {
        var _this = this;
        return line.split("").reduce(function (tokens, c) {
            return tokens.slice(0, -1).concat(_this.shouldCreateNewToken(tokens[tokens.length - 1], c));
        }, [""]);
    };
    Tokenizer.prototype.shouldCreateNewToken = function (token, newCharacter) {
        if (!token) {
            return [newCharacter];
        }
        var lastCharacter = token[token.length - 1];
        if (this.WhitespaceRegExp.test(lastCharacter) && this.WhitespaceRegExp.test(newCharacter)) {
            return [token + newCharacter];
        }
        else if (this.WhitespaceRegExp.test(lastCharacter) || this.WhitespaceRegExp.test(newCharacter)) {
            return [token, newCharacter];
        }
        else if (!(this.WordDividerRegExp.test(lastCharacter) || this.WordDividerRegExp.test(newCharacter))) {
            return [token + newCharacter];
        }
        else if (lastCharacter === newCharacter) {
            return [token + newCharacter];
        }
        else {
            return [token, newCharacter];
        }
    };
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;

},{}],18:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./singleLineWrapper"));
__export(require("./wrapper"));

},{"./singleLineWrapper":19,"./wrapper":20}],19:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wrapper_1 = require("./wrapper");
var SingleLineWrapper = (function (_super) {
    __extends(SingleLineWrapper, _super);
    function SingleLineWrapper() {
        return _super.apply(this, arguments) || this;
    }
    SingleLineWrapper.prototype.wrap = function (text, measurer, width, height) {
        var _this = this;
        if (height === void 0) { height = Infinity; }
        var lines = text.split("\n");
        if (lines.length > 1) {
            throw new Error("SingleLineWrapper is designed to work only on single line");
        }
        var wrapFN = function (w) { return _super.prototype.wrap.call(_this, text, measurer, w, height); };
        var result = wrapFN(width);
        if (result.noLines < 2) {
            return result;
        }
        var left = 0;
        var right = width;
        for (var i = 0; i < SingleLineWrapper.NO_WRAP_ITERATIONS && right > left; ++i) {
            var currentWidth = (right + left) / 2;
            var currentResult = wrapFN(currentWidth);
            if (this.areSameResults(result, currentResult)) {
                right = currentWidth;
                result = currentResult;
            }
            else {
                left = currentWidth;
            }
        }
        return result;
    };
    SingleLineWrapper.prototype.areSameResults = function (one, two) {
        return one.noLines === two.noLines && one.truncatedText === two.truncatedText;
    };
    return SingleLineWrapper;
}(wrapper_1.Wrapper));
SingleLineWrapper.NO_WRAP_ITERATIONS = 5;
exports.SingleLineWrapper = SingleLineWrapper;

},{"./wrapper":20}],20:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var Utils = require("../utils");
var Wrapper = (function () {
    function Wrapper() {
        this.maxLines(Infinity);
        this.textTrimming("ellipsis");
        this.allowBreakingWords(true);
        this._tokenizer = new Utils.Tokenizer();
        this._breakingCharacter = "-";
    }
    Wrapper.prototype.maxLines = function (noLines) {
        if (noLines == null) {
            return this._maxLines;
        }
        else {
            this._maxLines = noLines;
            return this;
        }
    };
    Wrapper.prototype.textTrimming = function (option) {
        if (option == null) {
            return this._textTrimming;
        }
        else {
            if (option !== "ellipsis" && option !== "none") {
                throw new Error(option + " - unsupported text trimming option.");
            }
            this._textTrimming = option;
            return this;
        }
    };
    Wrapper.prototype.allowBreakingWords = function (allow) {
        if (allow == null) {
            return this._allowBreakingWords;
        }
        else {
            this._allowBreakingWords = allow;
            return this;
        }
    };
    Wrapper.prototype.wrap = function (text, measurer, width, height) {
        var _this = this;
        if (height === void 0) { height = Infinity; }
        var initialWrappingResult = {
            noBrokeWords: 0,
            noLines: 0,
            originalText: text,
            truncatedText: "",
            wrappedText: "",
        };
        var state = {
            availableLines: Math.min(Math.floor(height / measurer.measure().height), this._maxLines),
            availableWidth: width,
            canFitText: true,
            currentLine: "",
            wrapping: initialWrappingResult,
        };
        var lines = text.split("\n");
        return lines.reduce(function (s, line, i) {
            return _this.breakLineToFitWidth(s, line, i !== lines.length - 1, measurer);
        }, state).wrapping;
    };
    Wrapper.prototype.breakLineToFitWidth = function (state, line, hasNextLine, measurer) {
        var _this = this;
        if (!state.canFitText && state.wrapping.truncatedText !== "") {
            state.wrapping.truncatedText += "\n";
        }
        var tokens = this._tokenizer.tokenize(line);
        state = tokens.reduce(function (s, token) {
            return _this.wrapNextToken(token, s, measurer);
        }, state);
        var wrappedText = Utils.StringMethods.trimEnd(state.currentLine);
        state.wrapping.noLines += +(wrappedText !== "");
        if (state.wrapping.noLines === state.availableLines && this._textTrimming !== "none" && hasNextLine) {
            // Note: no need to add more ellipses, they were added in `wrapNextToken`
            state.canFitText = false;
        }
        else {
            state.wrapping.wrappedText += wrappedText;
        }
        state.currentLine = "\n";
        return state;
    };
    Wrapper.prototype.canFitToken = function (token, width, measurer) {
        var _this = this;
        var possibleBreaks = this._allowBreakingWords ?
            token.split("").map(function (c, i) { return (i !== token.length - 1) ? c + _this._breakingCharacter : c; })
            : [token];
        return (measurer.measure(token).width <= width) || possibleBreaks.every(function (c) { return measurer.measure(c).width <= width; });
    };
    Wrapper.prototype.addEllipsis = function (line, width, measurer) {
        if (this._textTrimming === "none") {
            return {
                remainingToken: "",
                wrappedToken: line,
            };
        }
        var truncatedLine = line.substring(0).trim();
        var lineWidth = measurer.measure(truncatedLine).width;
        var ellipsesWidth = measurer.measure("...").width;
        var prefix = (line.length > 0 && line[0] === "\n") ? "\n" : "";
        if (width <= ellipsesWidth) {
            var periodWidth = ellipsesWidth / 3;
            var numPeriodsThatFit = Math.floor(width / periodWidth);
            return {
                remainingToken: line,
                wrappedToken: prefix + "...".substr(0, numPeriodsThatFit),
            };
        }
        while (lineWidth + ellipsesWidth > width) {
            truncatedLine = Utils.StringMethods.trimEnd(truncatedLine.substr(0, truncatedLine.length - 1));
            lineWidth = measurer.measure(truncatedLine).width;
        }
        return {
            remainingToken: Utils.StringMethods.trimEnd(line.substring(truncatedLine.length), "-").trim(),
            wrappedToken: prefix + truncatedLine + "...",
        };
    };
    Wrapper.prototype.wrapNextToken = function (token, state, measurer) {
        if (!state.canFitText ||
            state.availableLines === state.wrapping.noLines ||
            !this.canFitToken(token, state.availableWidth, measurer)) {
            return this.finishWrapping(token, state, measurer);
        }
        var remainingToken = token;
        while (remainingToken) {
            var result = this.breakTokenToFitInWidth(remainingToken, state.currentLine, state.availableWidth, measurer);
            state.currentLine = result.line;
            remainingToken = result.remainingToken;
            if (remainingToken != null) {
                state.wrapping.noBrokeWords += +result.breakWord;
                ++state.wrapping.noLines;
                if (state.availableLines === state.wrapping.noLines) {
                    var ellipsisResult = this.addEllipsis(state.currentLine, state.availableWidth, measurer);
                    state.wrapping.wrappedText += ellipsisResult.wrappedToken;
                    state.wrapping.truncatedText += ellipsisResult.remainingToken + remainingToken;
                    state.currentLine = "\n";
                    return state;
                }
                else {
                    state.wrapping.wrappedText += Utils.StringMethods.trimEnd(state.currentLine);
                    state.currentLine = "\n";
                }
            }
        }
        return state;
    };
    Wrapper.prototype.finishWrapping = function (token, state, measurer) {
        // Token is really long, but we have a space to put part of the word.
        if (state.canFitText &&
            state.availableLines !== state.wrapping.noLines &&
            this._allowBreakingWords &&
            this._textTrimming !== "none") {
            var res = this.addEllipsis(state.currentLine + token, state.availableWidth, measurer);
            state.wrapping.wrappedText += res.wrappedToken;
            state.wrapping.truncatedText += res.remainingToken;
            state.wrapping.noBrokeWords += +(res.remainingToken.length < token.length);
            state.wrapping.noLines += +(res.wrappedToken.length > 0);
            state.currentLine = "";
        }
        else {
            state.wrapping.truncatedText += token;
        }
        state.canFitText = false;
        return state;
    };
    /**
     * Breaks single token to fit current line.
     * If token contains only whitespaces then they will not be populated to next line.
     */
    Wrapper.prototype.breakTokenToFitInWidth = function (token, line, availableWidth, measurer, breakingCharacter) {
        if (breakingCharacter === void 0) { breakingCharacter = this._breakingCharacter; }
        if (measurer.measure(line + token).width <= availableWidth) {
            return {
                breakWord: false,
                line: line + token,
                remainingToken: null,
            };
        }
        if (token.trim() === "") {
            return {
                breakWord: false,
                line: line,
                remainingToken: "",
            };
        }
        if (!this._allowBreakingWords) {
            return {
                breakWord: false,
                line: line,
                remainingToken: token,
            };
        }
        var fitTokenLength = 0;
        while (fitTokenLength < token.length) {
            if (measurer.measure(line + token.substring(0, fitTokenLength + 1) + breakingCharacter).width <= availableWidth) {
                ++fitTokenLength;
            }
            else {
                break;
            }
        }
        var suffix = "";
        if (fitTokenLength > 0) {
            suffix = breakingCharacter;
        }
        return {
            breakWord: fitTokenLength > 0,
            line: line + token.substring(0, fitTokenLength) + suffix,
            remainingToken: token.substring(fitTokenLength),
        };
    };
    return Wrapper;
}());
exports.Wrapper = Wrapper;

},{"../utils":14}],21:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./writer"));

},{"./writer":22}],22:[function(require,module,exports){
/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the MIT License (the "License"); you may obtain a copy of the
 * license at https://github.com/palantir/typesettable/blob/develop/LICENSE
 */
"use strict";
var utils_1 = require("../utils");
var DEFAULT_WRITE_OPTIONS = {
    textRotation: 0,
    textShear: 0,
    xAlign: "left",
    yAlign: "top",
};
var Writer = (function () {
    function Writer(_measurer, _penFactory, _wrapper) {
        this._measurer = _measurer;
        this._penFactory = _penFactory;
        this._wrapper = _wrapper;
    }
    Writer.prototype.measurer = function (newMeasurer) {
        this._measurer = newMeasurer;
        return this;
    };
    Writer.prototype.wrapper = function (newWrapper) {
        this._wrapper = newWrapper;
        return this;
    };
    Writer.prototype.penFactory = function (newPenFactory) {
        this._penFactory = newPenFactory;
        return this;
    };
    /**
     * Writes the text into the container. If no container is specified, the pen's
     * default container will be used.
     */
    Writer.prototype.write = function (text, width, height, options, container) {
        if (options === void 0) { options = {}; }
        // apply default options
        options = utils_1.Methods.defaults({}, DEFAULT_WRITE_OPTIONS, options);
        // validate input
        if (Writer.SupportedRotation.indexOf(options.textRotation) === -1) {
            throw new Error("unsupported rotation - " + options.textRotation +
                ". Supported rotations are " + Writer.SupportedRotation.join(", "));
        }
        if (options.textShear != null && options.textShear < -80 || options.textShear > 80) {
            throw new Error("unsupported shear angle - " + options.textShear + ". Must be between -80 and 80");
        }
        var orientHorizontally = Math.abs(Math.abs(options.textRotation) - 90) > 45;
        var primaryDimension = orientHorizontally ? width : height;
        var secondaryDimension = orientHorizontally ? height : width;
        // compute shear parameters
        var shearDegrees = options.textShear;
        var shearRadians = shearDegrees * Math.PI / 180;
        var lineHeight = this._measurer.measure().height;
        var shearShift = lineHeight * Math.tan(shearRadians);
        // When we apply text shear, the primary axis grows and the secondary axis
        // shrinks, due to trigonometry. The text shear feature uses the normal
        // wrapping logic with a subsituted bounding box of the corrected size
        // (computed below). When rendering the wrapped lines, we rotate the text
        // container by the text rotation angle AND the shear angle then carefully
        // offset each one so that they are still aligned to the primary alignment
        // option.
        var shearCorrectedPrimaryDimension = primaryDimension / Math.cos(shearRadians) - Math.abs(shearShift);
        var shearCorrectedSecondaryDimension = secondaryDimension * Math.cos(shearRadians);
        // normalize and wrap text
        var normalizedText = utils_1.StringMethods.combineWhitespace(text);
        var wrappedText = this._wrapper ?
            this._wrapper.wrap(normalizedText, this._measurer, shearCorrectedPrimaryDimension, shearCorrectedSecondaryDimension).wrappedText : normalizedText;
        var lines = wrappedText.split("\n");
        // correct the intial x/y offset of the text container accounting shear and alignment
        var shearCorrectedXOffset = Writer.XOffsetFactor[options.xAlign] *
            shearCorrectedPrimaryDimension * Math.sin(shearRadians);
        var shearCorrectedYOffset = Writer.YOffsetFactor[options.yAlign] *
            (shearCorrectedSecondaryDimension - lines.length * lineHeight);
        var shearCorrection = shearCorrectedXOffset - shearCorrectedYOffset;
        // compute transform
        var translate = [0, 0];
        var rotate = options.textRotation + shearDegrees;
        switch (options.textRotation) {
            case 90:
                translate = [width + shearCorrection, 0];
                break;
            case -90:
                translate = [-shearCorrection, height];
                break;
            case 180:
                translate = [width, height + shearCorrection];
                break;
            default:
                translate = [0, -shearCorrection];
                break;
        }
        // create a new pen and write the lines
        var linePen = this._penFactory.createPen(text, { translate: translate, rotate: rotate }, container);
        this.writeLines(lines, linePen, shearCorrectedPrimaryDimension, lineHeight, shearShift, options.xAlign);
        if (linePen.destroy != null) {
            linePen.destroy();
        }
    };
    Writer.prototype.writeLines = function (lines, linePen, width, lineHeight, shearShift, xAlign) {
        lines.forEach(function (line, i) {
            var xShearOffset = (shearShift > 0) ? (i + 1) * shearShift : (i) * shearShift;
            linePen.write(line, width, xAlign, xShearOffset, (i + 1) * lineHeight);
        });
    };
    return Writer;
}());
Writer.XOffsetFactor = {
    center: 0.5,
    left: 0,
    right: 1,
};
Writer.YOffsetFactor = {
    bottom: 1,
    center: 0.5,
    top: 0,
};
Writer.SupportedRotation = [-90, 0, 180, 90];
exports.Writer = Writer;

},{"../utils":14}]},{},[5])(5)
});