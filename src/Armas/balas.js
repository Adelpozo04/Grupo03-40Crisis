export default class Bala extends Phaser.GameObjects.Sprite {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {key} key - key
    */
    constructor(scene, x, y, key)
    {
        super(scene, x, y, key)
        this.scene.add.existing(this)


        this.direction;
    }

    disparar(x, y, direction)
    {
        this.setActive(true)
        this.setVisible(true)
        this.direction = direction; 
    }
    
    preUpdate()
    {
        
    }

}