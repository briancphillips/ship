const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 240 * 2;
canvas.height = 320 * 2;

const SHIP_SPEED = 300;
const PRESSED = 1;
const RELEASED = 0;

class KeyboardState {
  constructor() {
    // Holds the current state of a given key
    this.keyStates = new Map();

    // Holds the callback functions for a key code
    this.keyMap = new Map();
  }

  addMapping(keyCode, callback) {
    this.keyMap.set(keyCode, callback);
  }

  handleEvent(event) {
    const { keyCode } = event;

    if (!this.keyMap.has(keyCode)) {
      // Did not have key mapped.
      return;
    }

    event.preventDefault();

    const keyState = event.type === "keydown" ? PRESSED : RELEASED;

    if (this.keyStates.get(keyCode) === keyState) {
      return;
    }

    this.keyStates.set(keyCode, keyState);
    //console.log(this.keyStates);

    this.keyMap.get(keyCode)(keyState);
  }

  listenTo(window) {
    ["keydown", "keyup"].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        this.handleEvent(event);
      });
    });
  }
}

const input = new KeyboardState();
class SpriteSheet {
  constructor(image, w = 32, h = 32) {
    this.image = image;
    this.width = w;
    this.height = h;
    this.tiles = new Map();
  }

  define(name, x, y) {
    const buffer = document.createElement("canvas");
    buffer.height = this.height;
    buffer.width = this.width;
    let bufferCtx = buffer.getContext("2d");

    bufferCtx.drawImage(
      this.image,
      this.width * x,
      this.height * y,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height
    );
    this.tiles.set(name, buffer);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    //context.save();
    //context.scale(2, 2);
    context.drawImage(buffer, x, y);
    //context.restore();
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}

class Ship {
  constructor() {
    this.x = canvas.width / 2 - 16;
    this.y = canvas.height - 64;
    this.vel = 0;

    loadImage("./img/galaga2.png").then((image) => {
      sprites = new SpriteSheet(image);
      sprites.define("ship", 6, 0);
      game.start();
    });
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = "blue";
    //ctx.fillRect(this.x, this.y, 100, 50);
    sprites.draw("ship", ctx, this.x, this.y);
  }

  update(dt) {
    //console.log("Delta", dt);
    if (this.x + 32 > canvas.width) {
      this.x = canvas.width - 32;
      this.vel = 0;
      //this.vel > 6 ? (this.vel -= 1) : (this.vel = 1);
    }

    if (this.x < 0) {
      this.x = 0;
      this.vel = 0;
      //this.x = canvas.width;
      //this.vel > 6 ? (this.vel -= 1) : (this.vel = 1);
    }

    this.x += this.vel * dt;
  }
}

class Game {
  constructor() {
    this.accumulator = 0;
    this.step = 1 / 320;

    let lastTime = null;
    this._frameCallback = (millis) => {
      if (lastTime !== null) {
        const diff = millis - lastTime;
        this.update(diff / 1000);
        ship.draw();
      }
      lastTime = millis;
      requestAnimationFrame(this._frameCallback);
    };
  }

  start() {
    requestAnimationFrame(this._frameCallback);
  }

  update(dt) {
    //console.log("Acc", dt);
    this.accumulator += dt;
    while (this.accumulator > this.step) {
      ship.update(this.step);
      this.accumulator -= this.step;
    }
  }
}
let sprites;
let ship = new Ship();
let game = new Game();

input.addMapping(37, (keyState) => {
  if (keyState) {
    ship.vel += -SHIP_SPEED;
  } else {
    ship.vel = 0;
  }
});

input.addMapping(39, (keyState) => {
  if (keyState) {
    ship.vel += SHIP_SPEED;
  } else {
    ship.vel = 0;
  }
});

input.listenTo(window);

// window.addEventListener("keydown", (e) => {
//   if (e.key == "ArrowLeft") {
//     ship.vel = -SHIP_SPEED;
//   }
//   if (e.key == "ArrowRight") {
//     ship.vel = SHIP_SPEED;
//   }
// });

// window.addEventListener("keyup", (e) => {
//   if (e.key == "ArrowLeft") {
//     ship.vel = 0;
//   }
//   if (e.key == "ArrowRight") {
//     ship.vel = 0;
//   }
// });

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
