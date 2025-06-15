export default class RatChan extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "ratChanSheet");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.limitMin = 125;
        this.limitMax = this.limitMin + 200;

        this.leftKey = scene.input.keyboard.addKey("LEFT");
        this.rightKey = scene.input.keyboard.addKey("RIGHT");
        this.actionKey = scene.input.keyboard.addKey("DOWN");

        this.hasBall = false;
        this.isStun = false;

        this.versus = scene.versus;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {
        this.body.velocity.x = 0;
        if (!this.isStun) {
            if (this.versus) {
                //CONTROL POR TECLADO
                if (this.x > this.limitMin && this.leftKey.isDown)
                    this.body.velocity.x = -70;
                    
                if (this.x < this.limitMax && this.rightKey.isDown) {
                    this.body.velocity.x = 70;
                        
                }
            }
            else {
                //TODO COMPORTAMIENTO AUTOMATICO
            }
        }
    }
}