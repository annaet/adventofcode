import {
  calculateLifeSupportRating,
  calculatePowerConsumption,
} from './day3';

describe('Day 2', () => {
  describe('Part 1', () => {
    it('Should calculate power consumption for test data', async () => {
      expect(await calculatePowerConsumption('./day3/input/test_input.txt')).toEqual(198);
    });

    it('Should calculate power consumption for real data', async () => {
      expect(await calculatePowerConsumption('./day3/input/input.txt')).toEqual(3374136);
    });
  });

  describe('Part 2', () => {
    it('Should calculate life support rating with aim for test data', async () => {
      expect(await calculateLifeSupportRating('./day3/input/test_input.txt')).toEqual(230);
    });

    it('Should calculate life support rating with aim for real data', async () => {
      expect(await calculateLifeSupportRating('./day3/input/input.txt')).toEqual(4432698);
    });
  });
});
