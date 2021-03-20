[![build](https://github.com/Symmetronic/min-max-range/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Symmetronic/min-max-range/actions/workflows/build.yml?query=branch%3Amain) [![Coverage Status](https://coveralls.io/repos/github/Symmetronic/min-max-range/badge.svg?branch=main)](https://coveralls.io/github/Symmetronic/min-max-range?branch=main) [![GitHub License](https://img.shields.io/github/license/Symmetronic/min-max-range)](https://github.com/Symmetronic/min-max-range/blob/main/LICENSE)

# min-max-range

Implementation of range data structures using plain JavaScript arrays.

## Importing this library

### Node Modules

- Run `npm install min-max-range`
- Import the utility functions you need and use them in your code.

### CDN

- Put the following script tag `<script src="https://cdn.jsdelivr.net/npm/min-max-range@1/dist/min-max-range.umd.min.js"></script>` in the head of your HTML file.
- Then you can access the library with the global variable `minMaxRange`

## Data Types

### EmptyRange

```typescript
type EmptyRange = [];
```

### Range1D

```typescript
type Range1D = [number, number];
```

### Range2D

```typescript
type Range2D = [Range1D, Range1D];
```

### MultiDimRange

```typescript
type MultiDimRange = [Range1D, Range1D, ...Range1D[]];
```

### NonEmptyRange

```typescript
type NoneEmptyRange = Range1D | MultiDimRange;
```

### Range

```typescript
type Range = EmptyRange | NonEmptyRange;
```

### Coordinates2D

```typescript
type Coordinates2D = [number, number];
```

### Transform

```typescript
type Transform<Input, Output> = (value: Input) => Output;
```

## Utility Functions

### isRange: (value) => boolean

Check if value is range.

- `value` (`any`): Value to test.

### isEmptyRange: (value) => boolean

Check if value is empty range.

- `value` (`any`): Value to test.

### isNonEmptyRange: (value) => boolean

Check if value is non-empty range.

- `value` (`any`): Value to test.

### isRange1D: (value) => boolean

Check if value is one-dimensional range.

- `value` (`any`): Value to test.

### isRange2D: (value) => boolean

Check if value is two-dimensional range.

- `value` (`any`): Value to test.

### isMultiDimRange: (value) => boolean

Check if value is multi-dimensional range.

- `value` (`any`): Value to test.

### min: (range) => undefined | number | number[]

Return minimum value of each dimension of a range.

- `range` (`Range`): The range.

### max: (range) => undefined | number | number[]

Return maximum value of each dimension of a range.

- `range` (`Range`): The range.

### mean: (range) => undefined | number | number[]

Return mean of each dimension of a range.

- `range` (`Range`): The range.

### first: (range) => undefined | number | number[]

Return the first value of each dimension of a range.

- `range` (`Range`): The range.

### last: (range) => undefined | number | number[]

Return the last value of each dimension of a range.

- `range`: (`Range`): The range.

### length: (range) => number | number[]

Return length of each dimension of a range.

- `range` (`Range`): The range.

### bottomLeft: (range) => Coordinates2D

Return bottom-left coordinates of two-dimensional range.

- `range` (`Range2D`): Two-dimensional range.

### bottomRight: (range) => Coordinates2D

Return bottom-right coordinates of two-dimensional range.

- `range` (`Range2D`): Two-dimensional range.

### topLeft: (range) => Coordinates2D

Return top-left coordinates of two-dimensional range.

- `range` (`Range2D`): Two-dimensional range.

### topRight: (range) => Coordinates2D

Return top-right coordinates of two-dimensional range.

- `range` (`Range2D`): Two-dimensional range.

### shift: (range, delta) => Range

Move range by a specified delta.

- `range` (`Range`): Range to move.
- `delta` (`number | number[]`): Delta to move range by. Has to have equal length as range in case of multi-dimensional ranges.

### sort: (range) => Range

Return range with values in each dimension sorted from lowest to highest.

- `range`: (`Range`): The range.

### reverse: (range) => Range

Return range with values in each dimensions swapped.

- `range` (`Range`): The range.

### inside: (range) => Transform<number | number[], boolean>

Return method to check if value is included in range.

- `range` (`Range`): Reference range.

### includes: (range) => Transform<Range, boolean>

Return method to check if one range is included in another.

- `range` (`Range`): Reference range.

### partOf: (range) => Transform<Range, boolean>

Return method to check if range is part of another.

- `range` (`Range`): Reference range.

### intersect: (range) => Transform<Range, Range>

Return method to determine intersection of range with reference.

- `range` (`Range`): Reference range.

## NPM Scripts

- `npm install`: Install dependencies
- `npm test`: Run test suite
- `npm start`: Run `npm run build` in watch mode
- `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
- `npm run test:prod`: Run linting and generate coverage
- `npm run build`: Generate bundles and typings, create docs
- `npm run lint`: Lints code

## Contributing

Pull requests are welcome! Please include new tests for your code and make sure that all tests succeed running `npm test`.
