let moveGround = {
  moveGround: decorations => {
    for (let i = 0; i < decorations.length; i++) {
      if (decorations[i].y > screenHeight + 200) {
        decorations[i].destroy();
        decorations.splice(i, 1);
      } else {
        decorations[i].setVelocityY(300);
      }
    }
  }
};
