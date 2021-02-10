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
}