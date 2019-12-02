const csv = require('csv-parser');
const fs = require('fs');

let total = 0;

const getRecursiveFuel = (mass) => {
  const fuel = Math.floor(mass/ 3) - 2;
  console.log(fuel);
  if (fuel <= 0) {
    return 0;
  } else {
    return fuel + getRecursiveFuel(fuel);
  }
}

fs.createReadStream('day1.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
    const mass = parseInt(row.mass, 10);
    const fuel = Math.floor(mass / 3) - 2;
    console.log('module fuel', fuel);
    const recursiveFuel = getRecursiveFuel(mass);
    console.log('recursive fuel', recursiveFuel);
    total += recursiveFuel;
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(total);
  });