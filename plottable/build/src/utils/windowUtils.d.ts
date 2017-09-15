/**
 * Print a warning message to the console, if it is available.
 *
 * @param {string} The warnings to print
 */
export declare function warn(warning: string): void;
/**
 * Is like setTimeout, but activates synchronously if time=0
 * We special case 0 because of an observed issue where calling setTimeout causes visible flickering.
 * We believe this is because when requestAnimationFrame calls into the paint function, as soon as that function finishes
 * evaluating, the results are painted to the screen. As a result, if we want something to occur immediately but call setTimeout
 * with time=0, then it is pushed to the call stack and rendered in the next frame, so the component that was rendered via
 * setTimeout appears out-of-sync with the rest of the plot.
 */
export declare function setTimeout(f: Function, time: number, ...args: any[]): number;
/**
 * Debounces the supplied callback and returns a function with the same
 * arguments.
 *
 * The callback is schedule for invocation every time the returned function is
 * invoked. If the returned function is called within the debounce time, the
 * previously scheduled call is canceled and the callback is schedule again.
 *
 * If debounced, the callback will be called with the most recent arguments.
 *
 * @param {number} msec - the debounce time in milliseconds
 * @param {T} callback - the callback invoked after the debounce time
 * @param {any} context  - the `this` argument used to invoke the callback
 */
export declare function debounce<T extends Function>(msec: number, callback: T, context?: any): T;
/**
 * Sends a deprecation warning to the console. The warning includes the name of the deprecated method,
 * version number of the deprecation, and an optional message.
 *
 * To be used in the first line of a deprecated method.
 *
 * @param {string} callingMethod The name of the method being deprecated
 * @param {string} version The version when the tagged method became obsolete
 * @param {string?} message Optional message to be shown with the warning
 */
export declare function deprecated(callingMethod: string, version: string, message?: string): void;
