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
let seppelinarePlural = [];
let playerHitAnimation;
let hp;
let machineGun;
let bulletImpact;
let explosion;
let gameOver;
let enemyShoot;
let redScreen;
//laddar in alla assests, som bilder ljud osv...
function preload() {
  this.load.audio("enemy-shoot", "/sounds/enemyShoot.mp3");
  this.load.audio("game-over", "/sounds/gameOver.mp3");
  this.load.audio("explosion", "/sounds/explosion.mp3");
  this.load.audio("bullet-impact", "/sounds/bullet-impact.mp3");
  this.load.audio("music", "/sounds/music.mp3");
  this.load.audio("gun", "/sounds/machineGun.mp3");
  this.load.image("ground-grass", "/images/map/ground-grass.svg");
  this.load.image("tree", "/images/map/tree.svg");
  this.load.image("hill", "/images/map/kullar.svg");
  this.load.image("stone", "/images/map/stones.svg");
  this.load.image("house", "/images/map/hus.svg");
  this.load.image("player", "/images/player/player.svg");
  this.load.image("player-projectile", "/images/player/playerProjectile.svg");
  this.load.image("enemy", "/images/enemys/enemy.svg");
  this.load.image("enemy-projectile", "/images/enemys/enemyProjectile.svg");

  this.load.spritesheet("red-screen", "/images/player/redScreenAnimation.png", {
    frameWidth: 100,
    frameHeight: 100
  });

  this.load.spritesheet("seppelinare", "/images/enemys/seppelinare.png", {
    frameWidth: 177,
    frameHeight: 223
  });

  this.load.spritesheet(
    "enemy-animation",
    "/images/enemys/enemyAnimation.png",
    {
      frameWidth: 916,
      frameHeight: 542
    }
  );

  this.load.spritesheet(
    "playerAnimation",
    "/images/player/playerAnimation.png",
    {
      frameWidth: 248,
      frameHeight: 103
    }
  );
  this.load.spritesheet("hit-animation", "/images/enemys/hit.png", {
    frameWidth: 125,
    frameHeight: 125
  });
}

function create() {
  let music = this.sound.add("music");
  music.play();
  music.loop = true;

  enemyShoot = this.sound.add("enemy-shoot");

  bulletImpact = this.sound.add("bullet-impact");
  bulletImpact.rate = 1.2;
  bulletImpact.volume = 0.2;
  bulletImpact.delay = 0;

  machineGun = this.sound.add("gun");
  machineGun.loop = true;
  machineGun.volume = 0.1;

  explosion = this.sound.add("explosion");
  explosion.volume = 0.5;

  gameOver = this.sound.add("game-over");
  playerHitAnimation = new GreenPlane("enemy-animation", -100, -2000, 3);

  createMap.greenGrass();

  planes.push(new GreenPlane("enemy-animation"));
  greenPlaneAi.left();
  greenPlaneAi.right();

  hills = createMap.createHills(this);
  stones = createMap.createStones(this);
  trees = createMap.createTrees(this);

  player = new Player(
    "playerAnimation",
    screenWidth / 2,
    screenHeight - 100,
    3,
    1,
    1
  );
  playerControlls.playAnimations();
  let score = scoreBoard.displayScore();
  hp = scoreBoard.displayHp();

  playerControlls.still();
  playerControlls.left();
  playerControlls.right();
  playerControlls.redScreenAnimation();
  cursors = this.input.keyboard.createCursorKeys();

  seppelinareAi.spawnSeppelinare();

  let gameOverSoundPlaying = false;
  setInterval(() => {
    if (player.destroyed) {
      if (gameOverSoundPlaying == false) {
        gameOver.play();
        gameOverSoundPlaying = true;
      }
      player.body.destroy();
      scoreBoard.gameOver();
      return;
    }
    if (Math.round(Math.random() * 3) == 2) {
      greenPlaneAi.shoot(planes);
      player.bulletCollision();
    }

    seppelinareAi.getRidOfSeppelinareBelowY();
    greenPlaneAi.getRidOfPlanesBelowY();
    greenPlaneAi.controlls(planes);
    greenPlaneAi.spawnPlanes(Math.round(Math.random() * 0.7));
    if (stones.length < 2) {
      stones = createMap.createStones();
    }
    moveGround.moveGround(stones);

    if (hills.length < 5) {
      hills = createMap.createHills();
    }
    moveGround.moveGround(hills);

    if (trees.length < 10) {
      trees = createMap.createTrees();
    }
  }, 500);
}

function update() {
  if (player.destroyed) {
    return;
  }
  seppelinareAi.controlls();
  playerControlls.controlls();

  moveGround.moveGround(trees);
}
