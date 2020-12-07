/**
--- Day 5: Binary Boarding ---
You board your plane only to discover a new problem: you dropped your boarding pass! You aren't sure which seat is yours, and all of the flight attendants are busy with the flood of people that suddenly made it through passport control.

You write a quick program to use your phone's camera to scan all of the nearby boarding passes (your puzzle input); perhaps you can find your seat through process of elimination.

Instead of zones or groups, this airline uses binary space partitioning to seat people. A seat might be specified like FBFBBFFRLR, where F means "front", B means "back", L means "left", and R means "right".

The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

For example, consider just the first seven characters of FBFBBFFRLR:

Start by considering the whole range, rows 0 through 127.
F means to take the lower half, keeping rows 0 through 63.
B means to take the upper half, keeping rows 32 through 63.
F means to take the lower half, keeping rows 32 through 47.
B means to take the upper half, keeping rows 40 through 47.
B keeps rows 44 through 47.
F keeps rows 44 through 45.
The final F keeps the lower of the two, row 44.
The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.

For example, consider just the last 3 characters of FBFBBFFRLR:

Start by considering the whole range, columns 0 through 7.
R means to take the upper half, keeping columns 4 through 7.
L means to take the lower half, keeping columns 4 through 5.
The final R keeps the upper of the two, column 5.
So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.

Every seat also has a unique seat ID: multiply the row by 8, then add the column. In this example, the seat has ID 44 * 8 + 5 = 357.

Here are some other boarding passes:

BFFFBBFRRR: row 70, column 7, seat ID 567.
FFFBBBFRRR: row 14, column 7, seat ID 119.
BBFFBBFRLL: row 102, column 4, seat ID 820.
As a sanity check, look through your list of boarding passes. What is the highest seat ID on a boarding pass?
*/

import { readLines } from '../utils/txt';

interface SeatRange {
  lowerRow: number;
  upperRow: number;
  lowerColumn: number;
  upperColumn: number;
}

const processInstruction = (instruction: string, seatRange: SeatRange) => {
  switch (instruction) {
    case 'F':
      seatRange.upperRow = seatRange.lowerRow + Math.floor((seatRange.upperRow - seatRange.lowerRow) / 2);
      break;
    case 'B':
      seatRange.lowerRow = seatRange.lowerRow + Math.ceil((seatRange.upperRow - seatRange.lowerRow) / 2);
      break;
    case 'L':
      seatRange.upperColumn = seatRange.lowerColumn + Math.floor((seatRange.upperColumn - seatRange.lowerColumn) / 2);
      break;
    case 'R':
      seatRange.lowerColumn = seatRange.lowerColumn + Math.ceil((seatRange.upperColumn - seatRange.lowerColumn) / 2);
      break;
  }
  return seatRange;
}

const getSeatIDs = (seats: string[]) => {
  return seats.map((seat) => {
    let instructions = seat.split('');

    let seatRange: SeatRange = {
      lowerRow: 0,
      upperRow: 127,
      lowerColumn: 0,
      upperColumn: 7,
    }

    for (let i = 0; i < instructions.length; ++i) {
      let instruction = instructions[i];
      seatRange = processInstruction(instruction, seatRange);
    }

    if (seatRange.lowerRow !== seatRange.upperRow || seatRange.lowerColumn !== seatRange.upperColumn) {
      throw new Error('Invalid seat found');
    }

    const seatID = seatRange.lowerRow * 8 + seatRange.lowerColumn;
    return seatID;
  });
}

const part1 = (file: string): number => {
  const seats = readLines(file);

  const seatIDs = getSeatIDs(seats);
  const highestSeatID = seatIDs.reduce((max, seatID) => Math.max(max, seatID), 0);

  return highestSeatID;
}

/**
--- Part Two ---
Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat?
*/


const part2 = (file: string): number => {
  const seats = readLines(file);

  const seatIDs = getSeatIDs(seats);
  const sortedSeatIDs = seatIDs.sort((a, b) => a - b);
  const mySeatNeighbour = sortedSeatIDs.findIndex((seatID, i) => {
    if (i === 0) {
      return false;
    }

    if (sortedSeatIDs[i - 1] !== seatID - 1) {
      return true;
    }

    return false;
  });

  if (!mySeatNeighbour) {
    throw new Error('Did not find seatID');
  }

  const mySeatID = sortedSeatIDs[mySeatNeighbour] - 1;

  return mySeatID;
}

export {
  part1,
  part2,
}