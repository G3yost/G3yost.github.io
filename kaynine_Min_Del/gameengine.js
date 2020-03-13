// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame =(function() {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function() {
    var wallCurrent = Date.now();
    var wallDelta =(wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [];
    this.keyDownList = [];
    this.showOutlines = false;
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;

    this.groundFriction = 1;
    this.wallFriction = 1;
    this.airFriction = 0.1;

    this.gravity = 0.5;

    this.isWin = false;

    this.score = 500;
    this.scoreTime = 0; // Seperate from the timer stuff
}

GameEngine.prototype.init = function(ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function(/*callback,*/ level) {
    console.log("starting game");

    var that = this;

    this.isRunning = true;

   (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();

    //callback();
}

GameEngine.prototype.startInput = function() {
    console.log('starting input');
    var that = this;


    that.keyDownList['a'] = false;
    that.keyDownList['b'] = false;
    that.keyDownList['c'] = false;
    that.keyDownList['d'] = false;
    that.keyDownList['e'] = false;
    that.keyDownList['f'] = false;
    that.keyDownList['g'] = false;
    that.keyDownList['h'] = false;
    that.keyDownList['i'] = false;
    that.keyDownList['j'] = false;
    that.keyDownList['k'] = false;
    that.keyDownList['l'] = false;
    that.keyDownList['m'] = false;
    that.keyDownList['n'] = false;
    that.keyDownList['o'] = false;
    that.keyDownList['p'] = false;
    that.keyDownList['q'] = false;
    that.keyDownList['r'] = false;
    that.keyDownList['s'] = false;
    that.keyDownList['t'] = false;
    that.keyDownList['u'] = false;
    that.keyDownList['v'] = false;
    that.keyDownList['w'] = false;
    that.keyDownList['x'] = false;
    that.keyDownList['y'] = false;
    that.keyDownList['z'] = false;

    that.keyDownList['0'] = false;
    that.keyDownList['1'] = false;
    that.keyDownList['2'] = false;
    that.keyDownList['3'] = false;
    that.keyDownList['4'] = false;
    that.keyDownList['5'] = false;
    that.keyDownList['6'] = false;
    that.keyDownList['7'] = false;
    that.keyDownList['8'] = false;
    that.keyDownList['9'] = false;

    that.keyDownList['-'] = false;
    that.keyDownList['='] = false;
    that.keyDownList['['] = false;
    that.keyDownList[']'] = false;
    that.keyDownList['\\'] = false;
    that.keyDownList[';'] = false;
    that.keyDownList['\''] = false;
    that.keyDownList[','] = false;
    that.keyDownList['.'] = false;
    that.keyDownList['/'] = false;


    that.keyDownList['esc'] = false;
    that.keyDownList['`'] = false;
    that.keyDownList['tab'] = false;
    that.keyDownList['shift'] = false;

    that.keyDownList['ctrl'] = false;
    that.keyDownList['alt'] = false;
    that.keyDownList['space'] = false;
    that.keyDownList['apps'] = false;

    that.keyDownList['f1'] = false;
    that.keyDownList['f2'] = false;
    that.keyDownList['f3'] = false;
    that.keyDownList['f4'] = false;
    that.keyDownList['f5'] = false;
    that.keyDownList['f6'] = false;
    that.keyDownList['f7'] = false;
    that.keyDownList['f8'] = false;
    that.keyDownList['f9'] = false;
    that.keyDownList['f10'] = false;
    that.keyDownList['f11'] = false;
    that.keyDownList['f12'] = false;

    that.keyDownList['pause'] = false;
    that.keyDownList['delete'] = false;
    that.keyDownList['backspace'] = false;
    that.keyDownList['enter'] = false;

    this.ctx.canvas.addEventListener("keydown", function(e) {

        switch(e.which || e.keyCode || 0) {

//          case : that.keyDownList[''] = true; break;

            case 65 : that.keyDownList['a'] = true; break;
            case 66 : that.keyDownList['b'] = true; break;
            case 67 : that.keyDownList['c'] = true; break;
            case 68 : that.keyDownList['d'] = true; break;
            case 69 : that.keyDownList['e'] = true; break;
            case 70 : that.keyDownList['f'] = true; break;
            case 71 : that.keyDownList['g'] = true; break;
            case 72 : that.keyDownList['h'] = true; break;
            case 73 : that.keyDownList['i'] = true; break;
            case 74 : that.keyDownList['j'] = true; break;
            case 75 : that.keyDownList['k'] = true; break;
            case 76 : that.keyDownList['l'] = true; break;
            case 77 : that.keyDownList['m'] = true; break;
            case 78 : that.keyDownList['n'] = true; break;
            case 79 : that.keyDownList['o'] = true; break;
            case 80 : that.keyDownList['p'] = true; break;
            case 81 : that.keyDownList['q'] = true; break;
            case 82 : that.keyDownList['r'] = true; break;
            case 83 : that.keyDownList['s'] = true; break;
            case 84 : that.keyDownList['t'] = true; break;
            case 85 : that.keyDownList['u'] = true; break;
            case 86 : that.keyDownList['v'] = true; break;
            case 87 : that.keyDownList['w'] = true; break;
            case 88 : that.keyDownList['x'] = true; break;
            case 89 : that.keyDownList['y'] = true; break;
            case 90 : that.keyDownList['z'] = true; break;

            case 48 : that.keyDownList['0'] = true; break;
            case 49 : that.keyDownList['1'] = true; break;
            case 50 : that.keyDownList['2'] = true; break;
            case 51 : that.keyDownList['3'] = true; break;
            case 52 : that.keyDownList['4'] = true; break;
            case 53 : that.keyDownList['5'] = true; break;
            case 54 : that.keyDownList['6'] = true; break;
            case 55 : that.keyDownList['7'] = true; break;
            case 56 : that.keyDownList['8'] = true; break;
            case 57 : that.keyDownList['9'] = true; break;

            case 0: that.keyDownList['-'] = true; break;
            case 0: that.keyDownList['='] = true; break;
            case 0: that.keyDownList['['] = true; break;
            case 0: that.keyDownList[']'] = true; break;
            case 0: that.keyDownList['\\'] = true; break;
            case 0: that.keyDownList[';'] = true; break;
            case 0: that.keyDownList['\''] = true; break;
            case 0: that.keyDownList[','] = true; break;
            case 0: that.keyDownList['.'] = true; break;
            case 0: that.keyDownList['/'] = true; break;


            case 27 : that.keyDownList['esc'] = true; break;
            case 192: that.keyDownList['`'] = true; break;
            case 9  : that.keyDownList['tab'] = true; break;
            case 16 : that.keyDownList['shift'] = true; break;

            case 17 : that.keyDownList['ctrl'] = true; break;
            case 18 : that.keyDownList['alt'] = true; break;
            case 32 : that.keyDownList['space'] = true; break;
            case 93 : that.keyDownList['apps'] = true; break;

            case 112: that.keyDownList['f1'] = true; break;
            case 113: that.keyDownList['f2'] = true; break;
            case 114: that.keyDownList['f3'] = true; break;
            case 115: that.keyDownList['f4'] = true; break;
            case 116: that.keyDownList['f5'] = true; break;
            case 117: that.keyDownList['f6'] = true; break;
            case 118: that.keyDownList['f7'] = true; break;
            case 119: that.keyDownList['f8'] = true; break;
            case 120: that.keyDownList['f9'] = true; break;
            case 121: that.keyDownList['f10'] = true; break;
            case 122: that.keyDownList['f11'] = true; break;
            case 123: that.keyDownList['f12'] = true; break;

            case 19 : that.keyDownList['pause'] = true; break;
            case 46 : that.keyDownList['delete'] = true; break;
            case 8  : that.keyDownList['backspace'] = true; break;
            case 13 : that.keyDownList['enter'] = true; break;
        }

        e.preventDefault();
    }, false);

this.ctx.canvas.addEventListener("keyup", function(e) {

        switch(e.which || e.keyCode || 0) {

//          case : that.keyDownList[''] = true; break;

            case 65 : that.keyDownList['a'] = false; break;
            case 66 : that.keyDownList['b'] = false; break;
            case 67 : that.keyDownList['c'] = false; break;
            case 68 : that.keyDownList['d'] = false; break;
            case 69 : that.keyDownList['e'] = false; break;
            case 70 : that.keyDownList['f'] = false; break;
            case 71 : that.keyDownList['g'] = false; break;
            case 72 : that.keyDownList['h'] = false; break;
            case 73 : that.keyDownList['i'] = false; break;
            case 74 : that.keyDownList['j'] = false; break;
            case 75 : that.keyDownList['k'] = false; break;
            case 76 : that.keyDownList['l'] = false; break;
            case 77 : that.keyDownList['m'] = false; break;
            case 78 : that.keyDownList['n'] = false; break;
            case 79 : that.keyDownList['o'] = false; break;
            case 80 : that.keyDownList['p'] = false; break;
            case 81 : that.keyDownList['q'] = false; break;
            case 82 : that.keyDownList['r'] = false; break;
            case 83 : that.keyDownList['s'] = false; break;
            case 84 : that.keyDownList['t'] = false; break;
            case 85 : that.keyDownList['u'] = false; break;
            case 86 : that.keyDownList['v'] = false; break;
            case 87 : that.keyDownList['w'] = false; break;
            case 88 : that.keyDownList['x'] = false; break;
            case 89 : that.keyDownList['y'] = false; break;
            case 90 : that.keyDownList['z'] = false; break;

            case 48 : that.keyDownList['0'] = false; break;
            case 49 : that.keyDownList['1'] = false; break;
            case 50 : that.keyDownList['2'] = false; break;
            case 51 : that.keyDownList['3'] = false; break;
            case 52 : that.keyDownList['4'] = false; break;
            case 53 : that.keyDownList['5'] = false; break;
            case 54 : that.keyDownList['6'] = false; break;
            case 55 : that.keyDownList['7'] = false; break;
            case 56 : that.keyDownList['8'] = false; break;
            case 57 : that.keyDownList['9'] = false; break;

            case 0: that.keyDownList['-'] = false; break;
            case 0: that.keyDownList['='] = false; break;
            case 0: that.keyDownList['['] = false; break;
            case 0: that.keyDownList[']'] = false; break;
            case 0: that.keyDownList['\\'] = false; break;
            case 0: that.keyDownList[';'] = false; break;
            case 0: that.keyDownList['\''] = false; break;
            case 0: that.keyDownList[','] = false; break;
            case 0: that.keyDownList['.'] = false; break;
            case 0: that.keyDownList['/'] = false; break;


            case 27 : that.keyDownList['esc'] = false; break;
            case 192: that.keyDownList['`'] = false; break;
            case 9  : that.keyDownList['tab'] = false; break;
            case 16 : that.keyDownList['shift'] = false; break;

            case 17 : that.keyDownList['ctrl'] = false; break;
            case 18 : that.keyDownList['alt'] = false; break;
            case 32 : that.keyDownList['space'] = false; break;
            case 93 : that.keyDownList['apps'] = false; break;

            case 112: that.keyDownList['f1'] = false; break;
            case 113: that.keyDownList['f2'] = false; break;
            case 114: that.keyDownList['f3'] = false; break;
            case 115: that.keyDownList['f4'] = false; break;
            case 116: that.keyDownList['f5'] = false; break;
            case 117: that.keyDownList['f6'] = false; break;
            case 118: that.keyDownList['f7'] = false; break;
            case 119: that.keyDownList['f8'] = false; break;
            case 120: that.keyDownList['f9'] = false; break;
            case 121: that.keyDownList['f10'] = false; break;
            case 122: that.keyDownList['f11'] = false; break;
            case 123: that.keyDownList['f12'] = false; break;

            case 19 : that.keyDownList['pause'] = false; break;
            case 46 : that.keyDownList['delete'] = false; break;
            case 8  : that.keyDownList['backspace'] = false; break;
            case 13 : that.keyDownList['enter'] = false; break;
        }

//        e.preventDefault();
    }, false);

    console.log('input started');
}

GameEngine.prototype.addEntity = function(entity) {
    console.log('added entity');
    //console.log(entity.type);
    this.entities.push(entity);
}

GameEngine.prototype.queueEntity = function(entity) {
    console.log('queued entity');
    this.entities.unshift(entity);
}

GameEngine.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.beginPath();
    this.ctx.save();
    for(var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'black';
    this.ctx.fillText("Score:" + this.score, 10,30);
    this.ctx.strokeText("Score:" + this.score, 10,30);
    this.ctx.stroke();
    this.ctx.restore();
}

GameEngine.prototype.update = function() {
    var entitiesCount = this.entities.length;

    for(var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if(!entity.removeFromWorld) {
            entity.update();
        }
    }

    for(var i = this.entities.length - 1; i >= 0; --i) {
        if(this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }

    this.scoreTime += this.clockTick;
    if(this.scoreTime > 1){
        this.score--;
        this.scoreTime = 0;
    }
}

GameEngine.prototype.loop = function() {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
}