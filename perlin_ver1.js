function setup() {
  createCanvas(500, 500);
  frameRate(8);
}

const size = 10;
const divider = 10;
const rows = 50;
const columns = 50;

let counter = 0;

function draw() {
  background(255, 255, 255);
  noStroke();
  fill(0, 0, 0);

  // noiseSeed(0);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const value = noise(x / divider, y / divider, counter) * size;
      //ellipse(size / 2 + x * size, size / 2 + y * size, value);
      rect(x * size, y * size, value);
    }
  }
  counter += 0.15;
}
