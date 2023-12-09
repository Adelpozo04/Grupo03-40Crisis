import Arma from "./arma.js"
import Bala from "./balas.js"
export default class armaDisparos extends Arma{
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

        var enfriamientoTimeRec = new Map([
            ['pistola', 2], ['metralleta', 0.2], ['franco', 7]
        ]);
        var damageArmaRec = new Map([
            ['pistola', 5], ['metralleta', 2], ['franco', 30]
        ]);

        console.log(key);

        this.municion = 30;

        this.enfriamientoTime = enfriamientoTimeRec.get(key);

        this.damageArma = damageArmaRec.get(key);

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

    reload(){
        this.municion += 20;
    }

    volverADisparar(){
        this.enfriamientoPasado = true;
    }

    tryAttack()
    {
        console.log(this.enfriamientoTime);
        console.log(this.enfriamientoPasado + " / " + this.canShoot);

        if (this.canShoot && this.enfriamientoPasado && this.municion > 0)
        {
            var bala = this.scene.grupoBalas.get(this.x, this.y, 'bala', this.damageArma);
            if (bala)
            {
                bala.disparar(Math.cos(super.getAngle()) , Math.sin(super.getAngle()))
            }
            this.enfriamientoPasado = false;
            this.municion--;
        }   
    }

    preUpdate()
    {
        super.update(true);
    }
}