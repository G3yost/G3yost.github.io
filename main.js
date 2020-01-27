function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function(tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if(this.loop) {
        if(this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if(this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function() {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function() {
    return(this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function() {
}

Background.prototype.draw = function(ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0, 334, 512,180);
    Entity.prototype.draw.call(this);
}

function Mario(game) {

    this.faceRight = new Animation(ASSET_MANAGER.getAsset("./img/MarioSprites.png"), 108, 0, 18, 18, 0.06, 1, true, false);
    this.faceLeft  = new Animation(ASSET_MANAGER.getAsset("./img/MarioSprites.png"),  90, 0, 18, 18, 0.06, 1, true, false);
    this.moveRight = new Animation(ASSET_MANAGER.getAsset("./img/MarioSprites.png"), 126, 0, 18, 18, 0.06, 3, true, false);
    this.moveLeft  = new Animation(ASSET_MANAGER.getAsset("./img/MarioSprites.png"),  36, 0, 18, 18, 0.06, 3, true, false);
    this.slidRight = new Animation(ASSET_MANAGER.getAsset("./img/MarioSprites.png"),  18, 0, 18, 18, 0.06, 1, true, false);
    this.slidLeft  = new Animation(ASSET_MANAGER.getAsset("./img/MarioSprites.png"), 180, 0, 18, 18, 0.06, 1, true, false);
    this.jumpRight = new Animation(ASSET_MANAGER.getAsset("./img/MarioSprites.png"), 198, 0, 18, 18, 0.06, 1, true, false);
    this.jumpLeft  = new Animation(ASSET_MANAGER.getAsset("./img/MarioSprites.png"),   0, 0, 18, 18, 0.06, 1, true, false);

    this.facingRight = true;
    this.jumpREQ     = false;

    this.xAcc = 0.1875;
    this.jumpVel = 5;

    this.xVel = 0;
    this.yVel = 0;

    this.xMax = 20;
    this.xPre = this.xVel;

    this.radius = 100; // Not sure what this is !!!
    this.ground = 300;
    Entity.call(this, game, 20, this.ground);
}

Mario.prototype = new Entity();
Mario.prototype.constructor = Mario;

Mario.prototype.update = function() {

    if(this.game.keyDownList['a'] && !this.game.keyDownList['d']) { this.facingRight = false; this.xVel -= this.xAcc; }
    if(this.game.keyDownList['d'] && !this.game.keyDownList['a']) { this.facingRight = true;  this.xVel += this.xAcc; }

    if(this.xVel > 0) {

        this.xVel -= .09375;
        if(this.xVel > this.xMax) {
            this.xVel = this.xMax;
        }
    }

    if(this.xVel < 0) {

        this.xVel += .09375;
        if(this.xVel < -this.xMax) {
            this.xVel = -this.xMax;
        }
    }

    if(this.xVel === this.xPre && this.xVel != this.xMax && this.xVel != -this.xMax) { this.xVel = 0; }

    if(this.yPos >= this.ground) {

        this.yPos = this.ground;
        this.yVel = 0;
        if(!this.game.keyDownList['space']) { this.jumpREQ = false; }
        if(this.game.keyDownList['space'] && !this.jumpREQ) { this.yVel = this.jumpVel; this.jumpREQ = true; }

    } else {

        if(this.jumpREQ && this.game.keyDownList['space']) { this.yVel -= this.game.gravity / 3; }
        else if (this.game.keyDownList['space']) { this.yvel -= this.game.gravity; this.jumpREQ = false; }
        else { this.yVel -= this.game.gravity;}
    }

if(this.game.keyDownList['ctrl']) { console.log(["xPos = " + this.xPos, "xVel = " + this.xVel, "yPos = "+ this.yPos, "yVel = " + this.yVel, "jumpREQ = " + this.jumpREQ]); }

    this.xPre  = this.xVel;
    this.xPos += this.xVel;
    this.yPos -= this.yVel;

    if(this.xPos > 506) { this.xPos = -29; }
    if(this.xPos < -30) { this.xPos = 505;}

    Entity.prototype.update.call(this);
}

Mario.prototype.draw = function(ctx) {

    if (this.facingRight && this.xVel === 0 && this.yVel === 0) {

        this.faceRight.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos, 2);
    } else if(!this.facingRight && this.xVel === 0 && this.yVel === 0) {

        this.faceLeft.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos, 2);
    } else if(this.facingRight && this.yVel === 0 && this.xVel > 0) {

        this.moveRight.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos, 2);
    } else if(this.facingRight && this.yVel === 0) {

        this.slidLeft.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos, 2);
    } else if(!this.facingRight && this.yVel === 0 && this.xVel < 0) {

        this.moveLeft.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos, 2);
    } else if(!this.facingRight && this.yVel === 0) {

        this.slidRight.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos, 2);
    } else if(this.facingRight) {

        this.jumpRight.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos, 2);
    } else {

        this.jumpLeft.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos, 2);
    }

    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/MarioSprites.png");

ASSET_MANAGER.downloadAll(function() {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var mario = new Mario(gameEngine);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(mario);

    gameEngine.init(ctx);
    gameEngine.start();
});
