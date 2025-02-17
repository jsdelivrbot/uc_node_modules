/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ts = require("typescript");
var guards_1 = require("../guards");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new JsxNoStringRefWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = "Pass a callback to ref prop instead of a string literal";
exports.Rule = Rule;
var JsxNoStringRefWalker = (function (_super) {
    __extends(JsxNoStringRefWalker, _super);
    function JsxNoStringRefWalker() {
        return _super.apply(this, arguments) || this;
    }
    JsxNoStringRefWalker.prototype.visitNode = function (node) {
        if (guards_1.nodeIsKind(node, ts.SyntaxKind.JsxAttribute)) {
            var name = node.name, initializer = node.initializer;
            var isRefAttribute = name != null && name.text === "ref";
            if (isRefAttribute && initializer != null) {
                var hasStringInitializer = initializer.kind === ts.SyntaxKind.StringLiteral;
                var hasStringExpressionInitializer = guards_1.nodeIsKind(initializer, ts.SyntaxKind.JsxExpression)
                    && initializer.expression !== undefined
                    && (initializer.expression.kind === ts.SyntaxKind.StringLiteral
                        || initializer.expression.kind === ts.SyntaxKind.TemplateExpression);
                if (hasStringInitializer || hasStringExpressionInitializer) {
                    this.addFailure(this.createFailure(initializer.getStart(), initializer.getWidth(), Rule.FAILURE_STRING));
                }
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    return JsxNoStringRefWalker;
}(Lint.RuleWalker));
