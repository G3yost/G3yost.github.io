function Lazer(game, spritesheet, xPosition, yPosition, speed, direction, camera){
    Entity.call(this, game, xPosition, yPosition + 10, 50, 10, this);
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.speed = speed;
    this.direction = direction;
    this.camera = camera;



    if(this.direction === "R") {
        this.travel  = new Animation(this.spritesheet, 0, 0, 50, 50, 0.2, 7, true, false);
    } 
    if(this.direction === "L"){
        this.travel  = new Animation(this.spritesheet, 0, 0, 50, 50, 0.2, 7, true, true);
    }
    // collision behavior can mimic that of a spike
    // this is technically a spike on the move
    this.type = "lazer";
}

Lazer.prototype = new Entity();
Lazer.prototype.constructor = Lazer;

Lazer.prototype.update = function () {

    var distance = this.game.clockTick * this.speed;
    if(this.direction === "R"){
        this.xPos += distance;
        this.boundingBox.update(this.xPos, this.yPos + 27);
    } 

    if(this.direction === "L"){
        this.xPos -= distance;
        this.boundingBox.update(this.xPos + 20, this.yPos + 27);
    }

    //this.boundingBox.update(this.xPos, this.yPos + 27);

    for (const ent in this.game.entities) {

        entity = this.game.entities[ent];
        if(this != entity && entity.type != "camera" && entity.type != "background"){
            if (this.boundingBox.collide(entity.boundingBox)) {
                if(entity.type === "kaynine") { // need this to kill the dog
                    entity.update();
                }

                console.log("Lazer has hit something");
                console.log(entity.type);
                this.removeFromWorld = true; // having this will cause the crash of kaynine colliding with lazer
                console.log(this.game.entities.length);
            }
        }
    }

}


Lazer.prototype.draw = function (ctx) {

    //ctx.rect(this.xPos - this.camera.xPos, this.yPos - this.camera.yPos, this.boundingBox.width, this.boundingBox.height);
	

    this.travel.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos , this.yPos - this.camera.yPos, 1.5);
    Entity.prototype.draw.call(this);
}