class SceneManager {
    
    constructor(game) {
        this.game = game;
        this.drawMainMenu();
    };

    drawMainMenu() {
        var background = new Background(gameEngine);
        this.game.addEntity(background);

		//var grid = new GridShot(gameEngine);
		//this.game.addEntity(grid);

		var start = new mainMenu(gameEngine);
		this.game.addEntity(start);

        // var yeah = new Moving(gameEngine);
        // this.game.addEntity(yeah);
    };
}