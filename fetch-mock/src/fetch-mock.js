'use strict';

const compileRoute = require('./compile-route');

const FetchMock = function () {

	this.routes = [];
	this._calls = {};
	this._matchedCalls = [];
	this._unmatchedCalls = [];
	this.bindMethods();
}

FetchMock.prototype.bindMethods = function () {
	this.fetchMock = FetchMock.prototype.fetchMock.bind(this);
	this.restore = FetchMock.prototype.restore.bind(this);
	this.reset = FetchMock.prototype.reset.bind(this);
}

FetchMock.prototype.mock = function (matcher, response, options) {

	let route;

	// Handle the variety of parameters accepted by mock (see README)
	if (matcher && response && options) {
		route = Object.assign({
			matcher,
			response
		}, options);
	} else if (matcher && response) {
		route = {
			matcher,
			response
		}
	} else if (matcher && matcher.matcher) {
		route = matcher
	} else {
		throw new Error('Invalid parameters passed to fetch-mock')
	}


	this.addRoute(route);

	return this._mock();
}

FetchMock.prototype.once = function (matcher, response, options) {
	return this.mock(matcher, response, Object.assign({}, options, {times: 1}));
}

FetchMock.prototype._mock = function () {
	if (!this.isSandbox) {
		// Do this here rather than in the constructor to ensure it's scoped to the test
		this.realFetch = this.realFetch || FetchMock.global.fetch;
		FetchMock.global.fetch = this.fetchMock;
	}
	return this;
}

FetchMock.prototype._unMock = function () {
	if (this.realFetch) {
		FetchMock.global.fetch = this.realFetch;
		this.realFetch = null;
	}
	this.fallbackResponse = null;
	return this;
}

FetchMock.prototype.catch = function (response) {
	if (this.fallbackResponse) {
		console.warn(`calling fetchMock.catch() twice - are you sure you want to overwrite the previous fallback response`);
	}
	this.fallbackResponse = response || 'ok';
	return this._mock();
}

FetchMock.prototype.spy = function () {
	this._mock();
	return this.catch(this.realFetch)
}

FetchMock.prototype.fetchMock = function (url, opts) {
	const Promise = this.Promise || FetchMock.global.Promise;
	let response = this.router(url, opts);

	if (!response) {
		console.warn(`Unmatched ${opts && opts.method || 'GET'} to ${url}`);
		this.push(null, [url, opts]);

		if (this.fallbackResponse) {
			response = this.fallbackResponse;
		} else {
			throw new Error(`No fallback response defined for ${opts && opts.method || 'GET'} to ${url}`)
		}
	}

	if (typeof response === 'function') {
		response = response (url, opts);
	}

	if (typeof response.then === 'function') {
		let responsePromise = response.then(response => this.mockResponse(url, response, opts));
		return Promise.resolve(responsePromise); // Ensure Promise is always our implementation.
	} else {
		return this.mockResponse(url, response, opts);
	}

}

FetchMock.prototype.router = function (url, opts) {
	let route;
	for (let i = 0, il = this.routes.length; i < il ; i++) {
		route = this.routes[i];
		if (route.matcher(url, opts)) {
			this.push(route.name, [url, opts]);
			return route.response;
		}
	}
}

FetchMock.prototype.addRoute = function (route) {

	if (!route) {
		throw new Error('.mock() must be passed configuration for a route')
	}

	// Allows selective application of some of the preregistered routes
	this.routes.push(compileRoute(route, FetchMock.Request));
}


FetchMock.prototype.mockResponse = function (url, responseConfig, fetchOpts) {
	const Promise = this.Promise || FetchMock.global.Promise;

	// It seems odd to call this in here even though it's already called within fetchMock
	// It's to handle the fact that because we want to support making it very easy to add a
	// delay to any sort of response (including responses which are defined with a function)
	// while also allowing function responses to return a Promise for a response config.
	if (typeof responseConfig === 'function') {
		responseConfig = responseConfig(url, fetchOpts);
	}

	if (FetchMock.Response.prototype.isPrototypeOf(responseConfig)) {
		return Promise.resolve(responseConfig);
	}

	if (responseConfig.throws) {
		return Promise.reject(responseConfig.throws);
	}

	if (typeof responseConfig === 'number') {
		responseConfig = {
			status: responseConfig
		};
	} else if (typeof responseConfig === 'string' || !(responseConfig.body || responseConfig.headers || responseConfig.throws || responseConfig.status)) {
		responseConfig = {
			body: responseConfig
		};
	}

	const opts = responseConfig.opts || {};
	opts.url = url;
	opts.sendAsJson = responseConfig.sendAsJson === undefined ? FetchMock.config.sendAsJson : responseConfig.sendAsJson;
	if (responseConfig.status && (typeof responseConfig.status !== 'number' || parseInt(responseConfig.status, 10) !== responseConfig.status || responseConfig.status < 200 || responseConfig.status > 599)) {
		throw new TypeError(`Invalid status ${responseConfig.status} passed on response object.
To respond with a JSON object that has status as a property assign the object to body
e.g. {"body": {"status: "registered"}}`);
	}
	opts.status = responseConfig.status || 200;
	opts.statusText = FetchMock.statusTextMap['' + opts.status];
	// The ternary operator is to cope with new Headers(undefined) throwing in Chrome
	// https://code.google.com/p/chromium/issues/detail?id=335871
	opts.headers = responseConfig.headers ? new FetchMock.Headers(responseConfig.headers) : new FetchMock.Headers();

	let body = responseConfig.body;
	if (opts.sendAsJson && responseConfig.body != null && typeof body === 'object') { //eslint-disable-line
		body = JSON.stringify(body);
	}

	if (FetchMock.stream) {
		let s = new FetchMock.stream.Readable();
		if (body != null) { //eslint-disable-line
			s.push(body, 'utf-8');
		}
		s.push(null);
		body = s;
	}

	return Promise.resolve(new FetchMock.Response(body, opts));
}

