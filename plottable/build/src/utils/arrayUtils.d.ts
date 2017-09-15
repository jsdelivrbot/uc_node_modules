/**
 * Takes two arrays of numbers and adds them together
 *
 * @param {number[]} aList The first array of numbers
 * @param {number[]} bList The second array of numbers
 * @return {number[]} An array of numbers where x[i] = aList[i] + bList[i]
 */
export declare function add(aList: number[], bList: number[]): number[];
/**
 * Take an array of values, and return the unique values.
 * Will work iff ∀ a, b, a.toString() == b.toString() => a == b; will break on Object inputs
 *
 * @param {T[]} values The values to find uniqueness for
 * @return {T[]} The unique values
 */
export declare function uniq<T>(arr: T[]): T[];
/**
 * @param {T[][]} a The 2D array that will have its elements joined together.
 * @return {T[]} Every array in a, concatenated together in the order they appear.
 */
export declare function flatten<T>(a: T[][]): T[];
/**
 * Creates an array of length `count`, filled with value or (if value is a function), value()
 *
 * @param {T | ((index?: number) => T)} value The value to fill the array with or a value generator (called with index as arg)
 * @param {number} count The length of the array to generate
 * @return {any[]}
 */
export declare function createFilledArray<T>(value: T | ((index?: number) => T), count: number): T[];
