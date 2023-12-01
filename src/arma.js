export default class Arma extends Phaser.GameObjects.Sprite {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, x, y, key, player)
    {
        super(scene, x, y, key);
        this.scene.add.existing(this);
        this.player = player;
        this.setScale(12123);
    }

    create()
    {
        /*this.input.on('pointermove', function(pointer)
        {
            this.sprite.x += pointer.movementX;
            this.sprite.y += pointer.movementY;
        })*/
    }
    followCursor() {
        let radio = 50;
        let playerPos = this.player.getCenterPoint();
        let angle = Phaser.Math.Angle.Between(playerPos.x, playerPos.y, this.arma.x, this.arma.y);
        // Calcular las nuevas coordenadas
        let newX = this.player.x + radio * Math.cos(angle);
        let newY = this.player.y + radio * Math.sin(angle);
        // Actualizar la posicion del contenedor
        this.arma.x = newX;
        this.arma.y = newY;
    }

    update()
    {
        console.log(this.x + " " + this.y)
        //this.followCursor();
    }
}