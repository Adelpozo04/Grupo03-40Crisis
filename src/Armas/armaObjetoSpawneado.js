import Arma from "./arma.js"
import explosive from "./explosive.js";
export default class armaObjetosSpawneado extends Arma{
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
        this.scene = scene;

        this.key = key;

        this.municion = 30;

        this.enfriamientoTime = 100;

        this.enfriamientoPasado = true;

        this.canShoot = true;

        this.elapsedTime = 0;

        this.scene.input.on('pointerdown', (pointer) =>
        {
            this.tryAttack()
        })

        this.event = this.scene.time.addEvent({
            delay: 1000,
            callback: this.calculateElapsedTime,
            callbackScope: this,
            loop: true
    
            })
        
    }

    reload(){
        this.municion += 20;
    }

    calculateElapsedTime(){
        this.elapsedTime += 1;
    }

    tryAttack()
    {

        if (this.canShoot && this.elapsedTime >= this.enfriamientoTime && this.municion > 0)
        {
            if(this.key = 'mina'){
                this.explosive = new explosive(this.scene, this.centroPlayerEnPantallaX, this.centroPlayerEnPantallaY, this.key, 0);
            }
            
        }   
    }
}