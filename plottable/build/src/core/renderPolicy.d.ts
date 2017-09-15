/**
 * A policy for rendering Components.
 */
export interface IRenderPolicy {
    render(): any;
}
/**
 * Renders Components immediately after they are enqueued.
 * Useful for debugging, horrible for performance.
 */
export declare class Immediate implements IRenderPolicy {
    render(): void;
}
/**
 * The default way to render, which only tries to render every frame
 * (usually, 1/60th of a second).
 */
export declare class AnimationFrame implements IRenderPolicy {
    render(): void;
}
/**
 * Renders with `setTimeout()`.
 * Generally an inferior way to render compared to `requestAnimationFrame`,
 * but useful for browsers that don't suppoort `requestAnimationFrame`.
 */
export declare class Timeout implements IRenderPolicy {
    private _timeoutMsec;
    render(): void;
}
