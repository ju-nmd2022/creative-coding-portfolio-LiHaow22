// This code is inspired from the original code from "perlin_ver1.js", which was added by courtesy of Garrit Schaap.
// ChatGPT guided me through particles and fireworks.
let increment = 0.1;
let scale = 20;
let columns;
let rows;
let zoff = 0;
let fireworks = [];
let flow;

function setup() {
  createCanvas(700, 500);
  colorMode(HSB);
  columns = floor(width / scale);
  rows = floor(height / scale);
  flow = new Array(columns * rows);

  for (let i = 0; i < 3; i++) {
    fireworks.push(new Firework());
  }
}

function draw() {
  background(0);

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < columns; x++) {
      let index = x + y * columns;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 7;
      let vector = p5.Vector.fromAngle(angle);
      vector.setMag(0.1);
      flow[index] = vector;
      xoff += increment;
    }
    yoff += increment;
  }

  zoff += 0.01;

  for (let i = fireworks.length - 1; i >= 0; i--) {
    let fw = fireworks[i];
    fw.update();
    fw.show();

    if (fw.finished()) {
      fireworks.splice(i, 1);
      fireworks.push(new Firework());
    }
  }
}

class Firework {
  constructor() {
    this.explosionPoint = createVector(random(width), random(height / 2));
    this.particles = [];
    this.explosionTime = random();
    this.counter = 2;
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < 400; i++) {
      this.particles.push(new Particle(this.explosionPoint));
    }
  }

  update() {
    this.counter++;

    if (this.counter > this.explosionTime) {
      this.exploded = true;
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.follow(flow);
      particle.update();

      if (particle.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }

  finished() {
    return this.exploded && this.particles.length === 0;
  }
}

class Particle {
  constructor(explosionPoint) {
    this.position = explosionPoint.copy();
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(2, 5));
    this.acceleration = createVector(0, 0);
    this.maxSpeed = random(2);
    this.hue = random(260, 290);
    this.alpha = 255;
    this.prevPosition = this.position.copy();
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

    this.alpha -= 1;
    if (this.alpha < 0) {
      this.alpha = 0;
    }
  }

  show() {
    stroke(this.hue, 255, 255, 25);
    strokeWeight(1);
    line(
      this.position.x,
      this.position.y,
      this.prevPosition.x,
      this.prevPosition.y
    );
  }
}
