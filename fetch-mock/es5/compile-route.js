'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _glob = require('glob-to-regexp');
var _express = require('path-to-regexp');

var stringMatchers = {
	begin: function begin(targetString) {
		return function (url) {
			return url.indexOf(targetString) === 0;
		};
	},
	end: function end(targetString) {
		return function (url) {
			return url.substr(-targetString.length) === targetString;
		};
	},
	glob: function glob(targetString) {
		var urlRX = _glob(targetString.replace(/^glob:/, ''));
		return function (url) {
			return urlRX.test(url);
		};
	},
	express: function express(targetString) {
		var urlRX = _express(targetString.replace(/^express:/, ''));
		return function (url) {
			return urlRX.test(url);
		};
	}
};

function getHeaderMatcher(expectedHeaders) {
	var expectation = Object.keys(expectedHeaders).map(function (k) {
		return { key: k.toLowerCase(), val: expectedHeaders[k] };
	});
	return function (headers) {
		if (!headers) {
			headers = {};
		}
		var lowerCaseHeaders = Object.keys(headers).reduce(function (obj, k) {
			obj[k.toLowerCase()] = headers[k];
			return obj;
		}, {});
		return expectation.every(function (header) {
			return lowerCaseHeaders[header.key] === header.val;
		});
	};
}

function normalizeRequest(url, options, Request) {
	if (Request.prototype.isPrototypeOf(url)) {
		return {
			url: url.url,
			method: url.method,
			headers: function () {
				var headers = {};
				url.headers.forEach(function (name) {
					return headers[name] = url.headers.name;
				});
				return headers;
			}()
		};
	} else {
		return {
			url: url,
			method: options && options.method || 'GET',
			headers: options && options.headers
		};
	}
}

module.exports = function (route, Request) {
	route = _extends({}, route);

	if (typeof route.response === 'undefined') {
		throw new Error('Each route must define a response');
	}

	if (!route.matcher) {
		throw new Error('each route must specify a string, regex or function to match calls to fetch');
	}

	if (!route.name) {
		route.name = route.matcher.toString();
		route.__unnamed = true;
	}

	// If user has provided a function as a matcher we assume they are handling all the
	// matching logic they need
	if (typeof route.matcher === 'function') {
		return route;
	}

	var expectedMethod = route.method && route.method.toLowerCase();

	function matchMethod(method) {
		return !expectedMethod || expectedMethod === (method ? method.toLowerCase() : 'get');
	};

	var matchHeaders = route.headers ? getHeaderMatcher(route.headers) : function () {
		return true;
	};

	var matchUrl = void 0;

	if (typeof route.matcher === 'string') {

		Object.keys(stringMatchers).some(function (name) {
			if (route.matcher.indexOf(name + ':') === 0) {
				var url = route.matcher.replace(new RegExp('^' + name + ':'), '');
				matchUrl = stringMatchers[name](url);
				return true;
			}
		});
		if (!matchUrl) {
			if (route.matcher === '*') {
				matchUrl = function matchUrl() {
					return true;
				};
			} else if (route.matcher.indexOf('^') === 0) {
				(function () {
					console.warn('Using \'^\' to denote the start of a url is deprecated. Use \'begin:\' instead');
					var expectedUrl = route.matcher.substr(1);
					matchUrl = function matchUrl(url) {
						return url.indexOf(expectedUrl) === 0;
					};
				})();
			} else {
				(function () {
					var expectedUrl = route.matcher;
					matchUrl = function matchUrl(url) {
						return url === expectedUrl;
					};
				})();
			}
		}
	} else if (route.matcher instanceof RegExp) {
		(function () {
			var urlRX = route.matcher;
			matchUrl = function matchUrl(url) {
				return urlRX.test(url);
			};
		})();
	}

	var matcher = function matcher(url, options) {
		var req = normalizeRequest(url, options, Request);
		return matchHeaders(req.headers) && matchMethod(req.method) && matchUrl(req.url);
	};

	if (route.times) {
		(function () {
			var timesLeft = route.times;
			route.matcher = function (url, options) {
				var match = timesLeft && matcher(url, options);
				if (match) {
					timesLeft--;
					return true;
				}
			};
			route.reset = function () {
				return timesLeft = route.times;
			};
		})();
	} else {
		route.matcher = matcher;
	}

	return route;
};