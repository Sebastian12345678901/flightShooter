class Entity {
  constructor(image, x, y, frame) {
    this.image = image;
    this.x = x;
    this.y = y;

    this.body = game.scene.scenes[0].physics.add.sprite(
      this.x,
      this.y,
      this.image,
      frame
    );

    this.body.depth = 10;
    this.body.setSize(100, 100);
  }

  test() {
    console.log("wasap");
  }
}
