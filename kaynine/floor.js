function Floor(game, spritesheet, xPosition, yPosition, /*length, height,*/ move){
    //this.moving = move;
    // this.length = length;
    // this.height = height;
    Entity.call(this, game, xPosition, yPosition);
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
}

Floor.prototype = new Entity();
Floor.prototype.constructor = Floor;

Floor.prototype.update = function () {
    // if(this.moving === true) {
    //     this.x += this.game.clockTick * this.speed;
    //     if (this.x > 800) this.x = -230;
    //     Entity.prototype.update.call();
    // }
}

Floor.prototype.draw = function (ctx) {
    ctx.drawImage(this.spritesheet, this.x, this.y);
    Entity.prototype.draw.call(this);
}
