import Balloon from "./Balloon.js";
import { config } from "./game.js";
export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, vel) {
        super(scene, x, y, "enemySheet");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.isGrounded = false;
        this.enemyBalloon = new Balloon(this.scene, this.x, this.y - 16);
        this.enemyBalloon.setTintFill(0x0000ff);

        //this.body.setCollideWorldBounds(true); //Hace que colisione con los bordes del mundo
        this.vel = vel;
        this.isDead = false;
        this.withoutBalloon = false;
        this.notCollisionable = false;

        this.anims.create({
            key: "enemyIdle",
            frames: this.anims.generateFrameNumbers("enemySheet", { start: 0, end: 2 }),
            yoyo: false,
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: "enemyFlying",
            frames: this.anims.generateFrameNumbers("enemySheet", { start: 3, end: 5 }),
            yoyo: false,
            frameRate: 24,
            repeat: -1

        });

        this.anims.create({
            key: "enemyDeath",
            frames: this.anims.generateFrameNumbers("enemySheet", { start: 6, end: 6 }),
            yoyo: false,
            frameRate: 24,
            repeat: 1
        })
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {
        
        //No sale por el borde superior de la pantalla
        if (this.y < 0) this.y = 0;

        //Gestion animaciones
        if (this.body.velocity.y === 0 && this.body.velocity.x === 0 && !this.isGrounded) {
            this.play("enemyIdle");
            this.isGrounded = true;
        }
        else if (this.body.velocity.y !== 0 && this.isGrounded) {
            this.play("enemyFlying");
            this.isGrounded = false;
        }

        this.body.velocity.x = 0;
        if (!this.withoutBalloon) {
            this.target = this.scene.player;
    
            if (this.target.x - this.x <= 0) this.body.velocity.x = -1;
            else this.body.velocity.x = 1;
    
            if (this.target.y - this.y <= 0) this.body.velocity.y = -1;
            else this.body.velocity.y = 1;
    
            this.body.velocity.x *= this.vel;
            this.body.velocity.y *= this.vel;
            this.enemyBalloon.update(this);
        }

        //Movimiento toroidal
        if (this.x > config.width) this.x = 0;
        else if (this.x < 0) this.x = config.width;

    }
}