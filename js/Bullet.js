import { game } from "../index.js";
import { ctx } from "./globals.js";
import { loadImage } from "./utils.js";
import SpriteSheet from "./SpriteSheet.js";
import { ship } from "./../index.js";

export default class Bullet {
  constructor() {
    this.x = ship.x;
    this.y = ship.y - 30;
    this.vel = { x: 0, y: 0 };
    this.ctx = ctx;

    loadImage("./img/galaga1111.png").then((image) => {
      this.sprites = new SpriteSheet(image);
      this.sprites.define("bullet", 1, 22);
    });
  }

  draw() {
    //this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this.y < -200) {
      this.y = ship.y - 30;
      this.vel.y = 0;
    }
    if (this.vel.y === 0) this.x = ship.x;
    this.sprites.draw("bullet", this.ctx, this.x, this.y);
  }

  update(dt) {
    this.x += this.vel.x * dt;
    this.y += this.vel.y * dt;
  }
}
