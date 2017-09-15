import { SimpleSelection } from "../core/interfaces";
/**
 * Return contrast ratio between two colors
 * Based on implementation from chroma.js by Gregor Aisch (gka) (licensed under BSD)
 * chroma.js may be found here: https://github.com/gka/chroma.js
 * License may be found here: https://github.com/gka/chroma.js/blob/master/LICENSE
 * see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 */
export declare function contrast(a: string, b: string): number;
/**
 * Returns a brighter copy of this color. Each channel is multiplied by 0.7 ^ -factor.
 * Channel values are capped at the maximum value of 255, and the minimum value of 30.
 */
export declare function lightenColor(color: string, factor: number): string;
/**
 * Gets the Hex Code of the color resulting by applying the className CSS class to the
 * colorTester selection. Returns null if the tester is transparent.
 *
 * @param {d3.Selection<void>} colorTester The d3 selection to apply the CSS class to
 * @param {string} className The name of the class to be applied
 * @return {string} The hex code of the computed color
 */
export declare function colorTest(colorTester: SimpleSelection<any>, className: string): string;
