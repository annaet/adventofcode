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

export interface PasswordRow {
  policy: {
    minimumCount: number;
    maximumCount: number;
    requiredString: string;
  };
  password: string;
};

const readPasswords = (file: string): Promise<PasswordRow[]> => {
  const passwords: PasswordRow[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(csv({
        headers: false,
        separator: ' ',
      }))
      .on('data', (data) => {
        const counts = data[0].split('-');
        const requiredString = data[1].split(':');
        passwords.push({
          policy: {
            minimumCount: counts[0],
            maximumCount: counts[1],
            requiredString: requiredString[0],
          },
          password: data[2],
        });
      })
      .on('end', () => {
        resolve(passwords);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

export {
  readSingleColumnCSV,
  readPasswords,
};