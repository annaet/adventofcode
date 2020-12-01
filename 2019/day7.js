const computer = require('./utils/intcodeComputer');
const helpers = require('./utils/helpers');
const program = require('./data/day7.json');

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

  const amplifiers = [];
  for (let i = 0; i < 5; ++i) {
    amplifiers.push({
      program: helpers.copyArray(program),
      pointer: 0,
      inputs: [],
    })
  }

  sequence.forEach((phaseSetting, i) => {
    const amplifier = amplifiers[i];
    amplifier.inputs.push(phaseSetting);
    amplifier.inputs.push(input);

    const result = computer.run(amplifier);
    input = result.output;
  })
  maxThrusterSignal = Math.max(maxThrusterSignal, input);
})
console.log('maxThrusterSignal', maxThrusterSignal);

// Part 2
const options2 = [5,6,7,8,9];
const sequences2 = createSequences(options2);

maxThrusterSignal = 0;
sequences2.forEach((sequence) => {
  let input = 0;
  let firstRun = true;
  let stop = false;
  const amplifiers = [];

  for (let i = 0; i < 5; ++i) {
    amplifiers.push({
      program: helpers.copyArray(program),
      pointer: 0,
      inputs: [],
    })
  }

  while (!stop) {
    sequence.forEach((phaseSetting, i) => {
      const amplifier = amplifiers[i];
      if (firstRun) {
        amplifier.inputs.push(phaseSetting);
      }
      amplifier.inputs.push(input);

      const result = computer.run(amplifier);
      input = result.output ? result.output : input;
      stop = result.stop;
    })

    firstRun = false;
  }
  maxThrusterSignal = Math.max(maxThrusterSignal, input);
})
console.log('maxThrusterSignal', maxThrusterSignal);