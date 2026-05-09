let balls = [];

function setup() {
  createCanvas(700, 500);
}

function draw() {
  background(245);


  for (let b of balls) {
    b.update();
    b.display();
  }

  fill(0);
  textSize(12);
  text("Drag = add balls. Press Z = undo. Press C = clear.", 10, height - 10);
}

function mouseDragged() {
  // not too many per second
  if (frameCount % 2 === 0) balls.push(new Ball(mouseX, mouseY));
}

function keyPressed() {
  if (key === 'c' || key === 'C') balls = [];
  if (key === 'z' || key === 'Z') balls.pop();
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.r = random(10, 25);

    this.vx = random(-3, 3);
    this.vy = random(-3, 3);

    this.col = color(random(255), random(255), random(255), 180);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    
    if (this.x < this.r || this.x > width - this.r) this.vx *= -1;
    if (this.y < this.r || this.y > height - this.r) this.vy *= -1;

    
    this.vy += 0.03;
    this.vy *= 0.99;
  }

  display() {
    noStroke();
    fill(this.col);
    circle(this.x, this.y, this.r * 2);
  }
}