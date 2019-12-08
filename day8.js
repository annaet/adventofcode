const helpers = require('./utils/helpers');
const input = require('./data/day8.json');

const width = 25;
const height = 6;

const digits = helpers.convertToDigits(input);
const numLayers = digits.length / height / width;

const buildLayers = () => {
  const layers = [];

  for (let k = 0; k < numLayers; ++k) {
    const layer = [];
    for (let j = 0; j < height; ++j) {
      for (let i = 0; i < width; ++i) {
        layer.push(digits[i + (j * width) + (k * height * width)]);
      }
    }
    layers.push(layer);
  }

  return layers;
}

const findFewestZerosLayer = (layers) => {
  let fewestZeros = Number.MAX_SAFE_INTEGER;
  let fewestZerosLayer;

  layers.forEach((layer) => {
    const numZeros = layer.filter(elem => elem === 0).length;
    if (numZeros < fewestZeros) {
      fewestZerosLayer = layer;
      fewestZeros = numZeros;
    }
  });

  return fewestZerosLayer;
}

const multiplyNumbers = (layer) => {
  const ones = layer.filter(elem => elem === 1).length;
  const twos = layer.filter(elem => elem === 2).length;
  return ones * twos;
}

const decodeImage = (layers) => {
  const decodedImage = [];

  layers.forEach((layer) => {
    layer.forEach((digit, j) => {
      if (typeof decodedImage[j] === 'undefined' || decodedImage[j] === 2) {
        if (digit === 0) {
          decodedImage[j] = ' ';
        } else if (digit === 1) {
          decodedImage[j] = 'X';
        }
      }
    });
  });

  return decodedImage;
}

const formatImage = (image) => {
  let formattedImage = '';

  for (let i = 0; i < height; ++i) {
    const row = image.slice(i * width, i * width + width);
    formattedImage += row.join('');
    if (i < height - 1) {
      formattedImage += '\n';
    }
  }

  return formattedImage;
}

const layers = buildLayers();
const layer = findFewestZerosLayer(layers);
const result = multiplyNumbers(layer);
console.log(result);

const decodedImage = decodeImage(layers);
const formattedImage = formatImage(decodedImage);
console.log(formattedImage);