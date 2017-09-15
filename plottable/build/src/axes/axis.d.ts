import { Component } from "../components/component";
import { Formatter } from "../core/formatters";
import { Point, SimpleSelection, SpaceRequest } from "../core/interfaces";
import { Scale } from "../scales/scale";
export declare const AxisOrientation: {
    left: "left";
    right: "right";
    top: "top";
    bottom: "bottom";
};
export declare type AxisOrientation = keyof typeof AxisOrientation;
export declare class Axis<D> extends Component {
    /**
     * The css class applied to each end tick mark (the line on the end tick).
     */
    static END_TICK_MARK_CLASS: string;
    /**
     * The css class applied to each tick mark (the line on the tick).
     */
    static TICK_MARK_CLASS: string;
    /**
     * The css class applied to each tick label (the text associated with the tick).
     */
    static TICK_LABEL_CLASS: string;
    /**
     * The css class applied to each annotation line, which extends from the axis to the rect.
     */
    static ANNOTATION_LINE_CLASS: string;
    /**
     * The css class applied to each annotation rect, which surrounds the annotation label.
     */
    static ANNOTATION_RECT_CLASS: string;
    /**
     * The css class applied to each annotation circle, which denotes which tick is being annotated.
     */
    static ANNOTATION_CIRCLE_CLASS: string;
    /**
     * The css class applied to each annotation label, which shows the formatted annotation text.
     */
    static ANNOTATION_LABEL_CLASS: string;
    private static _ANNOTATION_LABEL_PADDING;
    protected _tickMarkContainer: SimpleSelection<void>;
    protected _tickLabelContainer: SimpleSelection<void>;
    protected _baseline: SimpleSelection<void>;
    protected _scale: Scale<D, number>;
    private _formatter;
    private _orientation;
    private _endTickLength;
    private _innerTickLength;
    private _tickLabelPadding;
    private _margin;
    private _showEndTickLabels;
    private _rescaleCallback;
    private _annotatedTicks;
    private _annotationFormatter;
    private _annotationsEnabled;
    private _annotationTierCount;
    private _annotationContainer;
    private _annotationMeasurer;
    private _annotationWriter;
    /**
     * Constructs an Axis.
     * An Axis is a visual representation of a Scale.
     *
     * @constructor
     * @param {Scale} scale
     * @param {AxisOrientation} orientation Orientation of this Axis.
     */
    constructor(scale: Scale<D, number>, orientation: AxisOrientation);
    destroy(): void;
    /**
     * Gets the tick label data on a element. Element in argument must be a descendent of a tick label element.
     *
     * @param {Element} element
     */
    tickLabelDataOnElement(element: Element): {};
    protected _computeWidth(): number;
    protected _computeHeight(): number;
    requestedSpace(offeredWidth: number, offeredHeight: number): SpaceRequest;
    fixedHeight(): boolean;
    fixedWidth(): boolean;
    protected _rescale(): void;
    computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): this;
    protected _sizeFromOffer(availableWidth: number, availableHeight: number): {
        width: number;
        height: number;
    };
    protected _setup(): void;
    protected _getTickValues(): D[];
    /**
     * Render tick marks, baseline, and annotations. Should be super called by subclasses and then overridden to draw
     * other relevant aspects of this Axis.
     */
    renderImmediately(): this;
    /**
     * Gets the annotated ticks.
     */
    annotatedTicks(): D[];
    /**
     * Sets the annotated ticks.
     *
     * @returns {Axis} The calling Axis.
     */
    annotatedTicks(annotatedTicks: D[]): this;
    /**
     * Gets the Formatter for the annotations. The annotationFormatter will be passed
     * each value in annotatedTicks.
     */
    annotationFormatter(): Formatter;
    /**
     * Sets the Formatter for the annotations. The annotationFormatter will be passed
     * each value in annotatedTicks.
     *
     * @returns {Axis} The calling Axis.
     */
    annotationFormatter(annotationFormatter: Formatter): this;
    /**
     * Gets if annotations are enabled.
     */
    annotationsEnabled(): boolean;
    /**
     * Sets if annotations are enabled.
     *
     * @returns {Axis} The calling Axis.
     */
    annotationsEnabled(annotationsEnabled: boolean): this;
    /**
     * Gets the count of annotation tiers to render.
     */
    annotationTierCount(): number;
    /**
     * Sets the count of annotation tiers to render.
     *
     * @returns {Axis} The calling Axis.
     */
    annotationTierCount(annotationTierCount: number): this;
    protected _drawAnnotations(): void;
    private _annotatedTicksToRender();
    /**
     * Retrieves the size of the core pieces.
     *
     * The core pieces include the labels, the end tick marks, the inner tick marks, and the tick label padding.
     */
    protected _coreSize(): number;
    protected _annotationTierHeight(): number;
    private _annotationToTier(measurements);
    protected _removeAnnotations(): void;
    protected _generateBaselineAttrHash(): {
        [key: string]: number;
    };
    protected _generateTickMarkAttrHash(isEndTickMark?: boolean): {
        [key: string]: number | ((d: any) => number);
    };
    protected _setDefaultAlignment(): void;
    /**
     * Get whether this axis is horizontal (orientation is "top" or "bottom") or vertical.
     * @returns {boolean} - true for horizontal, false for vertical.
     */
    isHorizontal(): boolean;
    /**
     * Get the scale that this axis is associated with.
     * @returns {Scale<D, number>}
     */
    getScale(): Scale<D, number>;
    /**
     * Gets the Formatter on the Axis. Tick values are passed through the
     * Formatter before being displayed.
     */
    formatter(): Formatter;
    /**
     * Sets the Formatter on the Axis. Tick values are passed through the
     * Formatter before being displayed.
     *
     * @param {Formatter} formatter
     * @returns {Axis} The calling Axis.
     */
    formatter(formatter: Formatter): this;
    /**
     * Gets the tick mark length in pixels.
     */
    innerTickLength(): number;
    /**
     * Sets the tick mark length in pixels.
     *
     * @param {number} length
     * @returns {Axis} The calling Axis.
     */
    innerTickLength(length: number): this;
    /**
     * Gets the end tick mark length in pixels.
     */
    endTickLength(): number;
    /**
     * Sets the end tick mark length in pixels.
     *
     * @param {number} length
     * @returns {Axis} The calling Axis.
     */
    endTickLength(length: number): this;
    /**
     * Gets the maximum pixel length over all ticks on this axis.
     * @returns {number}
     */
    protected _maxLabelTickLength(): number;
    /**
     * Gets the padding between each tick mark and its associated label in pixels.
     */
    tickLabelPadding(): number;
    /**
     * Sets the padding between each tick mark and its associated label in pixels.
     *
     * @param {number} padding
     * @returns {Axis} The calling Axis.
     */
    tickLabelPadding(padding: number): this;
    /**
     * Gets the margin in pixels.
     * The margin is the amount of space between the tick labels and the outer edge of the Axis.
     * The margin also determines the space that annotations will reside in if annotations are enabled.
     */
    margin(): number;
    /**
     * Sets the margin in pixels.
     * The margin is the amount of space between the tick labels and the outer edge of the Axis.
     * The margin also determines the space that annotations will reside in if annotations are enabled.
     *
     * @param {number} size
     * @returns {Axis} The calling Axis.
     */
    margin(size: number): this;
    /**
     * Gets the orientation of the Axis.
     */
    orientation(): AxisOrientation;
    /**
     * Sets the orientation of the Axis.
     *
     * @param {AxisOrientation} orientation The orientation to apply to this axis.
     * @returns {Axis} The calling Axis.
     */
    orientation(orientation: AxisOrientation): this;
    /**
     * Gets whether the Axis shows the end tick labels.
     */
    showEndTickLabels(): boolean;
    /**
     * Sets whether the Axis shows the end tick labels.
     *
     * @param {boolean} show
     * @returns {Axis} The calling Axis.
     */
    showEndTickLabels(show: boolean): this;
    protected _showAllTickMarks(): void;
    protected _showAllTickLabels(): void;
    /**
     * Responsible for hiding any tick labels that break out of the bounding
     * container.
     */
    protected _hideOverflowingTickLabels(): void;
    /**
     * Hides the Tick Marks which have no corresponding Tick Labels
     */
    protected _hideTickMarksWithoutLabel(): void;
    invalidateCache(): void;
}
