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

let planes = [];
let enemyProjectiles = [];
let hitAnimationArray = [];
let cursors;
let ground;
let trees;
let stones;
let hills;
let player;
let playerProjectiles = [];

//laddar in alla assests, som bilder ljud osv...
function preload() {
  this.load.image("ground-grass", "/images/map/ground-grass.svg");
  this.load.image("tree", "/images/map/tree.svg");
  this.load.image("hill", "/images/map/kullar.svg");
  this.load.image("stone", "/images/map/stones.svg");
  this.load.image("house", "/images/map/hus.svg");
  this.load.image("player", "/images/player/player.svg");
  this.load.image("player-projectile", "/images/player/playerProjectile.svg");
  this.load.image("enemy", "/images/enemys/enemy.svg");
  this.load.image("enemy-projectile", "/images/enemys/enemyProjectile.svg");
  this.load.spritesheet("hit-animation", "/images/enemys/hit.png", {
    frameWidth: 125,
    frameHeight: 125
  });
}

function create() {
  createMap.greenGrass();

  planes.push(new GreenPlane("enemy"));

  hills = createMap.createHills(this);
  stones = createMap.createStones(this);
  trees = createMap.createTrees(this);

  player = new Player("player", screenWidth / 2, screenHeight - 100);

  this.physics.add.collider(player, planes);
  this.physics.add.collider(planes, planes);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  greenPlaneAi.controlls(planes);

  playerControlls.controlls();
  greenPlaneAi.shoot(planes);
  greenPlaneAi.bulletCollision();

  if (stones.length < 2) {
    stones = createMap.createStones(this);
  }
  moveGround.moveGround(stones);

  if (hills.length < 2) {
    hills = createMap.createHills(this);
  }
  moveGround.moveGround(hills);

  if (trees.length < 2) {
    trees = createMap.createTrees(this);
  }
  moveGround.moveGround(trees);
}
