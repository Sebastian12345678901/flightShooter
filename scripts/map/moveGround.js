let moveGround = {
  moveGround: decoration => {
    trees.forEach(tree => {
      if (tree.y > screenHeight) {
      }
    });

    for (let i = 0; i < decoration.length; i++) {
      if (decoration[i].y > screenHeight + 200) {
        decoration[i].destroy();
        decoration.splice(i, 1);
      } else {
        decoration[i].setVelocityY(300);
      }
    }
  }
};
