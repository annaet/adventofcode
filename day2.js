const computer = require('./utils/intcodeComputer');

// Part I
// console.log(runComputer(12, 2));

for (let noun = 0; noun <= 99; ++noun) {
  for (let verb = 0; verb <= 99; ++verb) {
    const result = computer.run(noun, verb);
    if (result === 19690720) {
      console.log('Success!', noun, verb);
      const calc = 100 * noun + verb;
      console.log(calc);
    }
  }
}