// DONA'S ARCADE - COMPLETE P5.JS PROJECT
// Controls: WASD move/play, E enter games, ESC return to arcade

let scene = "arcade";
let totalPoints = 0;
let player;
let machines = [];
let activeGame = null;
let keys = {};
let selectedSkin = 0;
let showCustomizer = false;
let showInfo = false;

const W = 1400;
const H = 720;

const skins = [
  { hair: "#8b4a46", shirt: "#1f4f91", pants: "#1c2833", accent: "#d63b53", name: "Hero" },
  { hair: "#4b4d59", shirt: "#a9a9b8", pants: "#4b5665", accent: "#d63838", name: "Knight" },
  { hair: "#3c274e", shirt: "#5a3d75", pants: "#2b1d38", accent: "#b065d8", name: "Wizard" },
  { hair: "#f28c18", shirt: "#202b35", pants: "#18202a", accent: "#d13d3d", name: "Ninja" },
  { hair: "#8b4a46", shirt: "#2c8b28", pants: "#2c5f2d", accent: "#e4c542", name: "Elf" },
  { hair: "#f3c94b", shirt: "#ffffff", pants: "#5daeea", accent: "#2c7fc1", name: "Fairy" },
];

function setup() {
  createCanvas(W, H);
  textFont("'Press Start 2P'");
  noSmooth();

  player = {
    x: width / 2,
    y: height / 2 + 80,
    speed: 3.2,
    size: 28
  };

  machines = [
    new ArcadeMachine(335, 210, "PACMAN", "#ffe05a", "pacman"),
    new ArcadeMachine(700, 200, "DARTS", "#8b5cf6", "darts"),
    new ArcadeMachine(1065, 210, "CARDS", "#ff9f1c", "cards"),
    new ArcadeMachine(335, 500, "TETRIS", "#2ea8ff", "tetris"),
    new ArcadeMachine(700, 500, "WHEEL", "#a855f7", "wheel"),
    new ArcadeMachine(1065, 500, "CROSSY", "#16e074", "crossy")
  ];
}

function draw() {
  background("#080812");

  if (scene === "arcade") drawArcade();
  if (scene === "game") activeGame.run();
}

function drawArcade() {
  drawArcadeBackground();

  for (let m of machines) {
    m.draw();
  }
  drawPixelCharacter(player.x, player.y, 1.30, skins[selectedSkin]);

  let nearby = getNearbyMachine();

  fill("#000");
  noStroke();
  rect(0, 0, width, 64);

  fill("#000");
noStroke();
rect(0, 0, width, 72);

fill("#ffe45c");
roundedRect(28, 24, 190, 36, 20);
fill("#000");
textAlign(CENTER, CENTER);
textSize(15);
text("POINTS: " + totalPoints, 120, 42);

fill("#16c8e8");
roundedRect(width - 238, 24, 190, 36, 8);
fill("#000");
textSize(15);
text("CUSTOMIZE", width - 143, 42);

  fill("#ff5bd7");
  textSize(30);
  textAlign(CENTER)
  text("DONA'S ARCADE", width / 2, 95);

  if (nearby) {
    fill("#ffffff");
    stroke("#ff5bd7");
    strokeWeight(4);
    roundedRect(width / 2 - 160, height - 88, 320, 42, 8);
    noStroke();
    fill("#111");
    textSize(13);
    text("Press E to play " + nearby.label, width / 2, height - 67);
  }

  if (showCustomizer) drawCustomizer();
  drawInfoButton();
    if (showInfo) drawInfoPanel(); 
    function drawInfoButton() {
  stroke("#ffffff");
  strokeWeight(3);
  fill("#111827");
  circle(42, height - 42, 42);

  noStroke();
  fill("#ffe45c");
  textAlign(CENTER, CENTER);
  textSize(18);
  text("i", 42, height - 43);
}

function drawInfoPanel() {
  fill(0, 0, 0, 300);
  stroke("#ff5bd7");
  strokeWeight(4);
  roundedRect(72, height - 220, 500, 200, 20);

  noStroke();
  fill("#ffe45c");
  textAlign(LEFT, TOP);
  textSize(13);
  text("HOW TO PLAY", 95, height - 198);

  fill("#ffffff");
  textSize(12);
  text(
    "Walk around and rack up points.\n\n" +
    "WASD = move around\n" +
    "E = play a game\n" +
    "C = customize character\n" +
    "ESC = return / close menus\n\n" +
    "Click the i button to hide menu",
    100,
    height - 168
  );
}     

  moveArcadePlayer();
}

