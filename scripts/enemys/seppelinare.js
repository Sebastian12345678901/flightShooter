class Seppelinare extends Entity {
  constructor(image, frame) {
    super(image, frame);

    this.body.x = this.randomX();
    this.body.y = this.randomY();
    this.body.displayWidth *= 1.5;
    this.body.displayHeight *= 1.5;
    this.frame = frame;
    this.body.setCircle(120, -20, -60);
  }

  randomX() {
    return Math.ceil(Math.random() * screenWidth);
  }
  randomY() {
    return Math.ceil(Math.random() * screenHeight - screenHeight);
  }
}
