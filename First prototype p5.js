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
  
  // Create T spawn room
  let tSpawnWidth = floor(random(3, 8));
  let tSpawnHeight = floor(random(3, 8));
  let tSpawnX = floor((cols - tSpawnWidth) / 2);
  let tSpawnY = 0;
  createRoom(tSpawnX, tSpawnY, tSpawnWidth, tSpawnHeight);
  
  // Create CT spawn room
  let ctSpawnWidth = floor(random(3, 8));
  let ctSpawnHeight = floor(random(3, 8));
  let ctSpawnX = floor((cols - ctSpawnWidth) / 2);
  let ctSpawnY = rows - ctSpawnHeight;
  createRoom(ctSpawnX, ctSpawnY, ctSpawnWidth, ctSpawnHeight);

  // Create A bombsite
  let bombsiteAWidth = floor(random(3, 8));
  let bombsiteAHeight = floor(random(3, 8));
  let bombsiteAX = 0;
  let bombsiteAY = floor((rows - bombsiteAHeight) / 2);
  createRoom(bombsiteAX, bombsiteAY, bombsiteAWidth, bombsiteAHeight);
  
  // Create B bombsite
  let bombsiteBWidth = floor(random(3, 8));
  let bombsiteBHeight = floor(random(3, 8));
  let bombsiteBX = cols - bombsiteBWidth;
  let bombsiteBY = floor((rows - bombsiteBHeight) / 2);
  createRoom(bombsiteBX, bombsiteBY, bombsiteBWidth, bombsiteBHeight);
  
  // Create random rooms
  for (let i = 0; i < 4; i++) {
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
