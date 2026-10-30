
let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;

function setup() {
  createCanvas(480, 360);
  spawnGhost();
}

function draw() {
  // Background
  background(35, 20, 65);

  // Moon
  fill(255, 230, 180);
  noStroke();
  ellipse(390, 65, 65, 65);

  // Stars
  fill(255, 255, 200);
  ellipse(50, 50, 4, 4);
  ellipse(110, 90, 5, 5);
  ellipse(200, 40, 4, 4);
  ellipse(300, 100, 5, 5);
  ellipse(440, 150, 4, 4);

  // Cherry blossom decorations
  fill(255, 150, 190);
  ellipse(40, 180, 12, 12);
  ellipse(55, 190, 12, 12);
  ellipse(30, 195, 12, 12);
  ellipse(420, 240, 12, 12);
  ellipse(435, 250, 12, 12);

  // Ground
  fill(65, 35, 85);
  rect(0, 320, 480, 40);

  // Start screen
  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255, 190, 220);
    textSize(28);
    text("Sakura Ghost Game", width / 2, 130);

    fill(255);
    textSize(18);
    text("Click to start!", width / 2, 190);
    return;
  }

  // Game over screen
  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255, 180, 220);
    textSize(28);
    text("Game Over!", width / 2, 130);

    fill(255);
    textSize(20);
    text("Score: " + score, width / 2, 180);
    text("Click to play again", width / 2, 220);
    return;
  }

  // Calculate remaining time
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);

  // End game
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }

  // Spawn new ghost
  if (frameCount % spawnEvery === 0) {
    spawnGhost();
  }

  // Draw anime ghost
  drawGhost(ghost.x, ghost.y);

  // Score
  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text("Score: " + score, 12, 10);

  // Timer
  textAlign(RIGHT, TOP);
  text("Time: " + ceil(timeLeft), width - 12, 10);
}

// Mouse interaction
function mousePressed() {

  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }

  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}

// Spawn ghost randomly
function spawnGhost() {
  ghost = {
    x: random(40, width - 40),
    y: random(100, height - 50)
  };
}

// Draw simple anime ghost
function drawGhost(x, y) {

  // Hair
  fill(70, 40, 110);
  ellipse(x, y - 5, 65, 65);

  // Face
  fill(255, 230, 245);
  ellipse(x, y, 55, 55);

  // Hair fringe
  fill(90, 50, 130);
  arc(x, y - 15, 55, 35, PI, TWO_PI);

  // Eyes
  fill(40, 20, 70);
  ellipse(x - 11, y - 2, 7, 12);
  ellipse(x + 11, y - 2, 7, 12);

  // Pink cheeks
  fill(255, 150, 190);
  ellipse(x - 18, y + 10, 9, 5);
  ellipse(x + 18, y + 10, 9, 5);

  // Hair flower
  fill(255, 130, 180);
  ellipse(x + 23, y - 20, 10, 10);
  ellipse(x + 30, y - 15, 10, 10);
  ellipse(x + 23, y - 10, 10, 10);
  ellipse(x + 16, y - 15, 10, 10);

  fill(255, 230, 150);
  ellipse(x + 23, y - 15, 5, 5);
}
