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