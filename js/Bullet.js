import { game } from "../index.js";
import { input } from "./Input.js";
import { bullets, ctx, COOL_DOWN_TIME, sprites } from "./globals.js";
import { loadImage } from "./utils.js";
import SpriteSheet from "./SpriteSheet.js";
import { ship } from "./../index.js";

export default class Bullet {
  constructor() {
    this.x = ship.x;
    this.y = ship.y - 30;
    this.vel = { x: 0, y: 0 };
    this.ctx = ctx;
  }

  draw(i) {
    //this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (bullets[i].y < -200) {
      bullets.splice(bullets[i], 1);
      //console.log("Bullets Left", bullets.length);
      return;
    }
    if (!bullets[i].vel.y) bullets[i].x = ship.x;
    if (bullets[i].vel.y)
      game.sprites.draw("bullet", bullets[i].ctx, bullets[i].x, bullets[i].y);

    //console.log(this.vel.y);
  }

  update(dt) {
    this.x += this.vel.x * dt;
    this.y += this.vel.y * dt;

    // if (game.coolDown) {
    //   game.coolDownTime -= dt;
    //   //console.log(game.coolDownTime);
    //   if (game.coolDownTime <= 0) {
    //     game.coolDown = false;
    //     game.coolDownTime = COOL_DOWN_TIME;
    //   }
    // }
    //console.log("CD", game.coolDown, "CDT", game.coolDownTime);
  }
}
