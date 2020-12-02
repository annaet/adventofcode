import 'mocha';

import { expect } from 'chai';

import {
  part1,
  part2,
} from '../challenges/day2';

describe('Day 2', () => {
  describe('Examples', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day2_example.csv`)
      expect(result).to.equal(2);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day2_example.csv`)
      expect(result).to.equal(1);
    });
  });

  describe('Challenges', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day2.csv`)
      expect(result).to.equal(528);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day2.csv`)
      expect(result).to.equal(497);
    });
  });
});