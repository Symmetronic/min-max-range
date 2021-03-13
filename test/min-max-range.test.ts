import {
  bottomLeft,
  bottomRight,
  first,
  isEmptyRange,
  isMultiDimRange,
  isRange,
  isRange1D,
  isRange2D,
  last,
  length,
  max,
  mean,
  min,
  reverse,
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
