// Change order of adding entities, add to array and sort by type before adding.

LEVEL_LIST = [ "",
"||||||||||||||||||||||||||||||\n |                            |\n |                            |\n |                          g |\n |              ||||          |\n |              |          ||||\n |              |          |  |\n |                         |  |\n |   |||||||                  |\n |         |       ^          |\n |         |       |          |\n |         |       |          |\n |||       |       |          |\n |||       |       |          |\n |         |       |          |\n |         |       |          |\n |                 |          |\n |                 |          |\n |                 |          |\n |                 |          |\n |                 ||||||||||||\n |                            |\n |||||||                      |\n |||||||        ||            |\n |||||||                      |\n |||||||                      |\n |||||||                      |\n |||||||                      |\n |||||||^^^                   |\n ||||||||||||||||||||||||     |\n |                            |\n | @                          |\n |                            |\n ||||||||||||||||||||||||||||||",
"||||||||||||||||||||||||||||||||||||||||||||||||||\n|                 V                              |\n|                                                |\n|                                                |\n|                                                |\n|   g                                            |\n|                                                |\n|                                                |\n| |||||||||||||  ^ ^                    ^^      ||\n| |||||||||||||        |||||||||||||||||||      ||\n|                      |||||||||||||||||||      ||\n|                      |||||||||||||||||||       |\n|                      |||||||||||||||||||       |\n|                      |||||||||||||||||||       |\n|                      |||||||||||||||||||      <|\n|                     <|||||||||||||||||||      <|\n|                     <|||||||||||||||||||      <|\n|                     <|||||||||||||||||||      <|\n|                      |||||||||||||||||||       |\n|                     <|||||||||||||||||||       |\n|                     <|||||||||||||||||||       |\n|                     <|||||||||||||||||||       |\n|                     <|||||||||||||||||||       |\n|                     <|||||||||||||||||||>      |\n|                               ||||||||||>      |\n| @                                  |||||>      |\n|                                                |\n|          ^^^^^                                 |\n||||||||||||||||||||||||||||||||||||||||||||||||||",
""]

/*
He made this hold its own entity list and then performed load and delete functions
He also had to add lvlMngr back into its own list once he emptied it

Current issue is that the lvlMngr is not being updated beacuse it is not in the entitylist of the gameEngine

*/
function LevelManager(game, Kay9, lvl){
    // this.moving = move;
    this.K9 = Kay9;
    this.level = lvl;
    Entity.call(this, game);
    // this.spritesheet = spritesheet;
    this.ctx = game.ctx;

    this.entityList = [];

    //beginGame(game, this.level);

}

LevelManager.prototype = new Entity();
LevelManager.prototype.constructor = LevelManager;

LevelManager.prototype.update = function () {
    switch(this.K9.isDead){
        case "Dead":
            loadLevel(this.game, this.level);
            //console.log("You die die");
        break;

        case "Victory":
            loadLevel(this.game, this.level + 1);
            //console.log("You win");
        break;

        default : break; // nothing
    }
}

