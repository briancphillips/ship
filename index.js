import { canvas, ctx } from "./js/globals.js";
import { input } from "./js/Input.js";
import { createAudioLoader } from "./js/utils.js";

import Ship from "./js/Ship.js";
import Game from "./js/Game.js";

export let game = new Game();
window.game = game;
export let ship = new Ship();
export let audioContext = new AudioContext();

//TODO: REFACTOR BELOW
export let playAudio = () => {
  const loadAudio = createAudioLoader(audioContext);
  loadAudio("./sound/galaga-019.wav")
    .then((buffer) => {
      const source = audioContext.createBufferSource();
      source.connect(audioContext.destination);
      source.buffer = buffer;
      source.start();
    })
    .catch((e) => {
      console.log(e);
    });
};

//window.input = input;
