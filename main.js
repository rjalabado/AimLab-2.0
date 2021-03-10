var x = 1565;
var y = 350;

var gameEngine = new GameEngine();
var gameEngineAimball = new GameEngine();
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/reticle.png");
ASSET_MANAGER.queueDownload("./sprites/theAimball.png");
ASSET_MANAGER.queueDownload("./sprites/theAimballRed.png");
ASSET_MANAGER.queueDownload("./sprites/theAimballGreen.png");
ASSET_MANAGER.queueDownload("./sprites/theAimPerson.png");
ASSET_MANAGER.queueDownload("./sprites/theAimPersonRed.png");
ASSET_MANAGER.queueDownload("./sprites/Another Wallpaper 1.png");
ASSET_MANAGER.queueDownload("./sprites/Another Wallpaper 2.png");
ASSET_MANAGER.queueDownload("./sprites/Another Wallpaper 3.png");
ASSET_MANAGER.queueDownload("./sprites/Main_menu_words.png");
ASSET_MANAGER.queueDownload("./sprites/uwu.png");
ASSET_MANAGER.queueDownload("./sprites/Welcome_screen.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	var SCENE_MANAGER = new SceneManager(gameEngine);


	canvas.requestPointerLock = 
		canvas.requestPointerLock || canvas.mozRequestPointerLock;

	document.exitPointerLock = 
		document.exitPointerLock || document.mozExitPointerLock;
		
	
	this.click = [];
	canvas.onclick = function(){
		canvas.requestPointerLock();
		click[0] = x;
		click[1] = y;
		 if(canvas.webkitRequestFullScreen) {
	        canvas.webkitRequestFullScreen();
         }else {
		 	canvas.mozRequestFullScreen();
         }
		 //60000 = 1 minute
		 //HIT ON ONE BALL MISS ON TWO???
		gameEngine.go(true);
	};

	document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
	
	function lockChangeAlert() {
		if (document.pointerLockElement === canvas ||
			document.mozPointerLockElement === canvas) {
			// console.log('The pointer lock status is now locked');
			document.addEventListener("mousemove", updatePosition, false);
		} else {
			// console.log('The pointer lock status is now unlocked');
			gameEngine.setCamera(1565,350);
			document.removeEventListener("mousemove", updatePosition, false);
		}
	}

	var tracker = document.getElementById('tracker');
	var animation;
	function updatePosition(e) {
		tracker.textContent = "X: " + x + ", Y: " + y + " (Tracker's Position)";
		tracker2.textContent = "X: " + (x+1920/2) + ", Y: " + (y+1080/2) + " (Real Position) ";

		if (!animation) {
			animation = requestAnimationFrame(function() {
				animation = null;

				x +=  e.movementX;
				y +=  e.movementY; 
				
				// it's doing that because the top left part is at 0,0
				// while the reticle is actually just in the center

				if (x < 0) x = 0;
				if (y < 0) y = 0;
				// if (x > 1919 - (1080 + 1080/5)) x = 1919 - (1080 + 1080/5);
				// if (y > 1080 - 720) y = 1080 - 720;
				if (x > 2288) x = 2288;
				if (y > 721) y = 721;
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

