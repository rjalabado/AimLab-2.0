class SceneManager {
    
    constructor(game) {
        this.game = game;
        this.aimball = [];
        this.drawStuff();
    };

    drawStuff() {
        var background = new Background(gameEngine);
        this.game.addEntity(background);

        this.aimball[0] = new AimBall(gameEngine, 500, 250, 0);
        this.game.addEntity(this.aimball[0]);

        this.aimball[1]= new AimBall(gameEngine, 300, 200, 1);
        this.game.addEntity(this.aimball[1]);

        this.aimball[2]= new AimBall(gameEngine, 100, 150, 2);
        this.game.addEntity(this.aimball[2]);
        
        var reticle = new Reticle(gameEngine);
        this.game.addEntity(reticle);
    };
}