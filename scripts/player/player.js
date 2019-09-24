class Player extends Entity {
  constructor(image, x, y) {
    super(image, x, y);
    this.body.body.collideWorldBounds = true;

    this.body.body.setCircle(20, 80, -80);
    this.hp = 20;
    this.destroyed = false;
  }

  bulletCollision() {
    for (let j = 0; j < enemyProjectiles.length; j++) {
      game.scene.scenes[0].physics.add.overlap(
        player.body,
        enemyProjectiles[j],
        () => {
          if (player.body == undefined || enemyProjectiles[j] == undefined) {
          } else {
            player.hp--;
            playerHitAnimation.hitAnimation(
              player.body.x,
              player.body.y,
              false
            );

            hitpoints.destroy();
            scoreBoard.displayHp();

            enemyProjectiles[j].destroy();
            enemyProjectiles.splice(j, 1);
            if (player.hp < 1) {
              playerHitAnimation.hitAnimation(
                player.body.x,
                player.body.y,
                true
              );
              player.destroyed = true;
            }
          }
        }
      );
    }
  }
}
