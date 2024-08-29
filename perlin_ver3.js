function setup() {
  createCanvas(500, 500);
}

const size = 10;
const divider = 15;
const rows = 50;
const columns = 50;

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

  noLoop();
}
