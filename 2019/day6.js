// const data = [
//   'COM)B',
//   'B)C',
//   'C)D',
//   'D)E',
//   'E)F',
//   'B)G',
//   'G)H',
//   'D)I',
//   'E)J',
//   'J)K',
//   'K)L',
// ];
const json = require('./data/day6.json');
const data = JSON.parse(JSON.stringify(json));

const findRoute = (map, thisPlanet, endPlanet, seenPlanets, distanceTravelled) => {
  let currentPlanet = map[thisPlanet];

  if (currentPlanet.orbits.indexOf(endPlanet) > -1 || currentPlanet.hasOrbitting.indexOf(endPlanet) > -1) {
    return {
      found: true,
      distance: distanceTravelled
    };
  }

  const newSeenPlanets = JSON.parse(JSON.stringify(seenPlanets));
  newSeenPlanets.push(thisPlanet);
  const distancesTilSanta = [];

  currentPlanet.orbits.forEach((orbittedPlanet) => {
    // Check we haven't seen the planet before
    if (seenPlanets.indexOf(orbittedPlanet) === -1) {
      const result = findRoute(map, orbittedPlanet, endPlanet, newSeenPlanets, distanceTravelled + 1);
      if (result.found) {
        distancesTilSanta.push(result.distance);
      }
    }
  });

  currentPlanet.hasOrbitting.forEach((orbittingPlanet) => {
    // Check we haven't seen the planet before
    if (seenPlanets.indexOf(orbittingPlanet) === -1) {
      const result = findRoute(map, orbittingPlanet, endPlanet, newSeenPlanets, distanceTravelled + 1);
      if (result.found) {
        distancesTilSanta.push(result.distance);
      }
    }
  });

  // console.log(distancesTilSanta);

  if (distancesTilSanta.length) {
    return {
      found: true,
      distance: Math.min(distancesTilSanta)
    }
  }

  // console.log('no santa');
  return {
    found: false
  };
}

const findSanta = (map) => {
  // Assuming YOU and SAN are only orbitting a single planet
  const startPlanet = map['YOU'].orbits[0];
  const endPlanet = map['SAN'].orbits[0];

  const distanceTravelled = findRoute(map, startPlanet, endPlanet, [], 1);
  console.log(distanceTravelled);
}

const addDepths = (map) => {
  let numOrbits = 0;

  Object.keys(map).forEach((planet) => {
    numOrbits += map[planet].depth;
  });

  console.log(numOrbits);
}

const traverseTree = (map, planet, depth) => {
  map[planet].depth = depth;

  map[planet].hasOrbitting.forEach((orbittingPlanet) => {
    traverseTree(map, orbittingPlanet, map[planet].depth + 1);
  });
}

const findInnerPlanet = (map) => {
  let innerPlanet;
  const planets = Object.keys(map)

  for (let i = 0; i < planets.length && !innerPlanet; ++i) {
    const planet = map[planets[i]];
    if (planet.orbits.length === 0) {
      return planets[i];
    }
  }

  console.log('error - could not find inner planet');
}

const parseInput = (input) => {
  let map = {};

  input.forEach((orbit) => {
    const planets = orbit.split(')');

    if (!map[planets[0]]) {
      map[planets[0]] = {
        hasOrbitting: [],
        orbits: [],
      };
    }
    if (!map[planets[1]]) {
      map[planets[1]] = {
        hasOrbitting: [],
        orbits: [],
      };
    }
    map[planets[0]].hasOrbitting.push(planets[1]);
    map[planets[1]].orbits.push(planets[0]);
  });

  const innerPlanet = findInnerPlanet(map);
  traverseTree(map, innerPlanet, 0);

  // Part 1
  addDepths(map);

  // Part 2
  findSanta(map);
}

parseInput(data);