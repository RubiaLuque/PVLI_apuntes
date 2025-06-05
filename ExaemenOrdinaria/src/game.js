import MainMenu from "./MainMenu.js";
import Level from "./Level.js";
import GameOver from "./GameOver.js";
import Win from "./Win.js";
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
export let config = {
	type: Phaser.AUTO,
	width:  480,
	height: 320,
	pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.FIT,
		min: {
            width: 480,
            height: 320
        },
		max: {
            width:  960, 
            height: 640  
        }
	},
	scene: [MainMenu, Level, GameOver, Win],
	physics: { 
		default: 'arcade', 
		arcade: { 
			gravity: { y: 80 }, 
			debug: true 
		} 
	}

};

new Phaser.Game(config);