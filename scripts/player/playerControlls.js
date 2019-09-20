playerControlls = {
  shooting: false,
  slowDownShooting: 0,
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
      }
    } else {
      playerControlls.shooting = false;
    }

    if (playerControlls.shooting) {
      playerProjectiles.push(
        game.scene.scenes[0].physics.add.sprite(
          player.body.x,
          player.body.y,
          "player-projectile"
        )
      );
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
