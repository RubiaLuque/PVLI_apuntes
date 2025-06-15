export default class MainMenu extends Phaser.Scene{
    constructor() {
        super({ key: "MainMenu" });
    }

    init() {
        
    }

    preload() {
        this.load.image("ball", "assets/ball16.png");

    }
    
    create() {
        this.add.text(120, 30, "Penguin-Chan\nWars", { fontSize: 50, fontFamily: 'babelgam', color: 'rgb(0,0,255)', align: 'center', stroke: '#ffffff', strokeThickness: 2});
        this.add.text(120, 150, "1P. Game", { fontSize: 20, fontFamily: 'babelgam', color: '#ffffff' });
        this.add.text(120, 200, "VS. Game", { fontSize: 20, fontFamily: 'babelgam', color: '#ffffff' });

        this.selector = new Phaser.GameObjects.Image(this, 100, 155, "ball");
        this.add.existing(this.selector);

        this.wKey = this.input.keyboard.addKey("W");
        this.sKey = this.input.keyboard.addKey("S");
        this.spaceKey = this.input.keyboard.addKey("SPACE");
    }

    update() {
        if (this.wKey.isDown && this.selector.y === 210) {
            this.selector.y = 155;
            //console.log("w pulsado")
        }
        else if (this.sKey.isDown && this.selector.y === 155) {
            this.selector.y = 210;
            //console.log("s pulsado")
        }

        if (this.spaceKey.isDown) {
            if (this.selector.y === 155) {
                //COMIENZA MODO 1 JUGADOR
                this.scene.start("Level", {versus: false});
                
            }
            else if(this.selector.y === 210) {
                //COMIENZA MODO VERSUS
                this.scene.start("Level", {versus: true});
            }
        }
    }
}