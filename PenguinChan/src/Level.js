import PenguinChan from "./PenguinChan.js";
import RatChan from "./RatChan.js"

export default class Level extends Phaser.Scene{
    constructor() {
        super({ key: "Level" });
    }

    init() {
        
    }

    preload() {
        this.load.image("bgImage", "assets/background.png");
        this.load.image("tableImage", "assets/table.png");
        this.load.image("scoreImage", "assets/score.png");

        this.load.spritesheet("penguinChanSheet", "assets/penguin40.png", { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet("ratChanSheet", "assets/rat32.png", { frameWidth: 32, frameHeight: 32 });
    }

    create() {

        this.background = new Phaser.GameObjects.Image(this, 256, 256, "bgImage");
        this.add.existing(this.background);

        this.table = new Phaser.GameObjects.Image(this, 236, 320, "tableImage");
        this.add.existing(this.table);

        this.scoreBoard = new Phaser.GameObjects.Image(this, 400, 320, "scoreImage");
        this.add.existing(this.scoreBoard);

        this.versus = false; //TODO obtener dato de MainMenu

        //TODO CREAR POOL DE PELOTAS



        this.penguinChan = new PenguinChan(this, 236, 450);
        this.ratChan = new RatChan(this, 236, 170);
        
        //Tablero penguinChan
        this.penguinSide = new Phaser.GameObjects.Sprite(this, 250, 460);
        this.physics.add.existing(this.penguinSide, true); //Es estatico
        this.physics.add.collider(this.penguinSide);
        this.penguinSide.body.setSize(300, 20);

        //Tablero rat chan
        this.ratSide = new Phaser.GameObjects.Sprite(this, 250, 175);
        this.physics.add.existing(this.ratSide, true);
        this.physics.add.collider(this.ratSide);
        this.ratSide.body.setSize(300, 20);

        this.endTime = false;
        this.timer = this.time.addEvent({
            delay: 90000,
            callback: () => {
                this.endTime = true;
            }
        })

        this.remainingTime = this.add.text(50, 20, '', { fontSize: '50px', fontFamily: 'babelgam' });
    }

    update() {
        this.remainingTime.setText(this.timer.getRemainingSeconds().toFixed(0));
        //Si no se ha acabado el juego, se hace la lógica de la escena
        if (!this.endTime) {
            this.penguinChan.update();
            this.ratChan.update();
        }
        else {
            
        }

    }

}