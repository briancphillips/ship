import { bullets, BULLETS_MAX, COOL_DOWN_TIME } from "./globals.js";
import { ship } from "./../index.js";
export default class Game {
  constructor() {
    this.accumulator = 0;
    this.step = 1 / 320;

    this.coolDown = false;
    this.coolDownTime = COOL_DOWN_TIME;

    let lastTime = null;
    this._frameCallback = (millis) => {
      if (lastTime !== null) {
        const diff = millis - lastTime;
        this.update(diff / 1000);
        ship.draw();
        bullets.forEach((bullet) => {
          bullet.draw();
        });
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
