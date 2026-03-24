let stamps = [];

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
}

function draw() {
  background(245);

  for (let i = 0; i < stamps.length; i++) {
    let s = stamps[i];

    push();
    translate(s.x, s.y);
    rotate(s.rot);

    for (let gx = -2; gx <= 2; gx++) {
      for (let gy = -2; gy <= 2; gy++) {
        let size = 6 + (abs(gx) + abs(gy)) * 2;
        fill(s.r, s.g, s.b, 180);
        rect(gx * 18, gy * 18, size, size, 3);
      }
    }

    pop();
  }

  // little hint
  fill(0);
  textSize(12);
  text("Click to stamp. Press C to clear. Press Z to undo.", 10, height - 10);
}

function mousePressed() {
  stamps.push({
    x: mouseX,
    y: mouseY,
    rot: random(TWO_PI),
    r: random(40, 200),
    g: random(40, 200),
    b: random(40, 200)
  });
}

function keyPressed() {
  if (key === 'c' || key === 'C') stamps = [];
  if (key === 'z' || key === 'Z') stamps.pop();
}

