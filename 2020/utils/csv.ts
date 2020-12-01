import csv from 'csv-parser';
import fs from 'fs';

const readSingleColumnCSV = (file: string): Promise<number[]> => {
  const results: number[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(csv({
        headers: false,
      }))
      .on('data', (data) => {
        results.push(parseInt(data[0], 10));
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

export {
  readSingleColumnCSV
};