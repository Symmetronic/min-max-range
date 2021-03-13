/**
 * Empty range.
 */
export type EmptyRange = [];

/**
 * Element of a range.
 */
export type RangeElement = number | [number, number];

/**
 * Range containing two elements.
 */
type CoupleRange<Element extends RangeElement> = [Element, Element];

/**
 * One-dimensional range.
 */
export type Range1D = CoupleRange<number>;

/**
 * Two-dimensional range.
 */
export type Range2D = CoupleRange<Range1D>;

/**
 * Multi-dimensional range.
 */
export type MultiDimRange = [...Range2D, ...Range1D[]];

/**
 * Non-empty range.
 */
export type NonEmptyRange = Range1D | MultiDimRange;

/**
 * Any range.
 */
export type Range = EmptyRange | NonEmptyRange;
