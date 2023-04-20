const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

class Ship {
  constructor() {
    this.x = -200;
    this.y = 100;
    this.vel = 12;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, 100, 50);
  }

  update() {
    if (this.x > canvas.width) {
      this.x = -200;
      this.vel > 6 ? (this.vel -= 1) : (this.vel = 12);
    }

    this.x += this.vel;
  }
}

let ship = new Ship();
let lastTime = 0;
let accumulator = 0;
let step = 1 / 60;
let deltaTime = 0;

function simulate(dt) {
  console.log("DT", dt);
}

function update(timestamp) {
  deltaTime = (timestamp - lastTime) / 1000;
  simulate(deltaTime);

  if (lastTime) {
    accumulator += deltaTime;
    console.log("Acc", accumulator);
    while (accumulator > step) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ship.draw();
      ship.update();
      accumulator -= step;
    }
  }
  lastTime = timestamp;

  requestAnimationFrame(update);
}
update(0);
