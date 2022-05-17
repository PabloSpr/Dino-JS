const player = document.getElementById("dino");
let correr = true;

function corriendo() {
  if (correr) {
    player.classList.add("dino-corre");
  }
}
corriendo();

document.addEventListener("keydown", handelKey);

function handelKey(ev) {
  if (ev.keyCode === 32) {
    correr = false;
    player.classList.remove("dino-corre");
    jump();
  }
}

function jump() {
  player.classList.add("dino-jump");
}

player.addEventListener("animationend", () => {
  player.classList.remove("dino-jump");
  correr = true;
  corriendo();
});