function drawArcadeBackground() {
  background("#21002d");

  noStroke();
  fill("#100017");
  rect(0, 0, width, 200);

  stroke("#50246d");
  strokeWeight(1);

  for (let y = 230; y < height; y += 55) {
    line(0, y, width, y);
  }

  for (let x = -200; x < width + 200; x += 70) {
    line(x, height, x + 210, 210);
  }

  noStroke();
  fill(255, 255, 255, 70);
  for (let i = 0; i < 40; i++) {
    circle((i * 139) % width, 175 + ((i * 47) % 70), 3);
  }
}

function moveArcadePlayer() {
  if (showCustomizer) return;

  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;

  player.x = constrain(player.x, 40, width - 40);
  player.y = constrain(player.y, 220, height - 50);
}

function getNearbyMachine() {
  for (let m of machines) {
    if (dist(player.x, player.y, m.x, m.y + 80) < 100) return m;
  }
  return null;
}

class ArcadeMachine {
  constructor(x, y, label, color, gameType) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.color = color;
    this.gameType = gameType;
  }

  draw() {
    push();
    translate(this.x, this.y);

    noStroke();
    fill(0, 0, 0, 100);
    ellipse(30, 155, 135, 24);

    stroke("#000");
    strokeWeight(5);

    fill(this.color);
    beginShape();
    vertex(-55, -20);
    vertex(70, -20);
    vertex(90, 5);
    vertex(90, 140);
    vertex(55, 160);
    vertex(-45, 160);
    vertex(-65, 120);
    vertex(-65, 10);
    endShape(CLOSE);

    fill(lerpColor(color(this.color), color("#ffffff"), 0.35));
    quad(70, -20, 90, 5, 90, 140, 55, 160);

    fill("#fff7a5");
    roundedRect(-55, -45, 115, 30, 6);
    fill("#ff3fc7");
    rect(-43, -36, 90, 14);
    noStroke();
    fill("#fff");
    textAlign(CENTER, CENTER);
    textSize(11);
    text(this.label, 2, -29);

    stroke("#000");
    strokeWeight(5);
    fill("#10151f");
    roundedRect(-35, 5, 70, 50, 6);

    fill("#77ffd8");
    roundedRect(-25, 15, 50, 28, 3);
    stroke("#dfffee");
    strokeWeight(3);
    line(-10, 20, 5, 38);
    line(8, 20, 22, 36);

    stroke("#000");
    strokeWeight(4);
    fill("#f4f4f4");
    roundedRect(-42, 70, 84, 31, 5);

    fill("#ff4057");
    circle(-30, 76, 13);
    stroke("#000");
    strokeWeight(3);
    line(-25, 82, -16, 94);

    noStroke();
    fill("#22d3ee");
    circle(-5, 82, 10);
    fill("#ffe45c");
    circle(13, 82, 10);
    fill("#ff5bd7");
    circle(31, 82, 10);

    stroke("#000");
    strokeWeight(4);
    fill("#f4f4f4");
    roundedRect(-25, 105, 50, 50, 6);
    fill("#171717");
    roundedRect(-10, 118, 20, 25, 3);

    pop();
  }
}

function drawPixelCharacter(x, y, scaleAmount, skin) {
  push();
  translate(x, y);
  scale(scaleAmount);
  stroke("#07121f");
  strokeWeight(3);
  rectMode(CENTER);

  fill(skin.hair);
  rect(0, -29, 26, 18);
  rect(-10, -22, 18, 20);
  rect(10, -22, 18, 20);
  rect(0, -38, 18, 10);

  fill("#ffd9a3");
  rect(0, -18, 24, 24);
  rect(-18, 16, 8, 22);
  rect(18, 16, 8, 22);

  fill("#06111f");
  rect(-6, -18, 2, 8);
  rect(6, -18, 2, 8);

  noFill();
  arc(0, -10, 10, 8, 0, PI);

  fill(skin.shirt);
  rect(0, 18, 28, 35);

  fill(skin.accent);
  rect(0, 4, 18, 7);

  fill(skin.pants);
  rect(-7, 45, 9, 22);
  rect(7, 45, 9, 22);

  fill("#13d4f5");
  rect(-7, 59, 14, 5);
  rect(7, 59, 14, 5);

  pop();
}

