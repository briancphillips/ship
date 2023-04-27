import Keyboard from "./js/KeyboardState.js";
import SpriteSheet from "./js/SpriteSheet.js";

import Ship from "./js/Ship.js";
//import Game from "./js/Game.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 224 * 2;
canvas.height = 288 * 2;

const SHIP_SPEED = 300;
const input = new Keyboard();

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

let game = new Game();
let ship = new Ship(game, ctx);

input.addMapping(37, (keyState) => {
  if (keyState) {
    ship.vel -= SHIP_SPEED;
  } else {
    ship.vel += SHIP_SPEED;
  }
});

input.addMapping(39, (keyState) => {
  if (keyState) {
    ship.vel += SHIP_SPEED;
  } else {
    ship.vel -= SHIP_SPEED;
  }
});

input.listenTo(window);
