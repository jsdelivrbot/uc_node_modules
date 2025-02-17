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
//# sourceMappingURL=stringMethods.js.map