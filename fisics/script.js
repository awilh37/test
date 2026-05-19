var gameCanvas = document.getElementById("gameCanvas");
var startButton = document.getElementById("startButton");
var startMenu = document.getElementById("startMenu");

var ctx = gameCanvas.getContext("2d");
var gameState = "menu";
var keys = {};

function resizeCanvas() {
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;
}

var startTime = 0;
var lastTime = 0;
var frames = 0;
var fps = 0;
var lastFPSCheck = 500;

var gridSize = 50;

var map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var player = {
  x: 1.5,
  y: 1,
  height: 1.5,
  width: 0.7,
  color: "rgb(137, 0, 0)",
  gravity: 0.01,
  velY: 0,
  ground: false,
  jumpPower: 0.15,
  speedX: 0.1,
};

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

function drawMap() {
  for (row = 0; row < map.length; row++) {
    for (col = 0; col < map[row].length; col++) {
      if (map[row][col] === 1) {
        ctx.fillStyle = "rgb(85, 85, 85)";
      } else if (map[row][col] === 0) {
        ctx.fillStyle = "rgb(54, 141, 0)";
      } else ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(
    player.x * gridSize,
    player.y * gridSize,
    player.width * gridSize,
    player.height * gridSize,
  );
}

function fisics() {
  if (keys["w"] && player.ground && player.velY === 0) {
    player.velY -= player.jumpPower;
  }
  if (player.velY < 0) {
    if (
      map[Math.floor(player.y + player.velY - 1 / gridSize)][
        Math.floor(player.x)
      ] === 1 ||
      map[Math.floor(player.y + player.velY - 1 / gridSize)][
        Math.floor(player.width + player.x - 1 / gridSize)
      ] === 1
    ) {
      player.velY = player.gravity;
      player.y = Math.floor(player.y + player.velY);
    }
  }
  if (
    map[Math.floor(player.y + player.height)][Math.floor(player.x)] === 1 ||
    map[Math.floor(player.y + player.height)][
      Math.floor(player.x + player.width - 1 / gridSize)
    ] === 1
  ) {
    if (
      map[Math.floor(player.y + player.height + player.velY)][
        Math.floor(player.x)
      ] === 1 ||
      map[Math.floor(player.y + player.height + player.velY)][
        Math.floor(player.x + player.width - 1 / gridSize)
      ] === 1
    ) {
      player.y = Math.floor(player.y + player.height) - player.height;
      player.velY = 0;
      player.ground = true;
    } else {
      player.y += player.velY;
      player.velY += player.gravity;
      player.ground = false;
    }
  } else {
    player.y += player.velY;
    player.velY += player.gravity;
    player.ground = false;
  }
  floorCheck();
}

function floorCheck() {
  if (
    map[Math.floor(player.y + player.height - 1 / gridSize)][
      Math.floor(player.x)
    ] === 1 ||
    map[Math.floor(player.y + player.height - 1 / gridSize)][
      Math.floor(player.x + player.width - 1 / gridSize)
    ] === 1
  ) {
    player.y = Math.floor(player.y + player.height) - player.height;
  }
}

function moveX() {
  if (keys["a"] && !keys["d"]) {
    if (map[Math.floor(player.y)][Math.floor(player.x - 1 / gridSize)] === 1) {
      player.x = Math.floor(player.x + 1 / gridSize);
    } else if (map[Math.floor(player.y)][player.x - player.speedX] === 1) {
      player.x = Math.floor(player.x - player.speedX + 1);
    } else {
      player.x -= player.speedX;
    }
  }
  if (keys["d"] && !keys["a"]) {
    if (map[Math.floor(player.y)][Math.floor(player.width + player.x)] === 1) {
      player.x = Math.floor(player.x) + 1 - player.width;
    } else if (
      map[Math.floor(player.y)][
        player.width + player.x + player.speedX - 1 / gridSize
      ] === 1
    ) {
      player.x = Math.floor(
        player.x + player.speedX - 1 - player.width + 1 / gridSize,
      );
    } else {
      player.x += player.speedX;
    }
  }
}

function gameloop(currentTime) {
  if (!gameState === "running") return;
  startGL(currentTime);
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  fisics();
  moveX();
  drawMap();
  drawPlayer();

  ctx.fillStyle = "white";
  ctx.fillText("fps: " + fps, map.length * gridSize + 10, 10);

  endGL();
  requestAnimationFrame(gameloop);
}
