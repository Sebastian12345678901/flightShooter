let seppelinareAi = {
  controlls: () => {
    for (let i = 0; i < seppelinarePlural.length; i++) {
      seppelinarePlural[i].body.setVelocityY(+100);
    }
  },
  getRidOfSeppelinareBelowY: () => {
    for (let i = 0; i < seppelinarePlural.length; i++) {
      if (seppelinarePlural[i].body.y > screenHeight + 300) {
        seppelinarePlural[i].body.destroy();
        seppelinarePlural.splice(i, 1);
      }
    }
  },

  spawnSeppelinare: () => {
    setInterval(() => {
      if (player.destroyed) {
        return;
      }
      let randomKey = Math.random() * 2000;
      seppelinareAnimation = new Seppelinare("seppelinare", 1);
      seppelinarePlural.push(seppelinareAnimation);

      game.scene.scenes[0].anims.create({
        key: randomKey,
        frames: game.scene.scenes[0].anims.generateFrameNames("seppelinare", {
          start: 0,
          end: 2
        }),
        frameRate: 4,
        repeat: -1
      });

      seppelinareAnimation.body.play(randomKey);

      seppelinareAi.controlls();
      //player sepp collider
      for (let i = 0; i < seppelinarePlural.length; i++) {
        game.scene.scenes[0].physics.add.collider(
          seppelinarePlural[i].body,
          player.body
        );
      }
      //sepp to sepp coll
      for (let i = 0; i < seppelinarePlural.length; i++) {
        for (let j = 0; j < seppelinarePlural.length; j++) {
          if (
            seppelinarePlural[i] == undefined ||
            seppelinarePlural[j] == undefined
          ) {
          } else {
            game.scene.scenes[0].physics.add.collider(
              seppelinarePlural[i].body,
              seppelinarePlural[j].body
            );
          }
        }
      }
      //planes to sepp collider
      for (let i = 0; i < seppelinarePlural.length; i++) {
        for (let j = 0; j < planes.length; j++) {
          if (seppelinarePlural[i] == undefined || planes[j] == undefined) {
          } else {
            game.scene.scenes[0].physics.add.collider(
              seppelinarePlural[i].body,
              planes[j].unit
            );
          }
        }
      }
    }, 5000);
  }
};
