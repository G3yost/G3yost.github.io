function Background(game, spritesheet, xPosition, yPosition, camera) { // Will take any image and throw it into the background
    Entity.call(this, game, xPosition, yPosition, 65, 65, this);
    this.spritesheet = spritesheet;
    this.camera = camera;

    this.type = "background";
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.drawImage(this.spritesheet, this.xPos - this.camera.xPos, this.yPos - this.camera.yPos);
    Entity.prototype.draw.call(this);
}