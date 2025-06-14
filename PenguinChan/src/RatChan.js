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

        this.versus = scene.versus;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {
        if (this.versus) {
            //TODO CONTROL POR TECLADO
        }
        else {
            //TODO COMPORTAMIENTO AUTOMATICO
        }
    }
}