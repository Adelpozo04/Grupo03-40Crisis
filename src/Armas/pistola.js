import Arma from "./arma.js"
import Bala from "./balas.js"
export default class pistola extends Arma{
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, x, y, key, player)
    {
        super(scene,x,y,key,player)


        
        this.canShoot = true;

        this.scene.input.on('pointerdown', (pointer) =>
        {
            this.tryAttack()
        })
    }


    tryAttack()
    {
        if (this.canShoot)
        {
            let bala = this.balas.get()
            console.log("piu")
        }
        
    }
}