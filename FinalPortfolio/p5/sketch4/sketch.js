let flashAlpha = 0;
let photos = [];
let stars = [];

function setup() {
  createCanvas(700, 500);
  rectMode(CENTER);
  angleMode(DEGREES);

  for (let i = 0; i < 80; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      s: random(1, 3),
      a: random(100, 255)
    });
  }
}

function draw() {
  drawBackground();
  drawCamera(width / 2, height / 2 - 20);

  // draw polaroids
  for (let i = 0; i < photos.length; i++) {
    drawPolaroid(photos[i]);
    photos[i].y += photos[i].vy;
    photos[i].vy *= 0.98;
  }

  // flash overlay
  if (flashAlpha > 0) {
    fill(255, flashAlpha);
    noStroke();
    rect(width / 2, height / 2, width, height);
    flashAlpha -= 12;
  }

  // text
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text("click to take a picture", width / 2, height - 30);
}

function mousePressed() {
  flashAlpha = 255;

  photos.push({
    x: random(120, width - 120),
    y: -80,
    vy: random(2, 5),
    rot: random(-12, 12),
    c1: color(random(120, 255), random(80, 180), random(80, 180)),
    c2: color(random(80, 200), random(120, 255), random(150, 255))
  });

  if (photos.length > 6) {
    photos.splice(0, 1);
  }
}

function drawBackground() {
  background(10, 18, 20);

  for (let i = 0; i < stars.length; i++) {
    fill(255, stars[i].a);
    noStroke();
    circle(stars[i].x, stars[i].y, stars[i].s);
  }

  // soft glow behind camera
  for (let r = 220; r > 0; r -= 20) {
    fill(120, 140, 255, 8);
    noStroke();
    ellipse(width / 2, height / 2 - 20, r * 1.6, r);
  }
}

function drawCamera(x, y) {
  push();
  translate(x, y);


  fill(0, 80);
  noStroke();
  rect(10, 95, 250, 25, 20);


  fill(40);
  stroke(90);
  strokeWeight(2);
  rect(0, 0, 240, 140, 20);


  fill(55);
  rect(-45, -55, 90, 28, 8);

 
  fill(30);
  circle(0, 0, 90);


  fill(70);
  circle(0, 0, 70);
  fill(20);
  circle(0, 0, 50);


  fill(180, 220, 255, 120);
  noStroke();
  ellipse(-10, -10, 18, 28);


  fill(230);
  rect(72, -34, 42, 24, 6);
  fill(255, 255, 180);
  rect(72, -34, 28, 12, 4);

  
  fill(220, 70, 70);
  circle(-80, -44, 16);


  fill(90);
  rect(-75, 10, 30, 10, 3);
  rect(75, 20, 40, 14, 4);

  pop();
}

function drawPolaroid(p) {
  push();
  translate(p.x, p.y);
  rotate(p.rot);

 
  fill(250);
  noStroke();
  rect(0, 0, 100, 120, 6);

 
  fill(230);
  rect(0, -15, 76, 62, 3);

  noStroke();
  fill(p.c1);
  rect(0, -25, 76, 22, 3);
  fill(p.c2);
  rect(0, -3, 76, 18, 2);
  fill(255, 180);
  ellipse(-12, -18, 20, 20);

  stroke(180);
  line(-25, 38, 25, 38);

  pop();
}