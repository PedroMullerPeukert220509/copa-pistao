var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player, game;
var playerCount;
var gameState;
var carro1
var carro2
var carros=[]
var carro1Img
var carro2Img
var PistaImg
var allPlayers
var money
var moneyImg
var fuel
var fuelImg
var obstacle1, obstacle1Image
var obstacle2, obstacle2Image
var lifeImage

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
 carro1Img = loadImage("assets/car1.png")
 carro2Img = loadImage("assets/car2.png")
 PistaImg = loadImage("assets/track.jpg")
 moneyImg = loadImage("assets/goldCoin.png")
 fuelImg = loadImage("assets/fuel.png")
 obstacle1Image = loadImage("assets/obstacle1.png")
 obstacle2Image = loadImage("assets/obstacle2.png")
 lifeImage = loadImage("assets/life.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();
  bgImg = backgroundImage;
  game.getState()
}

function draw() {
  background(bgImg);
  if (playerCount===2){

game.update(1)

  }
 if(gameState===1){

game.play()

 }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
