const player = document.getElementById("dino");

document.addEventListener("keydown", handelKey);

function handelKey(ev) {
  if (ev.keyCode === 32) {
    jump();
  }
}

function jump() {
  player.classList.add("dino-jump");
}

player.addEventListener("animationend", () => {
  player.classList.remove("dino-jump");
});
