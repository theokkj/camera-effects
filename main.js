let VIDEO;
let CANVAS;
let CANVAS_SIZE = 400;
let EFFECTS = ["normal"];
let EFFECTS_DB = [
  "normal",
  "gray",
  "invert",
  "symmetry",
  "symmetry 2",
  "symmetry vertically",
  "symmetry vertically 2",
  "mirror",
];

function main() {
  let CANVAS = initializeCanvas("#myCanvas", CANVAS_SIZE, CANVAS_SIZE);
  let ctx = CANVAS.getContext("2d");

  CANVAS.addEventListener("click", nextEffect);
  initializeCamera();

  setInterval(function () {
    drawScene(ctx);
  }, 100);
}

function initializeCanvas(name, width, height) {
  let canvas = document.querySelector(name);
  canvas.width = width;
  canvas.height = height;

  return canvas;
}

function drawScene(ctx) {
  if (VIDEO) {
    let min = Math.min(VIDEO.videoWidth, VIDEO.videoHeight);
    let sx = (VIDEO.videoWidth - min) / 2;
    let sy = (VIDEO.videoHeight - min) / 2;
    ctx.drawImage(VIDEO, sx, sy, min, min, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

    applyEffect(ctx);
  }
}

function nextEffect(ctx) {
  let inx = EFFECTS_DB.findIndex(function (effect) {
    return effect == EFFECTS[0];
  });
  EFFECTS[0] = inx == EFFECTS_DB.length ? EFFECTS_DB[0] : EFFECTS_DB[inx + 1];
}

function applyEffect(ctx) {
  let effectsToApply = [];

  EFFECTS.forEach((effect) => {
    if (effect == "gray") effectsToApply.push(applyGrayScale);
    if (effect == "invert") effectsToApply.push(applyInvertColor);
    if (effect == "symmetry") effectsToApply.push(applySymmetryEffect);
    if (effect == "symmetry 2") effectsToApply.push(applySymmetryEffect2);
    if (effect == "symmetry vertically") {
      effectsToApply.push(applySymmetryVerticallyEffect);
    }
    if (effect == "symmetry vertically 2") {
      effectsToApply.push(applySymmetryVerticallyEffect2);
    }
    if (effect == "mirror") effectsToApply.push(applyMirrorEffect);
  });

  applyEffectOnImage(ctx, effectsToApply);
}

function applyEffectOnImage(ctx, effects) {
  let imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  let data = imgData.data;

  for (let y = 0; y < CANVAS_SIZE; y++) {
    for (let x = 0; x < CANVAS_SIZE; x++) {
      effects.forEach((effect) => {
        if (effect.considerPixel(x, y)) {
          let pixelObj = getPixelColor(data, x, y);
          let dataArr = [
            4 * (y * CANVAS_SIZE + x),
            4 * (y * CANVAS_SIZE + x) + 1,
            4 * (y * CANVAS_SIZE + x) + 2,
          ];

          effect.apply(pixelObj, data, dataArr, x, y);
        }
      });
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

function getPixelColor(data, x, y) {
  let currentColor = 4 * (y * CANVAS_SIZE + x);

  return {
    red: data[currentColor],
    green: data[currentColor + 1],
    blue: data[currentColor + 2],
    alpha: data[currentColor + 3],
  };
}

function initializeCamera() {
  var promise = navigator.mediaDevices.getUserMedia({ video: true });

  promise
    .then(function (signal) {
      VIDEO = document.createElement("video");
      VIDEO.srcObject = signal;
      VIDEO.play();
    })
    .catch(function (err) {
      alert("Camera error ", err);
    });
}

function hideInstructions() {
  const textBox = document.querySelector("#textBox");
  textBox.style.display = "none";
}
