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
//# sourceMappingURL=tokenizer.js.map