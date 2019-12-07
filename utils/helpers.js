const convertToDigits = (input) => input.toString().split('').map(Number);

const copyArray = (array) => array.slice();

exports.convertToDigits = convertToDigits;
exports.copyArray = copyArray;