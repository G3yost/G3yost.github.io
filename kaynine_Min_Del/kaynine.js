function KayNine(game, xPos, yPos, camera) {

    this.type = "kaynine";

    // Animations
    this.idleRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_idle_right.png"), 0, 0, 128, 128, 0.075, 8, true, false);
    this.idleLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_idle_left.png"), 0, 0, 128, 128, 0.075, 8, true, true);
    this.jumpRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping_right.png"), 0, 0, 128, 128, 0.2, 8, true, false);
    this.jumpLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping_left.png"), 0, 0, 128, 128, 0.2, 8, true, false);

    this.fallingRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping_right.png"), 0, 0, 128, 128, 0.2, 1, true, false);
    this.fallingLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_jumping_left.png"), 0, 0, 128, 128, 0.2, 1, true, false);

    this.walkRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_running_right.png"), 0, 0, 128, 128, 0.06, 8, true, false);
    this.walkLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_running_left.png"), 0, 0, 128, 128, 0.06, 8, true, true);

    this.wallClimbRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_climbing_right.png"), 0, 0, 128, 128, 0.2, 9, true, false);
    this.wallClimbLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_climbing_left.png"), 0, 0, 128, 128, 0.2, 9, true, false);

    this.wallHangRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_hanging_right.png"), 0, 0, 128, 128, 0.2, 8, true, false);
    this.wallHangLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_hanging_left.png"), 0, 0, 128, 128, 0.2, 8, true, false);

    this.wallJumpRight = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_jump_right.png"), 0, 0, 128, 128, 0.2, 5, true, false);
    this.wallJumpLeft  = new Animation(ASSET_MANAGER.getAsset("./img/kay_nine_wall_jump_left.png"), 0, 0, 128, 128, 0.2, 5, true, false);



    // Status
    this.jumpReq  = false;
    this.onGround = false;
    this.onWall   = false;
    this.isDead   = false;

    this.width  = 128;
    this.height = 128;

    // Movement
    this.xAccel = 2;
    this.yAccel = 2;

    this.xMax = 10;

    this.jumpVelocity = 12.5;
    this.wallJumpVelocity = this.jumpVelocity * 3 / 4;
    this.groundAccel = 0.5;
    this.wallAccel = this.groundAccel / 8;
    this.airAccel = this.groundAccel / 2;

    this.camera = camera;

    // this.ground = 592;
    // this.leftWall  = 50;
    // this.rightWall = 750;

    Entity.call(this, game, xPos, yPos, this.width, this.height, this);
}

KayNine.prototype = new Entity();
KayNine.prototype.constructor = KayNine;

