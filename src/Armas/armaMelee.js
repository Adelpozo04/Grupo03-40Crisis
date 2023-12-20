import Arma from "./arma.js"
export default class armaMelee extends Arma{
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} tiempoCooldown - tiempo entre ataques
    * @param {number} damageArma - daño del arma
    * @param {number} knockBackSpeed - cantidad de knockback
    * @param {key} key - key
    * @param {player} player - referencia a player
    */
    constructor(scene, tiempoCooldown, damageArma, knockBackSpeed, key, player)
    {
        super(scene,0,0,key,player);
        this.key = key;
        this.player = player;
        scene.physics.world.enable(this);

        this.enfriamientoTime = tiempoCooldown
        this.damageArma = damageArma

        this.colliderActive = false;
        this.elapsedTime = tiempoCooldown;

        this.knockBackSpeed = knockBackSpeed

        this.Attacking = false;
        this.newAngle = 0
        
        // manejo de input del ratón
        this.scene.input.on('pointerdown', (pointer) =>
        {
            if (!this.Attacking && this.active)
                this.tryAttack()
        })

        this.event = this.scene.time.addEvent({
            delay: 1000,
            callback: this.calculateElapsedTime,
            callbackScope: this,
            loop: true
    
        });

        this.effectHit = this.scene.sound.add('meleeEffect', {loop: false});
    }

    calculateElapsedTime(){
        this.elapsedTime += 1;
    }

    startAttack()
    {
        if(this.key == this.player.getCurrentWeaponName()){
            this.player.gainPersonalityExp(1);
        }
        this.Attacking = false; 
    }

    // animación del swing del arma y spawneo de los overlap para añadir ataque y knockback
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
        this.scene.time.delayedCall(this.enfriamientoTime * 1000, this.startAttack, [], this);
        this.elapsedTime = 0;
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

            this.scene.physics.add.overlap(zone, this.scene.grupoEnemigos, (zone, enemy) =>{
                enemy.receiveDamage(this.damageArma)
                let direction = new Phaser.Math.Vector2(enemy.x - this.player.x, enemy.y - this.player.y)
                direction.normalize()
                enemy.knockBack(direction, this.knockBackSpeed);
            })
            
            this.scene.time.delayedCall(20, () => { zone.destroy(); })
        }
    }
}