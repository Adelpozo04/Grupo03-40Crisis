import Arma from "./arma.js"
export default class armaMelee extends Arma{
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, x, y, key, player)
    {
        super(scene,x,y,key,player);
        this.key = key;
        scene.physics.world.enable(this);
        this.enfriamientoTime = new Map([
            ['fist', 600], ['bate', 1000], ['espada', 800]
        ]);
        this.damageArma = new Map([
            ['fist', 1], ['bate', 1], ['espada', 1]
        ]);

        this.Attacking = false;
        this.colliderActive = false;

        this.newAngle = 0
        this.scene.input.on('pointerdown', (pointer) =>
        {
            if (!this.Attacking)
                this.tryAttack()
        })
    }



    startAttack()
    {
        this.Attacking = false; 
    }

    swingingAnimation()
    {
        this.newAngle = super.getAngle();

        this.scene.tweens.add({
            targets: this,
            newAngle: this.newAngle + 1,
            duration: 230,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.colliderActive = true;
                this.scene.time.delayedCall(50, () => {
                    this.scene.tweens.add({
                        targets: this,
                        newAngle: this.newAngle - 2,
                        duration: 100,
                        ease: 'Sine.easeInOut',
                        onComplete: () => {
                            this.colliderActive = false;
                            this.scene.time.delayedCall(50, () =>{
                                this.scene.tweens.add({
                                    targets: this,
                                    newAngle: this.newAngle + 1,
                                    duration: 230,
                                    ease: 'Sine.easeInOut'
                                })
                            })
                        }
                    })
                })
            }
        })
    }

    tryAttack()
    {
        this.Attacking = true;
        // llamada para para cooldown del ataque
        this.scene.time.delayedCall(this.enfriamientoTime.get(this.key), this.startAttack, [], this);
        this.swingingAnimation()
    }

    preUpdate()
    {
        super.update(!this.Attacking);
        if (this.Attacking)
        {
            let playerPos = this.player.getCenterPoint();
            let radio = super.getRadio()
            let newX = playerPos.x + radio * Math.cos(this.newAngle);
            let newY = playerPos.y + 10 + radio * Math.sin(this.newAngle);
            
            this.setPosition(newX, newY)
            this.setRotation(this.newAngle)

            if (this.colliderActive)
            {
                this.scene.comprobarColisionesMelee(this)
            }
        }
        
    }
}