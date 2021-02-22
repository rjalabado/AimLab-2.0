class SceneManager {
    
    constructor(game) {
        this.game = game;
        this.drawStuff();
    };

    drawStuff() {
        var background = new Background(gameEngine);
        this.game.addEntity(background);

		var grid = new GridShot(gameEngine);
		this.game.addEntity(grid);
        
        var hud = new HUD(gameEngine);
        this.game.addEntity(hud);

        // var gun = new Gun(gameEngine);
        // this.game.addEntity(gun);
    };
}