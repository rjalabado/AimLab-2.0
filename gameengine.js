// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
class GameEngine {
    constructor(now) {
        this.entities = [];
        this.showOutlines = false;
        this.ctx = null;
        this.click = null;
        // this.click = [];
        this.clickFlag = false;
        this.mouse = null;
        this.mouse = [];
        this.wheel = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;
        this.cameraX = null;
        this.cameraY = null;
		this.points = 70;
		this.hits = 0;
		this.shots = -2;
		this.g = false;
		this.timerO = -1;
		this.retTime = 60;
		this.timerStart = 60;
		this.mult = 1;
    };

	addPoint(headShot){
        if (headShot) this.points += 297.32;
        else this.points += 297.32/2;
        this.hits += 1
	};

	losePoint(bigLoss){
        if (bigLoss) this.points -= 150;
        else this.points -= 23.66;
	};

	finalizePoints(){
		this.points = Math.floor(this.points);
	};
    
	printScore(){
		return ("SCORE: " + Math.ceil(this.points));
	};

	returnAccuracy(){
		if(this.shots == 0){
			return("ACCURACY: 0%");
		}
		return("ACCURACY: " + Math.floor((this.hits/(this.shots/3))*100) + "%");
	}

	printTimer(game){
		if(this.timerO == -1){
			this.timerO = Date.now(); 
		}
		if(this.retTime>0){
			this.retTime = Math.ceil(this.timerStart-((Date.now()-this.timerO)/1000)*this.mult);
		} else {
			this.retTime = 0
		}
		return ("Time: " + this.retTime);
	};
	

	go(bool){
		this.g = bool;
	};

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    setCamera(cameraX, cameraY) {
        this.cameraX = cameraX;
        this.cameraY = cameraY;
    };

    setClickFlag(clickFlag) {
        this.clickFlag = clickFlag;
    }

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        var that = this;

        // //original function
        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y };
        }

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            //console.log(getXandY(e));
            that.mouse = getXandY(e);
            that.mouse[0] = that.mouse.x;
            that.mouse[1] = that.mouse.y;
        }, false);

        this.ctx.canvas.addEventListener("click", function (e) {
            //console.log(getXandY(e));
            that.click = getXandY(e);
            // that.click[0] = that.click.x;
            // that.click[1] = that.click.y;
            that.setClickFlag(true);
        }, false);

        this.ctx.canvas.addEventListener("wheel", function (e) {
            //console.log(getXandY(e));
            that.wheel = e;
            //console.log(e.wheelDelta);
            e.preventDefault();
        }, false);

        this.ctx.canvas.addEventListener("contextmenu", function (e) {
            //console.log(getXandY(e));
            that.rightclick = getXandY(e);
            e.preventDefault();
        }, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    setEntityNull(element) {
        this.entities[element] = null;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
    };

    update() {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        this.setClickFlag(false);
    };

    loop() {
        this.clockTick = this.timer.tick();
		this.update();
		this.draw();
    };
};
