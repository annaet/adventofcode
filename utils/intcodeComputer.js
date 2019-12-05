const helpers = require('./helpers');
const json = require('../data/day5.json');

const parseInstruction = (instruction) => {
  const digits = helpers.convertToDigits(instruction);
  const l = digits.length;

  const opcode = Number('' + (digits[l - 2] || 0) + digits[l - 1]);
  const param1 = digits[l - 3] || 0;
  const param2 = digits[l - 4] || 0;
  const param3 = digits[l - 5] || 0;

  return [opcode, param1, param2, param3];
}

const isPositionMode = (mode) => mode === 0;
const isImmediateMode = (mode) => mode === 1;

const getParameter = (i, mode, program) => {
  let param = program[i];

  if (isPositionMode(mode)) {
    param = program[param];
  }

  return param;
}

const runComputer = (noun, verb, input) => {
  const program = JSON.parse(JSON.stringify(json));
  // console.log(program);

  if (noun) {
    program[1] = noun;
  }
  if (verb) {
    program[2] = verb;
  }

  let i = 0;
  let stop = false;

  let param1;
  let param2;
  let param3;
  let result;

  while (!stop) {
    const instruction = program[i];
    const parsedInstruction = parseInstruction(instruction);

    const opcode = parsedInstruction[0];
    const mode1 = parsedInstruction[1];
    const mode2 = parsedInstruction[2];

    param1 = getParameter(i + 1, mode1, program);
    param2 = getParameter(i + 2, mode2, program);

    switch (opcode) {
      case 1:
        // add
        result = param1 + param2;
        resultPos = program[i + 3];
        program[resultPos] = result;
        i += 4;
        break;
      case 2:
        // multiply
        result = param1 * param2;
        resultPos = program[i + 3];
        program[resultPos] = result;
        i += 4;
        break;
      case 3:
        // input
        resultPos = program[i + 1];
        program[resultPos] = input;
        i += 2;
        break;
      case 4:
        // output
        result = param1;
        console.log('output', result);
        i += 2;
        break;
      case 5:
        // jump-if-true
        if (param1 !== 0) {
          i = param2;
        } else {
          i += 3;
        }
        break;
      case 6:
        // jump-if-false
        i = param1 === 0 ? param2 : i + 3;
        break;
      case 7:
        // less than
        resultPos = program[i + 3];
        program[resultPos] = param1 < param2 ? 1 : 0;
        i += 4;
        break;
      case 8:
        // equals
        resultPos = program[i + 3];
        program[resultPos] = param1 === param2 ? 1 : 0;
        i += 4;
        break;
      case 99:
        // stop
        stop = true;
        console.log('halt');
        break;
      default:
        stop = true;
        console.log('help!')
        break;
    }
  }

  return program[0];
}

exports.run = runComputer;
exports.parseInstruction = parseInstruction;