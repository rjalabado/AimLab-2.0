var x = 69;
var y = 69;

var gameEngine = new GameEngine();
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/JAPAN.jpg");
ASSET_MANAGER.queueDownload("./sprites/pokeball.png");
ASSET_MANAGER.queueDownload("./sprites/reticle.png");
ASSET_MANAGER.queueDownload("./sprites/stockAimlabWallpaper.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	gameEngine.init(ctx);
	var SCENE_MANAGER = new SceneManager(gameEngine);


	canvas.requestPointerLock = 
		canvas.requestPointerLock || canvas.mozRequestPointerLock;

	document.exitPointerLock = 
		document.exitPointerLock || document.mozExitPointerLock;
		
	
	this.click = []
	canvas.onclick = function(){
		canvas.requestPointerLock();
		click[0] = x;
		click[1] = y;
	};

	document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
	
	function lockChangeAlert() {
		if (document.pointerLockElement === canvas ||
			document.mozPointerLockElement === canvas) {
			console.log('The pointer lock status is now locked');
			document.addEventListener("mousemove", updatePosition, false);
		} else {
			console.log('The pointer lock status is now unlocked');
			gameEngine.setCamera(453,249);
			document.removeEventListener("mousemove", updatePosition, false);
		}
	}

	var tracker = document.getElementById('tracker');
	var animation;
	function updatePosition(e) {
		tracker.textContent = "X position: " + x + ", Y position: " + y;

		if (!animation) {
			animation = requestAnimationFrame(function() {
				animation = null;

				x +=  e.movementX;
				y +=  e.movementY;

				if (x < 0) x = 0;
				if (y < 0) y = 0;
				if (x > 1919 - (1080 + 1080/5)) x = 1919 - (1080 + 1080/5);
				if (y > 1080 - 720) y = 1080 - 720;
					// makes sure the camera stays within the borders
					// tailored to the specific photo, should be changed to variables
				
				gameEngine.setCamera(x,y);	
					// added this so gameengine can recieve coordinates, 
					// but it sets a delay(?) if you esc to free mouse and immediately try to lock again
			});
		}
	}
	gameEngine.start();
});

