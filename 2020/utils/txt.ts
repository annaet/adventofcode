import fs from 'fs';

const readLines = (file: string): string[] => {
  const raw = fs.readFileSync(file);
  const input = raw.toString().split('\n');
  return input;
}

const readGrid = (file: string): string[][] => {
  const lines = readLines(file);
  const grid = lines.map((line) => line.split(''));
  return grid;
}

export {
  readLines,
  readGrid,
}