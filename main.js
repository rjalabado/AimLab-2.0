var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/JAPAN.jpg");
ASSET_MANAGER.queueDownload("./sprites/pokeball.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
