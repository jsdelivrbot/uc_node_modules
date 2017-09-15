/**
 * Shim for ES6 map.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
export declare class Map<K, V> {
    private _keyValuePairs;
    private _es6Map;
    constructor();
    set(key: K, value: V): this;
    get(key: K): V;
    has(key: K): boolean;
    forEach(callbackFn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    delete(key: K): boolean;
}
