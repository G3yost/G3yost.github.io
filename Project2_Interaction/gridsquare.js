function GridSquare(game, x, y) {

    this.game = game;

    this.isAlive = false;

    Entity.call(this, this.game, x * (this.game.boardWidth * this.game.Qsize) / this.game.xDim, y * (this.game.boardHeight * this.game.Qsize) / this.game.yDim, this.game.Qsize * this.game.boardWidth / this.game.xDim, this.game.Qsize * this.game.boardHeight / this.game.yDim);
}

GridSquare.prototype = new Entity();
GridSquare.prototype.constructor = GridSquare;

GridSquare.prototype.update = function () {

    count = 0;

    if(this.game.lifeCycle) {
        for(i in this.touching) { if(this.touching[i].isAlive) { count += 1; } }
if(count > 0) { console.log([this.boundingBox.left, this.boundingBox.top, count]); }
        if(this.isAlive && (count === 2 || count === 3)) { // Any live cell with two or three neighbors survives.

            this.isAlive = true;

        } else if(!this.isAlive && count == 3) { // Any dead cell with three live neighbors becomes a live cell.

            this.isAlive = true;

        } else { // All other live cells die in the next generation. Similarly, all other dead cells stay dead.

            this.isAlive = false;
        }
    }

    if(this.mouseOver() && this.game.keyDownList['lmb']) { this.isAlive = true; }
    if(this.mouseOver() && this.game.keyDownList['rmb']) { this.isAlive = false; }
}

GridSquare.prototype.draw = function (ctx) {

    if(this.isAlive) {

        this.game.ctx.fillStyle = "#000000";
        this.game.ctx.fillRect(this.boundingBox.left, this.boundingBox.top, this.boundingBox.width, this.boundingBox.height);
    }


    if(this.mouseOver()) {
        if(this.game.keyDownList['lmb']) {

            this.game.ctx.strokeStyle = "#00FF00";

        } else if(this.game.keyDownList['rmb']) {

            this.game.ctx.strokeStyle = "#FF0000";

        } else {

            this.game.ctx.strokeStyle = "#0000FF";
        }

        this.game.ctx.lineWidth = "10";
        this.game.ctx.strokeRect(this.boundingBox.left + 5, this.boundingBox.top + 5, this.boundingBox.width - 10, this.boundingBox.height - 10);
        this.game.ctx.stroke();
    }

    this.game.ctx.lineWidth = "2";
    this.game.ctx.strokeStyle = "#000000";
    this.game.ctx.strokeRect(this.boundingBox.left, this.boundingBox.top, this.boundingBox.width, this.boundingBox.height);
}

GridSquare.prototype.addNeighbors = function(topLef, topCen, topRig, midLef, midRig, botLef, botCen, botRig) {
console.log("addNeighbors");
console.log([topLef.isAlive, topCen.isAlive, topRig.isAlive, midLef.isAlive, midRig.isAlive, botLef.isAlive, botCen.isAlive, botRig.isAlive]);
    this.touching = [topLef, topCen, topRig, midLef, midRig, botLef, botCen, botRig];
console.log(this.touching);
}

GridSquare.prototype.mouseOver = function() {

    return this.boundingBox.collide(this.game.mouse);
}