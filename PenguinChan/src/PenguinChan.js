export default class PenguinChan extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "penguinChanSheet");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.limitMin = 125;
        this.limitMax = this.limitMin + 200;

        this.aKey = scene.input.keyboard.addKey("A");
        this.dKey = scene.input.keyboard.addKey("D");
        this.actionKey = scene.input.keyboard.addKey("SPACE");

        this.hasBall = false;
        this.isStun = false; //ha sido golpeado
        this.body.setSize(32, 32); //Su body se hace más pequeño
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {
        this.body.velocity.x = 0;
        if (!this.isStun) {
            if (this.x > this.limitMin && this.aKey.isDown)
                this.body.velocity.x = -70;
                
            if (this.x < this.limitMax && this.dKey.isDown) {
                this.body.velocity.x = 70;
                    
            }
        }
    }
}