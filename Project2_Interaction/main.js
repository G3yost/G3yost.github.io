var canvas = document.getElementById('gameWorld');
var ctx = canvas.getContext('2d');

var gameEngine = new GameEngine();

for(var i = 0; i < 100; i++) {
    for(var j = 0; j < 100; j++) {

        gameEngine.addEntity(new GridSquare(gameEngine, 0, 0));
    }
}

gameEngine.init(ctx);
gameEngine.start();