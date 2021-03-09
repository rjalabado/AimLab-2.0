const VISIBLE_X = 1920, VISIBLE_Y = 1080;

class Background {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Another Wallpaper 1.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 5000, 2128, 1, .30, 0, false, true);
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
    }

    update() {
        this.animation = new Animator(this.spritesheet, this.game.cameraX, this.game.cameraY, 
            this.game.cameraX + VISIBLE_X, this.game.cameraY + VISIBLE_Y, 1, .30, 0, false, true);
    }
}

// have a seperate gun class for static image and one for animating
class Gun {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/uwu.png");
        // this.animation = new Animator(this.spreadsheet, 0, 0, 500, 491, 3, .3, 0, false, true);
        this.animation = new Animator(this.spritesheet, 0, 0, 612, 754, 1, .05, 1, false, true);
        this.a = 0;
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 1021, 430, 1);
    };

    update() {
        // if (this.game.clickFlag == true) {
        //     // this.wingman.play();
        // }
        // if (this.game.clickFlag == true) {
        //     this.animation = new Animator(this.spritesheet, 0, 0, 612, 754, 4, .05, 1, false, false);
        //     // this.a += 1;
        // }
        // // if (this.a > 0) this.a += 1;
        // // if (this.a == 20) {
        // //     this.removeFromWorld = true;
        // // }
    };
}

class HUD {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/reticle.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 5000, 2128, 1, .30, 0, false, true);
		this.end = false;
		this.f = false;
    }

    draw(ctx) {
		ctx.fillStyle = "White";
		ctx.font = '50px serif';
		this.animation.drawFrame(this.game.clockTick, ctx, (VISIBLE_X/2)-(64*.5), (VISIBLE_Y/2)-(64*.5), .5);
		if(this.f){
			ctx.fillText(this.game.printScore(), 50, 50);
			ctx.fillText(this.game.printTimer(this.game), 50, 100);
		};
		if(this.game.retTime == 0){
			this.end = true;
		};
		if(this.end){			
			ctx.fillText("GAME OVER!", (VISIBLE_X/2)-156, (VISIBLE_Y/2)+16);
			ctx.fillText(this.game.returnAccuracy(), (VISIBLE_X/2)-156, (VISIBLE_Y/2)+116);
			ctx.fillText("REFRESH TO CHOOSE A NEW GAME MODE!", (VISIBLE_X/2)-475.69420, (VISIBLE_Y/2)+216);
		};
        // 64 is x and y of reticle
    }

    update() {};
}

class AimBall {
    constructor(game, x, y) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/theAimball.png");
        this.x = x;
        this.y = y;
        this.animation = new Animator(this.spritesheet, 0, 0, 5000, 2128, 1, .30, 0, false, true);
        this.currentReticleX = (VISIBLE_X/2);
        this.currentReticleY = (VISIBLE_Y/2);
		this.game = game;
        this.ballhitSound = new Audio("./audio/ripped From Aimlab LOL.wav");
        this.ballhitSound.volume = .15;
		this.canShoot = true;
        // this.ballSize = 1;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1); // use this.x and this.y
    }

    update() {
        this.animation = new Animator(this.spritesheet, this.game.cameraX, this.game.cameraY, 
            this.game.cameraX + VISIBLE_X, this.game.cameraY + VISIBLE_Y, 1, .30, 0, false, true);
        this.onCircle(this.game.cameraX + this.currentReticleX, this.game.cameraY + this.currentReticleY, this.game.clickFlag);
		// adds current camera x,y + the current x,y reticle's center (the camera's exact center)
	}

    onCircle(reticleX, reticleY, clickFlag) {
        // OLD let startX = this.x + 720, startY = this.y + 399, endX = this.x + 781, endY = this.y + 460; 
        let startX = this.x + 2286, startY = this.y + 721, endX = this.x + 2376, endY = this.y + 810; 

        // horizontal and vertical of ball on big picture (pixels) 
        // SHOULD BE CHANGED IF PHOTO IS CHANGED

        if (clickFlag == true && this.canShoot) {
			this.game.shots += .3;
            this.ballhitSound.play();
            if (reticleX >= startX && reticleX <= endX
                && reticleY >= startY && reticleY <= endY) {
                    this.ballhitSound.play();
                    this.removeFromWorld = true;
					this.game.addPoint();
					//console.log("hit");
            }
			else{
				this.game.losePoint();
				//console.log("miss");
			}
        }
    }

    moveBall(x,y) {
        this.x += x;
        this.y += y;
    }

    // changeSize(ballSize) {
    //     this.ballSize -= ballSize;
    // }

	turnOn(){
		this.removeFromWorld = false;
	};
}

