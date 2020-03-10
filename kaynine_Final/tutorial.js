function Tutorial(game, spritesheet, xPosition, yPosition, tutorial, camera){
	console.log("Tutorial added");
	this.spritesheet = spritesheet;
	this.ctx = game.ctx;
	this.width = 128;
	this.height = 128;
	this.tutorial = tutorial;
	this.camera = camera;
    Entity.call(this, game, xPosition, yPosition, this.width, this.height, this);	
    
	this.type = "tutorial";
	
	//	ANIMATIONS
	this.blinkW = new Animation(ASSET_MANAGER.getAsset("img/blink_w.png"), 0, 0, 101, 59, 0.5, 2, true, false);
	this.blinkA = new Animation(ASSET_MANAGER.getAsset("img/blink_a.png"), 0, 0, 101, 59, 0.5, 2, true, false);
	this.blinkS  = new Animation(ASSET_MANAGER.getAsset("img/blink_s.png"), 0, 0, 101,59, 0.5, 2, true, false);
	this.blinkD  = new Animation(ASSET_MANAGER.getAsset("img/blink_d.png"), 0, 0, 101, 59, 0.5, 2, true, false);
	this.blinkSpacebar = new Animation(ASSET_MANAGER.getAsset("img/blink_space.png"), 0, 0, 126, 29, 0.5, 2, true, false);
}
Tutorial.prototype = new Entity();
Tutorial.prototype.constructor = Tutorial;

Tutorial.prototype.update = function () {
	}




Tutorial.prototype.draw = function (ctx) {
		console.log("tutorial key = " + this.type);
	if (this.tutorial === "w")	{
	this.blinkW.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos - 40 , this.yPos - this.camera.yPos);}
	if (this.tutorial === "a")	{
	this.blinkA.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos - 40 , this.yPos - this.camera.yPos);}
	if (this.tutorial === "s")	{
	this.blinkS.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos - 40 , this.yPos - this.camera.yPos);}
	if (this.tutorial === "d")	{
	this.blinkD.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos - 40 , this.yPos - this.camera.yPos);}
	if (this.tutorial === "_")	{
	this.blinkSpacebar.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos - 40 , this.yPos - this.camera.yPos);}
}