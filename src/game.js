import PantallaInicial from "../PantallaInicial"

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    pixelArt:true,
    scene : [PantallaInicial]

}

new Phaser.Game(config) //constructor de phaser en si
