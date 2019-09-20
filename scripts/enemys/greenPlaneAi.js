let greenPlaneAi = {
  slowDownDirectionRate: 0,
  slowDownBulletRate: 0,
  controlls: planes => {
    greenPlaneAi.slowDownDirectionRate++;

    if (greenPlaneAi.slowDownDirectionRate > 30) {
      planes.forEach(plane => {
        let randomBool = Math.ceil(Math.random() * 2);

        if (randomBool == 1) {
          if (plane.unit.x < player.x) {
            plane.unit.setVelocityX(150);
          } else {
            plane.unit.setVelocityX(-150);
          }
        } else {
          if (plane.unit.x < player.x) {
            plane.unit.setVelocityX(-100);
          } else {
            plane.unit.setVelocityX(100);
          }
        }
        greenPlaneAi.slowDownDirectionRate = 0;
        plane.unit.setVelocityY(100);
      });
    }
  },

  shoot: () => {
    greenPlaneAi.slowDownBulletRate++;
    if (greenPlaneAi.slowDownBulletRate > 100) {
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
      }

      enemyProjectiles.forEach(bullet => {
        bullet.setVelocityY(500);
        bullet.depth = 7;
      });
      greenPlaneAi.slowDownBulletRate = 0;
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
                planes[i].hitAnimation(planes[i].x, planes[i].y, true);
                planes[i].unit.destroy();
                planes.splice(i, 1);
                planes.push(new GreenPlane("enemy"));
                planes.push(new GreenPlane("enemy"));
                greenPlaneAi.getRidOfPlanesBelowY();
                console.log(planes.length);
              }
            }
          }
        );
      }
    }
  }
};
