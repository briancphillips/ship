import { game, playAudio } from "../index.js";
import { bullets, BULLETS_MAX, ctx } from "./globals.js";
import Bullet from "./Bullet.js";
import { loadImage } from "./utils.js";
import SpriteSheet from "./SpriteSheet.js";

export default class Ship {
  constructor() {
    this.x = canvas.width / 2 - 16;
    this.y = canvas.height - 64;
    this.vel = 0;
    this.ctx = ctx;

    loadImage("./img/galaga1111.png").then((image) => {
      this.sprites = new SpriteSheet(image);
      this.sprites.define("ship", 6, 0);
      game.start();
    });
  }

  init() {
    for (let i = 0; i < BULLETS_MAX; i++) {
      bullets.push(new Bullet());
    }
    window.bullets = bullets;
  }

  fire() {
    playAudio();
  }
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + 32 > canvas.width) {
      this.x = canvas.width - 32;
    }
    this.sprites.draw("ship", this.ctx, this.x, this.y);
  }

  update(dt) {
    this.x += this.vel * dt;
  }
}
