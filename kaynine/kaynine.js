function KayNine(game) {

    // Animations
    this.idleRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_idle_temp.png"), 0, 0, 128, 128, 0.2, 1, true, false);
    this.idleLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_idle_temp.png"), 0, 0, 128, 128, 0.2, 1, true, false);

    this.jumpRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping.png"), 0, 0, 128, 128, 0.2, 1, true, false);
    this.jumpLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping.png"), 0, 0, 128, 128, 0.2, 1, true, false);

    this.fallingRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping.png"), 0, 0, 128, 128, 0.2, 1, true, false);
    this.fallingLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping.png"), 0, 0, 128, 128, 0.2, 1, true, false);

    this.walkRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_running_temp.png"), 0, 0, 128, 128, 0.2, 1, true, false);
    this.walkLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_running_temp.png"), 0, 0, 128, 128, 0.2, 1, true, false);

    this.wallClimbRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_climbing.png"), 0, 0, 128, 128, 0.2, 1, true, false);
    this.wallClimbLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_climbing.png"), 0, 0, 128, 128, 0.2, 1, true, false);

    this.wallHangRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_hang.png"), 0, 0, 128, 128, 0.2, 1, true, false);
    this.wallHangLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_hang.png"), 0, 0, 128, 128, 0.2, 1, true, false);

    this.wallJumpRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_jump.png"), 0, 0, 128, 128, 0.2, 1, true, false);
    this.wallJumpLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_jump.png"), 0, 0, 128, 128, 0.2, 1, true, false);

    //this.animArr[] = {this.idleRight, this.idleLeft, this.jumpRight, this.jumpLeft, this.fallingRight, this.fallingLeft, this.walkRight, this.walkLeft, this.wallClimbRight, this.wallClimbLeft, this.wallHangRight, this.wallHangLeft, this.wallJumpRight, this.wallJumpLeft};

    // Status
    this.jumpReq = false;
    this.onGround = true;
    this.onWall = false;

    // Movement
    this.xAccel = 2;
    this.yAccel = 2;

    this.xMax = 10;

    this.jumpVelocity = 15;
    this.wallJumpVelocity = 10;
    this.groundAccel = 0.5;
    this.wallAccel = this.groundAccel / 8;
    this.airAccel = this.groundAccel / 2;

    this.ground = 592;
    this.leftWall  = 50;
    this.rightWall = 750;

    Entity.call(this, game, 100, this.ground);
}

KayNine.prototype = new Entity();
KayNine.prototype.constructor = KayNine;

