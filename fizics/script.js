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
  //[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  //[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //[1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  //[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
  x: 2,
  y: 1,
  xPix: gridSize,
  yPix: gridSize,
  height: .7,
  width: 1.5,
  heightPix: gridSize,
  widthPix: gridSize,
  color: "rgb(137, 0, 0)",
  velY: 0,
  velYPix: gridSize,
  gravity: 0.005,
  jumpPower: -0.15,
  jumpPowerPix: gridSize,
  speedX: 0.1,
};

player.xPix *= player.x;
player.yPix *= player.y;
player.heightPix *= player.height;
player.widthPix *= player.width;
player.velYPix *= player.velY;
player.jumpPowerPix *= player.jumpPower;

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

startButton.addEventListener("click", function (currentTime) {
  startMenu.classList.add("hidden");
  gameState = "running";
  requestAnimationFrame(gameloop);
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
  syncPix();
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
  ctx.fillRect(player.xPix, player.yPix, player.widthPix, player.heightPix);
}

function syncPix() {
  player.xPix = player.x * gridSize;
  player.yPix = player.y * gridSize;
  player.heightPix = player.height * gridSize;
  player.widthPix = player.width * gridSize;
  player.velYPix = player.velY * gridSize;
  player.jumpPowerPix = player.jumpPower * gridSize;
}

function isGround() {
  for (i = 0; i < player.widthPix; i++) {
    if (
      map[Math.floor((player.yPix + player.heightPix - 1) / gridSize)][
        Math.floor((player.xPix + i) / gridSize)
      ] === 1
    ) {
      return "in";
    } else if (
      map[Math.floor((player.yPix + player.heightPix) / gridSize)][
        Math.floor((player.xPix + i) / gridSize)
      ] === 1
    ) {
      return "on";
    } else if (
      map[Math.floor(player.y + player.height + player.velY)][
        Math.floor((player.xPix + i) / gridSize)
      ] === 1
    ) {
      return "vel";
    }
  }
  return "no";
}

function gravity() {
  if (player.velY >= 0) {
    if (isGround() === "on") {
      player.velY = 0;
      player.y = Math.floor(player.y + player.height) - player.height;
    } else if (isGround() === "vel") {
      player.y =
        Math.floor(player.y + player.velY + player.height) - player.height;
      player.velY = 0;
    } else if (isGround() === "no") {
      player.y += player.velY;
      player.velY += player.gravity;
    } else if (isGround() === "in") {
      player.y = Math.floor(player.y + player.height) - 1 - player.height;
      player.velY = 0;
    }
  } else {
    if (isCeiling() === "on") {
      player.y += 1.1 / gridSize;
      player.velY = 0;
    } else if (isCeiling() === "vel") {
      player.y = Math.floor(player.y + player.velY);
      syncPix();
      if (isCeiling() === "in") {
        player.y -= 1
        syncPix();
      }
      player.velY = 0;
    } else if (isCeiling() === "no") {
      player.y += player.velY;
      player.velY += player.gravity;
    } else if (isCeiling() === "in") {
      player.y = Math.floor(player.y) + 1.01;
      player.velY = 0;
    }
  }
  syncPix();
  if (isCeiling() === "in") {
    player.y = Math.floor(player.y) + 1;
    player.velY = 0;
  }
  if (isGround() === "in") {
    player.y = Math.floor(player.y + player.height) - 1 - player.height;
    player.velY = 0;
  }
  syncPix();
}

function isCeiling() {
  for (i = 0; i < player.widthPix; i++) {
    if (
      map[Math.floor(player.yPix / gridSize)][
        Math.floor((player.xPix + i) / gridSize)
      ] === 1
    ) {
      return "in";
    } else if (
      map[Math.floor((player.yPix - 1) / gridSize)][
        Math.floor((player.xPix + i) / gridSize)
      ] === 1
    ) {
      return "on";
    } else if (
      map[Math.floor((player.yPix - 1 + player.velYPix) / gridSize)][
        Math.floor((player.xPix + i) / gridSize)
      ] === 1
    ) {
      return "vel";
    }
  }
  return "no";
}

function jump() {
  if (
    keys["w"] &&
    isGround() === "on" &&
    player.velY === 0 &&
    isCeiling() === "no"
  ) {
    player.velY = player.jumpPower;
  }
}

function isWallL() {
  for (i = 0; i < player.heightPix; i++) {
    if (
      map[Math.floor((player.yPix + i) / gridSize)][
        Math.floor(player.xPix / gridSize)
      ] === 1
    ) {
      return "in";
    } else if (
      map[Math.floor((player.yPix + i) / gridSize)][
        Math.floor((player.xPix - 1) / gridSize)
      ] === 1
    ) {
      return "on";
    } else if (
      map[Math.floor((player.yPix + i) / gridSize)][
        Math.floor((player.xPix - 1 - player.speedX) / gridSize)
      ] === 1
    ) {
      return "vel";
    }
  }
  return "no";
}

function isWallR() {
  for (i = 0; i < player.heightPix; i++) {
    if (
      map[Math.floor((player.yPix + i) / gridSize)][
        Math.floor((player.xPix + player.widthPix - 1) / gridSize)
      ] === 1
    ) {
      return "in";
    } else if (
      map[Math.floor((player.yPix + i) / gridSize)][
        Math.floor((player.xPix + player.widthPix) / gridSize)
      ] === 1
    ) {
      return "on";
    } else if (
      map[Math.floor((player.yPix + i) / gridSize)][
        Math.floor((player.xPix + player.widthPix + player.speedX) / gridSize)
      ] === 1
    ) {
      return "vel";
    }
  }
  return "no";
}

function outWall() {
  if (isWallL() === "in") {
    while (isWallL() === "in") {
      syncPix();
      player.x = Math.floor(player.xPix / gridSize) + 1;
      syncPix();
    }
  }
  if (isWallR() === "in") {
    while (isWallR() === "in") {
      syncPix();
      player.x = Math.floor(player.xPix / gridSize) - player.width;
      syncPix();
    }
  }
}

function moveX() {
  outWall();
  if (keys["a"] && !keys["d"]) {
    if (isWallL() === "no") {
      player.x -= player.speedX;
      syncPix();
      outWall();
    } else if (isWallL() === "vel") {
      player.x = Math.floor(player.xPix / gridSize);
      syncPix();
      outWall();
    }
  }
  if (keys["d"] && !keys["a"]) {
    if (isWallR() === "no") {
      player.x += player.speedX;
      syncPix();
      outWall();
    } else if (isWallR() === "vel") {
      player.x =
        Math.floor(player.xPix / gridSize) +
        Math.floor(player.width) +
        1 -
        player.width;
      syncPix();
      outWall();
    }
  }
}

function gameloop(currentTime) {
  if (gameState != "running") return;
  startGL(currentTime);

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  moveX();
  jump();
  gravity();
  drawMap();
  drawPlayer();

  ctx.fillStyle = "white";
  ctx.fillText("fps: " + fps, map[0].length * gridSize + 10, 10);
  ctx.fillText("isGround: " + isGround(), map[0].length * gridSize + 10, 20);
  ctx.fillText("isCeiling: " + isCeiling(), map[0].length * gridSize + 10, 30);
  ctx.fillText("isWallL: " + isWallL(), map[0].length * gridSize + 10, 40);
  ctx.fillText("isWallR: " + isWallR(), map[0].length * gridSize + 10, 50);
  ctx.fillText(
    "player.velY: " + player.velY,
    map[0].length * gridSize + 10,
    60,
  );
  ctx.fillText("player.y: " + player.y, map[0].length * gridSize + 10, 70);
  ctx.fillText(
    "player.height: " + player.height,
    map[0].length * gridSize + 10,
    80,
  );

  endGL();
  requestAnimationFrame(gameloop);
}
