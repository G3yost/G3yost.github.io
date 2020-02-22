function Vacuum(game, spritesheet, xPosition, yPosition, width, height, camera){
    Entity.call(this, game, xPosition, yPosition, width, height, this);
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.camera;

    // collision behavior can mimic that of a vacuum
    // the vacuum moves along a platform like an enemy
    this.type = "Vacuum";
}

Vacuum.prototype = new Entity();
Vacuum.prototype.constructor = Floor;

Vacuum.prototype.update = function () {



}


Vacuum.prototype.draw = function (ctx) {
    ctx.drawImage(this.spritesheet,
                    this.xPos - this.camera.xPos, this.yPos - this.camera.yPos);
    Entity.prototype.draw.call(this);
}