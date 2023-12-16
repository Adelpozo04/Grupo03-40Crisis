import Arma from "./arma.js"
import explosive from "./explosive.js";
import muro from "./muro.js";
import remoteExplosive from "./remoteExplosive.js";

export default class armaObjetosSpawneado extends Arma{
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, TiempoCooldown, key, player)
    {
        super(scene, 0, 0, key, player)
        this.scene = scene;

        this.key = key;

        this.enfriamientoTime = TiempoCooldown;

        this.enfriamientoPasado = true;

        this.canShoot = true;

        this.elapsedTime = 0;

        this.scene.input.on('pointerdown', (pointer) =>
        {
            if (this.active && pointer.leftButtonDown()){
                this.tryAttack();
            }
            
        })

        this.event = this.scene.time.addEvent({
            delay: 1000,
            callback: this.calculateElapsedTime,
            callbackScope: this,
            loop: true
    
            })
        
    }

    calculateElapsedTime(){
        this.elapsedTime += 1;
    }

    tryAttack()
    {

        if (this.canShoot && this.elapsedTime >= this.enfriamientoTime)
        {


            if(this.key == 'muro'){
                
                let muroObj = new muro(this.scene, this.player.getCenterPoint().x, this.player.getCenterPoint().y, 'muro', this.player);
                
            }
            else if(this.key == 'mina'){
                
                let explosiveObj = new explosive(this.scene, this.player.getCenterPoint().x, this.player.getCenterPoint().y, 'mina', 0);
            }
            else if(this.key == 'c4'){
                
                let explosiveRemObj = new remoteExplosive(this.scene, this.player.getCenterPoint().x, this.player.getCenterPoint().y, 'c4');
            }

            if(this.key == this.player.getCurrentWeaponName()){
                this.player.gainPersonalityExp(1);
            }

            this.elapsedTime = 0;
            
        }   
    }

    preUpdate()
    {
        super.update(true);
    }
}