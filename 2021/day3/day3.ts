import {
  bitArrayToBinary,
  getLeastCommonBit,
  getMostCommonBit,
} from '../utils/bits';
import { readLines } from '../utils/files';

export const calculatePowerConsumption = async (inputFile: string) => {
  const lines = await readLines(inputFile);
  const lineLength = lines[0].split('').length;

  const counts = Array.from(Array(lineLength)).map(() => 0);
  lines.forEach((line: string) => {
    const bits = line.split('');
    bits.forEach((bit, i) => {
      counts[i] += Number(bit);
    });
  });
  const gamma = counts.map((count) => Math.round(count / lines.length));
  const epsilon = gamma.map((bit) => bit === 0 ? 1 : 0);

  const gammaRate = bitArrayToBinary(gamma);
  const epsilonRate = bitArrayToBinary(epsilon);

  return gammaRate * epsilonRate;
};

const filterArray = (bitArray: number[][], comparisonFn: (bitArray: number[][], index: number) => number) => {
  let index = 0;
  let reducedBitArray = bitArray;
  let comparisonValue = comparisonFn(bitArray, 0);

  while (reducedBitArray.length > 1 && index < bitArray[0].length) {
    reducedBitArray = reducedBitArray.filter((bits) => bits[index] === comparisonValue);
    index++;
    comparisonValue = comparisonFn(reducedBitArray, index);
  }

  return bitArrayToBinary(reducedBitArray[0]);
};

export const calculateLifeSupportRating = async (inputFile: string) => {
  const lines = await readLines(inputFile);
  const bitArray = lines.map((line) => line.split('').map((Number)));

  const oxygenGeneratorRating = filterArray(bitArray, getMostCommonBit);
  const co2ScrubberRating = filterArray(bitArray, getLeastCommonBit);

  return oxygenGeneratorRating * co2ScrubberRating;
};
