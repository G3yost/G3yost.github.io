DRAW_HIT_BOXES = false;

function Entity(game, x, y, width, height) {
    this.game = game;

    // Game world
    this.facingRight = true;

    this.xPos = x;
    this.xVel = 0;

    this.yPos = y;
    this.yVel = 0;

    this.boundingBox = new BoundingBox(x, y, width, height);
    this.lastBox = new BoundingBox(x, y, width, height);

    this.removeFromWorld = false;
}

Entity.prototype.update = function() {
}

Entity.prototype.draw = function(ctx) {

    if(DRAW_HIT_BOXES) {

        this.game.ctx.strokeStyle = "green";
        this.game.ctx.lineWidth = 2

        this.game.ctx.rect(this.boundingBox.left - this.camera.xPos, this.boundingBox.top - this.camera.yPos, this.boundingBox.width, this.boundingBox.height);
    }
}

Entity.prototype.rotateAndCache = function(image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}