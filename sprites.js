const VISIBLE_X = 1280, VISIBLE_Y = 720;


class Background {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/stockAimlabWallpaper.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 1280, 720, 1, .30, 0, false, true);
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
        
    }

    update() {
        this.animation = new Animator(this.spritesheet, this.game.cameraX, this.game.cameraY, 
            this.game.cameraX + VISIBLE_X, this.game.cameraY + VISIBLE_Y, 1, .30, 0, false, true);
    }
}

class Reticle {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/reticle.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 128, 128, 1, .30, 0, false, true);
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, (VISIBLE_X/2)-(64*.5), (VISIBLE_Y/2)-(64*.5), .5);
        // 64 is x and y of reticle
    }

    update() {
    }
}

class AimBall {
    constructor(game, x, y) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/theAimball.png");
        this.x = x;
        this.y = y;
        this.animation = new Animator(this.spritesheet, 0, 0, 1920, 1080, 1, .30, 0, false, true);
        this.currentReticleX = (VISIBLE_X/2);
        this.currentReticleY = (VISIBLE_Y/2);
		this.game = game;
        // this.label = label;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1); // use this.x and this.y
        // console.log(this.x + " " + this.y);
    }

    update() {
        this.animation = new Animator(this.spritesheet, this.game.cameraX, this.game.cameraY, 
            this.game.cameraX + VISIBLE_X, this.game.cameraY + VISIBLE_Y, 1, .30, 0, false, true);
        this.onCircle(this.game.cameraX + this.currentReticleX, this.game.cameraY + this.currentReticleY, this.game.clickFlag);
		// adds current camera x,y + the current x,y reticle's center (the camera's exact center)
	}

    // 61x61 pixes originally
    onCircle(reticleX, reticleY, clickFlag) {
        let startX = this.x + 720, startY = this.y + 399, endX = this.x + 781, endY = this.y + 460; 
        // horizontal and vertical of ball on big picture (pixels) 
        // SHOULD BE CHANGED IF PHOTO IS CHANGED

        // add here a way to detect if in a cirlce, not a box?
        // take area, start subtracting from each corner? lol
        if (reticleX >= startX && reticleX <= endX
            && reticleY >= startY && reticleY <= endY && clickFlag == true) {
                this.removeFromWorld = true;
                console.log("hit");
                // this.game.setClickFlag(false); 
                // caused a problem with layers (fixed, moved clickflag to update() in gameengine)
        }
    }

	turnOn(){
		this.removeFromWorld = false;
	};
}

//gamemode classes...

class GridShot{
	constructor(game){
		this.game = game;
		this.aimball = [];

		this.aimball[0] = new Reticle(gameEngine);
		
		this.aimball[1] = new AimBall(gameEngine, 500, 250);
        this.aimball[2]= new AimBall(gameEngine, 300, 200);
        this.aimball[3]= new AimBall(gameEngine, 100, 150);
        
		this.game.addEntity(this.aimball[3]);
		this.game.addEntity(this.aimball[2]);
		this.game.addEntity(this.aimball[1]);
		this.game.addEntity(this.aimball[0]);

	}
	draw(ctx){
	
	}
	update(){
		if(this.aimball[1].removeFromWorld == true){
			var x = this.aimball[1].x;
			var y = this.aimball[1].y;
			this.aimball[1] = new AimBall(gameEngine, randomInt(x+100,x-100), randomInt(y+100,y-100));
			this.game.addEntity(this.aimball[1]);

			this.game.addEntity(this.aimball[0]);
		};
		if(this.aimball[2].removeFromWorld == true){
			var x = this.aimball[2].x;
			var y = this.aimball[2].y;
			this.aimball[2] = new AimBall(gameEngine, randomInt(x+100,x-100), randomInt(y+100,y-100));
			this.game.addEntity(this.aimball[2]);

			this.game.addEntity(this.aimball[0]);
		};
		if(this.aimball[3].removeFromWorld == true){
			var x = this.aimball[3].x;
			var y = this.aimball[3].y;
			this.aimball[3] = new AimBall(gameEngine, randomInt(x+100,x-100), randomInt(y+100,y-100));
			this.game.addEntity(this.aimball[3]);

			this.game.addEntity(this.aimball[0]);
		};
	}

	randomInt(max, min) {
		return Math.floor(Math.random() * max) + min + 1;
	};
}