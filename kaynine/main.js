var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("img/background.png");
ASSET_MANAGER.queueDownload("img/smallPlatform.png");

// Files
ASSET_MANAGER.queueDownload("./img/kay_nine_idle.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_jumping.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_running.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_wall_climbing.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_wall_hang.png");
ASSET_MANAGER.queueDownload("./img/kay_nine_wall_jump.png");

ASSET_MANAGER.queueDownload("./img/kay_nine_idle_temp.png");    // !!! CHANGE FILE NAME IN ANIM
ASSET_MANAGER.queueDownload("./img/kay_nine_running_temp.png"); // !!! CHANGE FILE NAME IN ANIM
ASSET_MANAGER.queueDownload("./img/kay_nine_jumping_temp.png"); // !!! CHANGE FILE NAME IN ANIM



ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("img/background.png"));

    // Floors are about 190 in length ; 187 creates a nice "repeat" look
    // Inefficient as hell and I'll ask about it
    var f1 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 0, 500, false);
    var f2 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 187, 500, false);
    var f3 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 374, 500, false);
    var f4 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 561, 500, false);
    var f5 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 748, 500, false);
    var f6 = new Floor(gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 935, 500, false);

    var f7 = new Floor (gameEngine, ASSET_MANAGER.getAsset("img/smallPlatform.png"), 465, 300, false);

    var kayNine = new KayNine(gameEngine);

    gameEngine.addEntity(bg);

    gameEngine.addEntity(f1);
    gameEngine.addEntity(f2);
    gameEngine.addEntity(f3);
    gameEngine.addEntity(f4);
    gameEngine.addEntity(f5);
    gameEngine.addEntity(f6);
    gameEngine.addEntity(f7);

    gameEngine.addEntity(kayNine);

    gameEngine.init(ctx);
    gameEngine.start();
});
