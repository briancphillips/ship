export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

export function createAudioLoader(ctx) {
  return function loadAudio(url) {
    return fetch(url)
      .then((audio) => {
        return audio.arrayBuffer();
      })
      .then((audioBuffer) => {
        return ctx.decodeAudioData(audioBuffer);
      });
  };
}