function drawCustomizer() {
  fill(0, 0, 0, 250);
  rect(0, 0, width, height);

  fill("#fff");
  textAlign(CENTER, CENTER);
  textSize(28);
  text("CHOOSE YOUR CHARACTER", width / 2, 105);

  for (let i = 0; i < skins.length; i++) {
    let x = 320 + (i % 3) * 360;
    let y = 230 + floor(i / 3) * 220;

    stroke(i === selectedSkin ? "#ffe45c" : "#ffffff");
    strokeWeight(i === selectedSkin ? 6 : 2);
    fill("#151527");
    roundedRect(x - 85, y - 80, 150, 150, 13);

    drawPixelCharacter(x, y + -15 ,1.1, skins[i]);

    noStroke();
    fill("#fff");
    textSize(15);
    text(skins[i].name, x, y + 85,);
  }

  fill("#ddd");
  textSize(16);
  text("Press 1-6 to select • C or ESC to close", width / 2, height - 70);
}

function keyPressed() {
  keys[key.toLowerCase()] = true;

  if (keyCode === ESCAPE) {
    if (scene === "game") {
      scene = "arcade";
      activeGame = null;
    } else {
      showCustomizer = false;
    }
  }

  if (scene === "arcade") {
    if (key.toLowerCase() === "c") showCustomizer = !showCustomizer;

    if (showCustomizer && key >= "1" && key <= "6") {
      selectedSkin = Number(key) - 1;
    }

    if (key.toLowerCase() === "e" && !showCustomizer) {
      let m = getNearbyMachine();
      if (m) startGame(m.gameType);
    }
  }
  if (scene === "game" && activeGame && activeGame.keyPressed) {
    activeGame.keyPressed(key.toLowerCase(), keyCode);
  }
  if (scene === "arcade") {
  if (key.toLowerCase() === "c") {
    showCustomizer = !showCustomizer;
  }

  if (key.toLowerCase() === "i") {
    showInfo = !showInfo;
  }
}
}

function keyReleased() {
  keys[key.toLowerCase()] = false;
}

function startGame(type) {
  scene = "game";
  if (type === "pacman") activeGame = new PacmanGame();
  if (type === "darts") activeGame = new DartsGame();
  if (type === "cards") activeGame = new CardsGame();
  if (type === "tetris") activeGame = new TetrisGame();
 if (type === "wheel") activeGame = new WheelGame();
  if (type === "crossy") activeGame = new CrossyGame();
}

class PacmanGame {
  constructor() {
    this.points = 0;
    this.lives = 3;
    this.gameOver = false;

    this.p = { x: 260, y: 220, r: 18, speed: 3.4 };

    this.walls = [
      { x: 220, y: 160, w: 900, h: 18 },
      { x: 220, y: 650, w: 900, h: 18 },
      { x: 220, y: 160, w: 18, h: 508 },
      { x: 1102, y: 160, w: 18, h: 508 },

      { x: 310, y: 245, w: 160, h: 18 },
      { x: 570, y: 245, w: 190, h: 18 },
      { x: 870, y: 245, w: 160, h: 18 },

      { x: 310, y: 355, w: 18, h: 150 },
      { x: 1010, y: 355, w: 18, h: 150 },

      { x: 400, y: 535, w: 180, h: 18 },
      { x: 760, y: 535, w: 180, h: 18 },

      { x: 585, y: 375, w: 170, h: 18 },
      { x: 585, y: 375, w: 18, h: 105 },
      { x: 737, y: 375, w: 18, h: 105 },
      { x: 585, y: 480, w: 170, h: 18 }
    ];

    this.ghostBox = { x: 585, y: 375, w: 170, h: 105 };

    this.dots = [];
    let mazeW = 920;
let mazeX = (width - mazeW) / 2;

    for (let x = mazeX + 60; x <= mazeX + mazeW - 60; x += 40) {
    for (let y = 205; y <= 615; y += 40) {
        if (!this.collidesWithWalls(x, y, 7) && !this.insideRect(x, y, this.ghostBox)) {
          this.dots.push({ x, y, eaten: false });
        }
      }
    }

    this.ghosts = [
      { x: 655, y: 430, vx: 0, vy: -2, c: "#ff4057", released: false },
      { x: 690, y: 430, vx: 0, vy: -2, c: "#22d3ee", released: false },
      { x: 625, y: 430, vx: 0, vy: -2, c: "#ff75d8", released: false }
    ];
  }

