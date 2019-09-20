class Entity {
  constructor(image, x, y) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.body = game.scene.scenes[0].physics.add.sprite(
      this.x,
      this.y,
      this.image
    );

    this.body.displayWidth = this.body.displayWidth * 1.5;
    this.body.displayHeight = this.body.displayHeight * 1.5;
    this.body.depth = 10;
    this.body.setSize(100, 100);
  }

  test() {
    console.log("wasap");
  }
}
