function Vacuum(game, spritesheet, xPosition, yPosition, speed, direction, camera){
	console.clear();
	this.spritesheet = spritesheet;
	this.ctx = game.ctx;
	this.width = 80;
	this.height = 64;
	this.direction = direction;
    Entity.call(this, game, xPosition, yPosition, this.width, this.height, this);

    this.camera = camera;	
	this.speed = speed;
	this.yVel = 0;
	this.startClock = 20;
	this.clockTicker = this.startClock;



	//STATUS
	this.onWall   = false;
    this.isDead   = false;
	this.onGround = false;
	
	
	
    this.type = "vacuum";
	
	//	ANIMATIONS
	this.attackRight = new Animation(ASSET_MANAGER.getAsset("img/vacuum_attack_left.png"), 0, 0, 128, 64, 0.2, 8, true, false);
	this.movingRight = new Animation(ASSET_MANAGER.getAsset("img/vacuum_moving_right.png"), 0, 0, 128, 64, 0.075, 3, true, false);
	this.attackLeft  = new Animation(ASSET_MANAGER.getAsset("img/vacuum_attack_right.png"), 0, 0, 128, 64, 0.2, 8, true, false);
	this.movingLeft  = new Animation(ASSET_MANAGER.getAsset("img/vacuum_moving_left.png"), 0, 0, 128, 64, 0.075, 3, true, true);
}
Vacuum.prototype = new Entity();
Vacuum.prototype.constructor = Vacuum;

Vacuum.prototype.update = function () {
	//console.log("What direction?" + this.direction);
	
	 for (const ent in this.game.entities) {

        entity = this.game.entities[ent];
		if (entity.type === "kaynine" || entity.type === "goal")	{}
		else{
		
        if (this.boundingBox.collide(entity.boundingBox)) {
                        if	(this.lastBox.bottom <= entity.lastBox.top)    {this.onGround = true; }	
						else	{this.onGround = false;}
						if	(this.lastBox.right  <= entity.lastBox.left && /*this.lastBox.top <= entity.lastBox.bottom &&*/ this.direction === "R") {
							this.onWall = true;
						}	else if (this.lastBox.left  >= entity.lastBox.right && /*this.lastBox.top >= entity.lastBox.bottom &&*/ this.direction === "L") {
							this.onWall = true;
						}	else  { 
						this.onWall = false; 
						}	
						
						
						
						    
						

                    
        }
	}
}
this.lastBox.update(this.xPos, this.yPos);
	var travel = this.game.clockTick * this.speed;
	
		if (this.clockTicker > 0)	{
			this.clockTicker -= 1;
		}	else	{
			console.log("hop tick");
			this.yPos -= 5;
			this.clockTicker = this.startClock;
		}
		if (this.onWall === true)	{
		console.log("hop wall");
		this.yPos -= 5;
		if (this.onGround === false)	{
			if (this.direction === "R")	{
				this.direction = "L";
				this.xPos -= travel * 10;
			}	else {			
			this.direction = "R";
			this.xPos += travel * 10;
		}
	}
	}	else	{
		if (this.direction === "R")	{
			this.xPos += travel;
		}	else	{
			this.xPos -= travel;
		}
	}
		
	if (this.onGround === true)	{
		this.yPos -= this.yVel;	//	prevents vacuum from falling through floor if falling from another level
		this.yVel = 0;
	}	else	{
		this.yVel += this.game.gravity;
	}
	this.yPos += this.yVel;
	this.boundingBox.update(this.xPos, this.yPos);
	}




Vacuum.prototype.draw = function (ctx) {
    if (this.direction === "R")	{
	this.movingRight.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos - 40 , this.yPos - this.camera.yPos);}
	else	{
	this.movingLeft.drawFrame(this.game.clockTick, ctx, this.xPos - this.camera.xPos - 40 , this.yPos - this.camera.yPos);}
    
	Entity.prototype.draw.call(this);
}