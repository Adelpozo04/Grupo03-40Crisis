import PantallaInicial from "./PantallaInicial.js"
import PlayaLevel from "./PlayaLevel.js"

var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 800,
    physics: {
        default: 'arcade',
        arcade:{
            debug: true,
            gravity: {y: 0}
        }
    },
    scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
    pixelArt:true,
    scene : [PantallaInicial, PlayaLevel]
    
}

new Phaser.Game(config) //constructor de phaser en si
