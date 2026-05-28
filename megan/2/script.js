var gameCanvas = document.getElementById("gameCanvas");
var startButton = document.getElementById("startButton");
var startMenu = document.getElementById("startMenu");

var ctx = gameCanvas.getContext("2d");
var gameState = "running";
var keys = {};

function resizeCanvas() {
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;
  square.y = window.innerHeight - squareMap.length * squarePixelSize;
}

var startTime = 0;
var lastTime = 0;
var frames = 0;
var fps = 0;
var lastFPSCheck = 500;

var squarePixelSize = 10;
var bgPixelSize = 50;

var square = {
  x: 0,
  y: window.innerHeight,
  color: "rgb(132, 0, 209)",
  goRight: true,
  speed: 1,
  stepNum: 0,
  velY: 0,
  gravity: 0.4,
  jumpPower: 10,
};

var backgroundMap = [
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

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

    if (square.velY != 0) {
      if (square.velY < 0) {
        square.y += square.velY;
        square.velY += square.gravity;
      } else {
        if (
          square.y + squareMap.length * squarePixelSize + square.velY >=
          window.innerHeight - square.stepNum * bgPixelSize
        ) {
          square.velY = 0;
          square.y =
            window.innerHeight -
            squareMap.length * squarePixelSize -
            square.stepNum * bgPixelSize;
        } else {
          square.y += square.velY;
          square.velY += square.gravity;
        }
      }
    } else if (
      square.y + squareMap.length * squarePixelSize + square.velY >=
      window.innerHeight - square.stepNum * bgPixelSize
    ) {
      square.y =
        window.innerHeight -
        squareMap.length * squarePixelSize -
        square.stepNum * bgPixelSize;
    } else {
      square.y += square.velY;
      square.velY += square.gravity;
    }
    if (
      square.stepNum === 0 &&
      square.x + squareMap[0].length * squarePixelSize >=
        window.innerWidth / 2 - (backgroundMap[0].length / 2) * bgPixelSize
    ) {
      square.stepNum++;
      square.velY -= square.jumpPower;
    } else {
      if (
        square.velY === 0 &&
        (square.x + square.speed) * squarePixelSize >=
          window.innerWidth / 2 - square.stepNum * bgPixelSize &&
        square.stepNum != 0 &&
        square.x < window.innerWidth / 2
      ) {
        square.stepNum++;
        square.velY -= square.jumpPower;
      } else if (square.x > window.innerWidth / 2) {
        
      }
    }
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

function drawBg() {
  for (row = 0; row < backgroundMap.length; row++) {
    for (col = 0; col < backgroundMap[row].length; col++) {
      if (backgroundMap[row][col] === 0) {
        ctx.fillStyle = "black";
      } else if (backgroundMap[row][col] === 1) {
        ctx.fillStyle = "rgb(201, 159, 53)";
      }
      ctx.fillRect(
        window.innerWidth / 2 -
          (backgroundMap[0].length / 2) * bgPixelSize +
          col * bgPixelSize,
        window.innerHeight -
          backgroundMap.length * bgPixelSize +
          row * bgPixelSize,
        bgPixelSize,
        bgPixelSize,
      );
    }
  }
}

function gameloop(currentTime) {
  if (!gameState === "running") return;
  startGL(currentTime);

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  moveSquare();
  drawBg();
  drawSquare();

  endGL();
  requestAnimationFrame(gameloop);
}

gameloop();
