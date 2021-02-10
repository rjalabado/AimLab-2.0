class SceneManager {
    
    constructor(game) {
        this.game = game;
        this.aimball = [];
        this.drawStuff();
    };

    drawStuff() {
        var background = new Background(gameEngine);
        this.game.addEntity(background);

        this.aimball[0] = new AimBall(gameEngine, 500, 250);
        this.game.addEntity(this.aimball[0]);

        this.aimball[1]= new AimBall(gameEngine, 300, 200);
        this.game.addEntity(this.aimball[1]);

        this.aimball[2]= new AimBall(gameEngine, 100, 150);
        this.game.addEntity(this.aimball[2]);
        
        var reticle = new Reticle(gameEngine);
        this.game.addEntity(reticle);
    };
}