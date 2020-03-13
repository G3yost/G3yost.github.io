function Goal(game, spritesheet,xPosition, yPosition, camera){
    //this.moving = move;
    Entity.call(this, game, xPosition, yPosition, 10, 120, this);
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.camera = camera;

    //282 X 358
    this.goalAnim  = new Animation(this.spritesheet, 0, 0, 282, 358, 0.2, 1, true, false);

    this.type = "goal";
}

Goal.prototype = new Entity();
Goal.prototype.constructor = Goal;

Goal.prototype.update = function () {

}

Goal.prototype.draw = function (ctx) {

    //this.goalAnim.drawFrame(this.spritesheet, this.xCam, this.yCam, 0.2);
    //this.goalAnim.drawFrame(this.game.clockTick, ctx, this.xCam, this.yCam, 0.35 );
    this.goalAnim.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos, this.yPos - this.camera.yPos, 0.35 );
    Entity.prototype.draw.call(this);
}