  run() {
    gameHeader("PACMAN", "WASD move • collect dots • avoid ghosts", this.points);

    if (this.gameOver) {
      this.drawGameOver();
      return;
    }

    this.drawMaze();
    this.movePlayer();

    noStroke();
    fill("#ffb84d");

    for (let d of this.dots) {
      if (!d.eaten) {
        circle(d.x, d.y, 7);

        if (dist(this.p.x, this.p.y, d.x, d.y) < 20) {
          d.eaten = true;
          this.points++;
          totalPoints++;
        }
      }
    }

    fill("#ffe45c");
    arc(this.p.x, this.p.y, this.p.r * 2, this.p.r * 2, 0.35, TWO_PI - 0.35, PIE);

    for (let g of this.ghosts) {
      this.moveGhost(g);
      this.drawGhost(g.x, g.y, g.c);

      if (g.released && dist(this.p.x, this.p.y, g.x, g.y) < 30) {
        this.lives--;
        this.p.x = 260;
        this.p.y = 220;

        if (this.lives <= 0) this.gameOver = true;
      }
    }

    fill("#fff");
    noStroke();
    textSize(11);
    text("Lives: " + this.lives, width / 2, height - 35);
  }
drawMaze() {
  let mazeW = 920;
  let mazeH = 540;
  let mazeX = (width - mazeW) / 2;
  let mazeY = 130;

  noStroke();
  fill("#050516");
  roundedRect(mazeX, mazeY, mazeW, mazeH, 12);

  for (let w of this.walls) {
    fill("#3848ff");
    roundedRect(w.x - 210 + mazeX, w.y, w.w, w.h, 6);
    fill("#9ca3ff");
    rect(w.x - 210 + mazeX + 3, w.y + 3, w.w - 6, 3);
  }

  fill("#17172b");
  stroke("#ff5bd7");
  strokeWeight(4);
  roundedRect(
    this.ghostBox.x - 210 + mazeX,
    this.ghostBox.y,
    this.ghostBox.w,
    this.ghostBox.h,
    8
  );

  noStroke();
  fill("#fff");
  textSize(9);
  text(
    "GHOSTS",
    this.ghostBox.x - 210 + mazeX + this.ghostBox.w / 2,
    this.ghostBox.y - 14
  );
}

  movePlayer() {
    let nx = this.p.x;
    let ny = this.p.y;

    if (keys["w"]) ny -= this.p.speed;
    if (keys["s"]) ny += this.p.speed;
    if (keys["a"]) nx -= this.p.speed;
    if (keys["d"]) nx += this.p.speed;

    if (!this.collidesWithWalls(nx, this.p.y, this.p.r)) this.p.x = nx;
    if (!this.collidesWithWalls(this.p.x, ny, this.p.r)) this.p.y = ny;
  }

  moveGhost(g) {
    if (!g.released) {
      if (this.points >= 3) {
        g.y -= 2;

        if (g.y < this.ghostBox.y - 25) {
          g.released = true;
          g.vx = random([-2, 2]);
          g.vy = 0;
        }
      }

      return;
    }

    let nx = g.x + g.vx;
    let ny = g.y + g.vy;

    if (this.collidesWithWalls(nx, ny, 16) || random() < 0.015) {
      let dirs = [
        [2, 0],
        [-2, 0],
        [0, 2],
        [0, -2]
      ];

      let d = random(dirs);
      g.vx = d[0];
      g.vy = d[1];
    } else {
      g.x = nx;
      g.y = ny;
    }
  }

  collidesWithWalls(x, y, r) {
    for (let w of this.walls) {
      if (
        x + r > w.x &&
        x - r < w.x + w.w &&
        y + r > w.y &&
        y - r < w.y + w.h
      ) {
        return true;
      }
    }

    return false;
  }

  insideRect(x, y, r) {
    return x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h;
  }

  drawGhost(x, y, c) {
    fill(c);
    stroke("#000");
    strokeWeight(3);
    rectMode(CENTER);
    rect(x, y, 34, 38, 15, 15, 0, 0);

    triangle(x - 17, y + 10, x - 8, y + 25, x, y + 10);
    triangle(x, y + 10, x + 8, y + 25, x + 17, y + 10);

    fill("#fff");
    noStroke();
    circle(x - 8, y - 5, 10);
    circle(x + 8, y - 5, 10);

    fill("#000");
    circle(x - 6, y - 5, 4);
    circle(x + 10, y - 5, 4);

    rectMode(CORNER);
  }

