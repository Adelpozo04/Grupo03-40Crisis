import PantallaInicial from "./PantallaInicial.js"

var config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 700,
    scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
    pixelArt:true,
    scene : [PantallaInicial]
    
}

new Phaser.Game(config) //constructor de phaser en si
