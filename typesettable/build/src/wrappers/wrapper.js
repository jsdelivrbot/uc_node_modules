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
//# sourceMappingURL=wrapper.js.map