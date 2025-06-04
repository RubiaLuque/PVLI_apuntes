import Balloon from "./Balloon.js"

export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "playerSheet"); //Textura ya cargada en la escena
        scene.add.existing(this); //Se añade a la escena solo
        scene.physics.add.existing(this); //Se añade a arcade para fisicas

        this.keyLeft = scene.input.keyboard.addKey("LEFT");
        this.keyRight = scene.input.keyboard.addKey("RIGHT");
        this.keyZ = scene.input.keyboard.addKey("Z"); //Mayuscula

        this.body.setCollideWorldBounds(true); //Hace que colisione con los bordes del mundo
        
        this.balloon = new Balloon(this.scene, this.x, this.y - 20);
    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt); //Para las animaciones
    }

    update() {
        this.body.velocity.x = 0;

        if (this.keyZ.isDown) {
            
            this.body.velocity.y = -40;
            if (this.keyLeft.isDown) {
                this.body.velocity.x = -40;
            }
            else if (this.keyRight.isDown) {
                this.body.velocity.x = 40;
            }

        }

        this.balloon.update(this);
    }
}