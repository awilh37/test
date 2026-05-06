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

var buttonHeight = 80;
var buttonWidth = 240;
var selected = 0;

var buttons = [
  { x: 10, y: 10, text: "Num 1" },
  { x: 10, y: 100, text: "Num 2" },
  { x: 10, y: 190, text: "Num 3" },
  { x: 10, y: 280, text: "Num 4" },
];

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

startButton.addEventListener("click", function (currentTime) {
  startMenu.classList.add("hidden");
  gameState = "running";
  startTime = currentTime;
  gameloop();
});

window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowDown" && !keys["j"]) {
    if (selected === buttons.length - 1) {
      selected = 0;
    } else {
      selected++;
    }
  }
  if (event.key === "ArrowUp" && !keys["j"]) {
    if (selected === 0) {
      selected = buttons.length - 1;
    } else {
      selected--;
    }
  }
  keys[event.key] = true;
});

window.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

function startGL(currentTime) {
  frames += 0.5;
  deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  if (currentTime > lastFPSCheck + 500) {
    fps = frames * 2;
    frames = 0;
    lastFPSCheck = currentTime;
  }
}

function endGL() {
  frames += 0.5;
}

function gameloop(currentTime) {
  if (!gameState === "running") return;
  startGL(currentTime);

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  for (i = 0; i < buttons.length; i++) {
    if (keys["j"] && selected === i) {
      ctx.fillStyle = "grey";
    } else if (selected === i) {
      ctx.fillStyle = "yellow";
    } else {
      ctx.fillStyle = "white";
    }
    ctx.fillRect(buttons[i].x, buttons[i].y, buttonWidth, buttonHeight);
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText(
      buttons[i].text,
      buttons[i].x,
      buttons[i].y + buttonHeight / 2,
      buttonWidth,
    );
  }

  endGL();
  requestAnimationFrame(gameloop);
}
