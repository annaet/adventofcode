import 'mocha';

import { expect } from 'chai';

import {
  part1,
  part2,
} from '../challenges/day5';

describe('Day 5', () => {
  describe('Examples', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day5_example.txt`)
      expect(result).to.equal(820);
    });
  });

  describe('Challenges', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day5.txt`)
      expect(result).to.equal(835);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day5.txt`)
      expect(result).to.equal(649);
    });
  });
});