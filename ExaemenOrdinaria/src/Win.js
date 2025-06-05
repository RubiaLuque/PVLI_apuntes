export default class Win extends Phaser.Scene{
    constructor() {
        super({ key: "Win" });
    }

    init(score) {
        this.score = score.score; //nombre_del_objeto.atributo_del_objeto (score.score)
    }
    
    preload() { }
    
    create() {
        this.add.text(90, 50, "VICTORY", { fontFamily: "arcade", fontSize: 50, color: '#ffffff' });
        this.add.text(90, 100, "Score: " + this.score, { fontFamily: 'arcade', fontSize: 30, color: '#ffffff'  });

        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.scene.start("MainMenu");
            }
        })
    }
}