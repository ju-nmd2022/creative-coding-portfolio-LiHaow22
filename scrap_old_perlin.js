function setup() {
  createCanvas(700, 700);
  frameRate(8);
}

const size = 10;
const divider = 10;
const rows = 70;
const columns = 70;

let counter = 0;
let myColours = ["#F2CCC3", "#E78F8E", "#FFE6E8", "#F48498"];
let randCol;

function draw() {
  background(255, 255, 255);
  noStroke();
  fill("#af7af5");
  //randCol = random(myColours.length);
  //randCol = floor(randCol);
  //fill(myColours[randCol]);

  // noiseSeed(0);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const value = noise(x / divider, y / divider, counter) * size;
      //ellipse(size / 2 + x * size, size / 2 + y * size, value);
      rect(x * size, y * size, value);
    }
  }
  counter += 0.1;
  if (size > 3) {
    fill("#F2CCC3");
  } else if (size < 3) {
    fill("#E78F8E");
  }
}
// Random colour generating:
// https://editor.p5js.org/LizPina/sketches/9LF5GRL7
