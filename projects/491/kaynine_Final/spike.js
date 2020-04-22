function Spike(game, spritesheet, xPosition, yPosition, width, height, dir, camera){
    Entity.call(this, game, xPosition, yPosition, width, height, this);
    this.spritesheet = spritesheet;
    this.ctx = game.ctx;
    this.camera = camera;


    switch(dir) {

        case "u": this.boundingBox.height = this.boundingBox.height - 35;
                  this.boundingBox.width  = this.boundingBox.width - 20;
                  this.boundingBox.update(this.xPos + 10, this.yPos + 35);
            break;
        case "d": this.boundingBox.height = this.boundingBox.height - 35;
                  this.boundingBox.width  = this.boundingBox.width - 20;
                  this.boundingBox.update(this.xPos + 10, this.yPos);
            break;
        case "l": this.boundingBox.height = this.boundingBox.height - 20;
                  this.boundingBox.width  = this.boundingBox.width - 35;
                  this.boundingBox.update(this.xPos + 35, this.yPos + 10);
            break;
        case "r": this.boundingBox.height = this.boundingBox.height - 20;
                  this.boundingBox.width  = this.boundingBox.width - 35;
                  this.boundingBox.update(this.xPos, this.yPos + 10);
            break;
    }

    this.type = "spike";
}

Spike.prototype = new Entity();
Spike.prototype.constructor = Floor;

Spike.prototype.update = function () {

    // Will probably need something to check if player has collided

}


Spike.prototype.draw = function (ctx) {
    ctx.drawImage(this.spritesheet,
                    this.xPos - this.camera.xPos, this.yPos - this.camera.yPos);
    Entity.prototype.draw.call(this);
}