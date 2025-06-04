export default class MainMenu extends Phaser.Scene{
    constructor() {
        super({ key: "MainMenu" });
    }

    //Recibir y manipular objetos de otras escenas
    init() {
        
    }

    //Cargar assets
    preload() {
        
    }

    //Instanciar los objetos dentro de la escena
    create() {
        this.add.text(120, 30, "BALLOON\nFIGHT", { fontSize: 50, fontFamily: "balloonfont", color: '#ff9900', align: "right" });
        this.start = this.add.text(100, 150, "Start", { fontSize: 20, fontFamily: "arcade", color: '#ffffff' });

        this.start.setInteractive();
        this.start.on('pointerdown', () => {
            this.scene.start("Level");
        })
    }

    
}