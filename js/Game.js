class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.reset = createButton("");
    this.leaderTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playerMoving = false
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount();
    carro1 = createSprite(width / 2 - 50, height - 100);
    carro1.addImage("carro1", carro1Img);
    carro1.scale = 0.07;
    carro2 = createSprite(width / 2 + 100, height - 100);
    carro2.addImage("carro2", carro2Img);
    carro2.scale = 0.07;
    carros = [carro1, carro2];

    money = new Group();
    fuel = new Group();
    obstacle1 = new Group();
    this.addSprites(20, money, moneyImg, 0.09);
    this.addSprites(10, fuel, fuelImg, 0.02);

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image },
    
    
    ];
    this.addSprites(obstaclesPositions.length,obstacle1,obstacle1Image,0.04,obstaclesPositions)
  }
  getState() {
    var gameref = database.ref("gameState");
    gameref.on("value", (data) => {
      gameState = data.val();
    });
  }

  update(count) {
    database.ref("/").update({
      gameState: count,
    });
  }
  play() {
    form.hide();
    this.showelement();
    this.resetar();
     Player.getplayerinfo()
     player.getCarsAtEnd()
    if (allPlayers !== undefined) {
      image(PistaImg, 0, -height * 5, width, height * 6);
      this.showLeaderboard();
      this.showFuelBar()
      this.showLife()


      var index = 0;
      for (var plr in allPlayers) {
        index = index + 1;
        var x = allPlayers[plr].positionx;
        var y = height - allPlayers[plr].positiony;
        carros[index - 1].position.x = x;
        carros[index - 1].position.y = y;
        if (index === player.index) {
          camera.position.y = carros[index - 1].position.y;

          this.handleFuel(index)
          this.handlePowerCoins(index)
        }
      }

if(this.playerMoving){

player.positiony += 5 
player.update()

}
var chegada = height*6-100
if(player.positiony>chegada){

  gameState=2
  player.rank+=1
  Player.updateCarsAtEnd(player.rank)
  player.update()
  this.showRank()
}
      this.controles();
      drawSprites();
    }
  }

  controles() {
    if (keyIsDown(UP_ARROW)) {
      player.positiony += 10;
      player.update();
      this.playerMoving=true
    }
  }
  showelement() {
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("reiniciar");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.reset.class("resetButton");
    this.reset.position(width / 2 + 230, 100);

    this.leaderTitle.html("placar");
    this.leaderTitle.class("resetText");
    this.leaderTitle.position(width / 3 - 60, 40);

    this.leader1.class("resetText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("resetText");
    this.leader2.position(width / 3 - 50, 130);
  }
  resetar() {
    this.reset.mousePressed(() => {
      database.ref("/").set({
        player: {},
        playerCount: 0,
        gameState: 0,
      });
      window.location.reload();
    });
  }
  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp; Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }
    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
  addSprites(num, grupo, image, scale,positions = []) {
    for (var i = 0; i < num; i++) {
      var x;
      var y;
      if(positions.length>0){

        x=positions[i].x
        y=positions[i].y
        image = positions[i].image
      }
else{
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);}
      var sprite = createSprite(x, y);
      sprite.addImage("image",image);
      sprite.scale = scale;
      grupo.add(sprite)
    }
  }
  showLife() {
    push();
    image(lifeImage, width / 2 - 130, height - player.positionY - 500, 20, 20);
    fill("white");
    rect(width / 2 - 100, -player.positionY - 100, 200, 20);
    fill("#f50057");
    rect(width / 2 - 100, - player.positionY - 100, player.life, 20);
    noStroke(); 
    pop();
  }

  showFuelBar() {
    push();
    image(fuelImg, width / 2 - 130, height - player.positionY - 450, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 450, 200, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 450, player.fuel, 20);
    noStroke();
    pop();
  }
  handleFuel(index) {
    //adicionando combustível
    carros[index - 1].overlap(fuel, function(collector, collected) {
      player.fuel = 200;
      //o sprite é coletado no grupo de colecionáveis que desencadeou
      //o evento
      collected.remove();
    });

    // reduzindo o combustível do carro
    if (player.fuel > 0 && this.playerMoving) {
      player.fuel -= 0.3;
    }

    if (player.fuel <= 0) {
      gameState = 2;
      this.gameOver();
    }
  }

  handlePowerCoins(index) {
    carros[index - 1].overlap(money, function(collector, collected) {
      player.score += 5;
      player.update();
      //o sprite é coletado no grupo de colecionáveis que desencadeou
      //o evento
      collected.remove();
    });
  }

  showRank() {
    swal({
      //title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
      title: `Incrível!${"\n"}${player.rank}º lugar`,
      text: "Você alcançou a linha de chegada com sucesso!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

  gameOver() {
    swal({
      title: `Fim de Jogo`,
      text: "Oops você perdeu a corrida!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Obrigado por jogar"
    });
  }
}

