function Turret(game, spritesheet, xPosition, yPosition, speed, firerate, direction,  camera){
    //this.moving = move;
    Entity.call(this, game, xPosition, yPosition, 65, 65, this);
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.camera = camera;
    this.speed = speed;
    this.firerate = firerate;
    this.direction = direction;
    this.time = 0;

    this.right = xPosition + 66;

    //console.log("Here");
    this.left = xPosition - 66;

//    369 * 280
    //console.log("Here again");
    this.turrAnim  = new Animation(this.spritesheet, 0, 0, 369, 358, 0.2, 1, true, false);

    this.type = "floor";
}

Turret.prototype = new Entity();
Turret.prototype.constructor = Turret;

Turret.prototype.update = function () {
    this.time +=  this.game.clockTick;
    if(this.time > this.firerate){
        //console.log("Time for lazer");


        // ADD LAZERS NOT AT THE END OF THE ARRAY
        // ADD THEM INTO THE MIDDLE OF THE LIST

        if (this.direction === "R") {
            console.log("Reached Right lazer");
            var Pew = new Lazer(this.game, ASSET_MANAGER.getAsset("img/lazer_right.png"), this.right, this.yPos - 10, this.speed, this.direction, this.camera);
        }
         
        if (this.direction === "L"){
            this.boundingBox.update(this.xPos + 20, this.yPos);
            console.log("Reached left lazer");
            var Pew = new Lazer(this.game, ASSET_MANAGER.getAsset("img/lazer_left.png"), this.left, this.yPos - 10, this.speed, this.direction,  this.camera);
        }

        this.game.queueEntity(Pew); // add a new lazer to the entity list
        this.time = 0;
    }
    //console.log("Ending turret");
}

Turret.prototype.draw = function (ctx) {
    this.turrAnim.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos, this.yPos - this.camera.yPos, 0.28 );
    Entity.prototype.draw.call(this);
}
