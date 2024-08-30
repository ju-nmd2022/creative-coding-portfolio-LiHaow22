// The following lines of code was adapted and tweaked from https://cagrimmett.com/2022/03/08/how-to-create-vera-molnars-structure-de-quadrilateres-in-p5-js/ Accessed: 2024-08-30

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);

  let numberShapes = 8;
  let size = (8 * width) / 10 / numberShapes;
  noFill();
  strokeWeight(0.8);

  let colorChoices = [
    color("#EB7B4C"),
    color("#0BA19D"),
    color("#634D9D"),
    color("#221B22"),
    color("#0550A2"),
  ];
  let shapeColors = [];
  for (c = 0; c < numberShapes * numberShapes; c++) {
    shapeColors.push(random(colorChoices));
  }
  for (i = 0; i < 20; i++) {
    let shapeCount = 0;

    for (y = 0; y < numberShapes; y++) {
      for (x = 0; x < numberShapes; x++) {
        push();
        translate(width / 10 + x * size, height / 10 + y * size);
        stroke(shapeColors[shapeCount]);
        quad(
          random(-20, 20),
          random(-20, 20),
          random(size / 2 - 7, size + 7),
          random(-5, 3),
          random(size / 2 - 7, size + 7),
          random(size / 2 - 7, size + 7),
          random(-5, 3),
          random(size / 2 - 7, size + 7)
        );
        pop();
        shapeCount++;
      }
    }
  }
  noLoop();
}
