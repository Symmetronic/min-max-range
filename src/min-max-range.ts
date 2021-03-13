export {
  Coordinates,
  EmptyRange,
  MultiDimRange,
  NonEmptyRange,
  Range,
  Range1D,
  Range2D,
  RangeElement,
} from './data';

import {
  Coordinates,
  Range,
  Range1D,
  Range2D,
} from './data';

import {
  abs,
  alternative,
  asMultiDimRange,
  asNumber,
  asRange,
  asRange1D,
  asRange2D,
  isArray,
  isCouple,
  isNumber,
  map,
  max as maxOfArray,
  mean as meanOfArray,
  min as minOfArray,
  pipe,
  ret,
} from './utils';

/**
 * Return bottom-left coordinates of two-dimensional range.
 * @param   range Two-dimensional range.
 * @returns       Bottom-left coordinates.
 */
export function bottomLeft(range: Range2D): Coordinates {
  return pipe(
    asRange2D,
    (range: Range2D) => [asNumber(min(range[0])), asNumber(min(range[1]))],
  )(range);
}

/**
 * Return bottom-right coordinates of two-dimensional range.
 * @param   range Two-dimensional range.
 * @returns       Bottom-right coordinates.
 */
export function bottomRight(range: Range2D): Coordinates {
  return pipe(
    asRange2D,
    (range: Range2D) => [asNumber(max(range[0])), asNumber(min(range[1]))],
  )(range);
}

/**
 * Return the first value of each dimension of a range.
 * @param   range The range.
 * @returns       First value of each dimension of the range.
 */
export function first(range: Range): undefined | number | number[] {
  return pipe(
    asRange,
    alternative(
      pipe(
        asRange1D,
        (range: Range1D) => asNumber(range[0]),
      ),
      pipe(
        asMultiDimRange,
        map((el: Range1D) => asNumber(first(el))),
      ),
      ret(undefined),
    ),
  )(range);
}

/**
 * Check if value is empty range.
 * @param   value Value to test.
 * @returns       True if value is empty range, otherwise false.
 */
export function isEmptyRange(value: any): boolean {
  return isArray(value) && value.length === 0;
}

/**
 * Check if value is multi-dimensional range.
 * @param   value Value to test. 
 * @returns       True if value is multi-dimensional range, otherwise false.
 */
export function isMultiDimRange(value: any): boolean {
  return (
    isArray(value) && value.length >= 2
    && (value as Array<any>).every((el) => isRange1D(el))
  );
}

/**
 * Check if value is range.
 * @param   value Value to test.
 * @returns       True if value is range, otherwise false.
 */
export function isRange(value: any): boolean {
  return isEmptyRange(value) || isRange1D(value) || isMultiDimRange(value);
}

/**
 * Check if value is one-dimensional range.
 * @param   value Value to test.
 * @returns       True if value is one-dimensional range, otherwise false. 
 */
export function isRange1D(value: any): boolean {
  return isCouple(value) && (value as Array<any>).every((el) => isNumber(el));
}

/**
 * Check if value is two-dimensional range.
 * @param   value Value to test.
 * @returns       True if value is two-dimensional range, otherwise false.
 */
export function isRange2D(value: any): boolean {
  return isCouple(value) && (value as Array<any>).every((el) => isRange1D(el));
}

/**
 * Return the last value of each dimension of a range.
 * @param   range The range.
 * @returns       Last value of each dimension of the range.
 */
export function last(range: Range): undefined | number | number[] {
  return pipe(
    asRange,
    alternative(
      pipe(
        asRange1D,
        (range: Range1D) => asNumber(range[1]),
      ),
      pipe(
        asMultiDimRange,
        map((el: Range1D) => asNumber(last(el))),
      ),
      ret(undefined),
    ),
  )(range);
}

/**
 * Return length of each dimension of a range.
 * @param   range The range.
 * @returns       Length of each dimension of the range.
 */
export function length(range: Range): number | number[] {
  return pipe(
    asRange,
    alternative(
      pipe(
        asRange1D,
        (range: Range1D) => abs(asNumber(first(range)) - asNumber(last(range))),
      ),
      pipe(
        asMultiDimRange,
        map((el: Range1D) => asNumber(length(el))),
      ),
      ret(0),
    ),
  )(range);
}

/**
 * Return maximum value of each dimension of a range.
 * @param   range The range.
 * @returns       Maximum value of each dimension of the range.
 */
export function max(range: Range): undefined | number | number[] {
  return pipe(
    asRange,
    alternative(
      pipe(
        asRange1D,
        maxOfArray,
      ),
      pipe(
        asMultiDimRange,
        map((el: Range1D) => asNumber(max(el))),
      ),
      ret(undefined),
    ),
  )(range);
}

/**
 * Return mean of each dimension of a range.
 * @param   range The range.
 * @returns       Mean of each dimension of the range.
 */
export function mean(range: Range): undefined | number | number[] {
  return pipe(
    asRange,
    alternative(
      pipe(
        asRange1D,
        meanOfArray,
      ),
      pipe(
        asMultiDimRange,
        map((el: Range1D) => asNumber(mean(el))),
      ),
      ret(undefined),
    ),
  )(range);
}

/**
 * Return minimum value of each dimension of a range.
 * @param   range The range.
 * @returns       Minimum value of each dimension of the range.
 */
export function min(range: Range): undefined | number | number[] {
  return pipe(
    asRange,
    alternative(
      pipe(
        asRange1D,
        minOfArray,
      ),
      pipe(
        asMultiDimRange,
        map((el: Range1D) => asNumber(min(el))),
      ),
      ret(undefined),
    ),
  )(range);
}

/**
 * Return range with values in each dimensions swapped.
 * @param   range The range.
 * @returns       Range with values in each dimension swapped.
 */
export function reverse(range: Range): Range {
  return pipe(
    asRange,
    alternative(
      pipe(
        asRange1D,
        (range: Range1D) => [asNumber(last(range)), asNumber(first(range))],
      ),
      pipe(
        asMultiDimRange,
        map((el: Range1D) => asRange1D(reverse(el))),
      ),
      ret([]),
    ),
  )(range);
}

/**
 * Return range with values in each dimension sorted from lowest to highest.
 * @param   range The range.
 * @returns       Range with values in each dimension sorted from lowest to
 *                highest.
 */
export function sort(range: Range): Range {
  return pipe(
    asRange,
    alternative(
      pipe(
        asRange1D,
        (range: Range1D) => [asNumber(min(range)), asNumber(max(range))],
      ),
      pipe(
        asMultiDimRange,
        map((el: Range1D) => asRange1D(sort(el))),
      ),
      ret([]),
    ),
  )(range);
}

/**
 * Return top-left coordinates of two-dimensional range. 
 * @param   range Two-dimensional range.
 * @returns       Top-left coordinates.
 */
export function topLeft(range: Range2D): Coordinates {
  return pipe(
    asRange2D,
    (range: Range2D) => [min(range[0]), max(range[1])],
  )(range);
}

/**
 * Return top-right coordinates of two-dimensional range.
 * @param   range Two-dimensional range.
 * @returns       Top-right coordinates.
 */
export function topRight(range: Range2D): Coordinates {
  return pipe(
    asRange2D,
    (range: Range2D) => [max(range[0]), max(range[1])],
  )(range);
}