function loadLevel(game, levelNumber) {

    var level = this.LEVEL_LIST[levelNumber];
    //this.entityList = [];
    //game.entityList = [];
    // for(a = 2 ; a < this.game.entities.length ; a++){
    //     this.entityList[a].removeFromWorld = true;
    // }

    // add a background inside the load level
    // if levelLength === 0 put up win screen ; else normal loadLevel actions

    game.entities.length = 0;
    var camera = new Camera();

    if( level.length === 0){
        var win = new Background(game, ASSET_MANAGER.getAsset("img/win.jpg"), camera);
        game.addEntity(win); 
    } else {

        var bg = new Background(game, ASSET_MANAGER.getAsset("img/background.png"), camera);
        game.addEntity(bg);

        x = 0;
        y = 0;
        blockwidth  = 65; // this blockwidth's time is limited
        // blockwidth = 65; eventually we'll use this ; for testing load and such i'll keep this commented out
        blockHeight = 65;

        for(i = 0; i < level.length; i++) {

            switch(level.charAt(i)) {
                case(' '): break; // Nothing

                case('|'):
                case('-'):
                    var f = new Floor(game, ASSET_MANAGER.getAsset("img/smallPlatform.png"), x, y, blockwidth, blockHeight, camera);
                    game.addEntity(f);
                    /*this.entityList[i] = f;*/    break; // Wall

                case('@'):
                    var kayNine = new KayNine(game, x, y, camera);
                    this.K9 = kayNine;
                    game.addEntity(kayNine);
                    camera.attachKaynine(kayNine);
                    /*this.entityList[i] = kayNine;*/ break;           // KayNine

                case('g'):
                    var g = new Goal(game, ASSET_MANAGER.getAsset("img/flag.png"),x, y, camera);
                    game.addEntity(g);
                    /*this.entityList[i] = g;*/ break;              // Goal

                case('['): game.addEntity(new Turret(game, x, y, true, camera)); break;      // Right Facing Turret
                case(']'): game.addEntity(new Turret(game, x, y, false, camera)); break;     // Left  Facing Turret
                // not used at the moment ; will get to later

                case('^'):
                    var sUp = new Spike(game, ASSET_MANAGER.getAsset("img/spike_up.png"), x, y, 65, 65, camera);
                    game.addEntity(sUp);
                    /*this.entityList[i] = sUp;*/ break;       // Upward    Facing Spike

                case('v'):
                    var sDown = new Spike(game, ASSET_MANAGER.getAsset("img/spike_up.png"), x, y, 65, 65, camera);
                    game.addEntity(sDown);
                    /*this.entityList[i] = sDown;*/ break;       // Upward    Facing Spike  // Downward  Facing Spike

                case('<'):
                    var sLeft = new Spike(game, ASSET_MANAGER.getAsset("img/spike_left.png"), x + blockwidth - 65, y, 65, 65, camera);
                    game.addEntity(sLeft);
                    /*this.entityList[i] = sLeft;*/ break;     // Leftward  Facing Spike

                case('>'):
                    var sRight = new Spike(game, ASSET_MANAGER.getAsset("img/spike_right.png"), x, y, 65, 65, camera);
                    game.addEntity(sRight);
                    /*this.entityList[i] = sRight;*/ break;    // Rightward Facing Spike

                case('\n'): y = y + blockHeight; x = -blockwidth; break; // Next line

                default: console.log("Level builder encountered unknown character \"" + level.charAt(i) + "\"");
            }
            x = x + blockwidth;
        }
    game.addEntity(camera);

    var lvlMngr = new LevelManager(game, kayNine, levelNumber); // This needs to be here because lvlMngr needs to be in the new entities update list
    game.addEntity(lvlMngr);

    }    //return entityList;
}

function beginGame(game, level) {

    // game.ctx.font = "30px Arial";
    // game.ctx.fillText("Display", 100, 100);

    // clearLevel(game);

    // switch(level) {
    //     case 1: if(state === "victory") { level2(game); } else { level1(game); } break;
    //     case 2: if(state === "victory") { level3(game); } else { level2(game); } break;

    //     default: console.log("You beat the game!!!");
    // }

    loadLevel(this, level);

}


// function clearAllEntities(game){

//     for(const ent in this.game.entities){
//         this.game.entities[ent].

        

//     }

// }

// function level1(game) {

//     var bg = new Background(game, ASSET_MANAGER.getAsset("img/background.png"));
//     game.addEntity(bg);

//     loadLevel(game, 1);

//     game.start(/*game,*/ 1);
//     //beginGame(game, 1);
// }

// function level2(game) {

//     var bg = new Background(game, ASSET_MANAGER.getAsset("img/background.png"));
//     game.addEntity(bg);

//     loadLevel(game, 2);

//     return game.start(game, 2);
// }

// // function clearLevel(game) {

// //     game.entities.length = 0;
// // }