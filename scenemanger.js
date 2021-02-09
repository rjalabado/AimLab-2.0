class SceneManager {
    
    constructor(game) {
        this.game = game;
        // this.gameBall = gameBall;
        this.drawStuff();
    };

    drawStuff() {
        var background = new Background(gameEngine);
        this.game.addEntity(background);

        var aimball = new AimBall(gameEngine, 500, 250);
        this.game.addEntity(aimball);

        var reticle = new Reticle(gameEngine);
        this.game.addEntity(reticle);
        // aimball = new AimBall(gameEngine, 1000, 300);
        // this.game.addEntity(aimball);
        // var aimball = new AimBall(gameEngine, 21, 21);
        // this.game.addEntity(aimball);
        // var aimball = new AimBall(gameEngine, 69, 420);
        // this.game.addEntity(aimball);
    };
}