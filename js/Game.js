import SpriteSheet from "./SpriteSheet.js";
import { bullets, BULLETS_MAX, COOL_DOWN_TIME, sprites } from "./globals.js";
import { ship } from "./../index.js";
import { loadImage } from "./utils.js";
export default class Game {
  constructor() {
    this.accumulator = 0;
    this.step = 1 / 320;

    this.coolDown = false;
    this.coolDownTime = COOL_DOWN_TIME;

    loadImage("./img/galaga1111.png").then((image) => {
      this.sprites = new SpriteSheet(image);
      this.sprites.define("bullet", 1, 22);
    });

    let lastTime = null;
    this._frameCallback = (millis) => {
      if (lastTime !== null) {
        const diff = millis - lastTime;
        this.update(diff / 1000);
        ship.draw();

        for (let i = bullets.length - 1; i >= 0; i--) {
          bullets[i].draw(i);
        }
      }
      lastTime = millis;
      requestAnimationFrame(this._frameCallback);
    };
  }

  start() {
    ship.init();
    requestAnimationFrame(this._frameCallback);
  }

  update(dt) {
    //console.log("Acc", dt);
    this.accumulator += dt;
    while (this.accumulator > this.step) {
      ship.update(this.step);
      bullets.forEach((bullet) => {
        bullet.update(this.step);
      });
      this.accumulator -= this.step;
    }
  }
}
