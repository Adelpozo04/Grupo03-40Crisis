export default class arma extends Phaser.GameObjects.Container {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, x, y, key, player)
    {
        super(scene, x, y);
        scene.add.existing(this);
        this.player = player;
        
        this.arma = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);
        this.add(this.arma)
        this.setScale(32)
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
        this.followCursor();
    }
}