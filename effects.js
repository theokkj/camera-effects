const applyMirrorEffect = {
  apply: function (pixel, data, indexes, x, y) {
    for (let i = 0; i < 3; i++) {
      let converter = 4 * (y * CANVAS_SIZE + CANVAS_SIZE - x) + i;
      [pixelLeft, pixelRight] = [data[converter], data[indexes[i]]];
      [data[indexes[i]], data[converter]] = [pixelLeft, pixelRight];
    }
  },

  considerPixel: function (x) {
    if (x > CANVAS_SIZE / 2) return false;
    else return true;
  },
};

const applySymmetryEffect = {
  apply: function (pixelObj, data, indexes, x, y) {
    data[4 * (y * CANVAS_SIZE + CANVAS_SIZE - x)] = pixelObj.red;
    data[4 * (y * CANVAS_SIZE + CANVAS_SIZE - x) + 1] = pixelObj.green;
    data[4 * (y * CANVAS_SIZE + CANVAS_SIZE - x) + 2] = pixelObj.blue;
  },

  considerPixel: function (x) {
    if (x < CANVAS_SIZE / 2) return false;
    else return true;
  },
};

const applySymmetryEffect2 = {
  apply: function (pixelObj, data, indexes, x, y) {
    data[4 * (y * CANVAS_SIZE + CANVAS_SIZE - x)] = pixelObj.red;
    data[4 * (y * CANVAS_SIZE + CANVAS_SIZE - x) + 1] = pixelObj.green;
    data[4 * (y * CANVAS_SIZE + CANVAS_SIZE - x) + 2] = pixelObj.blue;
  },
  considerPixel: function (x) {
    if (x >= CANVAS_SIZE / 2) return false;
    else return true;
  },
};

const applySymmetryVerticallyEffect = {
  apply: function (pixelObj, data, indexes, x, y) {
    data[4 * ((CANVAS_SIZE - y) * CANVAS_SIZE + x)] = pixelObj.red;
    data[4 * ((CANVAS_SIZE - y) * CANVAS_SIZE + x) + 1] = pixelObj.green;
    data[4 * ((CANVAS_SIZE - y) * CANVAS_SIZE + x) + 2] = pixelObj.blue;
  },

  considerPixel: function (x, y) {
    if (y < CANVAS_SIZE / 2) return false;
    else return true;
  },
};

const applySymmetryVerticallyEffect2 = {
  apply: function (pixelObj, data, indexes, x, y) {
    data[4 * ((CANVAS_SIZE - y) * CANVAS_SIZE + x)] = pixelObj.red;
    data[4 * ((CANVAS_SIZE - y) * CANVAS_SIZE + x) + 1] = pixelObj.green;
    data[4 * ((CANVAS_SIZE - y) * CANVAS_SIZE + x) + 2] = pixelObj.blue;
  },

  considerPixel: function (x, y) {
    if (y >= CANVAS_SIZE / 2) return false;
    else return true;
  },
};

const applyGrayScale = {
  apply: function (pixelObj, data, indexes) {
    let avg = (pixelObj.red + pixelObj.green + pixelObj.blue) / 3;
    data[indexes[0]] = avg;
    data[indexes[1]] = avg;
    data[indexes[2]] = avg;
  },
  considerPixel: () => true,
};

const applyInvertColor = {
  apply: function (pixel, data, indexes) {
    data[indexes[0]] = 255 - pixel.red;
    data[indexes[1]] = 255 - pixel.green;
    data[indexes[2]] = 255 - pixel.blue;
  },
  considerPixel: () => true,
};
