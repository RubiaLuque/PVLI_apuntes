import Player from "./Player.js"

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

        this.score = 0;
        this.scoreText = this.add.text(150, 10, "Score: " + this.score, { fontSize: 15, fontFamily: "arcade" });

        this.player = new Player(this, 50, 10);
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.overlap(this.player, this.waterLayer, () => {
            //TODO
        });

        
    }

    update() {
        this.player.update();
        
    }
}