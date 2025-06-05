export default class GameOver extends Phaser.Scene{
    constructor() {
        super({ key: "GameOver" });
    }

    init() { }
    
    preload() { }
    
    create() {
        this.add.text(90, 50, "GAME\nOVER", { fontFamily: 'arcade', fontSize: 50, align: 'centre' });
        this.time.addEvent({
            delay: 4000,
            callback: () => {
                this.scene.start("MainMenu");
            }
        })
    }
    

}