import PantallaInicial from "./PantallaInicial.js"

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
    pixelArt:true,
    scene : [PantallaInicial]

}

new Phaser.Game(config) //constructor de phaser en si
