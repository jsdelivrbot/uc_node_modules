'use strict';

var isCallable = require('is-callable');
var functionsHaveNames = function foo() {}.name === 'foo';
var bind = require('function-bind');
var functionToString = bind.call(Function.call, Function.prototype.toString);
var stringMatch = bind.call(Function.call, String.prototype.match);

var classRegex = /^class /;

var isClass = function isClass(fn) {
	if (isCallable(fn)) { return false; }
	if (typeof fn !== 'function') { return false; }
	try {
		var match = stringMatch(functionToString(fn), classRegex);
		return !!match;
	} catch (e) { /**/ }
	return false;
};

var regex = /\s*function\s+([^\(\s]*)\s*/;

module.exports = function getName() {
	if (!isClass(this) && !isCallable(this)) {
		throw new TypeError('Function.prototype.name sham getter called on non-function');
	}
	if (functionsHaveNames) {
		return this.name;
	}
	var str = functionToString(this);
	var match = stringMatch(str, regex);
	var name = match && match[1];
	return name;
};
