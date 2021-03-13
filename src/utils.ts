import {
  EmptyRange,
  MultiDimRange,
  Range1D,
  Range2D,
} from './data';

import {
  isEmptyRange,
  isMultiDimRange,
  isRange,
  isRange1D,
  isRange2D,
} from './min-max-range';

/**
 * Method checking a condition.
 */
export type Condition = (value: any) => boolean;

/**
 * Method transforming a value.
 */
export type Transform<Input = any, Output = any> = (value: Input) => Output;

/**
 * Return absolute of value.
 * @param   value The value.
 * @returns       Absolute of value.
 */
export function abs(value: number): number {
  return Math.abs(value);
}

/**
 * Execute a list of functions until the first function executes without error. 
 * @param   alternatives Alternative functions.
 * @returns              Return value of first successful function. 
 */
export function alternative(
  ...alternatives: Transform[]
): Transform {
  return (value: any) => {
    for (const alt of alternatives) {
      try {
        const result: any = alt(value);
        return result;
      } catch (_) { /* tslint:disable:no-empty */ }
    }
    throw new Error('No matching function among the alternatives.');
  };
}

/**
 * Transform value to empty range or throw error.
 * @param   value Value to transform.
 * @returns       Value as empty range.
 */
export function asEmptyRange(value: any): EmptyRange {
  return assert(
    isEmptyRange,
    (value: any) => `Cannot convert value ${value} to empty range.`,
  )(value) as EmptyRange;
}

/**
 * Transform value to multi-dimensional range or throw error.
 * @param   value Value to transform.
 * @returns       Value as multi-dimensional range.
 */
export function asMultiDimRange(value: any): MultiDimRange {
  return assert(
    isMultiDimRange,
    (value: any) => `Cannot convert value ${value} to multi-dimensional range.`,
  )(value) as MultiDimRange;
}

/**
 * Transform value to number or throw error.
 * @param   value Value to transform.
 * @returns       Value as number.
 */
export function asNumber(value: any): number {
  return assert(
    isNumber,
    (value: any) => `Cannot convert value ${value} to number.`,
  )(value) as number;
}

/**
 * Transform value to range or throw error.
 * @param   value Value to transform.
 * @returns       Value as range.
 */
 export function asRange(value: any): Range {
  return assert(
    isRange,
    (value: any) => `Cannot convert value ${value} to range.`,
  )(value) as Range;
}

/**
 * Transform value to one-dimensional range or throw error.
 * @param   value Value to transform.
 * @returns       Value as one-dimensional range.
 */
 export function asRange1D(value: any): Range1D {
  return assert(
    isRange1D,
    (value: any) => `Cannot convert value ${value} to one-dimensional range.`,
  )(value) as Range1D;
}

/**
 * Transform value to two-dimensional range or throw error.
 * @param   value Value to transform.
 * @returns       Value as two-dimensional range.
 */
export function asRange2D(value: any): Range2D {
  return assert(
    isRange2D,
    (value: any) => `Cannot convert value ${value} to two-dimensional range.`,
  )(value) as Range2D;
}

/**
 * Return method to test if a condition holds true or throw an error.
 * @param   cond     Condition to test.
 * @param   errorMsg Error message to throw.
 * @returns          Function that tests if a condition holds true or throws an
 *                   error
 */
export function assert(
  cond: Condition,
  errorMsg: (value: any) => string,
): Transform {
  return (value: any) => {
    if (!cond(value)) {
      throw new TypeError(errorMsg(value));
    }
    return value;
  };
}

/**
 * Check if value is an array.
 * @param   value Value to test.
 * @returns       True if value is an array, otherwise false.
 */
export function isArray(value: any): boolean {
  return Array.isArray(value);
}

/**
 * Check if value is a mathematical couple.
 * @param   value Value to test.
 * @returns       True if value is a couple, otherwise false.
 */
export function isCouple(value: any): boolean {
  return isArray(value) && value.length === 2;
}

/**
 * Check if value is numeric.
 * @param   value Value to test.
 * @returns       True if value is numeric, otherwise false.
 */
export function isNumber(value: any): boolean {
  return typeof value === 'number';
}

/**
 * Return function to apply function to each element in an array.
 * @param   transform Function to apply.
 * @returns           Function to apply function on array.
 */
export function map(transform: Transform): Transform<any[], any[]> {
  return (array: any[]) => array.map(el => transform(el));
}

/**
 * Return maximum value of array of numbers.
 * @param   values Array of numbers.
 * @returns        Maximum value.
 */
export function max(values: number[]): number {
  return Math.max(...values);
}

/**
 * Return minimum value of array of numbers.
 * @param   values Array of numbers.
 * @returns        Minimum value.
 */
export function min(values: number[]): number {
  return Math.min(...values);
}

/**
 * Return function to apply several functions in order on value.
 * @param   transforms Functions to apply.
 * @returns            Function to apply several functions in order on value.
 */
export function pipe(...transforms: Transform[]): Transform {
  return (value: any) =>
    transforms.reduce((output, transform) => transform(output), value);
}

/**
 * Create a function returning a plain value.
 * @param   value Value to return.
 * @returns       Function returning the value. 
 */
export function ret<T>(value: T): () => T {
  return () => value;
}
