/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
"use strict";
var Interaction = (function () {
    function Interaction() {
        var _this = this;
        this._anchorCallback = function (component) { return _this._anchor(component); };
        this._enabled = true;
    }
    /**
     * Attaches this Interaction to a Component.
     * If the Interaction was already attached to a Component, it first detaches itself from the old Component.
     *
     * @param {Component} component
     * @returns {Interaction} The calling Interaction.
     */
    Interaction.prototype.attachTo = function (component) {
        this._disconnect();
        this._componentAttachedTo = component;
        this._connect();
        return this;
    };
    /**
     * @deprecated renamed to .detach().
     */
    Interaction.prototype.detachFrom = function (_component) {
        return this.detach();
    };
    /**
     * Detaches this Interaction from whatever component it was attached to.
     * This Interaction can be reused.
     *
     * @returns {Interaction} The calling Interaction.
     */
    Interaction.prototype.detach = function () {
        this._disconnect();
        this._componentAttachedTo = null;
        return this;
    };
    Interaction.prototype.enabled = function (enabled) {
        if (enabled == null) {
            return this._enabled;
        }
        this._enabled = enabled;
        if (this._enabled) {
            this._connect();
        }
        else {
            this._disconnect();
        }
        return this;
    };
    Interaction.prototype._anchor = function (component) {
        this._isAnchored = true;
    };
    Interaction.prototype._unanchor = function () {
        this._isAnchored = false;
    };
    /**
     * Translates an <svg>-coordinate-space point to Component-space coordinates.
     *
     * @param {Point} p A Point in <svg>-space coordinates.
     * @return {Point} The same location in Component-space coordinates.
     */
    Interaction.prototype._translateToComponentSpace = function (p) {
        var origin = this._componentAttachedTo.originToRoot();
        return {
            x: p.x - origin.x,
            y: p.y - origin.y,
        };
    };
    /**
     * Checks whether a Component-coordinate-space Point is inside the Component.
     *
     * @param {Point} p A Point in Compoennt-space coordinates.
     * @return {boolean} Whether or not the point is inside the Component.
     */
    Interaction.prototype._isInsideComponent = function (p) {
        return 0 <= p.x && 0 <= p.y
            && p.x <= this._componentAttachedTo.width()
            && p.y <= this._componentAttachedTo.height();
    };
    Interaction.prototype._connect = function () {
        if (this.enabled() && this._componentAttachedTo != null && !this._isAnchored) {
            this._componentAttachedTo.onAnchor(this._anchorCallback);
        }
    };
    Interaction.prototype._disconnect = function () {
        if (this._isAnchored) {
            this._unanchor();
        }
        if (this._componentAttachedTo != null) {
            this._componentAttachedTo.offAnchor(this._anchorCallback);
        }
    };
    return Interaction;
}());
exports.Interaction = Interaction;
