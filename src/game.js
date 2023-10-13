var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    pixelArt:true,
    scene:[{create:create, preload:preload}]

}

new Phaser.Game(config) //constructor de phaser en si

function create(){

    //setOrigin para cambiar el origen respecto a la imagen y setScale para cambiar el tamaño
    this.add.image(200, 300, "samuel").setOrigin(0, 0).setScale(0.1, 0.1);
}

function preload(){
    //hace falta una clave que es el nombre y una ruta
    this.load.image("samuel","Images/orangutan.png");

}