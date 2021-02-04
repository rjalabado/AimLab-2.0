const VISIBLE_X = 1280, VISIBLE_Y = 720;

class Background {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/stockAimlabWallpaper.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 1919, 1080, 1, .30, 0, false, true);
    };

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, 0, 0)
        this.animation.drawFrame(this.game.clockTick, ctx, 0, 0, 1.3);
        
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
        this.animation.drawFrame(this.game.clockTick, ctx, (1280/2)-(64*.5), (720/2)-(64*.5), .5);
    }

    update() {
    }
}

// I think an idea to make sure the aimballs stay on one point is to make another ctx?
class AimBall {
    constructor(game, x, y) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pokeball.png");
        this.x = x;
        this.y = y;
        this.animation = new Animator(this.spritesheet, 80, 17, 51, 51, 1, .30, 0, false, true);
        this.destroyed = false;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    }

    update() {
        if (this.onTop() == true) {
            this.removeFromWorld = true;
            console.log("removed");
        } else {
            // this.animation = new Animator(this.spritesheet, 80, 17, 51, 51, 1, .30, 0, false, true);
        }

        // if it is destroyed, add a boolean to say it was destroyed
    }

    // checks if a click overlapped the ball
    onTop() {
        if (this.x <= this.game.click[0] && this.game.click[0] <= this.x + 51
            && this.y <= this.game.click[1] && this.game.click[1] <= this.y + 51) {
                console.log(this.game.click[0] + " " + this.game.click[1]);
                this.game.click = [];
                return true;
        } else {
            return false;
        }
    }
}