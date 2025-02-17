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
//# sourceMappingURL=typesetter.js.map