window.onload = function() {

    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();

    ctx.canvas.width  = gameEngine.boardWidth * gameEngine.Qsize;
    ctx.canvas.height = gameEngine.boardHeight * gameEngine.Qsize;

    const squares = [];
    for(i = 0; i < gameEngine.xDim; i++) {
        squares[i] = [];
        for(j = 0; j < gameEngine.yDim; j++) {
            squares[i][j] = new GridSquare(gameEngine, i, j);
        }
    }

    for(i = 0; i < gameEngine.xDim; i++) {
        for(j = 0; j < gameEngine.yDim; j++) {

            gameEngine.addEntity(squares[i][j]);
        }
    }

    for(i = 0; i < gameEngine.xDim; i++) {
        for(j = 0; j < gameEngine.yDim; j++) {

            left   = i > 0 ? i - 1 : gameEngine.xDim - 1;
            right  = i < gameEngine.xDim - 1 ? i + 1 : 0;
            topp    = j > 0 ? j - 1 : gameEngine.yDim - 1;
            bottom = j < gameEngine.yDim - 1 ? j + 1 : 0;

            squares[i][j].addNeighbors(squares[left][topp], squares[i][topp], squares[right][topp], squares[left][j], squares[right][j], squares[left][bottom], squares[i][bottom], squares[right][bottom]);
        }
    }

    gameEngine.init(ctx);
    gameEngine.start();
}