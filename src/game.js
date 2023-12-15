import PantallaInicial from "./Scenes/PantallaInicial.js"
import PlayaLevel from "./Scenes/PlayaLevel.js"
import CiudadLevel from "./Scenes/CiudadLevel.js"
import VolcanLevel from "./Scenes/VolcanLevel.js"
import SelectorNivel from "./Scenes/SelectorNivel.js"

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
    scene : [PantallaInicial, SelectorNivel, PlayaLevel, CiudadLevel, VolcanLevel]
    
}

new Phaser.Game(config) //constructor de phaser en si