  drawGameOver() {
    fill("#ff4057");
    textSize(24);
    text("GAME OVER", width / 2, height / 2);

    fill("#fff");
    textSize(10);
    text("Press ESC to return to arcade", width / 2, height / 2 + 40);
  }
}

function gameHeader(title, instructions, points) {
  fill("#080812");
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  noStroke();

  fill("#ffe45c");
  textSize(20);
  text(title, width / 2, 45);

  fill("#f2f2f2");
  textSize(15);
  text(instructions + " • ESC to return", width / 2, 72);

  fill("#ffb84d");
  textSize(14);
  text("Game points: " + points + "   Total points: " + totalPoints, width / 2, 97);
}
class DartsGame {
  constructor() {
    this.points = 0;
    this.aim = { x: width / 2, y: height / 2 };
    this.throws = 5;
    this.target = {
      x: width / 2,
      y: height / 2 + 40,
      vx: 3.2,
      vy: 2.4
    };
    this.gameOver = false;
  }

  run() {
    gameHeader("DARTS", "WASD aim • E throw • moving target", this.points);

    if (this.gameOver) {
      this.drawGameOver();
      return;
    }

    this.moveTarget();

    push();
    translate(this.target.x, this.target.y);

    for (let r = 150; r > 0; r -= 30) {
      fill(r % 60 === 0 ? "#ff4057" : "#fff");
      stroke("#111");
      strokeWeight(3);
      circle(0, 0, r * 2);
    }

    fill("#ffe45c");
    circle(0, 0, 36);
    pop();

    if (keys["w"]) this.aim.y -= 4;
    if (keys["s"]) this.aim.y += 4;
    if (keys["a"]) this.aim.x -= 4;
    if (keys["d"]) this.aim.x += 4;

    this.aim.x = constrain(this.aim.x, 170, width - 170);
    this.aim.y = constrain(this.aim.y, 150, height - 90);

    stroke("#16e0ff");
    strokeWeight(3);
    line(this.aim.x - 15, this.aim.y, this.aim.x + 15, this.aim.y);
    line(this.aim.x, this.aim.y - 15, this.aim.x, this.aim.y + 15);

    fill("#fff");
    noStroke();
    textSize(11);
    text("Throws left: " + this.throws, width / 2, height - 55);
  }

  moveTarget() {
    this.target.x += this.target.vx;
    this.target.y += this.target.vy;

    if (this.target.x < 230 || this.target.x > width - 230) this.target.vx *= -1;
    if (this.target.y < 190 || this.target.y > height - 190) this.target.vy *= -1;
  }

  keyPressed(k) {
    if (k === "e" && this.throws > 0 && !this.gameOver) {
      let d = dist(this.aim.x, this.aim.y, this.target.x, this.target.y);
      let gain = max(0, floor((170 - d) / 18));

      this.points += gain;
      totalPoints += gain;
      this.throws--;

      this.target.vx *= 1.08;
      this.target.vy *= 1.08;

      if (this.throws <= 0) this.gameOver = true;
    }
  }

  drawGameOver() {
    fill("#ffe45c");
    textSize(22);
    text("DARTS OVER", width / 2, height / 2);
    fill("#fff");
    textSize(10);
    text("Final score: " + this.points + " • Press ESC", width / 2, height / 2 + 40);
  }
}

class CardsGame {
  constructor() {
    this.points = 0;
    this.cards = [];
    this.flipped = [];
    let vals = ["👾", "⭐", "💎", "🍒", "👾", "⭐", "💎", "🍒"];
    vals = shuffle(vals);
    for (let i = 0; i < 8; i++) {
      this.cards.push({ value: vals[i], matched: false });
    }
    this.cursor = 0;
  }

  run() {
    gameHeader("CARDS", "WASD move cursor • E flip cards", this.points);

    for (let i = 0; i < this.cards.length; i++) {
      let x = 410 + (i % 4) * 150;
      let y = 250 + floor(i / 4) * 180;
      let c = this.cards[i];

      stroke(i === this.cursor ? "#ffe45c" : "#ffffff");
      strokeWeight(i === this.cursor ? 6 : 3);
      fill(c.matched || this.flipped.includes(i) ? "#ff5bd7" : "#23234a");
      roundedRect(x, y, 105, 135, 12);

      fill("#fff");
      noStroke();
      textSize(42);
      text(c.matched || this.flipped.includes(i) ? c.value : "?", x + 52, y + 67);
    }
  }

