export {
  EmptyRange,
  MultiDimRange,
  NonEmptyRange,
  Range,
  Range1D,
  Range2D,
  RangeElement,
} from './data';

import {
  Range,
  Range1D,
} from './data';

import {
  abs,
  alternative,
  asMultiDimRange,
  asNumber,
  asRange,
  asRange1D,
  isArray,
  isCouple,
  isNumber,
  map,
  max as maxOfArray,
  min as minOfArray,
  pipe,
  ret,
} from './utils';

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
        (range: Range1D) => range[0],
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
        (range: Range1D) => range[1],
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
