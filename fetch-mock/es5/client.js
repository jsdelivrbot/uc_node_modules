'use strict';

var FetchMock = require('./fetch-mock');
var statusTextMap = require('./status-text');
var theGlobal = typeof window !== 'undefined' ? window : self;

FetchMock.setGlobals({
	global: theGlobal,
	Request: theGlobal.Request,
	Response: theGlobal.Response,
	Headers: theGlobal.Headers,
	statusTextMap: statusTextMap
});

module.exports = new FetchMock();