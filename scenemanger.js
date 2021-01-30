class SceneManager {
    
    constructor(game) {
        this.game = game;
        this.drawStuff();
    };

    drawStuff() {
         var background = new Background(gameEngine);
         this.game.addEntity(background);

        var aimball = new AimBall(gameEngine, 500, 250);
        this.game.addEntity(aimball);
        aimball = new AimBall(gameEngine, 1000, 300);
        this.game.addEntity(aimball);
        var aimball = new AimBall(gameEngine, 21, 21);
        this.game.addEntity(aimball);
        var aimball = new AimBall(gameEngine, 69, 420);
        this.game.addEntity(aimball);
    };
    //drawCursor(x,y){
	//var xCoord = this.game.mouse[0];
	//var yCoord = this.game.mouse[1];
	//var cursor = new Cursor(gameEngine,xCoord,yCoord);
	//this.game.addEntity(cursor);
    //};
}