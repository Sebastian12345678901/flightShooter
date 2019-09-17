let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

var config = {
  type: Phaser.AUTO,
  width: screenWidth,
  height: screenHeight,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let game = new Phaser.Game(config);

let cursors;
let player;
let enemy;
let ground;
//laddar in alla assests, som bilder ljud osv...
function preload() {
  this.load.image("ground-grass", "/images/map/ground-grass.svg");
  this.load.image("tree", "/images/map/tree.svg");
  this.load.image("hill", "/images/map/kullar.svg");
  this.load.image("stone", "/images/map/stones.svg");
  this.load.image("house", "/images/map/hus.svg");
  this.load.image("player", "/images/player/player.svg");
  this.load.image("enemy", "/images/enemys/enemy.svg");
}

//create är typ som draw tror jag men kanske att update är det och denna ger mer
//generella saker som bakgrunden ifall den alltid ser likadan ut...
function create() {
  console.log(this);
  let ground = this.physics.add.sprite(
    screenWidth / 2,
    screenHeight / 2,
    "ground-grass"
  );

  let trees = createMap.createTrees(this);
  let hills = createMap.createHills(this);

  ground.displayHeight = screenHeight;
  ground.displayWidth = screenWidth;

  player = this.physics.add.sprite(
    screenWidth / 2,
    screenHeight - 100,
    "player"
  );

  player.displayWidth = 400;
  player.displayHeight = 300;

  enemy = this.physics.add.sprite(screenWidth / 2, 100, "enemy");
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-250);
  } else if (cursors.right.isDown) {
    player.setVelocityX(250);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-250);
  } else if (cursors.down.isDown) {
    player.setVelocityY(250);
  } else {
    player.setVelocityY(0);
  }
}
