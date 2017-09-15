/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Component } from "../components/component";
import { Point } from "../core/interfaces";
export declare class Interaction {
    private _anchorCallback;
    private _isAnchored;
    private _enabled;
    protected _componentAttachedTo: Component;
    /**
     * Attaches this Interaction to a Component.
     * If the Interaction was already attached to a Component, it first detaches itself from the old Component.
     *
     * @param {Component} component
     * @returns {Interaction} The calling Interaction.
     */
    attachTo(component: Component): this;
    /**
     * @deprecated renamed to .detach().
     */
    detachFrom(_component: Component): this;
    /**
     * Detaches this Interaction from whatever component it was attached to.
     * This Interaction can be reused.
     *
     * @returns {Interaction} The calling Interaction.
     */
    detach(): this;
    /**
     * Gets whether this Interaction is enabled.
     */
    enabled(): boolean;
    /**
     * Enables or disables this Interaction.
     *
     * @param {boolean} enabled Whether the Interaction should be enabled.
     * @return {Interaction} The calling Interaction.
     */
    enabled(enabled: boolean): this;
    protected _anchor(component: Component): void;
    protected _unanchor(): void;
    /**
     * Translates an <svg>-coordinate-space point to Component-space coordinates.
     *
     * @param {Point} p A Point in <svg>-space coordinates.
     * @return {Point} The same location in Component-space coordinates.
     */
    protected _translateToComponentSpace(p: Point): Point;
    /**
     * Checks whether a Component-coordinate-space Point is inside the Component.
     *
     * @param {Point} p A Point in Compoennt-space coordinates.
     * @return {boolean} Whether or not the point is inside the Component.
     */
    protected _isInsideComponent(p: Point): boolean;
    private _connect();
    private _disconnect();
}
