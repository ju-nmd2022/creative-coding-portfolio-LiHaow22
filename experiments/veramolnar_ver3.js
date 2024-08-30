// This code is inspired from the original code from "veramolnar_ver1.js", which was was adapted and tweaked from https://cagrimmett.com/2022/03/08/how-to-create-vera-molnars-structure-de-quadrilateres-in-p5-js/ Accessed: 2024-08-30.
// ChatGPT guided me through adding deformation.
function setup() {
  createCanvas(600, 600);
  frameRate(10);
}

function draw() {
  background(255);

  let numberShapes = 8;
  let size = (8 * width) / 10 / numberShapes;
  noFill();

  let colorChoices = [
    color("#c6e1f7"),
    color("#a8d4f7"),
    color("#7abef5"),
    color("#44a4f2"),
    color("#0a88f0"),
  ];

  for (let i = 0; i < 20; i++) {
    let shapeCount = 0;

    for (let y = 0; y < numberShapes; y++) {
      for (let x = 0; x < numberShapes; x++) {
        push();
        translate(width / 10 + x * size, height / 10 + y * size);
        strokeWeight(1.5);
        stroke(random(colorChoices));

        let deformationX = random(-10, 10);
        let deformationY = random(-10, 10);

        quad(
          random(-20, 20) + deformationX,
          random(-20, 20) + deformationY,
          random(size / 2 - 7, size + 7) + deformationX,
          random(-5, 3) + deformationY,
          random(size / 2 - 7, size + 7) + deformationX,
          random(size / 2 - 7, size + 7) + deformationY,
          random(-5, 3) + deformationX,
          random(size / 2 - 7, size + 7) + deformationY
        );
        pop();
        shapeCount++;
      }
    }
  }
  noLoop();
}
