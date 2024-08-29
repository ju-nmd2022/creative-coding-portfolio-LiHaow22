function setup() {
  createCanvas(700, 500);
  blendMode(BLEND);
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

      if (value < 2) {
        fill("#24a7e3"); // Smallest
      } else if (value >= 2 && value < 4) {
        fill("#69c7e0");
      } else if (value >= 4 && value < 6) {
        fill("#bfad5c"); // Medium
      } else if (value >= 6 && value < 8) {
        fill("#decf8e");
      } else {
        fill("#f7f6b0"); // Largest
      }

      rect(x * size, y * size, value, value);
    }
  }
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const value = noise(x / divider, y / divider) * size;
      if (value < 2) {
        fill("#24a7e380"); // Smallest
      } else if (value >= 2 && value < 4) {
        fill("#69c7e080");
      } else if (value >= 4 && value < 6) {
        fill("#bfad5c80"); // Medium
      } else if (value >= 6 && value < 8) {
        fill("#decf8e80");
      } else {
        fill("#f7f6b080"); // Largest
      }
      ellipse(size / 2 + x * size, size / 2 + y * size, value);
    }
  }
  noLoop();
}
