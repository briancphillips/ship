const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

class Ship {
  constructor() {
    this.x = -200;
    this.y = 100;
    this.vel = 2;

    this.accumulator = 0;
    this.step = 1 / 320;

    let lastTime = null;
    this._frameCallback = (millis) => {
      if (lastTime !== null) {
        const diff = millis - lastTime;
        this.update(diff / 1000);
        this.draw();
      }
      lastTime = millis;
      requestAnimationFrame(this._frameCallback);
    };
  }

  start() {
    requestAnimationFrame(this._frameCallback);
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, 100, 50);
  }

  simulate(dt) {
    console.log("Delta", dt);
    if (this.x > canvas.width) {
      this.x = -200;
      this.vel > 6 ? (this.vel -= 1) : (this.vel = 2);
    }

    this.x += this.vel;
  }

  update(dt) {
    console.log("Acc", dt);
    this.accumulator += dt;
    while (this.accumulator > this.step) {
      this.simulate(this.step);
      this.accumulator -= this.step;
    }
  }
}

let ship = new Ship();
ship.start();
// let lastTime = 0;
// let accumulator = 0;
// let step = 1 / 60;
// let deltaTime = 0;

// function simulate(dt) {
//   console.log("DT", dt);
// }

// function update(timestamp) {
//   deltaTime = (timestamp - lastTime) / 1000;
//   simulate(deltaTime);

//   if (lastTime) {
//     accumulator += deltaTime;
//     console.log("Acc", accumulator);
//     while (accumulator > step) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ship.draw();
//       ship.update();
//       accumulator -= step;
//     }
//   }
//   lastTime = timestamp;

//   requestAnimationFrame(update);
// }
//update(0);
