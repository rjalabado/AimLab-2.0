var gameEngine = new GameEngine();
var ASSET_MANAGER = new AssetManager();
//var SCENE_MANAGER = new SceneManager(gameEngine);
var x;
var y;

ASSET_MANAGER.queueDownload("./sprites/JAPAN.jpg");
ASSET_MANAGER.queueDownload("./sprites/pokeball.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	gameEngine.init(ctx);

	

	var SCENE_MANAGER = new SceneManager(gameEngine);


	canvas.requestPointerLock = 
		canvas.requestPointerLock || canvas.mozRequestPointerLock;

	document.exitPointerLock = 
		document.exitPointerLock
		||
		document.mozExitPointerLock;
		
	canvas.onclick = function(){
		canvas.requestPointerLock();
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
			document.removeEventListener("mousemove", updatePosition, false);
		}
	}

	var tracker = document.getElementById('tracker');
	var animation;
	function updatePosition(e) {

		
		x = gameEngine.mouse[0];
		y = gameEngine.mouse[1];
		tracker.textContent = "X position: " + x + ", Y position: " + y;

		if (!animation) {
			animation = requestAnimationFrame(function() {
				animation = null;
				//console.log("X movement: " + e.movementX);
				//console.log("Y movement: " + e.movementY);
				let xCoord = gameEngine.mouse[0];
				let yCoord = gameEngine.mouse[1];
				x += gameEngine.mouse[0] + e.movementX;
				y += gameEngine.mouse[1] + e.movementy;
				console.log("X" + x);
				console.log("Y" + y);
				SCENE_MANAGER.drawCursor(xCoord,yCoord);
				
			});
		}
		
	}
	
	gameEngine.start();
});

