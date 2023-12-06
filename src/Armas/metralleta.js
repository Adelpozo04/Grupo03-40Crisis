import Arma from "./arma.js"
import Bala from "./balas.js"
export default class metralleta extends Arma{
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
        this.scene = scene

        this.enfriamientoTime = 0.1;

        this.enfriamientoPasado = true;

        this.canShoot = true;

        this.scene.input.on('pointerdown', (pointer) =>
        {
            this.tryAttack()
        })

        this.scene.time.addEvent({

            delay: this.enfriamientoTime * 1000,
            loop: true,
            callback: this.volverADisparar,
            callbackScope: this,
            paused: this.enfriamientoPasado == false
        
        });
        
    }

    volverADisparar(){
        this.enfriamientoPasado = true;
    }

    tryAttack()
    {
        if (this.canShoot && this.enfriamientoPasado)
        {
            var bala = this.scene.grupoBalas.get(this.x, this.y, 'bala', 2);
            if (bala)
            {
                bala.disparar(Math.cos(super.getAngle()) , Math.sin(super.getAngle()))
            }
            this.enfriamientoPasado = false;
        }   
    }
}