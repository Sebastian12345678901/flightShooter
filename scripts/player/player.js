class Player extends Entity {
  constructor(image, x, y) {
    super(image, x, y);

    this.body.body.collideWorldBounds = true;
    /* setCircle(radius[, offsetX][, offsetY]) */
    this.body.body.setCircle(50, 100, 35);
  }
}
