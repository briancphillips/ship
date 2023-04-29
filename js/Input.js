import Keyboard from "./KeyboardState.js";
import { ship, bullet } from "../index.js";
import { SHIP_SPEED, BULLET_SPEED } from "./globals.js";
export let input = new Keyboard();

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
