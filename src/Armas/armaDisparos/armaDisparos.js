import Arma from "../arma.js"
import Bala from "./balas.js"
import BalaMagica from "./balasMagicas.js";
export default class armaDisparos extends Arma{
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} tiempoCooldown - posicion x
    * @param {number} damageArma - posicion y
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, tiempoCooldown, damageArma, key, player)
    {
        super(scene,0,0,key,player)
        this.key = key;

        this.scene = scene

        this.enfriamientoTime = tiempoCooldown;
        this.damageArma = damageArma;

        this.canShoot = true;
        this.elapsedTime = 0;

        this.scene.input.on('pointerdown', (pointer) =>
        {
            if (this.active)
                this.tryAttack()
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

        console.log('disparo', this.key);

        if (this.canShoot && this.elapsedTime >= this.enfriamientoTime && this.player.disparosAmmo > 0)
        {
            console.log(this.key, this.key == 'varita');

            if(this.key == 'varita'){

                var balaMag = new BalaMagica(this.scene, this.x, this.y, 'balaMagica', this.damageArma);

                balaMag.disparar(Math.cos(super.getAngle()) , Math.sin(super.getAngle()), this.rotation);

            }
            else{
                var bala = this.scene.grupoBalas.get(this.x, this.y, 'bala', this.damageArma);
                if (bala)
                {
                    bala.disparar(Math.cos(super.getAngle()) , Math.sin(super.getAngle()))
                }
                this.player.disparosAmmo--;
                
            }

            this.elapsedTime = 0;
    
                if(this.key == this.player.getCurrentWeaponName()){
                    this.player.gainPersonalityExp(1);
                }
            
        }   
    }

    preUpdate()
    {
        super.update(true);
    }
}