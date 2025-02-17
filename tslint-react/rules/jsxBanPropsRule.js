/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
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
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new JsxBanPropsWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
/* tslint:disable:object-literal-sort-keys */
Rule.metadata = {
    ruleName: "jsx-ban-props",
    description: "Bans the use of specific props.",
    optionsDescription: (_a = ["\n            A list of `['propName', 'optional explanation here']` which bans the prop called 'propName'."], _a.raw = ["\n            A list of \\`['propName', 'optional explanation here']\\` which bans the prop called 'propName'."], Lint.Utils.dedent(_a)),
    options: {
        type: "list",
        listType: {
            type: "string",
            items: { type: "string" },
            minLength: 1,
            maxLength: 2,
        },
    },
    optionExamples: ["[true, [\"someProp], [\"anotherProp\", \"Optional explanation\"]]"],
    type: "functionality",
    typescriptOnly: false,
};
/* tslint:enable:object-literal-sort-keys */
Rule.FAILURE_STRING_FACTORY = function (propName, explanation) {
    return "Use of the prop '" + propName + "' is not allowed." + (explanation ? " " + explanation : "");
};
exports.Rule = Rule;
var JsxBanPropsWalker = (function (_super) {
    __extends(JsxBanPropsWalker, _super);
    function JsxBanPropsWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.isInJsxAttribute = false;
        var propsToBan = options.ruleArguments;
        _this.bannedProps = propsToBan
            ? new Map(propsToBan.map(function (prop) {
                return [prop[0], prop.length > 1 ? prop[1] : ""];
            }))
            : new Map();
        return _this;
    }
    JsxBanPropsWalker.prototype.visitJsxAttribute = function (node) {
        this.isInJsxAttribute = true;
        _super.prototype.visitJsxAttribute.call(this, node);
        this.isInJsxAttribute = false;
    };
    JsxBanPropsWalker.prototype.visitIdentifier = function (node) {
        if (this.isInJsxAttribute) {
            var propName = node.text;
            if (this.bannedProps.has(propName)) {
                var propBanExplanation = this.bannedProps.get(propName);
                this.addFailureAtNode(node, Rule.FAILURE_STRING_FACTORY(propName, propBanExplanation));
            }
        }
    };
    return JsxBanPropsWalker;
}(Lint.RuleWalker));
var _a;
