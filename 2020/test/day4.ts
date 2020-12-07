import 'mocha';

import { expect } from 'chai';

import {
  part1,
  part2,
} from '../challenges/day4';

describe('Day 4', () => {
  describe('Examples', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day4_example.txt`)
      expect(result).to.equal(2);
    });

    it('Part 2 invalid', async () => {
      const result = await part2(`${__dirname}/../input/day4_invalid_example.txt`)
      expect(result).to.equal(0);
    });

    it('Part 2 valid', async () => {
      const result = await part2(`${__dirname}/../input/day4_valid_example.txt`)
      expect(result).to.equal(4);
    });
  });

  describe('Challenges', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day4.txt`)
      expect(result).to.equal(170);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day4.txt`)
      expect(result).to.equal(103);
    });
  });
});