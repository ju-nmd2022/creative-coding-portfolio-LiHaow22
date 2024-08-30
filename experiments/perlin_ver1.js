// The following lines of code was added by courtesy of Garrit Schaap.
function setup() {
  createCanvas(700, 500);
  frameRate(6);
}
const size = 10;
const divider = 10;
const rows = 50;
const columns = 70;
let counter = 0;

function draw() {
  background(255, 255, 255);
  noStroke();
  fill(0, 0, 0);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const value = noise(x / divider, y / divider, counter) * size;
      rect(x * size, y * size, value);
    }
  }
  counter += 0.15;
}
