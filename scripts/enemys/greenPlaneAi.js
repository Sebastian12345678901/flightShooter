let greenPlaneAi = {
  slowDownDirectionRate: 0,
  slowDownBulletRate: 0,

  spawnPlanes: amount => {
    if (amount == 1) {
      planes.push(new GreenPlane("enemy-animation"));
    }
  },

  left: () => {
    game.scene.scenes[0].anims.create({
      key: "green-left",
      frames: game.scene.scenes[0].anims.generateFrameNumbers(
        "enemy-animation",
        {
          start: 1,
          end: 1
        }
      ),
      frameRate: 0,
      repeat: 0
    });
  },

  right: () => {
    game.scene.scenes[0].anims.create({
      key: "green-right",
      frames: game.scene.scenes[0].anims.generateFrameNumbers(
        "enemy-animation",
        {
          start: 3,
          end: 3
        }
      ),
      frameRate: 0,
      repeat: 0
    });
  },

  controlls: planes => {
    planes.forEach(plane => {
      let randomBool = Math.ceil(Math.random() * 2);
      if (randomBool == 1) {
        if (plane.unit.x < player.x) {
          plane.unit.setVelocityX(150);
          plane.unit.anims.play("green-right");
        } else {
          plane.unit.setVelocityX(-150);
          plane.unit.anims.play("green-left");
        }
      } else {
        if (plane.unit.x < player.x) {
          plane.unit.setVelocityX(-100);
          plane.unit.anims.play("green-left");
        } else {
          plane.unit.setVelocityX(100);
          plane.unit.anims.play("green-right");
        }
      }
      greenPlaneAi.slowDownDirectionRate = 0;
      plane.unit.setVelocityY(100);
    });
  },

  shoot: () => {
    for (let i = 0; i < planes.length; i++) {
      if (planes[i].unit.y > 0) {
        enemyProjectiles.push(
          game.scene.scenes[0].physics.add.sprite(
            planes[i].unit.x,
            planes[i].unit.y,
            "enemy-projectile"
          )
        );
      }

      enemyProjectiles.forEach(bullet => {
        bullet.setVelocityY(500);
        bullet.depth = 7;
        bullet.body.setCircle(80, 60, -100);
      });
    }
  },

  getRidOfPlanesBelowY: () => {
    for (let i = 0; i < planes.length; i++) {
      if (planes[i].unit.y > screenHeight + 100) {
        planes[i].unit.destroy();
        planes.splice(i, 1);
      }
    }
  },

  bulletCollision: () => {
    for (let i = 0; i < planes.length; i++) {
      for (let j = 0; j < playerProjectiles.length; j++) {
        game.scene.scenes[0].physics.add.overlap(
          planes[i].unit,
          playerProjectiles[j],
          () => {
            if (planes[i] == undefined || playerProjectiles[j] == undefined) {
            } else {
              planes[i].hp--;
              planes[i].hitAnimation(planes[i].unit.x, planes[i].unit.y, false);

              playerProjectiles[j].destroy();
              playerProjectiles.splice(j, 1);
              if (planes[i].hp < 1) {
                planes[i].hitAnimation(
                  planes[i].unit.x,
                  planes[i].unit.y,
                  true
                );
                planes[i].unit.destroy();
                planes.splice(i, 1);

                score.destroy();
                scoreBoard.yourScore += 10;

                scoreBoard.displayScore();
                //collosions for player and planes
                for (let i = 0; i < planes.length; i++) {
                  if (planes[i] == undefined) {
                  } else {
                    game.scene.scenes[0].physics.add.collider(
                      planes[i].unit,
                      player.body
                    );
                    // collisons for planes and planes
                    for (let i = 0; i < planes.length; i++) {
                      for (let j = 0; j < planes.length; j++) {
                        if (planes[i] == undefined || planes[j] == undefined) {
                        } else {
                          game.scene.scenes[0].physics.add.collider(
                            planes[i].unit,
                            planes[j].unit
                          );
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        );
      }
    }
  }
};
