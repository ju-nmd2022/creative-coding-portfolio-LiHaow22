// This code is inspired from the original code from "veramolnar_ver1.js", which was was adapted and tweaked from https://cagrimmett.com/2022/03/08/how-to-create-vera-molnars-structure-de-quadrilateres-in-p5-js/ Accessed: 2024-08-30.
// ChatGPT guided me through adding Perlin noise.
let noiseOffset = 0;

function setup() {
  createCanvas(600, 600);
  frameRate(3);
}

function draw() {
  background(255);

  let numberShapes = 8;
  let size = (8 * width) / 10 / numberShapes;
  noFill();
  strokeWeight(0.3);

  let noiseScale = 0.2;

  let colorChoices = [
    color("#c6e1f7"),
    color("#a8d4f7"),
    color("#7abef5"),
    color("#44a4f2"),
    color("#0a88f0"),
  ];

  let shapeColors = [];
  for (let c = 0; c < numberShapes * numberShapes; c++) {
    let noiseColor = noise(c * noiseScale);
    let color1 = random(colorChoices);
    let color2 = random(colorChoices);
    let smoothColor = lerpColor(color1, color2, noiseColor);
    shapeColors.push(smoothColor);
  }

  for (let i = 0; i < 15; i++) {
    let shapeCount = 0;

    for (let y = 0; y < numberShapes; y++) {
      for (let x = 0; x < numberShapes; x++) {
        push();
        let noiseX = noise(x * noiseScale + noiseOffset) * size;
        let noiseY = noise(y * noiseScale + noiseOffset) * size;
        let noiseSize = noise(x * noiseScale, y * noiseScale) * size * 1.5;

        translate(
          width / 30 + x * size + noiseX,
          height / 30 + y * size + noiseY
        );
        stroke(shapeColors[shapeCount]);

        ellipse(
          random(-10, 20) + noiseX,
          random(-10, 20) + noiseY,
          random(noiseSize / 2 - 7, noiseSize + 7)
        );
        pop();
        shapeCount++;
      }
    }
  }
  noiseOffset += 0.3;
}
