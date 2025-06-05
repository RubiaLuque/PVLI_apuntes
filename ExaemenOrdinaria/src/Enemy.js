import Balloon from "./Balloon.js";

export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, vel) {
        super(scene, x, y, "enemySheet");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.enemyBalloon = new Balloon(this.scene, this.x, this.y - 16);
        this.enemyBalloon.setTintFill(0x0000ff);

        this.body.setCollideWorldBounds(true); //Hace que colisione con los bordes del mundo
        this.vel = vel;
        this.isDead = false;
        this.withoutBalloon = false;
        this.notCollisionable = false;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {
        
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

    }
}