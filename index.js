import { canvas, ctx, BULLETS_MAX, bullets } from "./js/globals.js";
import { input } from "./js/Input.js";

import Bullet from "./js/Bullet.js";
import Ship from "./js/Ship.js";
import Game from "./js/Game.js";

export let game = new Game();
export let ship = new Ship();

//window.input = input;

for (let i = 0; i < BULLETS_MAX; i++) {
  bullets.push(new Bullet());
}
window.bullets = bullets;
