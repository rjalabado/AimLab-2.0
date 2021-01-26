class SceneManager {
    
    constructor(game) {
        this.game = game;
        this.drawStuff();
    };

    drawStuff() {
        var background = new Background(gameEngine);
        this.game.addEntity(background);
    }
}