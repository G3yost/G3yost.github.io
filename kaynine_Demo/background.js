function Background(game, spritesheet) {
    Entity.call(this, game, 0, 400);
    this.spritesheet = spritesheet;
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    //ctx.fillStyle = "SaddleBrown";
    //ctx.fillRect(0,500,800,300);
    ctx.drawImage(this.spritesheet, 0, 0);
    Entity.prototype.draw.call(this);
}