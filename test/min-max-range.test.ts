import {
  bottomLeft,
  bottomRight,
  first,
  includes,
  inside,
  intersect,
  isEmptyRange,
  isMultiDimRange,
  isNonEmptyRange,
  isRange,
  isRange1D,
  isRange2D,
  last,
  length,
  max,
  mean,
  min,
  MultiDimRange,
  partOf,
  Range,
  reverse,
  shift,
  sort,
  topLeft,
  topRight,
} from '../src/min-max-range';

import {
  EMPTY_RANGE,
  INVALID_RANGES,
  MULTI_DIM_RANGE,
  MULTI_DIM_RANGES,
  RANGES,
  RANGE_1D,
  RANGE_2D,
} from './mocks';

const arrayOfLength = (length: number) => Array.apply(null, Array(length));

describe('min-max-range', () => {
  describe('bottomLeft', () => {
    it('throws an error if input is no two-dimensional range', () => {
      const nonRange2Ds: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
        RANGE_1D,
        MULTI_DIM_RANGE,
      ];
      for (const nonRange2D of nonRange2Ds) {
        expect(() => {
          bottomLeft(nonRange2D);
        }).toThrowError();
      }
    });

    it('returns bottom-left coordinates of two-dimensional range', () => {
      expect(bottomLeft(RANGE_2D)).toEqual([
        Math.min(...RANGE_2D[0]),
        Math.min(...RANGE_2D[1]),
      ]);
    });
  });
56
  describe('bottomRight', () => {
    it('throws an error if input is no two-dimensional range', () => {
      const nonRange2Ds: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
        RANGE_1D,
        MULTI_DIM_RANGE,
      ];
      for (const nonRange2D of nonRange2Ds) {
        expect(() => {
          bottomRight(nonRange2D);
        }).toThrowError();
      }
    });

    it('returns bottom-right coordinates of two-dimensional range', () => {
      expect(bottomRight(RANGE_2D)).toEqual([
        Math.max(...RANGE_2D[0]),
        Math.min(...RANGE_2D[1]),
      ]);
    });
  });
  
  describe('first', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          first(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns undefined for empty range', () => {
      expect(first(EMPTY_RANGE)).toBe(undefined);
    });

    it('returns the first element of one-dimensional range', () => {
      expect(first(RANGE_1D)).toBe(RANGE_1D[0]);
    });
    
    it('returns the first elements of multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(first(MULTI_DIM_RANGE)).toEqual(MULTI_DIM_RANGE.map(r => r[0]));
      }
    });
  });

  describe('includes', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          includes(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns false if test input is no range', () => {
      const includedInRange1D = includes(RANGE_1D);
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(includedInRange1D(INVALID_RANGE)).toBe(false);
      }
    });

    it('returns false for empty range', () => {
      const includedInEmpty = includes(EMPTY_RANGE);
      for (const RANGE of RANGES) {
        expect(includedInEmpty(RANGE)).toBe(false);
      }
    });

    it('returns true if included in one-dimensional range', () => {
      const includedInRange1D = includes(RANGE_1D);
      expect(includedInRange1D(RANGE_1D)).toBe(true);
      const rand1: number = Math.random();
      const rand2: number = Math.random();
      expect(includedInRange1D([
        rand1 * RANGE_1D[0] + (1 - rand1) * RANGE_1D[1],
        rand2 * RANGE_1D[0] + (1 - rand2) * RANGE_1D[1],
      ])).toBe(true);
    });

    it('returns false if not included in one-dimensional range', () => {
      const notIncludedRanges: Range[] = [
        EMPTY_RANGE,
        ...MULTI_DIM_RANGES,
      ];
      const includedInRange1D = includes(RANGE_1D);
      for (const notIncludedRange of notIncludedRanges) {
        expect(includedInRange1D(notIncludedRange)).toBe(false);
      }
    });
    
    it('returns true if included in multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        const includedInRange = includes(MULTI_DIM_RANGE);
        expect(includedInRange(MULTI_DIM_RANGE)).toBe(true);
        expect(
          includedInRange(
            MULTI_DIM_RANGE.map(r => {
              const rand1: number = Math.random();
              const rand2: number = Math.random();
              return [
                rand1 * r[0] + (1 - rand1) * r[1],
                rand2 * r[0] + (1 - rand2) * r[1],
              ];
            }) as MultiDimRange
          )
        ).toBe(true);
      }
    });

    it('returns false if not included in multi-dimensional range', () => {
      const notIncludedRanges: Range[] = [
        EMPTY_RANGE,
        RANGE_1D,
      ];
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        const includedInRange = includes(MULTI_DIM_RANGE);
        for (const notIncludedRange of notIncludedRanges) {
          expect(includedInRange(notIncludedRange)).toBe(false);
          expect(includedInRange(notIncludedRange)).toBe(false);
        }
      }
    });
  });

  describe('inside', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          inside(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns false if test input is not of type number or number[]', () => {
      const nonNumerics: any[] = [
        {},
        '3.14',
        (x: any) => x,
        [],
        [1, 2, 'foo'],
      ];
      const insideRange1D = inside(RANGE_1D);
      for (const nonNumeric of nonNumerics) {
        expect(insideRange1D(nonNumeric)).toBe(false);
      }
    });

    it('returns false for empty range', () => {
      const numerics: any[] = [
        0,
        3.14,
        42,
        -99,
        [1, 2, 3, 4],
      ];
      const insideEmpty = inside(EMPTY_RANGE);
      for (const numeric of numerics) {
        expect(insideEmpty(numeric)).toBe(false);
      }
    });

    it('returns true if inside one-dimensional range', () => {
      const insideRange1D = inside(RANGE_1D);
      expect(insideRange1D(RANGE_1D[0])).toBe(true);
      expect(insideRange1D(RANGE_1D[1])).toBe(true);
      const rand: number = Math.random();
      expect(insideRange1D(rand * RANGE_1D[0] + (1 - rand) * RANGE_1D[1]))
        .toBe(true);
    });

    it('returns false if not inside one-dimensional range', () => {
      const insideRange1D = inside(RANGE_1D);
      expect(insideRange1D(Math.min(...RANGE_1D) - 1)).toBe(false);
      expect(insideRange1D(Math.max(...RANGE_1D) + 1)).toBe(false);
    });
    
    it('returns true if inside multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        const insideRange = inside(MULTI_DIM_RANGE);
        expect(insideRange(MULTI_DIM_RANGE.map(r => r[0]))).toBe(true);
        expect(insideRange(MULTI_DIM_RANGE.map(r => r[1]))).toBe(true);
        expect(
          insideRange(
            MULTI_DIM_RANGE.map(r => {
              const rand: number = Math.random();
              return rand * r[0] + (1 - rand) * r[1];
            }) as number[]
          )
        ).toBe(true);
      }
    });

    it('returns false if not inside multi-dimensional range', () => {
      const notInsides: any[] = [
        4,
        'foo',
        (x: any) => x,
        [1],
        EMPTY_RANGE,
      ];
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        const insideRange = inside(MULTI_DIM_RANGE);
        for (const notInside of notInsides) {
          expect(insideRange(notInside)).toBe(false);
        }
      }
    });
  });

  describe('intersect', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          intersect(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns empty range if test input is no range', () => {
      for (const RANGE of RANGES) {
        const intersectRange = intersect(RANGE);
        for (const INVALID_RANGE of INVALID_RANGES) {
          expect(intersectRange(INVALID_RANGE)).toEqual([]);
        }
      }
    });

    it('returns empty range if range is multi-dimensional and intersecting range has unequal length', () => {
      expect(intersect(MULTI_DIM_RANGE)([...MULTI_DIM_RANGE, RANGE_1D]))
        .toEqual([]);
    });

    it('returns empty range for empty range', () => {
      const intersectEmpty = intersect(EMPTY_RANGE);
      for (const RANGE of RANGES) {
        expect(intersectEmpty(RANGE)).toEqual([]);
      }
    });

    it('returns intersection with one-dimensional range', () => {
      const intersectRange1D = intersect(RANGE_1D);
      expect(intersectRange1D(RANGE_1D)).toEqual(RANGE_1D);
      const min: number = Math.min(...RANGE_1D) - 1;
      const max: number = (RANGE_1D[0] + RANGE_1D[1]) / 2;
      expect(intersectRange1D([min, max]))
        .toEqual([Math.min(...RANGE_1D), max]);
      expect(intersectRange1D(shift(
        RANGE_1D,
        Math.abs(RANGE_1D[0] - RANGE_1D[1]),
      ))).toEqual([Math.max(...RANGE_1D), Math.max(...RANGE_1D)]);
      expect(intersectRange1D(shift(
        RANGE_1D,
        -Math.abs(RANGE_1D[0] - RANGE_1D[1]),
      ))).toEqual([Math.min(...RANGE_1D), Math.min(...RANGE_1D)]);
    });

    it('returns empty range if not intersecting with one-dimensional range', () => {
      const intersectRange1D = intersect(RANGE_1D);
      expect(intersectRange1D(shift(
        RANGE_1D,
        Math.abs(RANGE_1D[0] - RANGE_1D[1]) + 0.1
      ))).toEqual([]);
      expect(intersectRange1D(shift(
        RANGE_1D,
        -Math.abs(RANGE_1D[0] - RANGE_1D[1]) - 0.1,
      ))).toEqual([]);
    });
    
    it('returns intersection with multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        const intersectRange = intersect(MULTI_DIM_RANGE);
        expect(intersectRange(MULTI_DIM_RANGE))
          .toEqual(MULTI_DIM_RANGE.map(r => [Math.min(...r), Math.max(...r)]));
        const intersectingRange: MultiDimRange =
          MULTI_DIM_RANGE.map(r => [(r[0] + r[1]) / 2, r[1]]) as MultiDimRange;
        expect(intersectRange(intersectingRange)).toEqual(
          intersectingRange.map(r => [Math.min(...r), Math.max(...r)])
        );
      }
    });

    it('returns empty range if not intersecting with multi-dimensional range', () => {
      const notIntersectings: any[] = [
        4,
        'foo',
        (x: any) => x,
        [1],
        EMPTY_RANGE,
      ];
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        const intersectRange = intersect(MULTI_DIM_RANGE);
        for (const notIntersecting of notIntersectings) {
          expect(intersectRange(notIntersecting)).toEqual([]);
        }
      }
    });
  });

  describe('isEmptyRange', () => {
    it('returns true if empty range', () => {
      expect(isEmptyRange(EMPTY_RANGE)).toBe(true);
    });

    it('returns false if not empty range', () => {
      const nonEmptyRanges: any[] = [
        ...INVALID_RANGES,
        RANGE_1D,
        ...MULTI_DIM_RANGES,
      ];
      for (const nonEmptyRange of nonEmptyRanges) {
        expect(isEmptyRange(nonEmptyRange)).toBe(false);
      }
    });
  });

  describe('isMultiDimRange', () => {
    it('returns true if multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(isMultiDimRange(MULTI_DIM_RANGE)).toBe(true);
      }
    });

    it('returns false if not multi-dimensional range', () => {
      const nonMultiDimRanges: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
        RANGE_1D,
      ];
      for (const nonMultiDimRange of nonMultiDimRanges) {
        expect(isMultiDimRange(nonMultiDimRange)).toBe(false);
      }
    });
  });

  describe('isNonEmptyRange', () => {
    it('returns true if non-empty range', () => {
      const nonEmptyRanges: any[] = [
        RANGE_1D,
        ...MULTI_DIM_RANGES,
      ];
      for (const nonEmptyRange of nonEmptyRanges) {
        expect(isNonEmptyRange(nonEmptyRange)).toBe(true);
      } 
    });

    it('returns false if not non-empty range', () => {
      const noNonEmptyRanges: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
      ];
      for (const noNonEmptyRange of noNonEmptyRanges) {
        expect(isNonEmptyRange(noNonEmptyRange)).toBe(false);
      }
    });
  });
  
  describe('isRange', () => {
    it('returns true if range', () => {
      for (const RANGE of RANGES) {
        expect(isRange(RANGE)).toBe(true);
      }
    });

    it('returns false if not range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(isRange(INVALID_RANGE)).toBe(false);
      }
    });
  });
  
  describe('isRange1D', () => {
    it('returns true if one-dimensional range', () => {
      expect(isRange1D(RANGE_1D)).toBe(true);
    });

    it('returns false if not one-dimensional range', () => {
      const nonRange1Ds: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
        ...MULTI_DIM_RANGES,
      ];
      for (const nonRange1D of nonRange1Ds) {
        expect(isRange1D(nonRange1D)).toBe(false);
      }
    });
  });

  describe('isRange2D', () => {
    it('returns true if two-dimensional range', () => {
      expect(isRange2D(RANGE_2D)).toBe(true);
    });

    it('returns false if not two-dimensional range', () => {
      const nonRange2Ds: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
        RANGE_1D,
        MULTI_DIM_RANGE,
      ];
      for (const nonRange2D of nonRange2Ds) {
        expect(isRange2D(nonRange2Ds)).toBe(false);
      }
    });
  });

  describe('last', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          last(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns undefined for empty range', () => {
      expect(last(EMPTY_RANGE)).toBe(undefined);
    });

    it('returns the last element for one-dimensional range', () => {
      expect(last(RANGE_1D)).toBe(RANGE_1D[RANGE_1D.length - 1]);
    });

    it('returns the last elements for multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(last(MULTI_DIM_RANGE))
          .toEqual(MULTI_DIM_RANGE.map(r => r[r.length - 1]));
      }
    });
  });

  describe('length', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          length(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns 0 for empty range', () => {
      expect(length(EMPTY_RANGE)).toBe(0);
    });

    it('returns length of one-dimensional range', () => {
      expect(length(RANGE_1D)).toBe(Math.abs(RANGE_1D[0] - RANGE_1D[1]));
    });

    it('returns length of multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(length(MULTI_DIM_RANGE))
          .toEqual(MULTI_DIM_RANGE.map(r => Math.abs(r[0] - r[1])));
      }
    });
  });

  describe('max', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          max(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns undefined for empty range', () => {
      expect(max(EMPTY_RANGE)).toBe(undefined);
    });

    it('returns maximum value of one-dimensional range', () => {
      expect(max(RANGE_1D)).toBe(Math.max(...RANGE_1D));
    });

    it('returns maximum value of multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(max(MULTI_DIM_RANGE))
          .toEqual(MULTI_DIM_RANGE.map(r => Math.max(...r)));
      }
    });
  });

  describe('mean', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          mean(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns undefined for empty range', () => {
      expect(mean(EMPTY_RANGE)).toBe(undefined);
    });

    it('returns arithmetic mean of one-dimensional range', () => {
      expect(mean(RANGE_1D)).toBe((RANGE_1D[0] + RANGE_1D[1]) / 2);
    });

    it('returns arithmetic mean of multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(mean(MULTI_DIM_RANGE))
          .toEqual(MULTI_DIM_RANGE.map(r => (r[0] + r[1]) / 2));
      }
    });
  });

  describe('min', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          min(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns undefined for empty range', () => {
      expect(min(EMPTY_RANGE)).toBe(undefined);
    });

    it('returns minimum value of one-dimensional range', () => {
      expect(min(RANGE_1D)).toBe(Math.min(...RANGE_1D));
    });

    it('returns minimum value of multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(min(MULTI_DIM_RANGE))
          .toEqual(MULTI_DIM_RANGE.map(r => Math.min(...r)));
      }
    });
  });

  describe('partOf', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          partOf(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns false if test input is no range', () => {
      const range1DPartOf = partOf(RANGE_1D);
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(range1DPartOf(INVALID_RANGE)).toBe(false);
      }
    });

    it('returns false for empty range', () => {
      const emptyRangePartOf = partOf(EMPTY_RANGE);
      for (const RANGE of RANGES) {
        expect(emptyRangePartOf(RANGE)).toBe(false);
      }
    });

    it('returns true if one-dimensional range is part of another', () => {
      expect(partOf(RANGE_1D)(RANGE_1D)).toBe(true);
      const rand1: number = Math.random();
      const rand2: number = Math.random();
      expect(
        partOf([
          rand1 * RANGE_1D[0] + (1 - rand1) * RANGE_1D[1],
          rand2 * RANGE_1D[0] + (1 - rand2) * RANGE_1D[1],
        ])(RANGE_1D)
      ).toBe(true);
    });

    it('returns false if one-dimensional range is not part another', () => {
      const notPartOfs: Range[] = [
        EMPTY_RANGE,
        ...MULTI_DIM_RANGES,
      ];
      const range1DPartOf = partOf(RANGE_1D);
      for (const notPartOf of notPartOfs) {
        expect(range1DPartOf(notPartOf)).toBe(false);
      }
    });
    
    it('returns true if multi-dimensional range is part of another', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(partOf(MULTI_DIM_RANGE)(MULTI_DIM_RANGE)).toBe(true);
        expect(
          partOf(
            MULTI_DIM_RANGE.map(r => {
              const rand1: number = Math.random();
              const rand2: number = Math.random();
              return [
                rand1 * r[0] + (1 - rand1) * r[1],
                rand2 * r[0] + (1 - rand2) * r[1],
              ];
            }) as MultiDimRange
          )(MULTI_DIM_RANGE)
        ).toBe(true);
      }
    });

    it('returns false if multi-dimensional range is not part of another', () => {
      const notPartOfs: Range[] = [
        EMPTY_RANGE,
        RANGE_1D,
      ];
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        const rangePartOf = partOf(MULTI_DIM_RANGE);
        for (const notPartOf of notPartOfs) {
          expect(rangePartOf(notPartOf)).toBe(false);
          expect(rangePartOf(notPartOf)).toBe(false);
        }
      }
    });
  });

  describe('reverse', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          reverse(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns empty range for empty range', () => {
      expect(reverse(EMPTY_RANGE)).toEqual(EMPTY_RANGE);
      expect(reverse(EMPTY_RANGE)).not.toBe(EMPTY_RANGE);
    });

    it('reverses values of one-dimensional range', () => {
      expect(reverse(RANGE_1D)).toEqual([RANGE_1D[1], RANGE_1D[0]]);
    });

    it('reverses values of multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(reverse(MULTI_DIM_RANGE))
          .toEqual(MULTI_DIM_RANGE.map(r => [r[1], r[0]]));
      }
    });
  });

  describe('shift', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          shift(INVALID_RANGE, 3);
        }).toThrowError();
      }
    });
    
    it('throws an error if range is multi-dimensional and delta has unequal length', () => {
      expect(() => {
        shift(
          MULTI_DIM_RANGE,
          arrayOfLength(MULTI_DIM_RANGE.length + 1).map(() => 1),
        );
      }).toThrowError();
    });

    it('throws an error if range is multi-dimensional and delta is no number or array of numbers', () => {
      expect(() => {
        shift(
          MULTI_DIM_RANGE,
          arrayOfLength(MULTI_DIM_RANGE.length)
            .map(() => 'foo') as unknown as number[],
        );
      }).toThrowError();
    });

    it('returns empty range for empty range', () => {
      expect(shift(EMPTY_RANGE, 7)).toEqual(EMPTY_RANGE);
    });

    it('shifts values of one-dimensional range', () => {
      expect(shift(RANGE_1D, -2)).toEqual([
        RANGE_1D[0] - 2,
        RANGE_1D[1] - 2,
      ]);
    });

    it('shifts values of multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(shift(MULTI_DIM_RANGE, 5))
          .toEqual(MULTI_DIM_RANGE.map(r => [r[0] + 5, r[1] + 5]));
        expect(
          shift(
            MULTI_DIM_RANGE,
            arrayOfLength(MULTI_DIM_RANGE.length).map((_, i) => -2 * i),
          )
        ).toEqual(MULTI_DIM_RANGE.map((r, i) => [r[0] - 2 * i, r[1] - 2 * i]));
      }
    });
  });

  describe('sort', () => {
    it('throws an error if input is no range', () => {
      for (const INVALID_RANGE of INVALID_RANGES) {
        expect(() => {
          sort(INVALID_RANGE);
        }).toThrowError();
      }
    });

    it('returns empty range for empty range', () => {
      expect(sort(EMPTY_RANGE)).toEqual(EMPTY_RANGE);
      expect(sort(EMPTY_RANGE)).not.toBe(EMPTY_RANGE);
    });

    it('sorts values of one-dimensional range', () => {
      expect(sort(RANGE_1D)).toEqual([
        Math.min(...RANGE_1D),
        Math.max(...RANGE_1D),
      ]);
    });

    it('reverses values of multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(sort(MULTI_DIM_RANGE)).toEqual(
          MULTI_DIM_RANGE.map(r => [Math.min(...r), Math.max(...r)])
        );
      }
    });
  });

  describe('topLeft', () => {
    it('throws an error if input is no two-dimensional range', () => {
      const nonRange2Ds: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
        RANGE_1D,
        MULTI_DIM_RANGE,
      ];
      for (const nonRange2D of nonRange2Ds) {
        expect(() => {
          topLeft(nonRange2D);
        }).toThrowError();
      }
    });

    it('returns top-left coordinates of two-dimensional range', () => {
      expect(topLeft(RANGE_2D)).toEqual([
        Math.min(...RANGE_2D[0]),
        Math.max(...RANGE_2D[1]),
      ]);
    });
  });

  describe('topRight', () => {
    it('throws an error if input is no two-dimensional range', () => {
      const nonRange2Ds: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
        RANGE_1D,
        MULTI_DIM_RANGE,
      ];
      for (const nonRange2D of nonRange2Ds) {
        expect(() => {
          topRight(nonRange2D);
        }).toThrowError();
      }
    });

    it('returns top-right coordinates of two-dimensional range', () => {
      expect(topRight(RANGE_2D)).toEqual([
        Math.max(...RANGE_2D[0]),
        Math.max(...RANGE_2D[1]),
      ]);
    });
  });
});
