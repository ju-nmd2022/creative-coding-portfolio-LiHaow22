// The following lines of code was added by courtesy of Garrit Schaap.
// The Coding Creative on YouTube guided me through the start of Tone.js, video reference (+ continuation of videos in series): https://www.youtube.com/watch?v=7ZhbKclhDf4
// Joel Schuman's code from CodePen helped me understand different values in different settings, link reference: https://codepen.io/j0315C-human/pen/eaQqzY?editors=1010
// ChatGPT guided me through making the chords listen to the particle fireworks

let synth = new Tone.PolySynth().toDestination();
let vibrato = new Tone.Vibrato(5, 0);
let filter = new Tone.Filter(1000, "lowpass", -48);
let delay = new Tone.FeedbackDelay("0:1:0", 0.3);
let compressor = new Tone.Compressor(-30, 7);

synth.chain(vibrato, filter, delay, compressor, Tone.Master);

const chordProgression = [
  ["C4", "E4", "G4"],
  ["F4", "A4", "C5"],
  ["G4", "B4", "D5"],
  ["A4", "C5", "E5"],
];

let increment = 0.1;
let scale = 20;
let columns;
let rows;
let zoff = 0;
let fireworks = [];
let flow;
let started = false;

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

  if (started) {
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
}

window.addEventListener("click", () => {
  if (!started) {
    if (Tone.context.state !== "running") {
      Tone.start();
    }
    started = true;
  }
});

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

      let chordIndex = floor(
        map(this.explosionPoint.x, 0, width, 0, chordProgression.length)
      );
      let chord = chordProgression[chordIndex];
      filter.frequency.value = map(this.explosionPoint.y, 0, height, 500, 1500);
      synth.triggerAttackRelease(chord, "2n");
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
    this.hue = random(300, 350);
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
    this.prevPosition = this.position.copy();
  }
}
