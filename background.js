const VISIBLE_X = 1280, VISIBLE_Y = 720;

class Background {
    constructor(game) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/JAPAN.jpg");
        this.animation = new Animator(this.spritesheet, 0, 0, 7952, 5304, 1, .30, 0, false, true);
    };

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, 0, 0)
        this.animation.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
    }

    update() {
        // var mouse = this.game.mouse;
        this.animation = new Animator(this.spritesheet, 0, 2500, 1280, 720, 1, .30, 0, false, true);
        // console.log(this.game.mouse[0] + " " + this.game.mouse[1]);
        //console.log(mouse.x + " " + mouse.y)
    }
}

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

    // random(b) {
    //     if (b) {    // random width
    //         let a = Math.floor((Math.random()*1000)+1);
    //         while (a >= 200) {
    //             a = Math.floor((Math.random()*1000)+1);
    //         }
    //         return a;
    //     } else {    // random height
    //         let a = Math.floor((Math.random()*700)+1);
    //         while (a >= 20) {
    //             a = Math.floor((Math.random()*700)+1);
    //         }
    //         return a;
    //     }
    // }
}

class Cursor{
	constructor(game, x, y) {
        Object.assign(this, { game });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pokeball.png");
        this.x = x;
        this.y = y;
        this.animation = new Animator(this.spritesheet, 80, 17, 51, 51, 1, .30, 0, false, true);
        this.destroyed = false;
    }
	//console.log("X" + game.mouse[0]);
	//console.log("Y" + game.mouse[1]);
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