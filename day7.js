const computer = require('./utils/intcodeComputer');
const helpers = require('./utils/helpers');
const program = require('./data/day7.json');

// const data = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
//   -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
//   53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10];

const recurseSequence = (options, sequence) => {
  if (options.length === 0) {
    return [sequence];
  }

  const sequences = [];
  options.forEach((phaseSetting) => {
    const remainingOptions = helpers.copyArray(options);
    const phaseIndex = remainingOptions.indexOf(phaseSetting);
    remainingOptions.splice(phaseIndex, 1);

    const sequenceCopy = helpers.copyArray(sequence);
    sequenceCopy.push(phaseSetting);
    sequences.push(...recurseSequence(remainingOptions, sequenceCopy));
  });
  return sequences;
}

const createSequences = (options) => {
  return recurseSequence(options, []);
}

// Part 1
const options = [0,1,2,3,4];
const sequences = createSequences(options);

let maxThrusterSignal = 0;
sequences.forEach((sequence) => {
  let input = 0;
  sequence.forEach((phaseSetting) => {
    const result = computer.run(null, null, [phaseSetting, input], program, true);
    input = result.output;
  })
  maxThrusterSignal = Math.max(maxThrusterSignal, input);
})
console.log('maxThrusterSignal', maxThrusterSignal);
