class GreenPlane {
  constructor(image) {
    this.x = this.randomX();
    this.y = this.randomY();
    this.image = image;
    this.hp = 10;

    this.unit = game.scene.scenes[0].physics.add.sprite(
      this.x,
      this.y,
      image,
      2
    );
    this.unit.setCircle(50, 550, 0);
    this.unit.displayWidth /= 3.5;
    this.unit.displayHeight /= 3.5;
    this.unit.depth = 9;
  }
  randomX() {
    return Math.ceil(Math.random() * screenWidth);
  }
  randomY() {
    return Math.ceil(Math.random() * screenHeight - screenHeight);
  }

  hitAnimation(x, y, planeDestroy) {
    let randomKey = Math.random() * 2000;
    let hit = game.scene.scenes[0].add.sprite(x, y, "hit-animation", 3);
    hitAnimationArray[randomKey] = hit;

    game.scene.scenes[0].anims.create({
      key: randomKey,
      frames: game.scene.scenes[0].anims.generateFrameNames("hit-animation", {
        start: 0,
        end: 3
      }),
      frameRate: 7,
      repeat: -1
    });

    setTimeout(() => {
      hitAnimationArray.splice(randomKey, 1);
      hitAnimationArray[randomKey].destroy();
    }, 1000);

    hit.play(randomKey);
    if (planeDestroy) {
      hit.displayWidth = hit.displayWidth;
      hit.displayHeight = hit.displayHeight;
    } else {
      hit.displayWidth = hit.displayWidth / 4;
      hit.displayHeight = hit.displayHeight / 4;
    }

    hit.depth = 19;
  }
}
