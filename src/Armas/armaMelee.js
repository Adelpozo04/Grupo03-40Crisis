import Arma from "./arma.js"
export default class armaMelee extends Arma{
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} tiempoCooldown - tiempo entre ataques
    * @param {number} damageArma - daño del arma
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, tiempoCooldown, damageArma, key, player)
    {
        super(scene,0,0,key,player);
        this.key = key;
        scene.physics.world.enable(this);

        this.tiempoCooldown = tiempoCooldown
        this.damageArma = damageArma

        this.colliderActive = false;

        this.Attacking = false;
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
        this.scene.time.delayedCall(this.tiempoCooldown, this.startAttack, [], this);
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
        }

        // comprobar colisiones creando una zona circular que se destruye si no ha hecho overlap
        if (this.colliderActive)
        {
            var radioAtaque = 20
            var zone = this.scene.add.zone(this.x ,this.y, radioAtaque*2, radioAtaque*2)
            this.scene.physics.world.enable(zone);
            zone.body.setCircle(radioAtaque)

            this.scene.physics.add.overlap(zone, this.scene.grupoEnemigos, function(zone, enemy){
                enemy.recieveDamage(this.damageArma)
                //enemy.knockBack();
            })
            
            this.scene.time.delayedCall(20, () => { zone.destroy(); })
        }
    }
}