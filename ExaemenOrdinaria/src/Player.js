import Balloon from "./Balloon.js"
import {config} from "./game.js"
export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "playerSheet"); //Textura ya cargada en la escena
        scene.add.existing(this); //Se añade a la escena solo
        scene.physics.add.existing(this); //Se añade a arcade para fisicas

        this.keyLeft = scene.input.keyboard.addKey("LEFT");
        this.keyRight = scene.input.keyboard.addKey("RIGHT");
        this.keyZ = scene.input.keyboard.addKey("Z"); //Mayuscula

        //this.body.setCollideWorldBounds(true); //Hace que colisione con los bordes del mundo
        
        this.balloon = new Balloon(this.scene, this.x, this.y - 20);

        //Animaciones jugador
        this.anims.create({
            key: "playerIdle",
            frames: this.anims.generateFrameNumbers("playerSheet", { start: 6, end: 6 }),
            yoyo: false,
            frameRate: 24,
            repeat: -1 //Repite infinitas veces la animacion
        })

        this.anims.create({
            key: "playerFlying",
            frames: this.anims.generateFrameNumbers("playerSheet", { start: 6, end: 8 }),
            yoyo: true,
            frameRate: 24,
            repeat: -1
        })

        this.anims.create({
            key: "playerDeath",
            frames: this.anims.generateFrameNumbers("playerSheet", { start: 0, end: 2 }),
            yoyo: false,
            frameRate: 24,
            repeat: 1
        })

        this.play("playerFlying");

        this.isGrounded = false;
    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt); //Para las animaciones
    }

    update() {

        if (this.body.velocity.y === 0 && this.body.velocity.x === 0 && !this.isGrounded) {
            this.play("playerIdle");
            this.isGrounded = true;
        }
        else if (this.body.velocity.y !== 0 && this.isGrounded) {
            this.play("playerFlying");
            this.isGrounded = false;
        }

        this.body.velocity.x = 0;
        
        //No sale por el borde superior de la pantalla
        if (this.y < 0) this.y = 0;

        if (this.keyZ.isDown) {
            
            this.body.velocity.y = -40;
            if (this.keyLeft.isDown) {
                this.body.velocity.x = -40;
            }
            else if (this.keyRight.isDown) {
                this.body.velocity.x = 40;
            }

        }

        //Movimiento toroidal
        if (this.x > config.width) this.x = 0;
        else if (this.x < 0) this.x = config.width;

        this.balloon.update(this);
    }
}