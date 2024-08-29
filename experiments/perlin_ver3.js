function setup() {
  createCanvas(700, 500);
  frameRate(6);
}

const size = 10;
const divider = 15;
const rows = 50;
const columns = 70;

let counter = 0;

function draw() {
  background(0, 0, 0);
  noStroke();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const value = noise(x / divider, y / divider, counter) * size;

      if (value < 2) {
        fill("#7c22f2"); // Smallest
      } else if (value >= 2 && value < 4) {
        fill("#8d4be3");
      } else if (value >= 4 && value < 6) {
        fill("#af80ed"); // Medium
      } else if (value >= 6 && value < 8) {
        fill("#c8aaf0");
      } else {
        fill("#e1d5f0"); // Largest
      }

      rect(x * size, y * size, value, value);
    }
  }

  counter += 0.2;
}
