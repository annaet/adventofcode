import { readFile } from 'fs/promises';

export const readLines = async (inputFile: string): Promise<number[]> => {
  const data = await readFile(inputFile, { encoding: 'utf8' });
  let arr = data.toString()
    .split('\n')
    .filter((value: string) => value !== '')
    .map((n) => Number(n));
  return arr;
};