//gamemode classes...
//og gridshot
//implement hit miss counter
class GridShot{
	constructor(game){
		this.game = game;
		this.aimball = [];

		this.aimball[0] = new HUD(gameEngine);
		
		this.aimball[1] = new AimBall(gameEngine, 500, 250);
        // this.aimball[1]= new AimBall(gameEngine, 850, 450); //MAX
        // this.aimball[1]= new AimBall(gameEngine, -380, -180); //MIN
        this.aimball[2]= new AimBall(gameEngine, 300, 200);
        this.aimball[3]= new AimBall(gameEngine, 100, 150);
        this.gun = new Gun(gameEngine);
        
		this.game.addEntity(this.aimball[3]);
		this.game.addEntity(this.aimball[2]);
		this.game.addEntity(this.aimball[1]);
		this.game.addEntity(this.aimball[0]);
        this.game.addEntity(this.gun);
		this.hud = new HUD(gameEngine);
        this.game.addEntity(this.hud);
		this.hud.f = true;
		this.hud.title = false;
	}

	draw(ctx){}
	
    update(){
		if(this.aimball[1].removeFromWorld == true){
			var x = this.aimball[1].x;
			var y = this.aimball[1].y;

			this.aimball[1] = new AimBall(gameEngine, this.rerollX(), this.rerollY());

            this.game.setEntityNull(this.game.entities.indexOf(this.aimball[1]));
			this.game.addEntity(this.aimball[1]);
            this.game.addEntity(this.aimball[0]);
            this.game.addEntity(this.gun);
			this.game.addEntity(this.hud); 
		};
		if(this.aimball[2].removeFromWorld == true){
			var x = this.aimball[2].x;
			var y = this.aimball[2].y;

			this.aimball[2] = new AimBall(gameEngine, this.rerollX(), this.rerollY());

            this.game.setEntityNull(this.game.entities.indexOf(this.aimball[2]));
			this.game.addEntity(this.aimball[2]);
            this.game.addEntity(this.aimball[0]);
            this.game.addEntity(this.gun); 
			this.game.addEntity(this.hud);
		};
		if(this.aimball[3].removeFromWorld == true){
			var x = this.aimball[3].x;
			var y = this.aimball[3].y;

            this.aimball[3] = new AimBall(gameEngine, this.rerollX(), this.rerollY());
			
            this.game.setEntityNull(this.game.entities.indexOf(this.aimball[3]));
            this.game.addEntity(this.aimball[3]);
            this.game.addEntity(this.aimball[0]);
            this.game.addEntity(this.gun); 
			this.game.addEntity(this.hud);
		};
		if(this.aimball[0].end){
			var i;
			for(i = 1; i < this.aimball.length; i++){
				this.aimball[i].canShoot = false;
			}
		}
	}

    rerollX(arrayPlace) {
        let difference = 850-(-380);
        var a = 0, b = 0, yeah = Math.floor(Math.random() * difference) -380 + 1;

        if (arrayPlace == 1) a = 3, b = 2;
        if (arrayPlace == 2) a = 3, b = 1;
        if (arrayPlace == 3) a = 2, b = 1;

        while ((yeah >= this.aimball[a].x && yeah <= this.aimball[a].x+100)
                || (yeah >= this.aimball[b].x && yeah <= this.aimball[b].x+100)) {
                    yeah = Math.floor(Math.random() * difference) -380 + 1;
                }

        return yeah;
    };

    rerollY(arrayPlace) {
        let difference = 450-(-180);
        var a = 0, b = 0, yeah = Math.floor(Math.random() * difference) -180 + 1;

        if (arrayPlace == 1) a = 3, b = 2;
        if (arrayPlace == 2) a = 3, b = 1;
        if (arrayPlace == 3) a = 2, b = 1;

        while ((yeah >= this.aimball[a].y && yeah <= this.aimball[a].y+100)
                || (yeah >= this.aimball[b].y && yeah <= this.aimball[b].y+100)) {
                    yeah = Math.floor(Math.random() * difference) -180 + 1;
                }

        return yeah;
    };
 }

 class mainMenu{
 	 constructor(game){
		this.game = game;
		this.buttons = [];
		this.buttons[0] = new AimBall(gameEngine,500,500);
		this.buttons[1] = new AimBall(gameEngine,700,500);
		this.game.addEntity(this.buttons[0]);
		this.game.addEntity(this.buttons[1]);
		this.buttons[2] = new Gun(gameEngine);
		this.game.addEntity(this.buttons[2]);
		this.hud = new HUD(gameEngine);
        this.game.addEntity(this.hud);
		this.trigger = 0;
	 };
	 draw(ctx){};
	 update(){
		if(this.buttons != null){
			if(this.buttons[0].removeFromWorld == true){
				this.trigger = 1;
			};
			if(this.buttons[1].removeFromWorld == true){
				this.trigger = 2;
			};
		};
		if(this.trigger == 1){
			this.trigger = 0;
			this.buttons[1].removeFromWorld = true;
			this.watcher();
			var gridshot = new GridShot(gameEngine);
			this.game.addEntity(gridshot);
		}
		if(this.trigger == 2){
			//credits
			this.watcher()
		}
	 };
	 watcher(){
		this.buttons = null;
		this.hud = null;
	 };
 }