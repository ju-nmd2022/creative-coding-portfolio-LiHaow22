// This code is inspired from the original code from "perlin_ver1.js", which was added by courtesy of Garrit Schaap.
// ChatGPT guided me through adding the flowfield and particles.
let columns;
let rows;
let smooth = 0.6;
let scale = 30;
let particles = [];
let flow;

function setup() {
  createCanvas(700, 500);
  columns = floor(width / scale);
  rows = floor(height / scale);
  flow = new Array(columns * rows);

  for (let i = 0; i < 5000; i++) {
    particles[i] = new Particle();
  }
  background(255);
}

function draw() {
  let yoffset = 0;
  for (let y = 0; y < rows; y++) {
    let xoffset = 0;
    for (let x = 0; x < columns; x++) {
      let index = x + y * columns;
      let angle = noise(xoffset, yoffset) * TWO_PI * 4;
      let vector = p5.Vector.fromAngle(angle);
      vector.setMag(0.9);
      flow[index] = vector;
      xoffset += smooth;
    }
    yoffset += smooth;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flow);
    particles[i].update();
    particles[i].show();
  }
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 1;
  }

  follow(vectors) {
    let x = floor(this.position.x / scale);
    let y = floor(this.position.y / scale);
    let index = x + y * columns;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    stroke(0, 5);
    strokeWeight(1.5);
    point(this.position.x, this.position.y);
  }
}
