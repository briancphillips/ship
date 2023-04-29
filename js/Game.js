import { ship, bullet } from "./../index.js";
export default class Game {
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
