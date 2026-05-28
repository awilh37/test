var gameCanvas = document.getElementById("gameCanvas");
var startButton = document.getElementById("startButton");
var startMenu = document.getElementById("startMenu");

var ctx = gameCanvas.getContext("2d");
var gameState = "running";
var keys = {};

function resizeCanvas() {
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;
  square.y = window.innerHeight / 2 - (squareMap.length / 2) * squarePixelSize;
}

var startTime = 0;
var lastTime = 0;
var frames = 0;
var fps = 0;
var lastFPSCheck = 500;

var squarePixelSize = 50;

var square = {
  x: 0,
  y: window.innerHeight / 2,
  color: "rgb(132, 0, 209)",
  goRight: true,
  speed: 3,
};

var squareMapL = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 0],
  [0, 2, 1, 0, 2, 1, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 2, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

var squareMapR = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 0],
  [0, 1, 2, 0, 1, 2, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 2, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

var squareMap = squareMapR;

square.y = window.innerHeight / 2 - (squareMap.length / 2) * squarePixelSize;

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

startButton.addEventListener("click", function (currentTime) {
  startMenu.classList.add("hidden");
  gameState = "running";
  startTime = currentTime;
  gameloop();
});

window.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});

window.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

function startGL(currentTime) {
  deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  if (currentTime > lastFPSCheck + 500) {
    fps = frames * 2;
    frames = 0;
    lastFPSCheck = currentTime;
  }
}

function endGL() {
  frames++;
}

function moveSquare() {
  if (square.goRight) {
    squareMap = squareMapR;
    square.x += square.speed;
    if (square.x + squareMap[0].length * squarePixelSize > window.innerWidth)
      square.goRight = false;
  } else {
    squareMap = squareMapL;
    square.x -= square.speed;
    if (square.x < 0) square.goRight = true;
  }
}

function drawSquare() {
  for (row = 0; row < squareMap.length; row++) {
    for (col = 0; col < squareMap[row].length; col++) {
      if (squareMap[row][col] === 0) {
        ctx.fillStyle = square.color;
      } else if (squareMap[row][col] === 1) {
        ctx.fillStyle = "white";
      } else if (squareMap[row][col] === 2) {
        ctx.fillStyle = "black";
      }
      ctx.fillRect(
        col * squarePixelSize + square.x,
        row * squarePixelSize + square.y,
        squarePixelSize,
        squarePixelSize,
      );
    }
  }
}

function testDraw() {}

function gameloop(currentTime) {
  if (!gameState === "running") return;
  startGL(currentTime);

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  moveSquare();
  drawSquare();

  endGL();
  requestAnimationFrame(gameloop);
}

gameloop();