import { canvas, ctx } from "./js/globals.js";
import { input } from "./js/Input.js";

import Bullet from "./js/Bullet.js";
import Ship from "./js/Ship.js";
import Game from "./js/Game.js";

export let game = new Game();
export let ship = new Ship();
export let bullet = new Bullet();

//window.input = input;
