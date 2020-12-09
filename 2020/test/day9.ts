import 'mocha';

import { expect } from 'chai';

import {
  part1,
  part2,
} from '../challenges/day9';

describe('Day 9', () => {
  describe('Examples', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day9_example.txt`, 5)
      expect(result).to.equal(127);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day9_example.txt`, 127)
      expect(result).to.equal(62);
    });
  });

  describe('Challenges', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day9.txt`, 25)
      expect(result).to.equal(26134589);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day9.txt`, 26134589)
      expect(result).to.equal(3535124);
    });
  });
});