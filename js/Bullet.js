import { game } from "../index.js";
import { input } from "./Input.js";
import { bullets, ctx, sprites } from "./globals.js";
import { loadImage } from "./utils.js";
import { ship } from "./../index.js";

export default class Bullet {
  constructor() {
    this.x = ship.x;
    this.y = ship.y - 30;
    this.vel = { x: 0, y: 0 };
    this.ctx = ctx;
    this.free = true;
  }

  draw() {
    if (this.y < -200) {
      this.free = true;
      this.vel.y = 0;
      this.y = ship.y - 30;
    }
    if (!this.vel.y) this.x = ship.x;
    if (this.vel.y) game.sprites.draw("bullet", this.ctx, this.x, this.y);
  }

  update(dt) {
    this.x += this.vel.x * dt;
    this.y += this.vel.y * dt;
  }
}
