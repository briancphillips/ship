import { game, playAudio } from "../index.js";
import Keyboard from "./KeyboardState.js";
import { ship } from "../index.js";
import {
  SHIP_SPEED,
  BULLET_SPEED,
  bullets,
  BULLETS_MAX,
  BULLETS_MAX_RAPID,
  COOL_DOWN_TIME,
} from "./globals.js";
import Bullet from "./Bullet.js";
export let input = new Keyboard();

let shots = 0;

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
    if (game.coolDown) return;
    ship.fire();
    if (bullets[shots]) bullets[shots].vel.y = BULLET_SPEED;
    console.log(bullets.length);

    shots++;

    if (shots > 1) {
      shots = 0;
      game.coolDown = true;
      game.coolDownTime = COOL_DOWN_TIME;
    }
    if (shots < 2) playAudio();
    //console.log("spaced");
  }
});

input.listenTo(window);
