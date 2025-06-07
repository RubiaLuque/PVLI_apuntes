export default class Balloon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "balloonSheet");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setTintFill(0xff0000);

        this.anims.create({
            key: "balloonIdle",
            frames: this.anims.generateFrameNumbers("balloonSheet", { start: 0, end: 0 }),
            yoyo: false,
            frameRate: 24,
            repeat: 1
        })

        this.anims.create({
            key: "balloonExplosion",
            frames: this.anims.generateFrameNumbers("balloonSheet", { start: 1, end: 1 }),
            yoyo: false,
            frameRate: 24,
            repeat: 1
        })
    }

    update(player) {
        this.setPosition(player.x, player.y - 14);
    }
}