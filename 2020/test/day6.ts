import 'mocha';

import { expect } from 'chai';

import {
  part1,
  part2,
} from '../challenges/day6';

describe('Day 3', () => {
  describe('Examples', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day6_example.txt`)
      expect(result).to.equal(11);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day6_example.txt`)
      expect(result).to.equal(6);
    });
  });

  describe('Challenges', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day6.txt`)
      expect(result).to.equal(6534);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day6.txt`)
      expect(result).to.equal(3402);
    });
  });
});