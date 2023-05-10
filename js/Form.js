class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Digite seu nome");
    this.playButton = createButton("Jogar");
    this.titleImg = createImg("./assets/TITULO.png", "nome do jogo");
    this.greeting = createElement("h2");
  }

  showElements() {
    this.titleImg.position(50, 50);
    this.titleImg.class("gameTitle");

    this.input.position(width / 2 - 100, height / 2);
    this.input.class("customInput");

    this.playButton.position(width / 2 - 80, height / 2 + 50);
    this.playButton.class("customButton");

    this.greeting.position(width / 2 - 100, height / 2);
  }

  mousePressed() {
    this.playButton.mousePressed(() => {
      this.playButton.hide();
      this.input.hide();
      this.greeting.html(`Olá ${this.input.value()}, seja bem vindo! </br>
      Aguarde o próximo jogador entrar...`);
      playerCount+=1
      player.name=this.input.value()
      player.index=playerCount
      player.addPlayer()
      player.updateCount(playerCount)
      player.getdistance()
    });
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }
  display() {
    this.showElements();
    this.mousePressed();
  }
}
