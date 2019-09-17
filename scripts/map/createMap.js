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
  createTrees: scene => {
    let randomNumber = createMap.randomAmount(10);
    let trees = [];
    let xY;
    for (i = 0; i < randomNumber; i++) {
      xY = createMap.randomPositions();
      trees.push(scene.physics.add.sprite(xY[0], xY[1], "tree"));
    }

    return trees;
  },

  createHills: scene => {
    let randomNumber = createMap.randomAmount(5);
    let hills = [];
    let xY;
    for (i = 0; i < randomNumber; i++) {
      xY = createMap.randomPositions();
      hills.push(scene.physics.add.sprite(xY[0], xY[1], "hill"));
    }

    return hills;
  }
};
