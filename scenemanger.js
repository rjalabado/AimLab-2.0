class SceneManager {
    
    constructor(game) {
        this.game = game;
        this.drawStuff();
    };

    drawStuff() {
        var background = new Background(gameEngine);
        this.game.addEntity(background);

		//var grid = new GridShot(gameEngine);
		//this.game.addEntity(grid);

		var b = new mainMenu(gameEngine);
		this.game.addEntity(b);
		

    };
}