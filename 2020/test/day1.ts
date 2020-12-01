import 'mocha';

import { expect } from 'chai';

import {
  part1,
  part2,
} from '../challenges/day1';

describe('Day 1', () => {
  describe('Examples', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day1_example.csv`)
      expect(result).to.equal(514579);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day1_example.csv`)
      expect(result).to.equal(241861950);
    });
  });

  describe('Challenges', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day1.csv`)
      expect(result).to.equal(145875);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day1.csv`)
      expect(result).to.equal(69596112);
    });
  });
});