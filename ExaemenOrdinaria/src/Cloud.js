import Lightning from "./Lightning.js"

export default class Cloud extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "cloudImage");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.lightning = new Lightning(scene, this.x, this.y);

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update() {
        this.lightning.update();
    }
}