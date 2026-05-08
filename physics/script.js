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

var map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
var gridSize = 50;
var player = {
  x: 105,
  y: 55,
  width: 40,
  height: 80,
  color: "rgb(144, 0, 0)",
  velY: 0,
  speedX: 5,
  grounded: false,
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
  if (event.key === "w" && player.grounded) {
    player.velY -= 10;
  }
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
        ctx.fillStyle = "rgb(68, 68, 68)";
      } else if (map[row][col] === 0) {
        ctx.fillStyle = "rgb(0, 128, 0)";
      }
      ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function physics() {
  if (!player.grounded || player.velY < 0) {
    player.grounded = false;
    player.velY += 0.5;
    // check if the ground is there
    if (
      map[Math.floor((player.height + player.y) / gridSize)][
        Math.floor(player.x / gridSize)
      ] === 1 ||
      map[Math.floor((player.height + player.y) / gridSize)][
        Math.floor((player.width + player.x) / gridSize)
      ] === 1
    ) {
      if (player.velY > 0) {
        player.y = Math.floor((player.height + player.y) / gridSize) * gridSize;
        player.y -= player.height;
        player.velY = 0;
        player.grounded = true;
      } else {
        player.y += player.velY;
      }
    } else if (
      (map[Math.floor(player.y / gridSize) - 1][
        Math.floor(player.x / gridSize)
      ] === 1 ||
        map[Math.floor(player.y / gridSize) - 1][
          Math.floor((player.width + player.x) / gridSize)
        ] === 1) &&
      player.velY < 0
    ) {
      player.y = Math.floor(player.y / gridSize) * gridSize;
      player.velY = 0;
      player.grounded = false;
    } else {
      player.y += player.velY;
      player.grounded = false;
    }
  }
}

function moveX() {
  if (keys["a"]) {
    if (!wallLeft()) {
      player.x -= player.speedX;
      if (
        map[Math.floor(player.y / gridSize)][
          Math.floor(player.x / gridSize)
        ] === 1
      ) {
        player.x = (Math.floor(player.x / gridSize) + 1) * gridSize;
      }
    } else {
      if (
        map[Math.floor(player.y / gridSize)][
          Math.floor((player.x - player.speedX) / gridSize)
        ] === 1
      ) {
        player.x = (Math.floor(player.x / gridSize) + 1) * gridSize;
      } else {
        player.x -= player.speedX;
      }
    }
  } else if (keys["d"]) {
    if (!wallRight()) {
      player.x += player.speedX;
      if (
        map[Math.floor(player.y / gridSize)][
          Math.floor((player.x + player.width - 1) / gridSize)
        ] === 1
      ) {
        player.x =
          (Math.floor((player.x + player.width - 1) / gridSize) + 1) * gridSize;
      }
    } else {
      if (
        map[Math.floor(player.y / gridSize)][
          Math.floor((player.x + player.width - 1 + player.speedX) / gridSize)
        ] === 1
      ) {
        player.x =
          Math.floor((player.x + player.width - 1) / gridSize) * gridSize;
        player.x += gridSize - player.width;
      } else {
        player.x += player.speedX;
      }
    }
  }
}

function wallLeft() {
  if (
    map[Math.floor(player.y / gridSize)][Math.floor(player.x / gridSize)] === 1
  ) {
    return true;
  } else {
    return false;
  }
}

function wallRight() {
  if (
    map[Math.floor(player.y / gridSize)][
      Math.floor((player.width + player.x) / gridSize)
    ] === 1
  ) {
    return true;
  } else {
    return false;
  }
}

function checkGround() {
  if (
    map[Math.floor((player.height + player.y) / gridSize)][
      Math.floor(player.x / gridSize)
    ] != 1 ||
    map[Math.floor((player.height + player.y) / gridSize)][
      Math.floor((player.width + player.x) / gridSize)
    ] != 1
  ) {
    player.grounded = false;
  }
}

function gameloop(currentTime) {
  if (!gameState === "running") return;
  startGL(currentTime);

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  moveX();
  checkGround();
  physics();
  drawMap();
  drawPlayer();

  endGL();
  requestAnimationFrame(gameloop);
}
