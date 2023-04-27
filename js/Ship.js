import { loadImage } from "./utils.js";
import SpriteSheet from "./SpriteSheet.js";
let sprites;

export default class Ship {
  constructor(game, ctx) {
    this.x = canvas.width / 2 - 16;
    this.y = canvas.height - 64;
    this.vel = 0;
    this.ctx = ctx;

    loadImage("./img/galaga2.png").then((image) => {
      sprites = new SpriteSheet(image);
      sprites.define("ship", 6, 0);
      game.start();
    });
  }
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + 32 > canvas.width) {
      this.x = canvas.width - 32;
    }
    sprites.draw("ship", this.ctx, this.x, this.y);
  }

  update(dt) {
    console.log(this.x, this.vel);
    //console.log("Delta", dt);

    console.log(this.x, this.vel);
    this.x += this.vel * dt;
  }
}
