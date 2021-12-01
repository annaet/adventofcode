import { readLines } from '../utils/files';

export const countIncrements = async (inputFile: string) => {
  let count = 0;
  const arr = await readLines(inputFile);

  let cur: number | undefined = undefined;
  arr.forEach((value: number) => {
    if (cur && value > cur) {
      count++;
    }
    cur = value;
  });

  return count;
};

export const countWindowIncrements = async (inputFile: string) => {
  let count = 0;
  const arr = await readLines(inputFile);

  let cur: number | undefined = undefined;
  for (let i = 0; i < arr.length - 2; ++i) {
    const windowValue = arr[i] + arr[i+1] + arr[i+2];
    if (cur && windowValue > cur) {
      count++;
    }
    cur = windowValue;
  };

  return count;
};
