import {
  abs,
  alternative,
  asArray,
  asEmptyRange,
  asMultiDimRange,
  asNumber,
  asRange1D,
  asRange2D,
  assert,
  isArray,
  isCouple,
  isNumber,
  map,
  max,
  mean,
  min,
  pipe,
  ret,
  sum,
  Transform,
} from '../src/utils';

import {
  EMPTY_RANGE,
  INVALID_RANGES,
  MULTI_DIM_RANGE,
  MULTI_DIM_RANGES,
  RANGE_1D,
  RANGE_2D,
} from './mocks';

describe('utils', () => {
  describe('abs', () => {
    it('returns the absolute of a number', () => {
      expect(abs(-4)).toBe(4);
      expect(abs(0)).toBe(0);
      expect(abs(2)).toBe(2);
    });
  });

  describe('alternative', () => {
    it('throws an error if no matching function was found', () => {
      expect(() => {
        alternative()('foo');
      }).toThrowError();
      expect(() => {
        alternative(
          () => { throw new Error('foobar'); }
        )('bar');
      }).toThrowError();
    });

    it('returns the value of the first matching function', () => {
      expect(
        alternative(
          () => { throw new Error('foobar'); },
          () => 42,
          () => 3.14,
        )('foobar')
      ).toBe(42);
    });
  });

  describe('asArray', () => {
    it('throws error if value is not array', () => {
      const noArrays: any[] = [
        42,
        'foo',
        (x: any) => x,
        {},
        null,
        undefined,
        false,
        true
      ];
      for (const noArray of noArrays) {
        expect(() => {
          asArray(noArray);
        }).toThrowError();
      }
    });

    it('returns value if array', () => {
      expect(asArray([1, 2, 3])).toEqual([1, 2, 3]);
      expect(asArray(['foo', 42, {}])).toEqual(['foo', 42, {}]);
    });
  });

  describe('asEmptyRange', () => {
    it('throws error if value is not empty range', () => {
      const nonEmptyRanges: any[] = [
        ...INVALID_RANGES,
        RANGE_1D,
        ...MULTI_DIM_RANGES,
      ];
      for (const nonEmptyRange of nonEmptyRanges) {
        expect(() => {
          asEmptyRange(nonEmptyRange);
        }).toThrowError();
      }
    });

    it('returns value if empty range', () => {
      expect(asEmptyRange(EMPTY_RANGE)).toBe(EMPTY_RANGE);
    });
  });

  describe('asMultiDimRange', () => {
    it('throws error if value is not multi-dimensional range', () => {
      const nonMultiDimRanges: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
        RANGE_1D,
      ];
      for (const nonMultiDimRange of nonMultiDimRanges) {
        expect(() => {
          asMultiDimRange(nonMultiDimRange);
        }).toThrowError();
      }
    });

    it('returns value if multi-dimensional range', () => {
      for (const MULTI_DIM_RANGE of MULTI_DIM_RANGES) {
        expect(asMultiDimRange(MULTI_DIM_RANGE)).toBe(MULTI_DIM_RANGE);
      }
    });
  });

  describe('asNumber', () => {
    it('throws error if value is not number', () => {
      const noNumbers: any[] = [
        [],
        {},
        (x: any) => x,
        'foo',
        undefined,
        null,
        false,
        true,
      ];
      for (const noNumber of noNumbers) {
        expect(() => {
          asNumber(noNumber);
        }).toThrowError();
      }
    });

    it('returns value if number', () => {
      expect(asNumber(-4)).toBe(-4);
      expect(asNumber(0)).toBe(0);
      expect(asNumber(3.14)).toBe(3.14);
    });
  });

  describe('asRange1D', () => {
    it('throws error if value is not one-dimensional range', () => {
      const nonRange1Ds: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
        ...MULTI_DIM_RANGES,
      ];
      for (const nonRange1D of nonRange1Ds) {
        expect(() => {
          asRange1D(nonRange1D);
        }).toThrowError();
      }
    });

    it('returns value if one-dimensional range', () => {
      expect(asRange1D(RANGE_1D)).toBe(RANGE_1D);
    });
  });
  
  describe('asRange2D', () => {
    it('throws error if value is not two-dimensional range', () => {
      const nonRange2Ds: any[] = [
        ...INVALID_RANGES,
        EMPTY_RANGE,
        RANGE_1D,
        MULTI_DIM_RANGE,
      ];
      for (const nonRange2D of nonRange2Ds) {
        expect(() => {
          asRange2D(nonRange2D);
        }).toThrowError();
      }
    });

    it('returns value if two-dimensional range', () => {
      expect(asRange2D(RANGE_2D)).toBe(RANGE_2D);
    });
  });

  describe('assert', () => {
    it('throws an error if condition is not met', () => {
      expect(() => {
        assert(
          () => false,
          () => 'an error occured',
        )('foo');
      }).toThrowError();
    });
    
    it('returns value if condition is met', () => {
      expect(
        assert(
          () => true,
          () => 'an error occured',
        )('bar')
      ).toBe('bar');
    });
  });

  describe('isArray', () => {
    it('returns true if value is array', () => {
      const arrays: any[] = [
        [],
        [1, 2, 3],
        ['foo', 3.14, {}],
      ];
      for (const array of arrays) {
        expect(isArray(array)).toBe(true);
      }
    });

    it('returns false if value is not array', () => {
      const noArrays: any[] = [
        42,
        'foobar',
        {},
        (x: any) => x,
        undefined,
        false,
        true,
      ];
      for (const noArray of noArrays) {
        expect(isArray(noArray)).toBe(false);
      }
    });
  });

  describe('isCouple', () => {
    it('returns true if value is couple', () => {
      expect(isCouple([4, 2])).toBe(true);
      expect(isCouple(['foo', 'bar'])).toBe(true);
      expect(isCouple(['foobar', 42])).toBe(true);
    });

    it('returns false if value is not couple', () => {
      const noCouples: any[] = [
        42,
        'foobar',
        {},
        (x: any) => x,
        undefined,
        null,
        false,
        true,
        [42],
        [[4, 2]],
        [1, 2, 3],
      ];
      for (const noCouple of noCouples) {
        expect(isCouple(noCouple)).toBe(false);
      }
    });
  });

  describe('isNumber', () => {
    it('returns true if value is number', () => {
      expect(isNumber(-3.14)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(42)).toBe(true);
    });

    it('returns false if value is not number', () => {
      const noNumbers: any[] = [
        'foo',
        [],
        {},
        (x: any) => x,
        undefined,
        null,
        false,
        true,
      ];
      for (const noNumber of noNumbers) {
        expect(isNumber(noNumber)).toBe(false);
      }
    });
  });

  describe('map', () => {
    it('returns a mapping function', () => {
      const mapper: Transform<any[], any[]> = map(() => 42);
      expect(mapper([1, 2, 3])).toEqual([42, 42, 42]);
    });
  });

  describe('max', () => {
    it('returns the maximum value of an array of numbers', () => {
      expect(max([-4, 8, 10, 2])).toBe(10);
    });
  });

  describe('mean', () => {
    it('returns the arithmetic mean of an array of numbers', () => {
      expect(mean([4, 0, -6, 3])).toBe(0.25);
    });
  });

  describe('min', () => {
    it('returns the minimum value of an array of numbers', () => {
      expect(min([-3, 5, 0, -12])).toBe(-12);
    });
  });

  describe('pipe', () => {
    it('applies several functions in order', () => {
      const plusTwo = (x: any) => x + 2;
      const toString = (x: any) => x.toString();
      expect(
        pipe(
          plusTwo,
          toString,
          plusTwo
        )(2)
      ).toBe('42');
    });
  });

  describe('ret', () => {
    it('returns a return function', () => {
      const returner = ret(42);
      expect(returner()).toBe(42);
    });
  });

  describe('sum', () => {
    it('returns the sum of an array of numbers', () => {
      expect(sum([-2, 4, -8, 16, -32, 64])).toBe(42);
    });
  });
});
