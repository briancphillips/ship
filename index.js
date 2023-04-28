import { loadImage } from "./js/utils.js";
import Keyboard from "./js/KeyboardState.js";
import SpriteSheet from "./js/SpriteSheet.js";

import Ship from "./js/Ship.js";
//import Game from "./js/Game.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 224 * 2;
canvas.height = 288 * 2;
let sprites;
const SHIP_SPEED = 300;
const BULLET_SPEED = -1800;
const input = new Keyboard();

class Bullet {
  constructor(game, ctx) {
    this.x = ship.x;
    this.y = ship.y - 30;
    this.vel = { x: 0, y: 0 };
    this.ctx = ctx;

    loadImage("./img/galaga1111.png").then((image) => {
      sprites = new SpriteSheet(image);
      sprites.define("bullet", 1, 22);
    });
  }

  draw() {
    //this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this.y < -200) {
      this.y = ship.y - 30;
      this.vel.y = 0;
    }
    if (this.vel.y === 0) this.x = ship.x;
    sprites.draw("bullet", this.ctx, this.x, this.y);
  }

  update(dt) {
    this.x += this.vel.x * dt;
    this.y += this.vel.y * dt;
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
        bullet.draw();
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
      bullet.update(this.step);
      this.accumulator -= this.step;
    }
  }
}

let game = new Game();
let ship = new Ship(game, ctx);
let bullet = new Bullet(game, ctx);

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

input.addMapping(32, (keyState) => {
  if (keyState) {
    bullet.vel.y = BULLET_SPEED;
  }
});

input.listenTo(window);
