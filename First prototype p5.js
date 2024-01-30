let rows, cols;
let grid;
let cellSize = 20;
let rooms = [];

function setup() {
  createCanvas(600, 600);
  rows = floor(height / cellSize);
  cols = floor(width / cellSize);
  generateDungeon();
}

function draw() {
  background(255);
  drawDungeon();
}

function generateDungeon() {
  grid = createEmptyGrid(rows, cols);

  // Create random rooms
  for (let i = 0; i < 8; i++) {
    let roomWidth = floor(random(3, 8));
    let roomHeight = floor(random(3, 8));
    let x = floor(random(cols - roomWidth));
    let y = floor(random(rows - roomHeight));
    createRoom(x, y, roomWidth, roomHeight);
  }

  // Connect rooms with corridors
  for (let i = 0; i < rooms.length - 1; i++) {
    let start = createVector(rooms[i].x + floor(rooms[i].w / 2), rooms[i].y + floor(rooms[i].h / 2));
    let end = createVector(rooms[i + 1].x + floor(rooms[i + 1].w / 2), rooms[i + 1].y + floor(rooms[i + 1].h / 2));
    createCorridor(start, end);
  }
}

function createRoom(x, y, w, h) {
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      grid[j][i] = 1;
    }
  }
  rooms.push({ x, y, w, h });
}

function createCorridor(start, end) {
  let current = createVector(start.x, start.y);

  while (current.x !== end.x || current.y !== end.y) {
    let moveX = end.x > current.x ? 1 : (end.x < current.x ? -1 : 0);
    let moveY = end.y > current.y ? 1 : (end.y < current.y ? -1 : 0);

    if (random(1) < 0.5) {
      current.x += moveX;
    } else {
      current.y += moveY;
    }

    grid[current.y][current.x] = 1;
  }
}

function createEmptyGrid(rows, cols) {
  let emptyGrid = [];
  for (let i = 0; i < rows; i++) {
    emptyGrid[i] = Array(cols).fill(0);
  }
  return emptyGrid;
}

function drawDungeon() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        fill(0);
        noStroke();
        rect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }
}