  keyPressed(k) {
    if (k === "a") this.cursor = max(0, this.cursor - 1);
    if (k === "d") this.cursor = min(7, this.cursor + 1);
    if (k === "w") this.cursor = max(0, this.cursor - 4);
    if (k === "s") this.cursor = min(7, this.cursor + 4);

    if (k === "e") {
      let card = this.cards[this.cursor];
      if (!card.matched && !this.flipped.includes(this.cursor)) {
        this.flipped.push(this.cursor);

        if (this.flipped.length === 2) {
          let a = this.flipped[0];
          let b = this.flipped[1];

          if (this.cards[a].value === this.cards[b].value) {
            this.cards[a].matched = true;
            this.cards[b].matched = true;
            this.points += 5;
            totalPoints += 5;
          }

          setTimeout(() => {
            this.flipped = [];
          }, 600);
        }
      }
    }
  }
}

class TetrisGame {
  constructor() {
    this.points = 0;
    this.cols = 10;
    this.rows = 18;
    this.cell = 28;
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
    this.tick = 0;
    this.gameOver = false;

    this.shapes = [
      { c: "#22d3ee", blocks: [[0, 0], [1, 0], [2, 0], [3, 0]] },
      { c: "#ffe45c", blocks: [[0, 0], [1, 0], [0, 1], [1, 1]] },
      { c: "#ff5bd7", blocks: [[1, 0], [0, 1], [1, 1], [2, 1]] },
      { c: "#16e074", blocks: [[1, 0], [2, 0], [0, 1], [1, 1]] },
      { c: "#ff4057", blocks: [[0, 0], [1, 0], [1, 1], [2, 1]] },
      { c: "#8b5cf6", blocks: [[0, 0], [0, 1], [1, 1], [2, 1]] },
      { c: "#ff9f1c", blocks: [[2, 0], [0, 1], [1, 1], [2, 1]] }
    ];

    this.spawnPiece();
  }

  spawnPiece() {
    let shape = random(this.shapes);
    this.piece = {
      x: 3,
      y: 0,
      c: shape.c,
      blocks: shape.blocks.map(b => [b[0], b[1]])
    };

    if (this.collides(this.piece.x, this.piece.y, this.piece.blocks)) {
      this.gameOver = true;
    }
  }

  run() {
    gameHeader("TETRIS", "A/D move • S drop • W rotate", this.points);

    if (this.gameOver) {
      this.drawBoard();
      fill("#ff4057");
      textSize(22);
      text("GAME OVER", width / 2, height / 2);
      fill("#fff");
      textSize(10);
      text("Press ESC to return", width / 2, height / 2 + 40);
      return;
    }

    this.tick++;
    if (this.tick % (keys["s"] ? 6 : 28) === 0) {
      this.softDrop();
    }

    this.drawBoard();
  }

  drawBoard() {
    let ox = width / 2 - (this.cols * this.cell) / 2;
    let oy = 130;

    stroke("#3848ff");
    strokeWeight(5);
    fill("#101020");
    rect(ox, oy, this.cols * this.cell, this.rows * this.cell);

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        stroke("#303050");
        strokeWeight(1);
        fill(this.grid[y][x] || "#151528");
        rect(ox + x * this.cell, oy + y * this.cell, this.cell, this.cell);
      }
    }

    if (!this.gameOver) {
      fill(this.piece.c);
      stroke("#000");
      strokeWeight(3);

      for (let b of this.piece.blocks) {
        let px = this.piece.x + b[0];
        let py = this.piece.y + b[1];
        rect(ox + px * this.cell, oy + py * this.cell, this.cell, this.cell);
      }
    }
  }

  softDrop() {
    if (!this.collides(this.piece.x, this.piece.y + 1, this.piece.blocks)) {
      this.piece.y++;
    } else {
      this.lockPiece();
      this.clearRows();
      this.spawnPiece();
    }
  }

  lockPiece() {
    for (let b of this.piece.blocks) {
      let x = this.piece.x + b[0];
      let y = this.piece.y + b[1];

      if (y >= 0 && y < this.rows && x >= 0 && x < this.cols) {
        this.grid[y][x] = this.piece.c;
      }
    }
  }

  clearRows() {
    for (let y = this.rows - 1; y >= 0; y--) {
      if (this.grid[y].every(Boolean)) {
        this.grid.splice(y, 1);
        this.grid.unshift(Array(this.cols).fill(null));
        this.points += 10;
        totalPoints += 10;
        y++;
      }
    }
  }

  collides(nx, ny, blocks) {
    for (let b of blocks) {
      let x = nx + b[0];
      let y = ny + b[1];

      if (x < 0 || x >= this.cols || y >= this.rows) return true;
      if (y >= 0 && this.grid[y][x]) return true;
    }
    return false;
  }

  rotatePiece() {
    let rotated = this.piece.blocks.map(b => [-b[1], b[0]]);
    let minX = min(rotated.map(b => b[0]));
    if (minX < 0) rotated = rotated.map(b => [b[0] - minX, b[1]]);

    if (!this.collides(this.piece.x, this.piece.y, rotated)) {
      this.piece.blocks = rotated;
    }
  }

  keyPressed(k) {
    if (this.gameOver) return;

    if (k === "a" && !this.collides(this.piece.x - 1, this.piece.y, this.piece.blocks)) {
      this.piece.x--;
    }

    if (k === "d" && !this.collides(this.piece.x + 1, this.piece.y, this.piece.blocks)) {
      this.piece.x++;
    }

    if (k === "s") this.softDrop();

    if (k === "w") this.rotatePiece();
  }
}
class WheelGame {
  constructor() {
    this.points = 0;
    this.angle = 0;
    this.speed = 0;
    this.spinning = false;
    this.result = "";
    this.prizes = [
      { label: "+1", value: 1, color: "#22d3ee" },
      { label: "+3", value: 3, color: "#ff5bd7" },
      { label: "+5", value: 5, color: "#ffe45c" },
      { label: "+10", value: 10, color: "#16e074" },
      { label: "LOSE", value: 0, color: "#ff4057" },
      { label: "+2", value: 2, color: "#8b5cf6" }
    ];
  }

