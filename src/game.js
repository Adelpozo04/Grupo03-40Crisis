import PantallaInicial from "./PantallaInicial.js"
import PlayaLevel from "./PlayaLevel.js"
import CiudadLevel from "./CiudadLevel.js"

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
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
    scene : [PantallaInicial, PlayaLevel, CiudadLevel]
    
}

new Phaser.Game(config) //constructor de phaser en si
