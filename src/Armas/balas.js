export default class Bala extends Phaser.Physics.Arcade.Sprite {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {key} key - key
    */
    constructor(scene, x, y)
    {
        super(scene, x, y, 'bala')
        scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(3)
        this.speed = 350
        this.active = false;
    }

    disparar(directionX, directionY)
    {
        this.setVelocity(this.speed * directionX, this.speed * directionY);
    }
}