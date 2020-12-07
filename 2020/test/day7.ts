import 'mocha';

import { expect } from 'chai';

import {
  part1,
  part2,
} from '../challenges/day7';

describe('Day 7', () => {
  describe('Examples', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day7_example.txt`)
      expect(result).to.equal(4);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day7_example.txt`)
      expect(result).to.equal(32);
    });

    it('Part 2 another example', async () => {
      const result = await part2(`${__dirname}/../input/day7_example_2.txt`)
      expect(result).to.equal(126);
    });
  });

  describe('Challenges', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day7.txt`)
      expect(result).to.equal(242);
    });

    it('Part 2', async () => {
      const result = await part2(`${__dirname}/../input/day7.txt`)
      expect(result).to.equal(176035);
    });
  });
});