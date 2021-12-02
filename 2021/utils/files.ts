import { readFile } from 'fs/promises';

export const readLines = async (inputFile: string): Promise<string[]> => {
  const data = await readFile(inputFile, { encoding: 'utf8' });
  let arr: any[] = data.toString()
    .split('\n')
    .filter((value: string) => value !== '')

  return arr;
};

export const castToNumber = (input: string[]): number[] => input.map((n) => Number(n));
