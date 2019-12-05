const helpers = require('./utils/helpers');

// --- Day 4: Secure Container ---
// You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

// However, they do remember a few key facts about the password:

// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
// Other than the range rule, the following are true:

// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double).
// How many different passwords within the range given in your puzzle input meet these criteria?

// Your puzzle input is 372037-905157.

const inputStart = 372037;
const inputEnd = 905157;

const hasAdjacentDigitsPart1 = (digits) => {
  let foundAdjacentDigit = false;

  for (let i = 0; i < digits.length - 1 && !foundAdjacentDigit; ++i) {
    const first = digits[i];
    const second = digits[i + 1];
    foundAdjacentDigit = foundAdjacentDigit || first === second;
    adjacentDigit = first;
  }

  return foundAdjacentDigit;
}

const hasAdjacentDigitsPart2 = (digits) => {
  let foundAcceptableAdjacentDigits = false;
  let adjacentDigits = [];

  for (let i = 0; i < digits.length - 1; ++i) {
    const first = digits[i];
    const second = digits[i + 1];

    if (first === second) {
      adjacentDigits.push(first);
    }
  }

  for (let i = 0; i < adjacentDigits.length && !foundAcceptableAdjacentDigits; ++i) {
    const digit = adjacentDigits[i];
    const matches = digits.filter((d) => d === digit).length;
    foundAcceptableAdjacentDigits = foundAcceptableAdjacentDigits || matches === 2;
  }

  return foundAcceptableAdjacentDigits;
}

const hasNoDecreasingDigits = (digits) => {
  let foundDecreasingDigit = false;
  let maxDigit = 0;

  for (let i = 0; i < digits.length && !foundDecreasingDigit; ++i) {
    const digit = digits[i];

    if (digit < maxDigit) {
      foundDecreasingDigit = true;
      break;
    }

    maxDigit = digit;
  }

  return !foundDecreasingDigit;
}

const findPasswords = () => {
  let count = 0;

  for (let i = inputStart; i < inputEnd; ++i) {
    const digits = helpers.convertToDigits(i);
    if (hasAdjacentDigitsPart2(digits) && hasNoDecreasingDigits(digits)) {
      count++;
    }
  }

  console.log(count);
}

findPasswords();