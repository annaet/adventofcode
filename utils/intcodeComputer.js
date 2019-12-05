const runComputer = (noun, verb) => {
  const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,1,19,9,23,1,23,13,27,1,10,27,31,2,31,13,35,1,10,35,39,2,9,39,43,2,43,9,47,1,6,47,51,1,10,51,55,2,55,13,59,1,59,10,63,2,63,13,67,2,67,9,71,1,6,71,75,2,75,9,79,1,79,5,83,2,83,13,87,1,9,87,91,1,13,91,95,1,2,95,99,1,99,6,0,99,2,14,0,0];

  input[1] = noun;
  input[2] = verb;

  let i = 0;
  let stop = false;

  let pos1;
  let pos2;
  let result;
  let resultPos;

  while (!stop) {
    const opcode = input[i];

    switch (opcode) {
      case 1:
        // add
        pos1 = input[i + 1];
        pos2 = input[i + 2]
        result = input[pos1] + input[pos2];
        resultPos = input[i + 3];
        input[resultPos] = result;
        i += 4;
        break;
      case 2:
        // multiply
        pos1 = input[i + 1];
        pos2 = input[i + 2]
        result = input[pos1] * input[pos2];
        resultPos = input[i + 3];
        input[resultPos] = result;
        i += 4;
        break;
      case 99:
        // stop
        stop = true;
        break;
      default:
        console.log('help!')
        stop = true;
        break;
    }
  }

  return input[0];
}

exports.run = runComputer;