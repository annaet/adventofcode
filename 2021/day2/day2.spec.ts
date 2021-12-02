import {
  calculatePosition,
  calculatePositionWithAim,
} from './day2';

describe('Day 2', () => {
  describe('Part 1', () => {
    it('Should calculate position for test data', async () => {
      expect(await calculatePosition('./day2/input/test_input.txt')).toEqual(150);
    });

    it('Should calculate position for real data', async () => {
      expect(await calculatePosition('./day2/input/input.txt')).toEqual(2019945);
    });
  });

  describe('Part 2', () => {
    it('Should calculate position with aim for test data', async () => {
      expect(await calculatePositionWithAim('./day2/input/test_input.txt')).toEqual(900);
    });

    it('Should calculate position with aim for real data', async () => {
      expect(await calculatePositionWithAim('./day2/input/input.txt')).toEqual(1599311480);
    });
  });
});
