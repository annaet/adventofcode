const csv = require('csv-parser');
const fs = require('fs');

// R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83 = distance 159
// R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
// U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135

// R8,U5,L5,D3
// U7,R6,D4,L4 = distance 6

const buildWires = () => {
  const wires = [];

  const promise = new Promise((resolve) => {
    fs.createReadStream('data/day3.csv')
      .pipe(csv({ headers: false }))
      .on('data', (row) => {
        const wire = [];
        Object.keys(row).forEach((key) => {
          wire[key] = row[key];
        })
        wires.push(wire);
      })
      .on('end', () => {
        console.log('Built wires');
        resolve(wires);
      });
  });

  return promise;
}

const placeWire = (wire, direction) => {
  const len = wire.length;
  const previousPosition = wire[len - 1];
  const newPosition = [previousPosition[0], previousPosition[1]];
  switch (direction) {
    case 'R':
      newPosition[0]++;
      break;
    case 'D':
      newPosition[1]--;
      break;
    case 'L':
      newPosition[0]--;
      break;
    case 'U':
      newPosition[1]++;
      break;
    default:
      console.log('Help!');
  }
  wire.push(newPosition);
  return wire;
}

const followDirections = (directions, wire) => {
  directions.forEach((move) => {
    const direction = move.charAt(0);
    const distance = move.slice(1);
    console.log('direction', direction, 'distance', distance);

    for (let i = 0; i < distance; ++i) {
      placeWire(wire, direction);
    }
  })
}

const parseWires = (wires) => {
  let wire1 = [[0, 0]];
  let wire2 = [[0, 0]];

  followDirections(wires[0], wire1);
  followDirections(wires[1], wire2);

  console.log(wire1);
  console.log(wire2);

  // Drop [0, 0] points
  wire1 = wire1.slice(1);
  wire2 = wire2.slice(1);

  return Promise.resolve([wire1, wire2]);
}

const findCrossoverDistances = (wires) => {
  let smallestDistance = Number.MAX_VALUE;

  wires[0].forEach((pos1) => {
    wires[1].forEach((pos2) => {
      if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
        const distance = Math.abs(pos1[0]) + Math.abs(pos1[1]);
        smallestDistance = Math.min(distance, smallestDistance);
      }
    })
  })

  console.log(smallestDistance);
}

buildWires()
  .then(parseWires)
  .then(findCrossoverDistances)