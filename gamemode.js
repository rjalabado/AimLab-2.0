class mainMenu{
    constructor(game){
      this.game = game;
      this.buttons = [];
      this.trigger = 0;

      this.buttons[0] = new AimBall(gameEngine,250,150,true);
      this.buttons[1] = new AimBallRed(gameEngine,250,300,true);
	  this.buttons[2] = new AimBallGreen(gameEngine,250,450,true);
      this.buttons[3] = new Gun(gameEngine);
      this.hud = new HUD(gameEngine);
	  this.buttons[4] = new BackgroundWords(gameEngine);
      this.game.addEntity(this.buttons[4]);
	  this.game.addEntity(this.buttons[0]);
      this.game.addEntity(this.buttons[1]);
      this.game.addEntity(this.buttons[2]);
      this.game.addEntity(this.hud);
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
		  if(this.buttons[2].removeFromWorld == true){
              this.trigger = 3;
          };
      };
      
      if(this.trigger == 1){
          this.trigger = 0;
          this.buttons[1].removeFromWorld = true;
		  this.buttons[2].removeFromWorld = true;
		  this.buttons[4].removeFromWorld = true;
          this.watcher();
          var gridshot = new GridShot(gameEngine);
          this.game.addEntity(gridshot);
      }
      
      if(this.trigger == 2){
        this.trigger = 0;
        this.buttons[0].removeFromWorld = true;
		this.buttons[2].removeFromWorld = true;
		this.buttons[4].removeFromWorld = true;
        this.watcher();
        var moving = new Moving(gameEngine);
        this.game.addEntity(moving);
      }
	  if(this.trigger == 3){
         this.trigger = 0;
        this.buttons[0].removeFromWorld = true;
		this.buttons[1].removeFromWorld = true;
		this.buttons[4].removeFromWorld = true;
        this.watcher();
        var twitch = new Twitch(gameEngine);
        this.game.addEntity(twitch);
      }
   };

   watcher(){
      this.buttons = null;
      this.hud = null;
	  this.words = null;
   };
}

class Moving{
    constructor(game){
		this.game = game;
		this.game.shots -= 2;
        this.target = [];
        this.moveRight = [];
        this.speed = 0;
        this.speed2 = 0;

        this.target[0] = new HUD(gameEngine);
        this.target[1] = new AimPerson(gameEngine, 500, 235);
        this.target[2] = new AimPerson(gameEngine, 300, 235);
        this.target[3] = new AimPersonRed(gameEngine, 800, 235);
        this.target[4] = new AimPersonRed(gameEngine, -200, 235);
        this.target[5] = new AimPersonRed(gameEngine, 100, 235);
        this.gun = new Gun(gameEngine);

        this.game.addEntity(this.target[5]);
        this.game.addEntity(this.target[4]);
        this.game.addEntity(this.target[3]);
        this.game.addEntity(this.target[2]);
        this.game.addEntity(this.target[1]);
        this.game.addEntity(this.target[0]);
        this.game.addEntity(this.gun);

        this.moveRight[1] = true;
        this.moveRight[2] = false;
        this.moveRight[3] = true;
        this.moveRight[4] = false;
        this.moveRight[5] = true;

        this.target[0].f = true;
		this.target[0].title = false;
    }

    draw(ctx){}

    update(){
        let i = 1;
        this.switchItUp += 1;

        while (i<=5) {
        if(this.target[i].removeFromWorld == true){
			if (i <= 2) this.target[i] = new AimPerson(gameEngine, this.rerollBodyX(), 235);
            else this.target[i] = new AimPersonRed(gameEngine, this.rerollBodyX(), 235);

            this.game.setEntityNull(this.game.entities.indexOf(this.target[i]));
			this.game.addEntity(this.target[i]);
            this.game.addEntity(this.gun);
            this.game.addEntity(this.target[0]);

            if (this.moveRight[i]) this.moveRight[i] = false;
            else this.moveRight[i] = true;
            this.speed += .1;
            this.speed2 = this.speed/2;
		};
        if (i>=2) {
            if(this.target[i].x >= 850) this.moveRight[i] = false;
            else if (this.target[i].x <= -200) this.moveRight[i] = true;

            if (this.moveRight[i]) this.target[i].x += this.speed;
            else this.target[i].x -= this.speed;
            } else {
                if(this.target[i].x >= 850) this.moveRight[i] = false;
                else if (this.target[i].x <= -200) this.moveRight[i] = true;
    
                if (this.moveRight[i]) this.target[i].x += this.speed;
                else this.target[i].x -= this.speed;
            }
        i++;
        }
    }

    rerollBodyX() {
        var yeah = Math.floor(Math.random() * 1050) + 1 -500;
        return yeah;
    }
}

