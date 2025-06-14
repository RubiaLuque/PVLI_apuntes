export default class Ball extends Phaser.GameObjects.Image{
    constructor(scene, x, y) {
        super(scene, x, y, "ball");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);


    }
}