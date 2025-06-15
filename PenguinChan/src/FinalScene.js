export default class FinalScene extends Phaser.Scene{
    constructor() {
        super({ key: "FinalScene" });
    }

    init(obj) {
        this.penguinBalls = obj.ballsPenguin;
        this.ratBalls = obj.ballsRat;
    }

    preload() {
        this.load.audio("winAudio", "assets/sounds/win.mp3");
        this.load.audio("loseAudio", "assets/sounds/lose.mp3");
    }

    create() {
        this.winAudio = this.sound.add("winAudio");
        this.loseAudio = this.sound.add("loseAudio");

        if (this.penguinBalls <= this.ratBalls) {
            this.add.text(120, 50, "YOU WON", { fontSize: 50, fontFamily: 'babelgam', color: 'rgb(0,0,255)', align: 'center', stroke: '#ffffff', strokeThickness: 2 });
            this.add.text(120, 150, this.ratBalls + "/" + this.penguinBalls, { fontSize: 50, fontFamily: 'babelgam', color: 'rgb(0,0,255)', align: 'center', stroke: '#ffffff', strokeThickness: 2 });
            this.winAudio.play();
        }
        else {
            this.add.text(120, 50, "YOU LOST", { fontSize: 50, fontFamily: 'babelgam', color: 'rgb(0,0,255)', align: 'center', stroke: '#ffffff', strokeThickness: 2 });
            this.add.text(120, 150, this.ratBalls + "/" + this.penguinBalls, { fontSize: 50, fontFamily: 'babelgam', color: 'rgb(0,0,255)', align: 'center', stroke: '#ffffff', strokeThickness: 2 });
            this.loseAudio.play();
        }

        this.time.addEvent({
            delay: 4000,
            callback: () => {
                this.scene.start("MainMenu");
            }
        })
    }

    update() {
        
    }
}