  run() {
    gameHeader("PRIZE WHEEL", "Press E to spin • land on a prize", this.points);

    translate(width / 2, height / 2 + 40);

    if (this.spinning) {
      this.angle += this.speed;
      this.speed *= 0.985;

      if (this.speed < 0.01) {
        this.spinning = false;
        this.speed = 0;
        this.pickPrize();
      }
    }

    rotate(this.angle);

    let slice = TWO_PI / this.prizes.length;

    for (let i = 0; i < this.prizes.length; i++) {
      fill(this.prizes[i].color);
      stroke("#000");
      strokeWeight(4);
      arc(0, 0, 320, 320, i * slice, (i + 1) * slice, PIE);

      push();
      rotate(i * slice + slice / 2);
      fill("#000");
      noStroke();
      textSize(11);
      textAlign(CENTER, CENTER);
      text(this.prizes[i].label, 95, 0);
      pop();
    }

    resetMatrix();

    fill("#fff");
    stroke("#000");
    strokeWeight(4);
    triangle(width / 2, height / 2 - 150, width / 2 - 18, height / 2 - 105, width / 2 + 18, height / 2 - 105);

    fill("#fff");
    noStroke();
    textSize(12);
    text(this.result, width / 2, height - 85);
  }

  keyPressed(k) {
    if (k === "e" && !this.spinning) {
      this.result = "";
      this.speed = random(0.22, 0.35);
      this.spinning = true;
    }
  }

  pickPrize() {
    let slice = TWO_PI / this.prizes.length;
    let pointerAngle = (TWO_PI - (this.angle % TWO_PI) + HALF_PI) % TWO_PI;
    let index = floor(pointerAngle / slice) % this.prizes.length;
    let prize = this.prizes[index];

    this.points += prize.value;
    totalPoints += prize.value;

    this.result = prize.label === "LOSE" ? "You landed on LOSE!" : "You won " + prize.value + " points!";
  }
}

class CrossyGame {
  constructor() {
    this.points = 0;
    this.lives = 3;
    this.gameOver = false;

    this.chicken = {
      x: width / 2,
      y: height - 80,
      size: 28
    };

    this.cars = [];
    for (let lane = 0; lane < 6; lane++) {
      let y = 190 + lane * 70;
      let speed = lane % 2 === 0 ? 3 + lane * 0.4 : -3 - lane * 0.4;

      for (let i = 0; i < 3; i++) {
        this.cars.push({
          x: i * 430 + random(120),
          y,
          w: 90,
          h: 38,
          speed,
          c: random(["#ff4057", "#22d3ee", "#ffe45c", "#8b5cf6"])
        });
      }
    }
  }

