function TempAnimation(game) {

    this.idleRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_running_right.png"), 0, 0, 128, 128, 0.2, 1, true, false);
    this.idleLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_running_left.png"), 0, 0, 128, 128, 0.2, 1, true, true);

    this.jumpRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping_right.png"), 0, 0, 128, 128, 0.2, 8, true, false);
    this.jumpLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping_left.png"), 0, 0, 128, 128, 0.2, 8, true, false);

    this.fallingRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping_right.png"), 0, 0, 128, 128, 0.2, 1, true, false);
    this.fallingLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping_left.png"), 0, 0, 128, 128, 0.2, 1, true, false);

    this.walkRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_running_right.png"), 0, 0, 128, 128, 0.2, 4, true, false);
    this.walkLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_running_left.png"), 0, 0, 128, 128, 0.2, 4, true, true);

    this.wallClimbRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_climbing_right.png"), 0, 0, 128, 128, 0.2, 9, true, false);
    this.wallClimbLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_climbing_left.png"), 0, 0, 128, 128, 0.2, 9, true, false);

    this.wallHangRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_hanging_right.png"), 0, 0, 128, 128, 0.2, 8, true, false);
    this.wallHangLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_hanging_left.png"), 0, 0, 128, 128, 0.2, 8, true, false);

    this.wallJumpRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_jump_right.png"), 0, 0, 128, 128, 0.2, 5, true, false);
    this.wallJumpLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_jump_left.png"), 0, 0, 128, 128, 0.2, 5, true, false);

    this.animArr = [this.idleRight, this.idleLeft, this.jumpRight, this.jumpLeft, this.fallingRight, this.fallingLeft, this.walkRight, this.walkLeft, this.wallClimbRight, this.wallClimbLeft, this.wallHangRight, this.wallHangLeft, this.wallJumpRight, this.wallJumpLeft];

    Entity.call(this, game, 124, 124);
}

TempAnimation.prototype = new Entity();
TempAnimation.prototype.constructor = TempAnimation;

TempAnimation.prototype.update = function () { Entity.prototype.update.call(this); }

TempAnimation.prototype.draw = function (ctx) {

    i = 0;
    time = new Date();
    curr = new Date();

    if(new Date - time < 5000) {
        animArr[i].drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos);
    } else {
        time = new Date();
        i++;
        if(i > animArr.length) { i = 0; }
    }

    Entity.prototype.draw.call(this);
}