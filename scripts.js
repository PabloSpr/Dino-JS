const player = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const suelo = document.getElementById("suelo");
const nube = document.getElementById("nube");
const nube2 = document.getElementById("nube2");
const buttonPlayStop = document.getElementById("buttonPlayStop");
const buttonJump = document.getElementById("jumpButton");
const restart = document.getElementById("restart");
let correr = true;
let score = 0;
let scoreInterval;
let gameLoop;
const gameOverH2 = document.createElement("h1");

function corriendo() {
  if (correr) {
    player.classList.add("dino-corre");
  }
}
corriendo();

scoreInterval = setInterval(() => {
  score++;
  document.getElementById("puntos").innerText = score;
}, 3000);

document.addEventListener("keydown", handelKey);

// saltar al presionar "w"
function handelKey(ev) {
  if (ev.keyCode === 87) {
    correr = false;
    player.classList.remove("dino-corre");
    jump();
  }
}
// saltar haciendo click en botón
buttonJump.addEventListener("click", () => {
  correr = false;
  player.classList.remove("dino-corre");
  jump();
});

function jump() {
  player.classList.add("dino-jump");
}
function removeJump() {
  player.classList.remove("dino-jump");
}

player.addEventListener("animationend", () => {
  removeJump();
  correr = true;
  corriendo();
});

//--------------------------------------------------------------

function pausarJuego() {
  cactus.style.animationPlayState = "paused";
  player.style.animationPlayState = "paused";
  suelo.style.animationPlayState = "paused";
  nube.style.animationPlayState = "paused";
  nube2.style.animationPlayState = "paused";
  clearInterval(scoreInterval);
}

function reanudarJuego() {
  cactus.style.animationPlayState = "running";
  player.style.animationPlayState = "running";
  suelo.style.animationPlayState = "running";
  nube.style.animationPlayState = "running";
  nube2.style.animationPlayState = "running";
  reanudarScore();
}

function reanudarScore() {
  scoreInterval = setInterval(() => {
    score++;
    document.getElementById("puntos").innerText = score;
  }, 3000);
}

buttonPlayStop.addEventListener("click", () => {
  if (buttonPlayStop.classList.contains("play")) {
    buttonPlayStop.innerText = "Pause";
    reanudarJuego();
  } else {
    buttonPlayStop.innerText = "Play";
    pausarJuego();
  }
  buttonPlayStop.classList.toggle("play");
});

//----------------------------------------------------

restart.addEventListener("click", restartGame);

function restartGame() {
  score = 0;
  document.getElementById("puntos").innerText = score;
  removeJump();
  correr = true;
  corriendo();
  clearInterval(scoreInterval);
  resetearAnimaciones();
  if (buttonPlayStop.classList.contains("play")) {
    buttonPlayStop.classList.toggle("play");
    buttonPlayStop.innerText = "Pause";
    reanudarJuego();
  } else {
    reanudarJuego();
  }
  gameLoop = requestAnimationFrame(chocar);
}

function resetearAnimaciones() {
  cactus.classList.remove("cactus-mov");
  void cactus.offsetWidth;
  cactus.classList.add("cactus-mov");
  nube.classList.remove("nube-mov");
  void nube.offsetWidth;
  nube.classList.add("nube-mov");
  nube2.classList.remove("nube-mov2");
  void nube2.offsetWidth;
  nube2.classList.add("nube-mov2");
  cactus.classList.remove("crash");
  document.getElementById("cactus-png").classList.remove("hide");
  document.getElementById("crash-png").classList.add("hide");
  document.getElementById("gameOver").classList.add("hide");
  buttonPlayStop.disabled = false;
}

//------------------------------------------------------

function chocar() {
  if (
    cactus.offsetLeft < player.offsetLeft + 50 &&
    cactus.offsetLeft > player.offsetLeft &&
    player.offsetTop >= cactus.offsetTop - player.offsetHeight
  ) {
    buttonPlayStop.disabled = true;
    gameOver();
  }
  gameLoop = requestAnimationFrame(chocar);
}

function gameOver() {
  document.getElementById("cactus-png").classList.add("hide");
  document.getElementById("crash-png").classList.remove("hide");
  cactus.classList.add("crash");
  pausarJuego();
  cancelAnimationFrame(gameLoop);

  document.getElementById("gameOver").classList.remove("hide");
}

window.addEventListener("load", () => {
  restartGame();
});
