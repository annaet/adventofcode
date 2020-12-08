import 'mocha';

import { expect } from 'chai';

import {
  part1,
  part2,
} from '../challenges/day8';

describe('Day 8', () => {
  describe('Examples', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day8_example.txt`)
      expect(result).to.equal(5);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day8_example.txt`)
      expect(result).to.equal(8);
    });
  });

  describe('Challenges', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day8.txt`)
      expect(result).to.equal(2058);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day8.txt`)
      expect(result).to.equal(1000);
    });
  });
});