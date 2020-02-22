function Floor(game, spritesheet, xPosition, yPosition, width, height, camera){
    //this.moving = move;
    Entity.call(this, game, xPosition, yPosition, width, height, this);
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.camera = camera;

    this.type = "floor";
}

Floor.prototype = new Entity();
Floor.prototype.constructor = Floor;

Floor.prototype.update = function () {
    // if(this.moving === true) {

    // }
}

Floor.prototype.draw = function (ctx) {


    //ctx.drawImage(this.spritesheet, this.xCam, this.yCam);
    ctx.drawImage(this.spritesheet, this.xPos - this.camera.xPos, this.yPos - this.camera.yPos);
    Entity.prototype.draw.call(this);
}
