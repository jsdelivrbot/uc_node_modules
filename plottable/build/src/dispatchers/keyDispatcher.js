/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dispatcher_1 = require("./dispatcher");
var Key = (function (_super) {
    __extends(Key, _super);
    /**
     * This constructor should not be invoked directly.
     *
     * @constructor
     */
    function Key() {
        var _this = _super.call(this) || this;
        _this._eventToProcessingFunction[Key._KEYDOWN_EVENT_NAME] = function (e) { return _this._processKeydown(e); };
        _this._eventToProcessingFunction[Key._KEYUP_EVENT_NAME] = function (e) { return _this._processKeyup(e); };
        return _this;
    }
    /**
     * Gets a Key Dispatcher. If one already exists it will be returned;
     * otherwise, a new one will be created.
     *
     * @return {Dispatchers.Key}
     */
    Key.getDispatcher = function () {
        var dispatcher = document[Key._DISPATCHER_KEY];
        if (dispatcher == null) {
            dispatcher = new Key();
            document[Key._DISPATCHER_KEY] = dispatcher;
        }
        return dispatcher;
    };
    Key.prototype._processKeydown = function (event) {
        this._callCallbacksForEvent(Key._KEYDOWN_EVENT_NAME, event.keyCode, event);
    };
    Key.prototype._processKeyup = function (event) {
        this._callCallbacksForEvent(Key._KEYUP_EVENT_NAME, event.keyCode, event);
    };
    /**
     * Registers a callback to be called whenever a key is pressed.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    Key.prototype.onKeyDown = function (callback) {
        this._addCallbackForEvent(Key._KEYDOWN_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes the callback to be called whenever a key is pressed.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    Key.prototype.offKeyDown = function (callback) {
        this._removeCallbackForEvent(Key._KEYDOWN_EVENT_NAME, callback);
        return this;
    };
    /** Registers a callback to be called whenever a key is released.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    Key.prototype.onKeyUp = function (callback) {
        this._addCallbackForEvent(Key._KEYUP_EVENT_NAME, callback);
        return this;
    };
    /**
     * Removes the callback to be called whenever a key is released.
     *
     * @param {KeyCallback} callback
     * @return {Dispatchers.Key} The calling Key Dispatcher.
     */
    Key.prototype.offKeyUp = function (callback) {
        this._removeCallbackForEvent(Key._KEYUP_EVENT_NAME, callback);
        return this;
    };
    return Key;
}(dispatcher_1.Dispatcher));
Key._DISPATCHER_KEY = "__Plottable_Dispatcher_Key";
Key._KEYDOWN_EVENT_NAME = "keydown";
Key._KEYUP_EVENT_NAME = "keyup";
exports.Key = Key;