KayNine.prototype.update = function () {

if(this.game.keyDownList['shift']) { console.log("Start of update: jumpReq = " + this.jumpReq + ", onGround = " + this.onGround + ", onWall = " + this.onWall + ", xPos = " + this.xPos + ", xVel = " + this.xVel + ", xAccel = " + this.xAccel + ", yPos = " + this.yPos + ", yVel = " + this.yVel + ", yAccel = " + this.yAccel); }

    if(this.isDead) {

        this.xVel = 0;
        this.yVel = 0;
        this.xAccel = 0;
        this.yAccel = 0;

        if(this.xMax > 100) {
            this.game.isRunning = false;
        } else {
            this.xMax = this.xMax + 1;
        }
    }
    // Wall/Ground move set
    else if(this.onGround && this.onWall) {

        this.xVel = 0;
        this.yVel = 0;

        if(this.facingRight) {

            if(!(this.game.keyDownList['d'] && !this.game.keyDownList['a'])) { this.xPos = this.xPos - 1; }

        } else {

            if(!(this.game.keyDownList['a'] && !this.game.keyDownList['d'])) { this.xPos = this.xPos + 1; }
        }

        if(this.game.keyDownList['w'] && !this.game.keyDownList['s']) { this.yVel += this.yAccel; }
        if(this.game.keyDownList['s'] && !this.game.keyDownList['w']) { this.yVel -= this.yAccel; }

        if(!this.game.keyDownList['space']) { this.jumpREQ = false; }
        if(this.game.keyDownList['space'] && !this.jumpREQ) {

            if(this.facingRight) { this.xVel = -this.wallJumpVelocity; this.yVel = this.wallJumpVelocity; }
            else { this.xVel = this.wallJumpVelocity; this.yVel = this.wallJumpVelocity; }

            this.jumpREQ = true;
        }
    }
    // Ground move set
    else if(this.onGround) {
        if(this.game.keyDownList['a'] && !this.game.keyDownList['d']) { this.xVel -= this.xAccel; }
        if(this.game.keyDownList['d'] && !this.game.keyDownList['a']) { this.xVel += this.xAccel; }
        if(!this.game.keyDownList['space']) { this.jumpREQ = false; }
        if(this.game.keyDownList['space'] && !this.jumpREQ) { this.yVel = this.jumpVelocity; this.jumpREQ = true; this.onGround = false; }

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

        if(this.xVel === this.xPre && this.xVel != this.xMax && this.xVel != -this.xMax) { this.xVel = 0; }

    } else if (this.onWall) { // Wall move set

        this.xVel = 0;

        if(this.game.keyDownList['w'] && !this.game.keyDownList['s']) {

            this.yVel = this.yAccel;

        } else if(!this.facingRight  && this.game.keyDownList['a']) {

            this.yVel = 0;

        } else if(this.facingRight && this.game.keyDownList['d']) {

            this.yVel = 0;

        } else {

            this.yVel = -this.yAccel;
        }


        if(this.game.keyDownList['s'] && !(this.game.keyDownList['w'] || (!this.facingRight  && this.game.keyDownList['a']) || (this.facingRight && this.game.keyDownList['d']))) {

            if(this.facingRight) {
                this.xPos = this.xPos - 1;
            } else {
                this.xPos = this.xPos + 1;
            }
        }

        if(!this.game.keyDownList['space']) { this.jumpREQ = false; }
        if(this.game.keyDownList['space'] && !this.jumpREQ) {

            if(this.facingRight) { this.xVel = -this.wallJumpVelocity; this.yVel = this.wallJumpVelocity; }
            else { this.xVel = this.wallJumpVelocity; this.yVel = this.wallJumpVelocity; }

            this.jumpREQ = true;
        }




    } else {

        if(this.game.keyDownList['a'] && !this.game.keyDownList['d']) { this.xVel -= this.xAccel * this.game.airFriction; }
        if(this.game.keyDownList['d'] && !this.game.keyDownList['a']) { this.xVel += this.xAccel * this.game.airFriction; }

        if(this.jumpREQ && this.game.keyDownList['space']) { this.yVel -= this.game.gravity / 2; }
        else { this.yVel -= this.game.gravity; this.jumpREQ = false; }
    }

    this.lastBox.update(this.xPos, this.yPos);

    this.xPre  = this.xVel;
    this.xPos += this.xVel;
    this.yPos -= this.yVel;

    // Complex Collision with all entities.
    this.boundingBox.update(this.xPos, this.yPos);

    this.onGround = null;
    this.onWall = false;

    groundCount = 0;

    for (const ent in this.game.entities) {

        entity = this.game.entities[ent];
        if (this.boundingBox.collide(entity.boundingBox)) {

            state = "n/a";
            switch (entity.type) {

                case "floor":
                         if(this.lastBox.bottom <= entity.lastBox.top)    { state = "top"; }
                    else if(this.lastBox.right  <= entity.lastBox.left)   { state = "left"; }
                    else if(this.lastBox.left   >= entity.lastBox.right)  { state = "right"; }
                    else if(this.lastBox.top    >= entity.lastBox.bottom) { state = "bottom"; }
                    else { console.log("Error on collision side"); console.log(this.lastBox); console.log(entity.lastBox); }

                    switch(state) {
                        case "top"    :
                                if(this.onWall) {

                                    groundCount++;
console.log(groundCount);
                                    if(groundCount > 1) { this.onGround = true; }

                                } else { this.onGround = true; }

                                if(this.onGround) {
                                   this.yPos = entity.boundingBox.top - this.boundingBox.height;
                                    this.yVel = 0;
                                    this.onGround = true;
                                }
//console.log(this.onGround);
/*
                                if(!this.onWall || this.onGround === null) {
                                    this.yPos = entity.boundingBox.top - this.boundingBox.height;
                                    this.yVel = 0;
                                    this.onGround = true;
                                } else if(!this.onWall || this.onGround === 0) {

                                    this.onGround = null

                                } else {

                                    this.onGround = 0;
                                }*/
                            break;
                        case "bottom" :
                                this.yPos = entity.boundingBox.bottom + 1;
                                this.yVel = 0;
                            break;
                        case "left"   :
console.log("wall");
                                this.xPos = entity.boundingBox.left - this.boundingBox.width;
                                this.onWall = true;
                            break;
                        case "right"  :
console.log("wall");
                                this.xPos = entity.boundingBox.right;
                                this.onWall = true;
                            break;
                    }

                break;

                case "goal":
                        //this.isDead = "Victory";
                        this.game.isWin = true;
                        this.removeFromWorld = true;
                break;

                case "lazer":
                    this.removeFromWorld = true;
                break;

                case "spike":
                        //this.isDead = "Dead";
                    this.removeFromWorld = true;
                break;
				
				case "vacuum":
				this.removeFromWorld = true;
				break;

                default:
            }
        }
    //}

    if(this.onGround === null) { this.onGround = false; }

    if(this.xVel > 0) { this.facingRight =  true; }
    if(this.xVel < 0) { this.facingRight = false; }

if(this.game.keyDownList['shift']) { console.log("End of update: jumpReq = " + this.jumpReq + ", onGround = " + this.onGround + ", onWall = " + this.onWall + ", xPos = " + this.xPos + ", xVel = " + this.xVel + ", xAccel = " + this.xAccel + ", yPos = " + this.yPos + ", yVel = " + this.yVel + ", yAccel = " + this.yAccel) }

    Entity.prototype.update.call(this);
}}

KayNine.prototype.draw = function (ctx) { // this.xPos - this.camera.xPos , this.yPos - this.camera.yPos

    // Dead
    if(this.isDead) { /*this.deathAnimation.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos);*/ }

    // Walking
    else if (this.onGround && this.facingRight && this.xVel != 0) { this.walkRight.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos); }
    else if (this.onGround && !this.facingRight && this.xVel != 0) { this.walkLeft.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos); }

    // Idle
    else if (this.onGround && this.facingRight) { this.idleRight.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos); }
    else if (this.onGround && !this.facingRight) { this.idleLeft.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos); }

    // Wall Climbing
    else if (this.onWall && this.facingRight && this.game.keyDownList['w'] && this.yVel !=0) { this.wallClimbRight.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos); }
    else if (this.onWall && !this.facingRight && this.game.keyDownList['w'] && this.yVel !=0) { this.wallClimbLeft.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos); }

    // Wall Hanging
    else if (this.onWall && this.facingRight) { this.wallHangRight.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos); }
    else if (this.onWall && !this.facingRight) { this.wallHangLeft.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos); }

    // Jumping
    else if (this.facingRight) { this.jumpRight.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos); }
    else                       { this.jumpLeft.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos); }

    Entity.prototype.draw.call(this);
}