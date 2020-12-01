const helpers = require('./helpers');

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

const runComputer = (amplifier) => {
  let program = amplifier.program;
  let stop = false;

  let param1;
  let param2;
  let result;
  let output;

  while (!stop && typeof output === 'undefined') {
    const instruction = program[amplifier.pointer];
    const parsedInstruction = parseInstruction(instruction);

    const opcode = parsedInstruction[0];
    const mode1 = parsedInstruction[1];
    const mode2 = parsedInstruction[2];

    param1 = getParameter(amplifier.pointer + 1, mode1, program);
    param2 = getParameter(amplifier.pointer + 2, mode2, program);

    switch (opcode) {
      case 1:
        // add
        result = param1 + param2;
        resultPos = program[amplifier.pointer + 3];
        program[resultPos] = result;
        amplifier.pointer += 4;
        break;
      case 2:
        // multiply
        result = param1 * param2;
        resultPos = program[amplifier.pointer + 3];
        program[resultPos] = result;
        amplifier.pointer += 4;
        break;
      case 3:
        // input
        resultPos = program[amplifier.pointer + 1];
        program[resultPos] = amplifier.inputs.shift();
        amplifier.pointer += 2;
        break;
      case 4:
        // output
        output = param1;
        amplifier.pointer += 2;
        break;
      case 5:
        // jump-if-true
        if (param1 !== 0) {
          amplifier.pointer = param2;
        } else {
          amplifier.pointer += 3;
        }
        break;
      case 6:
        // jump-if-false
        amplifier.pointer = param1 === 0 ? param2 : amplifier.pointer + 3;
        break;
      case 7:
        // less than
        resultPos = program[amplifier.pointer + 3];
        program[resultPos] = param1 < param2 ? 1 : 0;
        amplifier.pointer += 4;
        break;
      case 8:
        // equals
        resultPos = program[amplifier.pointer + 3];
        program[resultPos] = param1 === param2 ? 1 : 0;
        amplifier.pointer += 4;
        break;
      case 99:
        // stop
        stop = true;
        break;
      default:
        stop = true;
        console.log('help!')
        break;
    }
  }

  return {output, stop};
}

exports.run = runComputer;
exports.parseInstruction = parseInstruction;