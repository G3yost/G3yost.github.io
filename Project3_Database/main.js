window.onload = function() {

    var socket = io.connect("http://24.16.255.56:8888");
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

            squares[i][j].addNeighbors(squares[topp][left], squares[topp][i], squares[topp][right], squares[left][j], squares[right][j], squares[bottom][left], squares[bottom][i], squares[bottom][right]);
        }
    }

    socket.on("load", function (data) {
        console.log(data);
        console.log(data.data);

        for(i = 0; i < gameEngine.xDim; i++) {
            for(j = 0; j < gameEngine.yDim; j++) {

                squares[i][j].isAlive = data.data[i][j];
            }
        }
    });

    var text = document.getElementById("text");
    var saveButton = document.getElementById("save");
    var loadButton = document.getElementById("load");

    saveButton.onclick = function () {

        console.log("saving");
        var saveArr = [];

        for(i = 0; i < gameEngine.xDim; i++) {

            saveArr[i] = [];

            for(j = 0; j < gameEngine.yDim; j++) { saveArr[i][j] = squares[i][j].isAlive; }
        }

        socket.emit("save", { studentname: "Gary Yost III", statename: "Running", data: saveArr });
        console.log("saved");
    };

    loadButton.onclick = function () {
        console.log("load");
        socket.emit("load", { studentname: "Gary Yost III", statename: "Running" });
    };

    gameEngine.init(ctx);
    gameEngine.start();
}