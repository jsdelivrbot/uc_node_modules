'use strict';

var functionsHaveNames = function foo() {}.name === 'foo';
var arrowFn = require('make-arrow-function')();
var genFn = require('make-generator-function');

var foo = function foo() {};
var anon = function () {};
var evalled = Function();

module.exports = function (getName, t) {
	t.test('functions', function (st) {
		if (functionsHaveNames) {
			st.equal(getName(foo), foo.name, 'foo has name "foo"');
			st.equal(getName(anon), anon.name, 'anonymous function has name of empty string');
			st.equal(getName(evalled), evalled.name, 'eval-d function has name "anonymous" (or empty string)');
		}
		st.equal(getName(foo), 'foo', 'foo has name "foo"');
		st.equal(getName(anon), '', 'anonymous function has name of empty string');
		var evalledName = getName(evalled);
		st.equal(evalledName === 'anonymous' || evalledName === '', true, 'eval-d function has name "anonymous" (or empty string');
		st.end();
	});

	t.test('arrow functions', { skip: !arrowFn }, function (st) {
		if (functionsHaveNames) {
			st.equal(getName(arrowFn), arrowFn.name, 'arrow function name matches');
		}
		st.equal(getName(arrowFn), '', 'arrow function has correct name');
		st.end();
	});

	t.test('generators', { skip: !genFn }, function (st) {
		if (functionsHaveNames) {
			st.equal(getName(genFn), genFn.name, 'generator function name matches');
			if (genFn.concise) {
				st.equal(getName(genFn.concise), genFn.concise.name, 'concise generator function name matches');
			} else {
				st.skip('concise generator functions not supported');
			}
		}
		st.equal(getName(genFn), '', 'generator function has correct name');
		if (genFn.concise) {
			st.equal(getName(genFn.concise), 'gen', 'concise generator function has correct name');
		} else {
			st.skip('concise generator functions not supported');
		}
		st.end();
	});
};
