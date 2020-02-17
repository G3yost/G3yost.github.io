function GridSquare(game, x, y, parent) {

    gridx = x;
    gridy = y;

    left   = gridx > 0 ? gridx : game.boardWidth - 1;
    top    = gridy > 0 ? gridy : game.boardHeight - 1;
    right  = gridx < game.boardWidth - 1 ? gridx : 0;
    bottom = gridy < game.boardHeight - 1 ? gridy : 0;

    alive = false;

    Entity.call(this, game, gridx * game.Qsize, gridy * game.Qsize, game.Qsize, game.Qsize, this);
}

GridSquare.prototype = new Entity();
GridSquare.prototype.constructor = GridSquare;

GridSquare.prototype.update = function () {

    switch(this.touching())
}

GridSquare.prototype.draw = function (ctx) {

    this.game.ctx.fillRect(this.boundingBox.left, this.boundingBox.top, this.boundingBox.width, this.boundingBox.height);

    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }

    Entity.prototype.draw.call(this);
}

GridSquare.prototype.touching = function() {

    count = 0;

    if(game.)
}