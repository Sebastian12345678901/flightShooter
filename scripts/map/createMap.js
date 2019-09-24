let createMap = {
  randomAmount: amount => {
    return Math.ceil(Math.random() * amount);
  },

  randomPositions: () => {
    return [
      Math.ceil(Math.random() * screenWidth),
      Math.ceil(Math.random() * screenHeight)
    ];
  },

  createTrees: () => {
    let randomNumber = createMap.randomAmount(50);
    let trees = [];
    let xY;
    for (i = 0; i < randomNumber; i++) {
      xY = createMap.randomPositions();

      trees.push(
        game.scene.scenes[0].physics.add.sprite(
          xY[0],
          xY[1] - screenHeight,
          "tree"
        )
      );
      trees[i].depth = 5;
    }

    return trees;
  },

  createHills: () => {
    let randomNumber = createMap.randomAmount(20);
    let hills = [];
    let xY;
    for (i = 0; i < randomNumber; i++) {
      xY = createMap.randomPositions();
      hills.push(
        game.scene.scenes[0].physics.add.sprite(
          xY[0],
          xY[1] - screenHeight,
          "hill"
        )
      );
      hills[i].depth = 4;
    }

    return hills;
  },

  createStones: () => {
    let randomNumber = createMap.randomAmount(3);
    let stones = [];
    let xY;
    for (i = 0; i < randomNumber; i++) {
      xY = createMap.randomPositions();
      stones.push(
        game.scene.scenes[0].physics.add.sprite(
          xY[0],
          xY[1] - screenHeight,
          "stone"
        )
      );
      stones[i].depth = 3;
    }

    return stones;
  },
  greenGrass() {
    let ground = game.scene.scenes[0].physics.add.sprite(
      screenWidth / 2,
      screenHeight / 2,
      "ground-grass"
    );
    ground.displayHeight = screenHeight;
    ground.displayWidth = screenWidth;
  }
};
