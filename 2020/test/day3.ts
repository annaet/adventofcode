import 'mocha';

import { expect } from 'chai';

import { part1 } from '../challenges/day3';

describe('Day 3', () => {
  describe('Examples', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day3_example.txt`)
      expect(result).to.equal(7);
    });

    // it('Part 2', async () => {
    //   const result = await part2(`${__dirname}/../input/day2_example.csv`)
    //   expect(result).to.equal(1);
    // });
  });

  describe('Challenges', () => {
    it('Part 1', async () => {
      const result = await part1(`${__dirname}/../input/day3.txt`)
      expect(result).to.equal(0);
    });

    // it('Part 2', async () => {
    //   const result = await part2(`${__dirname}/../input/day2.csv`)
    //   expect(result).to.equal(497);
    // });
  });
});