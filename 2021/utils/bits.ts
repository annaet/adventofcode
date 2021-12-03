export const bitArrayToBinary = (bitArray: number[]) => {
  const str = bitArray.reduce((prev, cur) => prev + cur, '');
  return parseInt(str, 2);
};

export const getMostCommonBit = (bitArray: number[][], index: number): number => {
  console.log(bitArray);
  let count = 0;
  bitArray.forEach((bits) => {
    const bit = bits[index];
    count += bit;
  });

  return Math.round(count / bitArray.length);
};

export const getLeastCommonBit = (bitArray: number[][], index: number): number => {
  return getMostCommonBit(bitArray, index) === 0 ? 1 : 0;
};
