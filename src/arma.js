export default class arma extends Phaser.GameObjects.Container {
    /** 
    @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {player} player - referencia a player
    */
    constructor(scene, x, y, player)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.player = player;
        
        this.arma = this.add.container(0,0);
    }

    followCursor() {
        let radio = 50;
        let playerPos = this.player.getCenterPoint();
        let angle = Phaser.Math.Angle.Between(playerPos.x, playerPos.y, this.arma.x, this.arma.y);
        // Calcular las nuevas coordenadas
        let newX = player.x + radio * Math.cos(angle);
        let newY = player.y + radio * Math.sin(angle);
        // Actualizar la posicion del contenedor
        rotatingContainer.x = newX;
        rotatingContainer.y = newY;
    }
    preload()
    {

    }
    create()
    {

    }
    update()
    {
        followCursor();
    }
}