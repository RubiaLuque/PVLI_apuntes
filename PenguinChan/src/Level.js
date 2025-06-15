import PenguinChan from "./PenguinChan.js";
import RatChan from "./RatChan.js"
import Ball from "./Ball.js"
export default class Level extends Phaser.Scene{
    constructor() {
        super({ key: "Level" });
    }

    init(obj) {
        this.versus = obj.versus;
    }

    preload() {
        this.load.image("bgImage", "assets/background.png");
        this.load.image("tableImage", "assets/table.png");
        this.load.image("scoreImage", "assets/score.png");

        this.load.spritesheet("penguinChanSheet", "assets/penguin40.png", { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet("ratChanSheet", "assets/rat32.png", { frameWidth: 32, frameHeight: 32 });

        //Sonidos
        this.load.audio("collideAudio", "assets/sounds/collide.mp3");
        this.load.audio("throwAudio", "assets/sounds/throw_ball.mp3");
        this.load.audio("stunAudio", "assets/sounds/stun.mp3");
    }

    create() {

        this.background = new Phaser.GameObjects.Image(this, 256, 256, "bgImage");
        this.add.existing(this.background);
        
        this.table = new Phaser.GameObjects.Image(this, 236, 320, "tableImage");
        this.add.existing(this.table);
        
        this.scoreBoard = new Phaser.GameObjects.Image(this, 400, 320, "scoreImage");
        this.add.existing(this.scoreBoard);
        
        //Sonidos
        this.collideAudio = this.sound.add("collideAudio");
        this.throwAudio = this.sound.add("throwAudio");
        this.stunAudio = this.sound.add("stunAudio");

        //Jugadores y atributos relacionados con ellos
        this.penguinChan = new PenguinChan(this, 236, 450);
        this.ratChan = new RatChan(this, 236, 170);
        this.numBallsRat = 0;
        this.numBallsPenguin = 0;
        this.endNumBalls = false;
        
        this.actionPressedRat = false;
        this.actionPressedPenguin = false;

        //laterales de tablero
        this.tableLeft = new Phaser.GameObjects.Sprite(this, 118, 300);
        this.physics.add.existing(this.tableLeft, true);
        this.physics.add.collider(this.tableLeft);
        this.tableLeft.body.setSize(20, 350);

        this.tableRight = new Phaser.GameObjects.Sprite(this, 360, 300);
        this.physics.add.existing(this.tableRight, true);
        this.physics.add.collider(this.tableRight);
        this.tableRight.body.setSize(20, 350);

        //CREAR PELOTAS
        this.balls = [];
        this.numBalls = 10;
        for (let i = 0; i < this.numBalls; ++i){
            if (i < 5) { //Se crean las bolas del lado de PenguinChan
                this.balls[i] = new Ball(this, 130 + 50 * i, 461);
                this.balls[i].isInPenguinZone = true;
            }
            else { //Se crean las bolas del lado de RatChan
                this.balls[i] = new Ball(this, 590 + 50 * (-i), 175);
                this.balls[i].isInRatZone = true;
            }

            //Coger la pelota por parte de PenguinChan/pelotazo
            this.physics.add.overlap(this.penguinChan, this.balls[i], () => {
                //Si no tiene una pelota ya cogida, la puede coger y dicha pelota está en la zona de Penguin
                if (!this.penguinChan.hasBall && this.balls[i].isInPenguinZone && this.penguinChan.actionKey.isDown && !this.actionPressedPenguin) {
                    this.penguinChan.hasBall = true;
                    this.balls[i].isPickedPenguin = true;
                    this.actionPressedPenguin = true;
                    
                }
                //Lanzar bola
                else if (this.penguinChan.actionKey.isDown && this.penguinChan.hasBall && !this.actionPressedPenguin) {
                    this.penguinChan.hasBall = false;
                    this.balls[i].isPickedPenguin = false;
                    this.balls[i].body.velocity.y = -70;
                    this.actionPressedPenguin = true;
                    this.throwAudio.play();

                }
                else if (!this.penguinChan.actionKey.isDown) {
                    this.actionPressedPenguin = false;
                }

                //pelotazo
                if (this.balls[i].body.velocity.y !== 0) {
                    this.penguinChan.isStun = true;
                    //TODO animacion de caerse

                    this.stunAudio.play();

                    this.time.addEvent({
                        delay: 2000,
                        callback: () => {
                            this.penguinChan.isStun = false;
                            //TODO animacion nomal


                        }
                    })
                }

            })

            //Coger pelota por parte de RatChan/pelotazo
            this.physics.add.overlap(this.ratChan, this.balls[i], () => {
                //Si no tiene una pelota ya cogida, la puede coger y dicha pelota está en la zona de Penguin
                if (!this.ratChan.hasBall && this.balls[i].isInRatZone && this.ratChan.actionKey.isDown && !this.actionPressedRat) {
                    this.ratChan.hasBall = true;
                    this.balls[i].isPickedRat = true;
                    this.actionPressedRat = true;
                }
                //Lanzar bola
                else if (this.ratChan.actionKey.isDown && this.ratChan.hasBall && !this.actionPressedRat) {
                    this.ratChan.hasBall = false;
                    this.balls[i].isPickedRat = false;
                    this.balls[i].body.velocity.y = 70;
                    this.actionPressedRat = true;
                    this.throwAudio.play();
                }
                else if (!this.ratChan.actionKey.isDown) {
                    this.actionPressedRat = false;
                }

                //pelotazo
                if (this.balls[i].body.velocity.y !== 0) {
                    this.ratChan.isStun = true;
                    this.stunAudio.play();
                    //TODO animacion de caerse

                    this.time.addEvent({
                        delay: 2000,
                        callback: () => {
                            this.ratChan.isStun = false;
                            //TODO animacion nomal

                            
                        }
                    })
                }
            })

            // choque entre pelotas
            this.physics.add.collider(this.balls[i], this.balls, () => {
                this.collideAudio.play();
            });

            //choque con las paredes del tablero
            this.physics.add.collider(this.balls[i], this.tableLeft);
            this.physics.add.collider(this.balls[i], this.tableRight);

        } //Fin for crear pelotas y sus colisiones

        
        //Tablero penguinChan
        this.penguinSide = new Phaser.GameObjects.Sprite(this, 250, 460);
        this.physics.add.existing(this.penguinSide, true); //Es estatico
        this.physics.add.collider(this.penguinSide);
        this.penguinSide.body.setSize(300, 20);

        //Tablero rat chan
        this.ratSide = new Phaser.GameObjects.Sprite(this, 250, 175);
        this.physics.add.existing(this.ratSide, true);
        this.physics.add.collider(this.ratSide);
        this.ratSide.body.setSize(300, 20);


        this.endTime = false;
        this.timer = this.time.addEvent({
            delay: 90000,
            callback: () => {
                this.endTime = true;
            }
        })

        this.remainingTime = this.add.text(50, 20, '', { fontSize: '50px', fontFamily: 'babelgam' });
    }

    update() {
        this.remainingTime.setText(this.timer.getRemainingSeconds().toFixed(0));
        //Si no se ha acabado el juego, se hace la lógica de la escena
        if (!this.endTime && !this.endNumBalls) {
            this.penguinChan.update();
            this.ratChan.update();

            this.numBallsPenguin = 0;
            this.numBallsRat = 0;
            for (let i = 0; i < this.numBalls; ++i){
                this.balls[i].update();
                if (this.balls[i].isInPenguinZone) {
                    this.numBallsPenguin++;
                }
                else if (this.balls[i].isInRatZone) {
                    this.numBallsRat++;
                }
            }

            //Comprueba si un jugador tiene todas las pelotas y si es asi, acaba la partida
            if (this.numBallsPenguin === 10 || this.numBallsRat === 10) {
                this.endNumBalls = true;
            }
            
        }
        else {
            //cambio escena pasando parametros de perder o ganar
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.scene.start("FinalScene", {ballsPenguin: this.numBallsPenguin, ballsRat: this.numBallsRat });
                }
            })
        }

    }

}