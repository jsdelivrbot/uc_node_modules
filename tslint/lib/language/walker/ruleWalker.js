/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = require("../rule/rule");
var syntaxWalker_1 = require("./syntaxWalker");
var RuleWalker = (function (_super) {
    __extends(RuleWalker, _super);
    function RuleWalker(sourceFile, options) {
        var _this = _super.call(this) || this;
        _this.sourceFile = sourceFile;
        _this.failures = [];
        _this.options = options.ruleArguments;
        _this.limit = _this.sourceFile.getFullWidth();
        _this.ruleName = options.ruleName;
        return _this;
    }
    RuleWalker.prototype.getSourceFile = function () {
        return this.sourceFile;
    };
    RuleWalker.prototype.getLineAndCharacterOfPosition = function (position) {
        return this.sourceFile.getLineAndCharacterOfPosition(position);
    };
    RuleWalker.prototype.getFailures = function () {
        return this.failures;
    };
    RuleWalker.prototype.getLimit = function () {
        return this.limit;
    };
    RuleWalker.prototype.getOptions = function () {
        return this.options;
    };
    RuleWalker.prototype.hasOption = function (option) {
        if (this.options) {
            return this.options.indexOf(option) !== -1;
        }
        else {
            return false;
        }
    };
    RuleWalker.prototype.skip = function (_node) {
        return; // TODO remove this method in next major version
    };
    /** @deprecated Prefer `addFailureAt` and its variants. */
    RuleWalker.prototype.createFailure = function (start, width, failure, fix) {
        var from = (start > this.limit) ? this.limit : start;
        var to = ((start + width) > this.limit) ? this.limit : (start + width);
        return new rule_1.RuleFailure(this.sourceFile, from, to, failure, this.ruleName, fix);
    };
    /** @deprecated Prefer `addFailureAt` and its variants. */
    RuleWalker.prototype.addFailure = function (failure) {
        this.failures.push(failure);
    };
    /** Add a failure with any arbitrary span. Prefer `addFailureAtNode` if possible. */
    RuleWalker.prototype.addFailureAt = function (start, width, failure, fix) {
        this.addFailure(this.createFailure(start, width, failure, fix));
    };
    /** Like `addFailureAt` but uses start and end instead of start and width. */
    RuleWalker.prototype.addFailureFromStartToEnd = function (start, end, failure, fix) {
        this.addFailureAt(start, end - start, failure, fix);
    };
    /** Add a failure using a node's span. */
    RuleWalker.prototype.addFailureAtNode = function (node, failure, fix) {
        this.addFailureAt(node.getStart(this.sourceFile), node.getWidth(this.sourceFile), failure, fix);
    };
    RuleWalker.prototype.createReplacement = function (start, length, text) {
        return new rule_1.Replacement(start, length, text);
    };
    RuleWalker.prototype.appendText = function (start, text) {
        return this.createReplacement(start, 0, text);
    };
    RuleWalker.prototype.deleteText = function (start, length) {
        return this.createReplacement(start, length, "");
    };
    RuleWalker.prototype.deleteFromTo = function (start, end) {
        return this.createReplacement(start, end - start, "");
    };
    RuleWalker.prototype.getRuleName = function () {
        return this.ruleName;
    };
    RuleWalker.prototype.createFix = function () {
        var replacements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            replacements[_i] = arguments[_i];
        }
        return new rule_1.Fix(this.ruleName, replacements);
    };
    return RuleWalker;
}(syntaxWalker_1.SyntaxWalker));
exports.RuleWalker = RuleWalker;
