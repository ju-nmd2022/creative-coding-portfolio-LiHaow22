// This code is inspired from the original code from "perlin_ver1.js", which was added by courtesy of Garrit Schaap.
// ChatGPT guided me through adding alpha/transparency.
function setup() {
  createCanvas(700, 500);
  angleMode(DEGREES);
}

const size = 10;
const divider = 15;
const rows = 50;
const columns = 70;

function draw() {
  background(0);
  noStroke();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const value = noise(x / divider, y / divider) * size;

      let alpha = map(y, 0, rows - 1, 255, 0);

      if (value < 2) {
        fill(36, 167, 227, alpha); // Smallest
      } else if (value >= 2 && value < 4) {
        fill(105, 199, 224, alpha);
      } else if (value >= 4 && value < 6) {
        fill(191, 173, 92, alpha); // Medium
      } else if (value >= 6 && value < 8) {
        fill(222, 207, 142, alpha);
      } else {
        fill(247, 246, 176, alpha); // Largest
      }

      push();
      const centerX = x * size + value / 2;
      const centerY = y * size + value / 2;
      translate(centerX, centerY);
      rotate(random(-30, 30));
      rect(-value / 2, -value / 2, value, value);
      pop();
    }
  }

  noLoop();
}
