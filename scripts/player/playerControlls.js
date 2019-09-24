playerControlls = {
  shooting: false,
  slowDownShooting: 0,

  left: () => {
    game.scene.scenes[0].anims.create({
      key: "left",
      frames: game.scene.scenes[0].anims.generateFrameNumbers(
        "playerAnimation",
        {
          start: 3,
          end: 4
        }
      ),
      frameRate: 10,
      repeat: 0
    });
  },

  still: () => {
    game.scene.scenes[0].anims.create({
      key: "still",
      frames: [{ key: "playerAnimation", frame: 0 }],
      frameRate: 20
    });
  },

  right: () => {
    game.scene.scenes[0].anims.create({
      key: "right",
      frames: game.scene.scenes[0].anims.generateFrameNumbers(
        "playerAnimation",
        {
          start: 6,
          end: 6
        }
      ),
      frameRate: 10,
      repeat: 0
    });
  },
  controlls: () => {
    if (cursors.left.isDown) {
      player.body.anims.play("left");

      player.body.setVelocityX(-250);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(250);
      player.body.anims.play("right");
    } else {
      player.body.setVelocityX(0);
      player.body.anims.play("still");
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
          playerProjectiles.splice(i, 1);
        } else {
          playerProjectiles[i].setVelocityY(-750);
        }
      }
    }
  }
};