  run() {
    gameHeader("CROSSY ROAD", "WASD move chicken • avoid cars", this.points);

    if (this.gameOver) {
      this.drawGameOver();
      return;
    }

    this.drawRoad();
    this.moveChicken();
    this.moveCars();
    this.drawChicken();

    fill("#fff");
    noStroke();
    textSize(11);
    text("Lives: " + this.lives, width / 2, height - 35);
  }

  drawRoad() {
    noStroke();

    fill("#2c7a3f");
    rect(0, 125, width, 65);
    rect(0, height - 120, width, 120);

    fill("#333344");
    rect(0, 190, width, 420);

    stroke("#ffe45c");
    strokeWeight(3);
    for (let y = 225; y < 610; y += 70) {
      for (let x = 0; x < width; x += 90) {
        line(x, y, x + 45, y);
      }
    }

    noStroke();
    fill("#16e074");
    textSize(10);
    text("SAFE", width / 2, 158);
    text("START", width / 2, height - 65);
  }

  moveChicken() {
    if (frameCount % 8 !== 0) return;

    if (keys["w"]) this.chicken.y -= 35;
    if (keys["s"]) this.chicken.y += 35;
    if (keys["a"]) this.chicken.x -= 35;
    if (keys["d"]) this.chicken.x += 35;

    this.chicken.x = constrain(this.chicken.x, 40, width - 40);
    this.chicken.y = constrain(this.chicken.y, 145, height - 75);

    if (this.chicken.y <= 175) {
      this.points += 10;
      totalPoints += 10;
      this.resetChicken();
      this.speedUpCars();
    }
  }

  moveCars() {
    for (let car of this.cars) {
      car.x += car.speed;

      if (car.speed > 0 && car.x > width + 100) car.x = -120;
      if (car.speed < 0 && car.x < -140) car.x = width + 100;

      fill(car.c);
      stroke("#000");
      strokeWeight(4);
      roundedRect(car.x, car.y, car.w, car.h, 8);

      fill("#111");
      noStroke();
      circle(car.x + 20, car.y + car.h, 13);
      circle(car.x + car.w - 20, car.y + car.h, 13);

      if (
        this.chicken.x + this.chicken.size / 2 > car.x &&
        this.chicken.x - this.chicken.size / 2 < car.x + car.w &&
        this.chicken.y + this.chicken.size / 2 > car.y &&
        this.chicken.y - this.chicken.size / 2 < car.y + car.h
      ) {
        this.lives--;
        this.resetChicken();
        if (this.lives <= 0) this.gameOver = true;
      }
    }
  }

  drawChicken() {
    let x = this.chicken.x;
    let y = this.chicken.y;

    stroke("#000");
    strokeWeight(3);
    fill("#fff7d6");
    ellipse(x, y, 30, 34);

    fill("#fff");
    ellipse(x, y - 18, 24, 22);

    fill("#ff4057");
    triangle(x - 4, y - 31, x + 2, y - 42, x + 8, y - 31);

    fill("#ffe45c");
    triangle(x + 12, y - 18, x + 27, y - 13, x + 12, y - 8);

    fill("#000");
    noStroke();
    circle(x - 5, y - 20, 4);

    stroke("#000");
    strokeWeight(2);
    line(x - 7, y + 18, x - 12, y + 27);
    line(x + 7, y + 18, x + 12, y + 27);
  }

  resetChicken() {
    this.chicken.x = width / 2;
    this.chicken.y = height - 80;
  }

  speedUpCars() {
    for (let car of this.cars) {
      car.speed *= 1.08;
    }
  }

  drawGameOver() {
    fill("#ff4057");
    textSize(22);
    text("ROADKILL!", width / 2, height / 2);

    fill("#fff");
    textSize(10);
    text("Score: " + this.points + " • Press ESC to return", width / 2, height / 2 + 40);
  }
}

function roundedRect(x, y, w, h, r) {
  rect(x, y, w, h, r);
}
function mousePressed() {
  if (scene !== "arcade") return;

  if (dist(mouseX, mouseY, 48, height - 48) < 28) {
    showInfo = !showInfo;
    return;
  }

  if (
    mouseX >= width - 238 &&
    mouseX <= width - 48 &&
    mouseY >= 24 &&
    mouseY <= 60
  ) {
    showCustomizer = !showCustomizer;
  }
}
function drawInfoButton() {
  stroke("#ffffff");
  strokeWeight(3);
  fill("#111827");
  circle(48, height - 48, 44);

  noStroke();
  fill("#ffe45c");
  textAlign(CENTER, CENTER);
  textSize(18);
  text("i", 48, height - 50);
}


