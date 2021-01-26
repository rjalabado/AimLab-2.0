var i = 0, j = 0;

class Background {
    constructor(game) {
        Object.assign(this, { game });
        // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/testBackground.jpg");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/JAPAN.jpg");
        this.animation = new Animator(this.spritesheet, 0, 0, 7952, 5304, 1, .30, 0, false, true);
    };

    draw(ctx) {
        //ctx.drawImage(this.spritesheet, 0, 0)
        this.animation.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
    }

    update() {
        this.animation = new Animator(this.spritesheet, i, 2500, 1280, 720, 1, .30, 0, false, true);
        // console.log(Math.random());
        if (j == 0) {
            i++;
            if (i == 640) {
                j = 1;
            }
        } else {
            i--;
            if (i == -640) {
                j = 0;
            }
        }
    }
}