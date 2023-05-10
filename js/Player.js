class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionx = 0;
    this.positiony = 0;
    this.rank = 0;
    this.score = 0;
    this.life = 200;
    this.fuel = 200;
  }

  getCount() {
    var playeref = database.ref("playerCount");
    playeref.on("value", (data) => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count,
    });
  }

  addPlayer() {
    var playerindex = "players/player" + this.index;
    if (this.index === 1) {
      this.positionx = width / 2 - 100;
    } else {
      this.positionx = width / 2 + 100;
    }
    database.ref(playerindex).set({
      name: this.name,
      positionx: this.positionx,
      positiony: this.positiony,
      rank: this.rank,
      score: this.score,
      life: this.life,
      fuel: this.fuel,
    });
  }

  static getplayerinfo() {
    var playerinfo = database.ref("players").on("value", (data) => {
      allPlayers = data.val();
    });
  }

  getdistance() {
    var playerdistance = database.ref("players/player" + this.index);
    playerdistance.on("value", (data) => {
      var data = data.val();
      this.positionx = data.positionx;
      this.positiony = data.positiony;
    });
  }

  update() {
    var playerindex = "players/player" + this.index;

    database.ref(playerindex).set({
      positionx: this.positionx,
      positiony: this.positiony,
      rank: this.rank,
      score: this.score,
      life: this.life,
      fuel: this.fuel,
    });
  }
  getCarsAtEnd() {
    database.ref("carsAtEnd").on("value", (data) => {
      this.rank = data.val();
    });
  }
  static updateCarsAtEnd(rank) {
    database.ref("/").update({ carsAtEnd: rank });
  }
}
