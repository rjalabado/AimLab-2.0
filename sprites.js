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
class BackgroundWords {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Main_menu_words.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 5000, 2128, 1, .30, 0, false, true);
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, -150, 0, 1);
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
         if (this.game.clickFlag == true && this.a == 0) {
             this.animation = new Animator(this.spritesheet, 0, 0, 612, 754, 4, .2, 1, false, false);
             this.a += 1;
         } 
         if (this.a > 0) this.a += 1;
         if (this.a == 150) {
             this.animation = new Animator(this.spritesheet, 0, 0, 612, 754, 1, .2, 1, false, true);
             this.a = 0;
         }
    };
}

class HUD {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/reticle.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 5000, 2128, 1, .30, 0, false, true);
		this.title = ASSET_MANAGER.getAsset("./sprites/Welcome_screen.png");
		this.titleAnimate = new Animator(this.title, 0, 0, 1920, 1080, 1, .30, 0, false, true);
		this.end = false;
		this.f = false;
		this.t = true;
		this.something = true;
    }

    draw(ctx) {
		ctx.fillStyle = "White";
		ctx.font = '50px serif';
		this.animation.drawFrame(this.game.clockTick, ctx, (VISIBLE_X/2)-(64*.5), (VISIBLE_Y/2)-(64*.5), .5);
		if(this.t){
			 this.titleAnimate.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
			 //console.log(Document.fullscreenElement);
		};
		if(this.something && this.game.g){
			this.t = false;
			this.something = false;
			this.titleAnimate.removeFromWorld = true;
			this.backgroundMusic = new Audio("./audio/Dr - I Keep Holding On (My Hope Will Never Die).wav");
		};
		if(this.f){
			ctx.fillText(this.game.printScore(), 50, 50);
			ctx.fillText(this.game.printTimer(this.game), 50, 100);
		};
		if(this.game.retTime == 0){
			this.end = true;
		};
		if(this.end){			
			ctx.fillText("GAME OVER!", (VISIBLE_X/2)-156, (VISIBLE_Y/2)+16);
			ctx.fillText(this.game.returnAccuracy(), (VISIBLE_X/2)-200, (VISIBLE_Y/2)+116);
			ctx.fillText("REFRESH TO CHOOSE A NEW GAME MODE!", (VISIBLE_X/2)-475.69420, (VISIBLE_Y/2)+216);
		};
        // 64 is x and y of reticle
    }

    update() {};
}

class AimBall {
    constructor(game, x, y, m) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/theAimball.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 5000, 2128, 1, .30, 0, false, true);
        this.currentReticleX = (VISIBLE_X/2);
        this.currentReticleY = (VISIBLE_Y/2);
        this.ballhitSound = new Audio("./audio/ripped From Aimlab LOL.wav");
        this.ballhitSound.volume = .15;
		this.canShoot = true;
		this.m = m;
		this.timeRec = false;
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
			if(this.m == false){
				this.game.shots += 1;
			}
			console.log(2);
            this.ballhitSound.play();
            if (reticleX >= startX && reticleX <= endX
                && reticleY >= startY && reticleY <= endY) {
                this.ballhitSound.play();
                this.removeFromWorld = true;
				if(this.m == false){
					this.game.addPoint();
				}
					//console.log("hit");
            } else {
				if(this.m == false){
					this.game.losePoint();
					this.timeRec = true;
				}
				//console.log("miss");
			}
        }
    }

    moveBall(x,y) {
        this.x += x;
        this.y += y;
    }

	turnOn(){
		this.removeFromWorld = false;
	};
}

class AimBallRed {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/theAimballRed.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 5000, 2128, 1, .30, 0, false, true);
        this.currentReticleX = (VISIBLE_X/2);
        this.currentReticleY = (VISIBLE_Y/2);
        this.ballhitSound = new Audio("./audio/ripped From Aimlab LOL.wav");
        this.ballhitSound.volume = .15;
		this.canShoot = true;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1); // use this.x and this.y
    }

    update() {
        this.animation = new Animator(this.spritesheet, this.game.cameraX, this.game.cameraY, 
            this.game.cameraX + VISIBLE_X, this.game.cameraY + VISIBLE_Y, 1, .30, 0, false, true);
        this.onCircle(this.game.cameraX + this.currentReticleX, this.game.cameraY + this.currentReticleY, this.game.clickFlag);
	}

    onCircle(reticleX, reticleY, clickFlag) {
        let startX = this.x + 2286, startY = this.y + 721, endX = this.x + 2376, endY = this.y + 810;

        if (clickFlag == true && this.canShoot) {
			this.game.shots += 1;
			console.log(3);
            this.ballhitSound.play();
            if (reticleX >= startX && reticleX <= endX
                && reticleY >= startY && reticleY <= endY) {
                this.ballhitSound.play();
                this.removeFromWorld = true;
				this.game.losePoint(true);
            }
        }
    }

    moveBall(x,y) {
        this.x += x;
        this.y += y;
    }

	turnOn(){
		this.removeFromWorld = false;
	};
}
class AimBallGreen {
    constructor(game, x, y, m) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/theAimballGreen.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 5000, 2128, 1, .30, 0, false, true);
        this.currentReticleX = (VISIBLE_X/2);
        this.currentReticleY = (VISIBLE_Y/2);
        this.ballhitSound = new Audio("./audio/ripped From Aimlab LOL.wav");
        this.ballhitSound.volume = .15;
		this.canShoot = true;
		this.m = m;
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
			if(this.m == false){
				this.game.shots += 1;
			}
			console.log(2);
            this.ballhitSound.play();
            if (reticleX >= startX && reticleX <= endX
                && reticleY >= startY && reticleY <= endY) {
                this.ballhitSound.play();
                this.removeFromWorld = true;
				if(this.m == false){
					this.game.addPoint();
				}
					//console.log("hit");
            } else {
				if(this.m == false){
					this.game.losePoint();
				}
				//console.log("miss");
			}
        }
    }

    moveBall(x,y) {
        this.x += x;
        this.y += y;
    }

	turnOn(){
		this.removeFromWorld = false;
	};
}

