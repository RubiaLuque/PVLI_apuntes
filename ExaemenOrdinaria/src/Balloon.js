export default class Balloon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "balloonSheet");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setTintFill(0xff0000);
    }

    update(player) {
        this.setPosition(player.x, player.y - 14);
    }
}