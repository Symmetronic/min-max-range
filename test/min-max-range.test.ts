import {
  first,
  isEmptyRange,
  isMultiDimRange,
  isRange,
  isRange1D,
  isRange2D,
  last,
  length,
  max,
  min,
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

    it('returns the first element for one-dimensional range', () => {
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
});