//gamemode classes...
//og gridshot
//implement hit miss counter
class GridShot{
	constructor(game){
		this.game = game;
		this.aimball = [];

		this.aimball[0] = new HUD(gameEngine);
		this.aimball[1] = new AimBall(gameEngine, 500, 250, false);
        // this.aimball[1]= new AimBall(gameEngine, 850, 450); //MAX
        // this.aimball[1]= new AimBall(gameEngine, -380, -180); //MIN
        this.aimball[2]= new AimBall(gameEngine, 300, 200, false);
        this.aimball[3]= new AimBall(gameEngine, 100, 150, false);
        this.gun = new Gun(gameEngine);
        
		this.game.addEntity(this.aimball[3]);
		this.game.addEntity(this.aimball[2]);
		this.game.addEntity(this.aimball[1]);
		this.game.addEntity(this.aimball[0]);
        this.game.addEntity(this.gun);
		// this.hud = new HUD(gameEngine);
        // this.game.addEntity(this.hud);
		this.aimball[0].f = true;   // these used .hud
		this.aimball[0].title = false;
	}

	draw(ctx){}
	
    update(){
		if(this.aimball[1].removeFromWorld == true){
			this.aimball[1] = new AimBall(gameEngine, this.rerollX(), this.rerollY(), false);

            this.game.setEntityNull(this.game.entities.indexOf(this.aimball[1]));
			this.game.addEntity(this.aimball[1]);
            this.game.addEntity(this.gun);
            this.game.addEntity(this.aimball[0]);
		};
		if(this.aimball[2].removeFromWorld == true){
			this.aimball[2] = new AimBall(gameEngine, this.rerollX(), this.rerollY(), false);

            this.game.setEntityNull(this.game.entities.indexOf(this.aimball[2]));
			this.game.addEntity(this.aimball[2]);
            this.game.addEntity(this.gun); 
            this.game.addEntity(this.aimball[0]);
		};
		if(this.aimball[3].removeFromWorld == true){
            this.aimball[3] = new AimBall(gameEngine, this.rerollX(), this.rerollY(), false);
			
            this.game.setEntityNull(this.game.entities.indexOf(this.aimball[3]));
            this.game.addEntity(this.aimball[3]);
            this.game.addEntity(this.gun); 
            this.game.addEntity(this.aimball[0]);
		};
		if(this.aimball[0].end){
			var i;
			for(i = 1; i < this.aimball.length; i++){
				this.aimball[i].canShoot = false;
			}
            this.game.addEntity(this.aimball[0]);
		}
	}

    rerollX(arrayPlace) {
        let difference = 850-(-380);
        var a = 0, b = 0, yeah = Math.floor(Math.random() * difference) -380 + 1;

        if (arrayPlace == 1) a = 3, b = 2;
        if (arrayPlace == 2) a = 3, b = 1;
        if (arrayPlace == 3) a = 2, b = 1;

        while ((yeah <= this.aimball[a].x && yeah >= this.aimball[a].x+100)
                || (yeah <= this.aimball[b].x && yeah >= this.aimball[b].x+100)) {
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

        while ((yeah <= this.aimball[a].y && yeah >= this.aimball[a].y+100)
                || (yeah <= this.aimball[b].y && yeah >= this.aimball[b].y+100)) {
                    yeah = Math.floor(Math.random() * difference) -180 + 1;
                }

        return yeah;
    };
 }

 class Twitch{
	constructor(game){
		this.game = game;
		this.game.timerStart = 10
		this.aimball = [];

		this.aimball[0] = new HUD(gameEngine);
		this.aimball[1] = new AimBall(gameEngine, 500, 250, false);
        this.gun = new Gun(gameEngine);
        
		this.game.addEntity(this.aimball[1]);
		this.game.addEntity(this.aimball[0]);
        this.game.addEntity(this.gun);
		// this.hud = new HUD(gameEngine);
        // this.game.addEntity(this.hud);
		this.aimball[0].f = true;   // these used .hud
		this.aimball[0].title = false;
	}

	draw(ctx){}
	
    update(){
		if(this.aimball[1].removeFromWorld == true){
			this.aimball[1] = new AimBall(gameEngine, this.rerollX(), this.rerollY(), false);

            this.game.setEntityNull(this.game.entities.indexOf(this.aimball[1]));
			this.game.addEntity(this.aimball[1]);
            this.game.addEntity(this.gun);
            this.game.addEntity(this.aimball[0]);
			this.game.timerStart += 5;
		};
		if(this.aimball[1].timeRec == true){
			this.game.timerStart -= 10;
			this.aimball[1].timeRec = false;
		}
		if(this.aimball[0].end){
			var i;
			for(i = 1; i < this.aimball.length; i++){
				this.aimball[i].canShoot = false;
			}
            this.game.addEntity(this.aimball[0]);
		}
		this.game.mult += (1/240);
	}

    rerollX(arrayPlace) {
        let difference = 850-(-380);
        var a = 0, b = 0, yeah = Math.floor(Math.random() * difference) -380 + 1;

        if (arrayPlace == 1) a = 3, b = 2;
        if (arrayPlace == 2) a = 3, b = 1;
        if (arrayPlace == 3) a = 2, b = 1;

        while ((yeah <= this.aimball[a].x && yeah >= this.aimball[a].x+100)
                || (yeah <= this.aimball[b].x && yeah >= this.aimball[b].x+100)) {
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

        while ((yeah <= this.aimball[a].y && yeah >= this.aimball[a].y+100)
                || (yeah <= this.aimball[b].y && yeah >= this.aimball[b].y+100)) {
                    yeah = Math.floor(Math.random() * difference) -180 + 1;
                }

        return yeah;
    };
 }