FetchMock.prototype.push = function (name, call) {
	if (name) {
		this._calls[name] = this._calls[name] || [];
		this._calls[name].push(call);
		this._matchedCalls.push(call);
	} else {
		this._unmatchedCalls.push(call);
	}
}

FetchMock.prototype.restore = function () {
	this._unMock();
	this.reset();
	this.routes = [];
	return this;
}

FetchMock.prototype.reset = function () {
	this._calls = {};
	this._matchedCalls = [];
	this._unmatchedCalls = [];
	this.routes.forEach(route => route.reset && route.reset())
	return this;
}

FetchMock.prototype.calls = function (name) {
	return name ? (this._calls[name] || []) : {
		matched: this._matchedCalls,
		unmatched: this._unmatchedCalls
	};
}

FetchMock.prototype.lastCall = function (name) {
	const calls = name ? this.calls(name) : this.calls().matched;
	if (calls && calls.length) {
		return calls[calls.length - 1];
	} else {
		return undefined;
	}
}

FetchMock.prototype.lastUrl = function (name) {
	const call = this.lastCall(name);
	return call && call[0];
}

FetchMock.prototype.lastOptions = function (name) {
	const call = this.lastCall(name);
	return call && call[1];
}

FetchMock.prototype.called = function (name) {
	if (!name) {
		return !!(this._matchedCalls.length || this._unmatchedCalls.length);
	}
	return !!(this._calls[name] && this._calls[name].length);
}

FetchMock.prototype.done = function (name) {
	const names = name ? [name] : this.routes.map(r => r.name);
	// Ideally would use array.every, but not widely supported
	return names.map(name => {
		if (!this.called(name)) {
			return false
		}
		// would use array.find... but again not so widely supported
		const expectedTimes = (this.routes.filter(r => r.name === name) || [{}])[0].times;
		return !expectedTimes || (expectedTimes <= this.calls(name).length)
	})
		.filter(bool => !bool).length === 0
}

FetchMock.config = {
	sendAsJson: true
}

FetchMock.prototype.configure = function (opts) {
	Object.assign(FetchMock.config, opts);
}

FetchMock.setGlobals = function (globals) {
	Object.assign(FetchMock, globals)
}

FetchMock.prototype.sandbox = function (Promise) {
	if (this.routes.length || this.fallbackResponse) {
		throw new Error('.sandbox() can only be called on fetch-mock instances that don\'t have routes configured already')
	}
	const instance = new FetchMock();

	// this construct allows us to create a fetch-mock instance which is also
	// a callable function, while circumventing circularity when defining the
	// object that this function should be bound to
	let boundMock;
	const proxy = function () {
		return boundMock.apply(null, arguments);
	}

	const functionInstance = Object.assign(
		proxy, // Ensures that the entire returned object is a callable function
		FetchMock.prototype, // all prototype methods
		instance // instance data
	);
	functionInstance.bindMethods();
	boundMock = functionInstance.fetchMock;
	functionInstance.isSandbox = true;
	functionInstance.Promise = Promise;

	return functionInstance;
};

['get','post','put','delete','head', 'patch']
	.forEach(method => {
		FetchMock.prototype[method] = function (matcher, response, options) {
			return this.mock(matcher, response, Object.assign({}, options, {method: method.toUpperCase()}));
		}
		FetchMock.prototype[`${method}Once`] = function (matcher, response, options) {
			return this.once(matcher, response, Object.assign({}, options, {method: method.toUpperCase()}));
		}
	})

module.exports = FetchMock;