class AimPerson {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/theAimPerson.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 5000, 2128, 1, .30, 0, false, true);
        this.currentReticleX = (VISIBLE_X/2);
        this.currentReticleY = (VISIBLE_Y/2);
        this.ballhitSound = new Audio("./audio/ripped From Aimlab LOL.wav");
        this.ballhitSound.volume = .15;
		this.canShoot = true;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    }

    update() {
        this.animation = new Animator(this.spritesheet, this.game.cameraX, this.game.cameraY, 
            this.game.cameraX + VISIBLE_X, this.game.cameraY + VISIBLE_Y, 1, .30, 0, false, true);
        this.onTarget(this.game.cameraX + this.currentReticleX, this.game.cameraY + this.currentReticleY, this.game.clickFlag);
    }

    // basically the same thing as the aimball onCircle, accounts for headshots and body shots
    onTarget(reticleX, reticleY, clickFlag) {
        let startXHead = this.x + 2286, startYHead = this.y + 721, endXHead = this.x + 2376, endYHead = this.y + 810;
        let startXBody = this.x + 2283, startYBody = this.y + 811, endXBody = this.x + 2381, endYBody = this.y + 965; 

        if (clickFlag == true && this.canShoot) {
			this.game.shots += 1;
			console.log(4);
            this.ballhitSound.play();

            if (reticleX >= startXHead && reticleX <= endXHead
                && reticleY >= startYHead && reticleY <= endYHead) {
                    this.ballhitSound.play();
                    this.removeFromWorld = true;
					this.game.addPoint(true);
                    this.game.clickFlag = false;
            } else if (reticleX >= startXBody && reticleX <= endXBody
                && reticleY >= startYBody && reticleY <= endYBody) {
                    this.ballhitSound.play();
                    this.removeFromWorld = true;
					this.game.addPoint(false);
                    this.game.clickFlag = false;
            } else{
				this.game.losePoint();
			}
        }
    }

    movePerson(x,y) {
        this.x += x;
        this.y += y;
    }

	turnOn(){
		this.removeFromWorld = false;
	};
}

class AimPersonRed {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/theAimPersonRed.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 5000, 2128, 1, .30, 0, false, true);
        this.currentReticleX = (VISIBLE_X/2);
        this.currentReticleY = (VISIBLE_Y/2);
        this.ballhitSound = new Audio("./audio/ripped From Aimlab LOL.wav");
        this.ballhitSound.volume = .15;
		this.canShoot = true;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    }

    update() {
        this.animation = new Animator(this.spritesheet, this.game.cameraX, this.game.cameraY, 
            this.game.cameraX + VISIBLE_X, this.game.cameraY + VISIBLE_Y, 1, .30, 0, false, true);
        this.onTarget(this.game.cameraX + this.currentReticleX, this.game.cameraY + this.currentReticleY, this.game.clickFlag);
    }

    // basically the same thing as the aimball onCircle, accounts for headshots and body shots
    onTarget(reticleX, reticleY, clickFlag) {
        let startXHead = this.x + 2286, startYHead = this.y + 721, endXHead = this.x + 2376, endYHead = this.y + 810;
        let startXBody = this.x + 2283, startYBody = this.y + 811, endXBody = this.x + 2381, endYBody = this.y + 965; 

        if (clickFlag == true && this.canShoot) {
			this.game.shots += 1;
			console.log(1);
            this.ballhitSound.play();

            if (reticleX >= startXHead && reticleX <= endXHead
                && reticleY >= startYHead && reticleY <= endYHead) {
                    this.ballhitSound.play();
                    this.removeFromWorld = true;
					this.game.lostPoint(true);
            } else if (reticleX >= startXBody && reticleX <= endXBody
                && reticleY >= startYBody && reticleY <= endYBody) {
                    this.ballhitSound.play();
                    this.removeFromWorld = true;
					this.game.losePoint(false);
            }
        }
    }

    movePerson(x,y) {
        this.x += x;
        this.y += y;
    }

	turnOn(){
		this.removeFromWorld = false;
	};
}