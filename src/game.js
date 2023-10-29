import PantallaInicial from "./PantallaInicial.js"
import PlayaLevel from "./PlayaLevel.js"

var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 800,
    scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
    pixelArt:true,
    scene : [PlayaLevel]
    
}

new Phaser.Game(config) //constructor de phaser en si
