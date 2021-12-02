import { readLines } from '../utils/files';

export const calculatePosition = async (inputFile: string) => {
  const lines = await readLines(inputFile);

  const position = {
    horizontal: 0,
    depth: 0,
  };
  lines.forEach((line: string) => {
    const [ direction, distance ] = line.split(' ');

    switch (direction) {
      case 'forward':
        position.horizontal += Number(distance);
        break;
      case 'down':
        position.depth += Number(distance);
        break;
      case 'up':
        position.depth -= Number(distance);
        break;
    }
  });

  return position.horizontal * position.depth;
};

export const calculatePositionWithAim = async (inputFile: string) => {
  const lines = await readLines(inputFile);

  const position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };
  lines.forEach((line: string) => {
    const [ direction, distance ] = line.split(' ');

    switch (direction) {
      case 'forward':
        position.horizontal += Number(distance);
        position.depth += position.aim * Number(distance);
        break;
      case 'down':
        position.aim += Number(distance);
        break;
      case 'up':
        position.aim -= Number(distance);
        break;
    }
  });

  return position.horizontal * position.depth;
};
