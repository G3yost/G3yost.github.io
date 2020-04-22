function Background(game, spritesheet, camera) { // Will take any image and throw it into the background
    Entity.call(this, game, 0, 0);
    this.spritesheet = spritesheet;
    this.camera = camera;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    //ctx.fillStyle = "SaddleBrown";
    //ctx.fillRect(0,500,800,300);
    ctx.drawImage(this.spritesheet, this.xPos - this.camera.xPos, this.yPos - this.camera.yPos);
    Entity.prototype.draw.call(this);
}