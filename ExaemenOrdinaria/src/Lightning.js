import { config } from "./game.js"

export default class Lightning extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "lightningSheet");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        //Animacion
        this.anims.create({
            key: "lightningMovement",
            frames: this.anims.generateFrameNumbers("lightningSheet", { start: 0, end: 4 }),
            yoyo: false,
            frameRate: 24,
            repeat: -1
        })

        this.play("lightningMovement");

        this.body.velocity.x = 40;
        this.body.velocity.y = 40;
        this.velY = 40;
        this.velX = 40;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {

        //Movimiento toroidal
        if (this.x > config.width) this.x = 0;
        else if (this.x < 0) this.x = config.width;

       
        if ((this.y < 0 && this.body.velocity.y < 0) || (this.y > config.height && this.body.velocity.y > 0)) {
            this.velY *= (-1);
            this.body.velocity.y = this.velY
            console.log("choque con bordes");
        }
        
    
    }
}