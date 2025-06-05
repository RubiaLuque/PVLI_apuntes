import Player from "./Player.js"
import Enemy from "./Enemy.js"
export default class Level extends Phaser.Scene{
    constructor() {
        super({ key: "Level" });
    }

    init() {
    }
    
    preload() {
        //JSON con toda la informacion del tileset y del mapa
        this.load.tilemapTiledJSON("map", "assets/terrain.json");
        //Imagen con el propio tileset
        this.load.image("tiles", "assets/tileset.png");
        

        this.load.spritesheet("playerSheet", "assets/player.png", { frameWidth: 14, frameHeight: 14 });
        this.load.spritesheet("balloonSheet", "assets/balloon.png", { frameWidth: 12, frameHeight: 12 });
        this.load.spritesheet("enemySheet", "assets/enemy.png", { frameWidth: 16, frameHeight: 16 });

        this.load.audio("looseAudio", "assets/loose.mp3");
        this.load.audio("winAudio", "assets/victory.mp3");
        this.load.audio("balloonExplosionAudio", "assets/balloon.mp3");
    }

    create() {
        //Lienzo para el mapa. La key tiene que ser el ID que se le ha dado cuando se ha hecho tilemapTiledJSOON
        this.sceneMap = this.make.tilemap({ key: "map" });
        //La informacion del tileset en json se asocia a la imagen de los tiles
        let tileset = this.sceneMap.addTilesetImage("tileset", "tiles");
        //Coge la capa de land y la rellena con la info que tiene tileset
        this.groundLayer = this.sceneMap.createLayer("land", tileset);
        this.groundLayer.setCollision([1, 2, 3, 4, 9, 10, 11, 12]); //Se añade como colisionable
        //Coge la capa de water y la rellena con la info que tiene tileset
        this.waterLayer = this.sceneMap.createLayer("water", tileset);
        this.waterLayer.setCollision([13, 14, 15, 16]); //Se añade como colisionable

        //Sonidos
        this.looseSound = this.sound.add("looseAudio");
        this.winSound = this.sound.add("winAudio");
        this.balloonExplosionSound = this.sound.add("balloonExplosionAudio");

        //Score
        this.score = 0;
        this.scoreText = this.add.text(150, 10, "Score: " + this.score, { fontSize: 15, fontFamily: "arcade" });

        //Jugador
        this.player = new Player(this, 50, 10);
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player.balloon, this.groundLayer);
        /*this.physics.add.overlap(this.player, this.waterLayer, () => {
            this.scene.start("GameOver");
        });*/

        //Crear enemigos
        this.enemies = [];
        this.numEnemies = 4;
        this.remainingEnemies = this.numEnemies;
        for (let i = 0; i < this.numEnemies; i++){
            
            this.enemies[i] = new Enemy(this, Math.floor(Math.random() * (400 - 60) + 60), Math.floor(Math.random() * (300 - 25) + 25), Math.floor(Math.random() * 35));
            
            this.physics.add.collider(this.enemies[i], this.groundLayer);
            this.physics.add.collider(this.enemies[i].enemyBalloon, this.groundLayer);

            this.physics.add.overlap(this.player.balloon.body, this.enemies[i], () => {
                //PIERDE EL JUGADOR
                //Solo funciona si el enemigo tiene globo y no esta muerto
                if (!this.enemies[i].withoutBalloon && !this.enemies[i].isDead) {
                    //TODO Animacion de explotar globo
                    //TODO Animacion muerte jugador
                    
                    this.player.balloon.setActive(false);
                    this.player.balloon.setVisible(false);
                    this.player.balloon.body.setEnable(false);
                    this.player.setActive(false);
                    this.time.addEvent({
                        delay: 2000,
                        callback: () => {
                            this.looseSound.play();
    
                            this.scene.start("GameOver");
                        }
                    });
                    
                }
            });

            this.physics.add.overlap(this.player, this.enemies[i].enemyBalloon, () => {
                //Enemigo cae
                //TODO Animacion de explotar globo
                this.enemies[i].enemyBalloon.setActive(false);
                this.enemies[i].enemyBalloon.setVisible(false);
                this.enemies[i].enemyBalloon.body.setEnable(false); //Se quita de las fisicas
                this.balloonExplosionSound.play();
                this.score += 300;
                this.enemies[i].withoutBalloon = true;
                //no chocable durante 1 segundo --> Añadir booleano de no colision
                this.enemies[i].notCollisionable = true;
                this.time.addEvent({
                    delay: 1000,
                    callback: ()=> {
                        this.enemies[i].notCollisionable = false;
                    }
                })

                //Si tras 10 segundos no ha muerto, se añade de nuevo el globo y prosigue
                this.time.addEvent({
                    delay: 10000,
                    callback: () => {
                        if (!this.enemies[i].isDead) {
                            this.enemies[i].withoutBalloon = false;
                            this.enemies[i].enemyBalloon.setActive(true);
                            this.enemies[i].enemyBalloon.setVisible(true);
                            this.enemies[i].enemyBalloon.body.setEnable(true); //Se vuelve a meter en las fisicas
                        }
                    }
                })
            });

            this.physics.add.overlap(this.player, this.enemies[i], () => {
                //Si no tiene globo se muere el enemigo
                //Decrementar contador de enemigos

                //comprobar booleano de no colision
                if (this.enemies[i].withoutBalloon && !this.enemies[i].notCollisionable && !this.enemies[i].isDead) {
                    //TODO animacion muerte enemigo
                    this.remainingEnemies--;
                    this.enemies[i].isDead = true;
                    this.enemies[i].setVisible(false);
                    this.enemies[i].setActive(false);
                    this.score += 500;
                }
                    
            });
            console.log(this.enemies[i]);
        }
                
        
    }

    update() {
        if (this.player.active) {
            this.player.update();
        }

        //Update enemigos:
        for (let i = 0; i < this.numEnemies; i++){
            if (!this.enemies[i].isDead) this.enemies[i].update();
        }

        if (this.remainingEnemies <= 0) {
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    this.winSound.play();
                    this.scene.start("Win", { score: this.score });
                }
            })
        }

        this.scoreText.text = "Score: " + this.score;
    }
}