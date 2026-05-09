let chicken;
let cars = [];
let laneYs = [];
let score = 0;

function setup() {
  createCanvas(600, 600);
  textFont('Arial');

  chicken = {
    x: width / 2,
    y: height - 40,
    size: 34
  };

  // road lanes
  laneYs = [140, 200, 260, 320, 380, 440];

  // make cars
  for (let i = 0; i < laneYs.length; i++) {
    for (let j = 0; j < 3; j++) {
      cars.push({
        x: random(width),
        y: laneYs[i],
        w: random(55, 90),
        h: 32,
        speed: random(2, 5) * (i % 2 === 0 ? 1 : -1),
        bodyColor: color(random(100, 255), random(80, 220), random(80, 220))
      });
    }
  }
}

function draw() {
  drawWorld();
  updateCars();
  drawCars();
  drawChicken();
  checkCollisions();
  drawUI();
}

function drawWorld() {
  background(170, 220, 170);

  // grass top and bottom
  fill(130, 200, 120);
  noStroke();
  rect(0, 0, width, 100);
  rect(0, 500, width, 100);

  // road
  fill(60);
  rect(0, 100, width, 400);

  // lane stripes
  stroke(255, 220);
  strokeWeight(3);
  for (let y = 150; y < 500; y += 60) {
    for (let x = 0; x < width; x += 40) {
      line(x + 10, y, x + 28, y);
    }
  }

  // goal line
  stroke(255);
  strokeWeight(4);
  line(0, 95, width, 95);
}

function updateCars() {
  for (let car of cars) {
    car.x += car.speed;

    if (car.speed > 0 && car.x > width + car.w) {
      car.x = -car.w;
    }
    if (car.speed < 0 && car.x < -car.w) {
      car.x = width + car.w;
    }
  }
}

function drawCars() {
  rectMode(CENTER);

  for (let car of cars) {
    push();
    translate(car.x, car.y);

    noStroke();
    fill(car.bodyColor);
    rect(0, 0, car.w, car.h, 8);

    fill(220);
    rect(-car.w * 0.15, -6, car.w * 0.35, car.h * 0.45, 4);

    fill(40);
    circle(-car.w * 0.3, 14, 12);
    circle(car.w * 0.3, 14, 12);

    pop();
  }
}

function drawChicken() {
  push();
  translate(chicken.x, chicken.y);

  // shadow
  fill(0, 40);
  noStroke();
  ellipse(0, 18, 28, 10);

  // body
  fill(255);
  stroke(30);
  strokeWeight(2);
  ellipse(0, 0, chicken.size, chicken.size - 4);

  // wings
  fill(245);
  ellipse(-12, 0, 10, 16);
  ellipse(12, 0, 10, 16);

  // head
  fill(255);
  circle(0, -20, 20);

  // beak
  fill(255, 180, 40);
  triangle(0, -18, -4, -12, 4, -12);

  // comb
  fill(220, 50, 60);
  circle(-5, -30, 6);
  circle(0, -33, 6);
  circle(5, -30, 6);

  // eyes
  fill(0);
  circle(-4, -21, 2.5);
  circle(4, -21, 2.5);

  // legs
  stroke(255, 180, 40);
  line(-4, 14, -4, 22);
  line(4, 14, 4, 22);

  pop();
}

function checkCollisions() {
  for (let car of cars) {
    let dX = abs(chicken.x - car.x);
    let dY = abs(chicken.y - car.y);

    if (dX < car.w / 2 && dY < 22) {
      resetChicken();
      score = 0;
    }
  }

  if (chicken.y < 90) {
    score++;
    resetChicken();
  }
}

function resetChicken() {
  chicken.x = width / 2;
  chicken.y = height - 40;
}

function keyPressed() {
  let step = 60;

  if (keyCode === LEFT_ARROW) {
    chicken.x -= step;
  } else if (keyCode === RIGHT_ARROW) {
    chicken.x += step;
  } else if (keyCode === UP_ARROW) {
    chicken.y -= step;
  } else if (keyCode === DOWN_ARROW) {
    chicken.y += step;
  }

  chicken.x = constrain(chicken.x, 20, width - 20);
  chicken.y = constrain(chicken.y, 40, height - 20);
}

function drawUI() {
  fill(255);
  noStroke();
  textSize(20);
  textAlign(LEFT);
  text("Score: " + score, 20, 35);

  textAlign(CENTER);
  textSize(15);
  text("use arrow keys to help the chicken cross", width / 2, 35);
}