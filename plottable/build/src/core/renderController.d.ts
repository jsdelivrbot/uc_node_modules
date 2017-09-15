/**
 * Copyright 2014-present Palantir Technologies
 * @license MIT
 */
import { Component } from "../components/component";
import * as RenderPolicies from "./renderPolicy";
export declare const Policy: {
    immediate: "immediate";
    animationFrame: "animationFrame";
    timeout: "timeout";
};
export declare type Policy = keyof typeof Policy;
export declare function renderPolicy(): RenderPolicies.IRenderPolicy;
export declare function renderPolicy(renderPolicy: Policy): void;
/**
 * Enqueues the Component for rendering.
 *
 * @param {Component} component
 */
export declare function registerToRender(component: Component): void;
/**
 * Enqueues the Component for layout and rendering.
 *
 * @param {Component} component
 */
export declare function registerToComputeLayoutAndRender(component: Component): void;
/**
 * Enqueues the Component for layout and rendering.
 *
 * @param {Component} component
 * @deprecated This method has been renamed to `RenderController.registerToComputeLayoutAndRender()`.
 */
export declare function registerToComputeLayout(component: Component): void;
/**
 * Renders all Components waiting to be rendered immediately
 * instead of waiting until the next frame. Flush is idempotent (given there are no intermediate registrations).
 *
 * Useful to call when debugging.
 */
export declare function flush(): void;
