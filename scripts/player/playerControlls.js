playerControlls = {
  shooting: false,
  slowDownShooting: 0,
  leftPlaying: false,
  rightPlaying: false,
  stillPlaying: false,
  shootingPlaying: false,
  playAnimations: () => {
    document.addEventListener(
      "keydown",
      event => {
        if (event.keyCode == 39) {
          if (playerControlls.rightPlaying == false) {
            player.body.anims.play("right");
            playerControlls.rightPlaying = true;
          }
        } else if (event.keyCode == 37) {
          if (playerControlls.leftPlaying == false) {
            player.body.anims.play("left");
            playerControlls.leftPlaying = true;
          }
        }

        if (event.keyCode == 32) {
          if (playerControlls.shootingPlaying == false) machineGun.play();
          playerControlls.shootingPlaying = true;
        }
      },
      false
    );

    document.addEventListener(
      "keyup",
      event => {
        if (event.keyCode == 39) {
          /*   player.body.anims.play("still"); */
          playerControlls.rightPlaying = false;
        } else if (event.keyCode == 37) {
          /* player.body.anims.play("still"); */
          playerControlls.leftPlaying = false;
        } else if (
          playerControlls.leftPlaying == false ||
          playerControlls.rightPlaying == false
        ) {
          player.body.anims.play("still");
        }

        if (event.keyCode == 32) {
          playerControlls.shootingPlaying = false;
          machineGun.stop();
        }
      },
      false
    );
  },

  left: () => {
    game.scene.scenes[0].anims.create({
      key: "left",
      frames: game.scene.scenes[0].anims.generateFrameNumbers(
        "playerAnimation",
        {
          start: 0,
          end: 3
        }
      ),
      frameRate: 4,
      repeat: 0
    });
  },

  still: () => {
    game.scene.scenes[0].anims.create({
      key: "still",
      frames: [{ key: "playerAnimation", frame: 0 }],
      frameRate: 100
    });
  },

  right: () => {
    game.scene.scenes[0].anims.create({
      key: "right",
      frames: game.scene.scenes[0].anims.generateFrameNumbers(
        "playerAnimation",
        {
          start: 4,
          end: 7
        }
      ),
      frameRate: 4,
      repeat: 0
    });
  },

  redScreenAnimation: () => {
    redScreen = game.scene.scenes[0].physics.add.sprite(
      screenWidth / 2,
      screenHeight / 2,
      "red-screen",
      0
    );
    redScreen.displayWidth = screenWidth;
    redScreen.displayHeight = screenHeight;
    game.scene.scenes[0].anims.create({
      key: "red",
      frames: game.scene.scenes[0].anims.generateFrameNumbers("red-screen", {
        start: 0,
        end: 9
      }),
      frameRate: 30,
      repeat: 1
    });
  },
  controlls: () => {
    if (cursors.left.isDown) {
      player.body.setVelocityX(-250);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(250);
    } else {
      player.body.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      player.body.setVelocityY(-250);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(250);
    } else {
      player.body.setVelocityY(0);
    }

    if (cursors.space.isDown) {
      playerControlls.slowDownShooting++;
      if (playerControlls.slowDownShooting == 5) {
        playerControlls.shooting = true;
        playerControlls.slowDownShooting = 0;
        playerControlls.createDestroyBullet();
      }
    } else {
      playerControlls.shooting = false;
    }
  },

  createDestroyBullet: () => {
    if (playerControlls.shooting) {
      playerProjectiles.push(
        game.scene.scenes[0].physics.add.sprite(
          player.body.x,
          player.body.y,
          "player-projectile"
        )
      );

      greenPlaneAi.bulletCollision();

      for (i = 0; i < playerProjectiles.length; i++) {
        playerProjectiles[i].depth = 7;
      }

      playerControlls.shooting = false;

      for (let i = 0; i < playerProjectiles.length; i++) {
        if (playerProjectiles[i].y < 0) {
          playerProjectiles[i].destroy();
          delete playerProjectiles[i];
          playerProjectiles.splice(i, 1);
        } else {
          playerProjectiles[i].setVelocityY(-750);
        }
      }
    }
  }
};
