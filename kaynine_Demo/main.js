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

var tempArr = [0, this.idleRight, this.idleLeft, this.jumpRight, this.jumpLeft, this.fallingRight, this.fallingLeft, this.walkRight, this.walkLeft, this.wallClimbRight, this.wallClimbLeft, this.wallHangRight, this.wallHangLeft, this.wallJumpRight, this.wallJumpLeft];

    this.animArr = tempArr;
    this.time = new Date();
    this.curr = new Date();
    this.i = 1;

    Entity.call(this, game, 0, 0);
}

TempAnimation.prototype = new Entity();
TempAnimation.prototype.constructor = TempAnimation;

TempAnimation.prototype.update = function () { Entity.prototype.update.call(this); }

TempAnimation.prototype.draw = function (ctx) {

    if(this.curr  - this.time < 2000) {

        this.curr = new Date();
        this.animArr[this.i].drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos);
    } else {
        this.time = new Date();
        this.i = this.i + 1;
        if(!(this.i < this.animArr.length)) { this.i = 1; }
    }

    Entity.prototype.draw.call(this);
}

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("img/background.png");
ASSET_MANAGER.queueDownload("img/smallPlatform.png");
ASSET_MANAGER.queueDownload("img/spike.png");

// Files
    //ASSET_MANAGER.queueDownload("./img/kay_nine_idle_right.png");
    //ASSET_MANAGER.queueDownload("./img/kay_nine_idle_left.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_jumping_right.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_jumping_left.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_running_right.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_running_left.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_wall_climbing_right.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_wall_climbing_left.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_wall_hanging_right.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_wall_hanging_left.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_wall_jump_right.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_wall_jump_left.png");

ASSET_MANAGER.queueDownload("./img/kay_nine_idle_temp.png");    // !!! CHANGE FILE NAME IN ANIM
ASSET_MANAGER.queueDownload("./img/kay_nine_running_temp.png"); // !!! CHANGE FILE NAME IN ANIM
ASSET_MANAGER.queueDownload("./img/kay_nine_jumping_temp.png"); // !!! CHANGE FILE NAME IN ANIM



ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("img/background.png"));

    // Floors are about 190 in length ; 187 creates a nice "repeat" look
    // Inefficient as hell and I'll ask about it
    var f1 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 0, 500, 187, 50);
    //var f2 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 187, 500, 187, 50);
    var f3 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 374, 500, 187, 50);
    var f4 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 561, 500, 187, 50);
    var f5 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 748, 500, 187, 50);
    var f6 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 935, 500, 187, 50);

    var f7 = new Floor (gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 465, 300, 187, 50);

    var s1 = new Spike(gameEngine, ASSET_MANAGER.getAsset("img/spike.png"), 120, 600, 50, 50);

    var kayNine = new KayNine(gameEngine);
    var tempAnimation = new TempAnimation(gameEngine);

    gameEngine.addEntity(bg);

    gameEngine.addEntity(f1);
    //gameEngine.addEntity(f2);
    gameEngine.addEntity(f3);
    gameEngine.addEntity(f4);
    gameEngine.addEntity(f5);
    gameEngine.addEntity(f6);
    gameEngine.addEntity(f7);

    gameEngine.addEntity(s1);

    gameEngine.addEntity(kayNine);
    gameEngine.addEntity(tempAnimation);

    gameEngine.init(ctx);
    gameEngine.start();
});
