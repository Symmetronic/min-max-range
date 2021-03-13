import {
  EmptyRange,
  MultiDimRange,
  Range,
  Range1D,
  Range2D,
} from "../src/data";

export const INVALID_RANGES: Range[] = [
  42 as unknown as Range,
  'foo' as unknown as Range,
  null as unknown as Range,
  undefined as unknown as Range,
  [[]] as unknown as Range,
  { length: 3 } as unknown as Range,
  ((x: any) => x) as unknown as Range,
];
export const EMPTY_RANGE: EmptyRange = [];
export const RANGE_1D: Range1D = [1, 3];
export const RANGE_2D: Range2D = [[4, -1], [2, 5]];
export const MULTI_DIM_RANGE: MultiDimRange = [[-1, 0], [4, 2], [3, 3]];
export const MULTI_DIM_RANGES: MultiDimRange[] = [RANGE_2D, MULTI_DIM_RANGE];
export const RANGES: Range[] = [EMPTY_RANGE, RANGE_1D, ...MULTI_DIM_RANGES];
