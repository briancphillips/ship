export default class SpriteSheet {
  constructor(image, w = 32, h = 32) {
    this.image = image;
    this.width = w;
    this.height = h;
    this.tiles = new Map();
  }

  define(name, x, y) {
    const buffer = document.createElement("canvas");
    buffer.height = this.height;
    buffer.width = this.width;
    let bufferCtx = buffer.getContext("2d");

    bufferCtx.drawImage(
      this.image,
      this.width * x,
      this.height * y,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height
    );
    this.tiles.set(name, buffer);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    //context.save();
    //context.scale(2, 2);
    context.drawImage(buffer, x, y);
    //context.restore();
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
