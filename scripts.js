const player = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const suelo = document.getElementById("suelo");
const buttonPlayStop = document.getElementById("buttonPlayStop");
const buttonJump = document.getElementById("pressW");
const restart = document.getElementById("restart");
let correr = true;
let score = 0;
let scoreInterval;

function corriendo() {
  if (correr) {
    player.classList.add("dino-corre");
  }
}
corriendo();

document.addEventListener("keydown", handelKey);

function handelKey(ev) {
  if (ev.keyCode === 87) {
    correr = false;
    player.classList.remove("dino-corre");
    jump();
  }
}

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

function pausarJuego() {
  cactus.style.animationPlayState = "paused";
  player.style.animationPlayState = "paused";
  suelo.style.animationPlayState = "paused";
  clearInterval(scoreInterval);
}

function reanudarJuego() {
  cactus.style.animationPlayState = "running";
  player.style.animationPlayState = "running";
  suelo.style.animationPlayState = "running";
  scoreInterval = setInterval(() => {
    score++;
    document.getElementById("puntos").innerText = score;
  }, 3000);
}

scoreInterval = setInterval(() => {
  score++;
  document.getElementById("puntos").innerText = score;
}, 3000);

buttonPlayStop.addEventListener("click", () => {
  if (buttonPlayStop.classList.contains("play")) {
    reanudarJuego();
  } else {
    pausarJuego();
  }
  buttonPlayStop.classList.toggle("play");
});

restart.addEventListener("click", restartGame);

function restartGame() {
  score = 0;
  document.getElementById("puntos").innerText = score;
  removeJump();
  correr = true;
  corriendo();
  clearInterval(scoreInterval);
  cactus.classList.remove("cactus-mov");
  void cactus.offsetWidth;
  cactus.classList.add("cactus-mov");
  buttonPlayStop.classList.toggle("play");
  pausarJuego();
  reanudarJuego();
}
