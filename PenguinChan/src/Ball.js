export default class Ball extends Phaser.GameObjects.Image{
    constructor(scene, x, y) {
        super(scene, x, y, "ball");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setBounce(1, 1);

        this.body.setAllowGravity(false);

        this.isPickedPenguin = false;
        this.isPickedRat = false;

        this.isInPenguinZone = false;
        this.isInRatZone = false;
    }

    preUpdate(t, dt) {
        
    }


    update() {
        if (this.isPickedPenguin) {
            this.x = this.scene.penguinChan.x + 20;
            this.y = this.scene.penguinChan.y - 20
        }
        else if (this.isPickedRat) {
            this.x = this.scene.ratChan.x - 20;
            this.y = this.scene.ratChan.y + 20;
        }

        //Gestionar zonas en las que se encuentran las pelotas
        if ((this.x > 125 && this.x < 400) && (this.y > 460 && this.y < 480)) {
            this.isInPenguinZone = true;
        }
        else if ((this.x > 125 && this.x < 400 ) && (this.y > 170 && this.y < 180)) {
            this.isInRatZone = true;
        }
        else {
            this.isInPenguinZone = false
            this.isInRatZone = false
        }

        console.log(this.isInPenguinZone);
        //Si esta en alguna de las zonas de los jugadores y no está cogida, su velocidad es 0
        if ((this.isInPenguinZone || this.isInRatZone) && (!this.isPickedPenguin && !this.isPickedRat)) {
            this.body.velocity.y = 0;
            this.body.velocity.x = 0;
        }
    }
}