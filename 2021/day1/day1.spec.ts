import {
  countIncrements,
  countWindowIncrements,
} from './day1';

describe('Day 1', () => {
  describe('Part 1', () => {
    it('Should count increments for test data', async () => {
      expect(await countIncrements('./day1/input/test_input.txt')).toEqual(7);
    });

    it('Should count increments for real data', async () => {
      expect(await countIncrements('./day1/input/input.txt')).toEqual(1316);
    });
  });

  describe('Part 2', () => {
    it('Should count increments using a sliding window of 3 for test data', async () => {
      expect(await countWindowIncrements('./day1/input/test_input.txt')).toEqual(5);
    });

    it('Should count increments using a sliding window of 3 for real data', async () => {
      expect(await countWindowIncrements('./day1/input/input.txt')).toEqual(1344);
    });
  });
});
