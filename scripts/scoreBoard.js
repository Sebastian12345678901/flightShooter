let scoreBoard = {
  yourScore: 0,
  displayScore: () => {
    score = game.scene.scenes[0].add.text(
      10,
      10,
      "score: " + scoreBoard.yourScore,
      { fontSize: 64, color: "red" }
    );

    score.depth = 20;
  },

  displayHp: () => {
    hitpoints = game.scene.scenes[0].add.text(10, 70, "hp: " + player.hp, {
      fontSize: 64,
      color: "red"
    });
    hitpoints.depth = 20;
  },

  gameOver: () => {
    gameOver = game.scene.scenes[0].add.text(
      screenWidth / 2 - 300,
      370,
      "GAME OVER: ",
      {
        fontSize: 100,
        color: "red"
      }
    );
    gameOver.depth = 20;

    finalScore = game.scene.scenes[0].add.text(
      screenWidth / 2 - 300,
      470,
      "final score: " + scoreBoard.yourScore,
      {
        fontSize: 100,
        color: "red"
      }
    );
    finalScore.depth = 20;
  }
};
