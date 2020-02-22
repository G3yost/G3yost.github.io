function Camera (game) {

	//	constructor
	this.type = "camera";
	this.width = document.getElementById('gameWorld').width;
	this.height = document.getElementById('gameWorld').height;
	this.horBuff = 400;
	this.vertBuff = 250;
	this.kaynine = null;
	//	Makes Camera object an entity
	Entity.call(this, game, 0, 0, this.width, this.height, this);
	this.boundingBox = new BoundingBox(this.xPos + this.horBuff, this.yPos + this.vertBuff, this.width - (2 * this.horBuff), this.height - (2 * this.vertBuff));	// creates camera bounding box that KayNine interacts with
}



Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;
Camera.prototype.attachKaynine = function(kaynine) {

	this.kaynine = kaynine;
	this.update();
}

Camera.prototype.update = function ()	{

	if(!this.boundingBox.collide(this.kaynine.boundingBox)) {

		if(this.kaynine.xPos < this.boundingBox.left) this.updatePos(this.kaynine.boundingBox.right - this.horBuff, this.yPos);
		if(this.kaynine.xPos > this.boundingBox.right) this.updatePos(this.kaynine.boundingBox.left - (this.horBuff + this.boundingBox.width), this.yPos);
		if(this.kaynine.yPos < this.boundingBox.top) this.updatePos(this.xPos, this.kaynine.boundingBox.bottom - this.vertBuff);
		if(this.kaynine.yPos > this.boundingBox.bottom) this.updatePos(this.xPos, this.kaynine.boundingBox.top - (this.vertBuff + this.boundingBox.height));

	}
}

Camera.prototype.draw = function(ctx) {

	/*ctx.rect(this.boundingBox.left, this.boundingBox.top, this.boundingBox.width, this.boundingBox.height);
	ctx.stroke();*/
}

Camera.prototype.updatePos = function(x, y)	{
	this.xPos = x;
	this.yPos = y;

	this.boundingBox.update(this.xPos + this.horBuff, this.yPos + this.vertBuff);
}