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
    }

    update() {
    }
}

// I think an idea to make sure the aimballs stay on one point is to make another ctx?
class AimBall {
    constructor(game, x, y) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/theAimball.png");
        this.x = x;
        this.y = y;
        this.animation = new Animator(this.spritesheet, 0, 0, 1280, 720, 1, .30, 0, false, true);
        this.destroyed = false;
        this.currentReticleX = (VISIBLE_X/2)-(64*.5);
        this.currentYReticle = (VISIBLE_Y/2)-(64*.5);
        this.directionX = null;
        this.directionY = null;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, 200, 200, 1);
        console.log(this.x + " " + this.y);
    }

    update() {
        this.animation = new Animator(this.spritesheet, this.game.cameraX, this.game.cameraY, 
            this.game.cameraX + VISIBLE_X, this.game.cameraY + VISIBLE_Y, 1, .30, 0, false, true);

        // if (this.onTop() == true) {
        //     this.removeFromWorld = true;
        //     console.log("removed");
        // } else {
        //     // this.animation = new Animator(this.spritesheet, 80, 17, 51, 51, 1, .30, 0, false, true);
        // }

        // // if it is destroyed, add a boolean to say it was destroyed
    }

    // // checks if a click overlapped the ball
    // onTop() {
    //     if (this.x <= this.game.click[0] && this.game.click[0] <= this.x + 51
    //         && this.y <= this.game.click[1] && this.game.click[1] <= this.y + 51) {
    //             console.log(this.game.click[0] + " " + this.game.click[1]);
    //             this.game.click = [];
    //             return true;
    //     } else {
    //         return false;
    //     }
    // }
    
    relativeToReticle() {
        // anything we "draw" moves with the screen (reticle included). the wallpaper literally stays still.
        // with that, the picture stays still (the draw(ctx) has only constants). But anything using draw(ctx)
        // with dynamic or constant coordinates will move with or traverse on top of the camera we created.
        // a solution is to make photos the same size of the wallpaper, but with EVERY SINGLE BALL LOCATION we want.
        // it's a hard coding adventure, but one that is possible, time for some extreme photoshop.
    };
}