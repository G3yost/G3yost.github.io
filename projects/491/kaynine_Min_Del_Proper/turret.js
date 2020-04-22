function Turret(game, spritesheet, xPosition, yPosition, width, height, speed, camera){
    //this.moving = move;
    Entity.call(this, game, xPosition, yPosition, width, height, this);
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.camera;

    this.type = "floor";
}

Turret.prototype = new Entity();
Turret.prototype.constructor = Floor;

Turret.prototype.update = function () {
    // if(this.moving === true) {

    // }
}

Turret.prototype.draw = function (ctx) {

    ctx.drawImage(this.spritesheet, this.xPos - this.camera.xPos, this.yPos - this.camera.yPos);
    Entity.prototype.draw.call(this);
}