KayNine.prototype.update = function () {

if(this.game.keyDownList['shift']) { console.log("Start of update: jumpReq = " + this.jumpReq + ", onGround = " + this.onGround + ", onWall = " + this.onWall + ", xPos = " + this.xPos + ", xVel = " + this.xVel + ", xAccel = " + this.xAccel + ", yPos = " + this.yPos + ", yVel = " + this.yVel + ", yAccel = " + this.yAccel); }

/*

    // Modify accel/state
// this.game.keyDownList;
    // Ground move set
    if(this.onGround) {

        if(this.game.keyDownList['space']) { this.yVel = this.jumpVelocity; this.jumpReq = true; }

             if(this.game.keyDownList['a'] && !this.game.keyDownList['d']) { this.xAccel = -this.groundAccel; }
        else if(this.game.keyDownList['d'] && !this.game.keyDownList['a']) { this.xAccel =  this.groundAccel; }
    }
    // Wall move set
    else if(this.onWall) {

        if(this.game.keyDownList['space']) { this.xVel = this.onWall === 'right' ? -this.wallJumpVelocity : this.wallJumpVelocity; this.onWall = false; }

             if(this.onWall === "right" && !this.game.keyDownList['d']) { this.onWall = false; }
        else if(this.onWall === "left"  && !this.game.keyDownList['a']) { this.onWall = false; }

             if(this.onWall && this.game.keyDownList['w']) { this.yAccel = -this.wallAccel; }
        else if(this.onWall && this.game.keyDownList['s']) { this.yAccel =  this.wallAccel; }
    }
    // Air move set
    else {

        if(this.jumpReq && !this.keyDownList['space']) { this.jumpReq = false; }

             if(this.game.keyDownList['a'] && !this.game.keyDownList['d']) { this.xAccel = -this.airAccel; }
        else if(this.game.keyDownList['d'] && !this.game.keyDownList['a']) { this.xAccel =  this.airAccel; }
    }

    // Modify position/state
    if(this.yPos >= this.ground) { this.yPos = this.ground; this.yVel = 0; this.yAccel = 0; this.onGround = true; }
    else { this.yAccel += this.game.gravity; this.yVel += this.yAccel; this.yPos += this.yVel; this.onGround = false; }

    if(this.onGround) {

        this.xAccel += this.facingRight ? this.game.groundFriction : -this.game.groundFriction;
    }

    if(this.xPos < this.leftWall) { this.xPos = this.leftWall; this.xVel = 0; this.xAccel = 0; }
    else if(this.xPos > this.rightWall - 124) { this.xPos = this.rightWall - 124; this.xVel = 0; this.xAccel = 0; }
    else {

        if(this.xAccel > -1/128 && this.xAccel < 1/128) { this.xAccel = 0; }
    }

    this.xVel += this.xAccel;


    if(this.xVel > this.xMax) { this.xVel =  this.xMax; }
    else if(this.xVel < -this.xMax) { this.xVel = -this.xMax; }
    else { this.xVel += this.xAccel; this.xPos += this.xVel; }

    if(this.xVel > -0.125 && this.xVel < 0.125) { this.xVel = 0;}

    if(this.xVel > 0) { this.facingRight =  true; }
    if(this.xVel < 0) { this.facingRight = false; }

    this.xPos += this.xVel;

*/

    // Ground move set
    if(this.onGround) {

        if(this.game.keyDownList['a'] && !this.game.keyDownList['d']) { this.xVel -= this.xAccel; }
        if(this.game.keyDownList['d'] && !this.game.keyDownList['a']) { this.xVel += this.xAccel; }


        if(this.xVel > 0) {

            this.xVel -= this.game.groundFriction;
            if(this.xVel > this.xMax) {
                this.xVel = this.xMax;
            }
        }

        if(this.xVel < 0) {

            this.xVel += this.game.groundFriction;
            if(this.xVel < -this.xMax) {
                this.xVel = -this.xMax;
            }
        }
    } else if (this.onWall) {

        this.yVel = 0;

        if(this.game.keyDownList['w'] && !this.game.keyDownList['s']) { this.yVel += this.yAccel; }
        if(this.game.keyDownList['s'] && !this.game.keyDownList['w']) { this.yVel -= this.yAccel; }

        if(this.facingRight && this.game.keyDownList['space'])  { this.xVel = -this.wallJumpVelocity; this.yVel = this.wallJumpVelocity; }

        if(!this.facingRight && this.game.keyDownList['space']) { this.xVel = this.wallJumpVelocity; this.yVel = this.wallJumpVelocity; }
    }

    else {

        if(this.game.keyDownList['a'] && !this.game.keyDownList['d']) { this.xVel -= this.xAccel * this.game.airFriction; console.log("Accel = " + this.xAccel * this.game.airFriction, ", Vel = " + this.xVel); }
        if(this.game.keyDownList['d'] && !this.game.keyDownList['a']) { this.xVel += this.xAccel * this.game.airFriction; console.log("Accel = " + this.xAccel * this.game.airFriction, ", Vel = " + this.xVel); }
    }

    if(this.xVel === this.xPre && this.xVel != this.xMax && this.xVel != -this.xMax && this.onGround) { this.xVel = 0; }

    this.xPre  = this.xVel;
    this.xPos += this.xVel;
    this.yPos -= this.yVel;

    if(this.xPos < this.leftWall) { this.xPos = this.leftWall; this.xVel = 0; this.onWall = true; }
    else if(this.xPos > this.rightWall - 124) { this.xPos = this.rightWall - 124; this.xVel = 0; this.onWall = true; }
    else { this.onWall = false; }

    if(this.yPos >= this.ground) {

        this.onGround = true;
        this.yPos = this.ground;
        this.yVel = 0;

        if(!this.game.keyDownList['space']) { this.jumpREQ = false; }
        if(this.game.keyDownList['space'] && !this.jumpREQ) { this.yVel = this.jumpVelocity; this.jumpREQ = true; }

    } else {

        this.onGround = false;

        if(this.jumpREQ && this.game.keyDownList['space']) { this.yVel -= this.game.gravity / 2; }
        else { this.yVel -= this.game.gravity; this.jumpREQ = false; }
    }

    if(this.xPos > this.rightWall - 125 || this.xPos < this.leftWall + 1) { this.onWall == true; }
    else { this.onWall = false; }

    if(this.xVel > 0) { this.facingRight =  true; }
    if(this.xVel < 0) { this.facingRight = false; }

if(this.game.keyDownList['shift']) { console.log("Start of update: jumpReq = " + this.jumpReq + ", onGround = " + this.onGround + ", onWall = " + this.onWall + ", xPos = " + this.xPos + ", xVel = " + this.xVel + ", xAccel = " + this.xAccel + ", yPos = " + this.yPos + ", yVel = " + this.yVel + ", yAccel = " + this.yAccel) }

    Entity.prototype.update.call(this);
}

KayNine.prototype.draw = function (ctx) {

    if(false) {}

    else if (this.onGround && this.facingRight && this.xVel != 0) { this.walkRight.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos); console.log("walkRight"); }
    else if (this.onGround && !this.facingRight && this.xVel != 0) { this.walkLeft.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos); console.log("walkLeft"); }
    else if (this.onGround && this.facingRight) { this.idleRight.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos); console.log("idleRight"); }
    else if (this.onGround && !this.facingRight) { this.idleLeft.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos); console.log("idleLeft"); }
    /*
    else if (this.onWall && this.facingRight && this.game.keyDownList['w'] && !this.game.keyDownList['s']) { this.wallClimbRight.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos); console.log("wallClimbRight"); }
    else if (this.onWall && !this.facingRight && this.game.keyDownList['w'] && !this.game.keyDownList['s']) { this.wallClimbLeft.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos); console.log("wallClimbLeft"); }
    else if (this.onWall && this.facingRight) { this.wallHangLeft.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos); console.log("wallHangRight"); }
    else if (this.onWall && !this.facingRight) { this.wallHangLeft.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos); console.log("wallHangLeft"); }
    */
    else if (this.facingRight) { this.jumpRight.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos); console.log("jumpRight"); }
    else                       { this.jumpLeft.drawFrame(this.game.clockTick, ctx, this.xPos, this.yPos); console.log("jumpLeft"); }



    Entity.prototype.draw.call(this);
}