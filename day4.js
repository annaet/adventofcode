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

const convertToDigits = (password) => password.toString().split('').map(Number);

const hasAdjacentDigits = (digits) => {
  let foundAdjacentDigit = false;

  for (let i = 0; i < digits.length - 1 && !foundAdjacentDigit; ++i) {
    const first = digits[i];
    const second = digits[i + 1];
    foundAdjacentDigit = foundAdjacentDigit || first === second;
  }

  return foundAdjacentDigit;
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
    const digits = convertToDigits(i);
    if (hasAdjacentDigits(digits) && hasNoDecreasingDigits(digits)) {
      count++;
    }
  }

  console.log(count);
}

findPasswords();