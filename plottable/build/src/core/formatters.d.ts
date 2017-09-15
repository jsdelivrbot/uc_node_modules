import { Dataset } from "./dataset";
/**
 * A basic formatter function that will be passed a value to format (e.g. the tick value for axes).
 * A Formatter should return the formatted string representation of the input value.
 *
 * The value will be different for each use of the formatter - check the documentation of individual
 * methods to see what will be passed into the formatter.
 */
export declare type Formatter = (value: any) => string;
/**
 * A formatter function that will be passed the value to format as well as the underlying datum, index, and
 * dataset that the value came from. Datum-backed visual elements that display labels, such as Bar Plot bars
 * or Pie Plot sectors, will use this formatter.
 *
 * The value will be different for each use of the formatter - check the documentation of individual
 * methods to see what will be passed into the formatter.
 */
export declare type DatumFormatter = (value: any, datum: any, index: number, dataset: Dataset) => string;
/**
 * Creates a formatter for currency values.
 *
 * @param {number} [precision] The number of decimal places to show (default 2).
 * @param {string} [symbol] The currency symbol to use (default "$").
 * @param {boolean} [prefix] Whether to prepend or append the currency symbol (default true).
 *
 * @returns {Formatter} A formatter for currency values.
 */
export declare function currency(precision?: number, symbol?: string, prefix?: boolean): (d: any) => string;
/**
 * Creates a formatter that displays exactly [precision] decimal places.
 *
 * @param {number} [precision] The number of decimal places to show (default 3).
 *
 * @returns {Formatter} A formatter that displays exactly [precision] decimal places.
 */
export declare function fixed(precision?: number): (d: any) => string;
/**
 * Creates a formatter that formats numbers to show no more than
 * [maxNumberOfDecimalPlaces] decimal places. All other values are stringified.
 *
 * @param {number} [maxNumberOfDecimalPlaces] The number of decimal places to show (default 3).
 *
 * @returns {Formatter} A formatter for general values.
 */
export declare function general(maxNumberOfDecimalPlaces?: number): (d: any) => string;
/**
 * Creates a formatter that stringifies its input.
 *
 * @returns {Formatter} A formatter that stringifies its input.
 */
export declare function identity(): (d: any) => string;
/**
 * Creates a formatter for percentage values.
 * Multiplies the input by 100 and appends "%".
 *
 * @param {number} [precision] The number of decimal places to show (default 0).
 *
 * @returns {Formatter} A formatter for percentage values.
 */
export declare function percentage(precision?: number): (d: any) => string;
/**
 * Creates a formatter for values that displays [numberOfSignificantFigures] significant figures
 * and puts SI notation.
 *
 * @param {number} [numberOfSignificantFigures] The number of significant figures to show (default 3).
 *
 * @returns {Formatter} A formatter for SI values.
 */
export declare function siSuffix(numberOfSignificantFigures?: number): (d: any) => string;
/**
 * Creates a formatter for values that displays abbreviated values
 * and uses standard short scale suffixes
 * - K - thousands - 10 ^ 3
 * - M - millions - 10 ^ 6
 * - B - billions - 10 ^ 9
 * - T - trillions - 10 ^ 12
 * - Q - quadrillions - 10 ^ 15
 *
 * Numbers with a magnitude outside of (10 ^ (-precision), 10 ^ 15) are shown using
 * scientific notation to avoid creating extremely long decimal strings.
 *
 * @param {number} [precision] the number of decimal places to show (default 3)
 * @returns {Formatter} A formatter with short scale formatting
 */
export declare function shortScale(precision?: number): (num: number) => string;
/**
 * Creates a multi time formatter that displays dates.
 *
 * @returns {Formatter} A formatter for time/date values.
 */
export declare function multiTime(): (d: any) => string;
/**
 * Creates a time formatter that displays time/date using given specifier.
 *
 * List of directives can be found on: https://github.com/mbostock/d3/wiki/Time-Formatting#format
 *
 * @param {string} [specifier] The specifier for the formatter.
 *
 * @returns {Formatter} A formatter for time/date values.
 */
export declare function time(specifier: string): Formatter;
