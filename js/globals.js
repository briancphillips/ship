export let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
const SCREEN_W = 224;
const SCREEN_H = 288;
const SCREEN_SCALE = 2;

canvas.width = SCREEN_W * SCREEN_SCALE;
canvas.height = SCREEN_H * SCREEN_SCALE;

export let SHIP_SPEED = 300;
export let BULLET_SPEED = -1800;
