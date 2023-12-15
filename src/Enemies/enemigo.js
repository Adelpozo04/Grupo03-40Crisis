import playerContenedor from '../Player/playerContenedor.js';
import municionBalas from '../Armas/municionBalas.js';
export default class enemigo extends Phaser.GameObjects.Container {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {playerContenedor} player - referencia al player
     * @param {number} speed - velocidad
     * @param {number} attackDistance - distancia mínima de ataque
     */

    constructor(scene, x, y, player, speed, attackDistance, damage, life, points){
        super(scene, x, y);
        
        this.scene.add.existing(this);
        this.player = player;
        this.speed = speed;
        this.damage = damage;
        this.life = life;
        this.direction = new Phaser.Math.Vector2();
        this.attackDistance = attackDistance;
        this.points = points;

        this.objetive = player;

        this.isAttacking = false;
        this.canDamage = true;
        this.inKnockBack = false;
        this.alive = true;
        this.invencible = false;

        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);  
    }
    
    isInAttackRange(){
        return this.isAttacking;
    }
    getPlayer(){
        return this.player;
    }
    getDirection() {
        return { x: this.direction.x, y: this.direction.y };
    }

    changeObjetive(objetive){
        this.objetive = objetive;
    }

    recieveDamage(damage){

        if(!this.explosiveState && !this.invencible){
          
            this.life -= damage;

            console.log(this.life + " " + this.damage)
            if(this.life <= 0){
                this.alive = false;
                this.body.setVelocity(0, 0);
                this.body.destroy();
                this.scene.sendPoints(this.points);
                this.player.gainPersonalityExp(this.exp);
        
                var dropMunition = Phaser.Math.Between(1, this.maxDropProbability);
        
                console.log(dropMunition);
        
                if(dropMunition == 1){
                    this.spawnMunition();
                }
    
                this.enemy.play('enemydeath', true);
                this.enemy.on('animationcomplete', this.destroyMyself )
            }
        }

    }   


    attack()
    {
        this.objetive.receiveDamage(this.damage);
    }

    basicMovement(canMove)
    {
        var playerPosition = this.objetive.getCenterPoint();
        
        this.direction = new Phaser.Math.Vector2(
            playerPosition.x - this.x,
            playerPosition.y - this.y
        );
        this.direction.normalize();
        
        // calcular la distancia entre enemigo y player, si está debajo del mínimo de distancia
        // de ataque, dejar de acercarse y atacar
        if (Math.abs(this.x - playerPosition.x) < this.attackDistance &&
            Math.abs(this.y - playerPosition.y) < this.attackDistance)
        {
            this.isAttacking = true;
        }
        else
        {
            this.isAttacking = false;
            
            if (canMove && !this.inKnockBack)
            {
                this.body.setVelocity(this.speed * this.direction.x, this.speed * this.direction.y);
                this.body.velocity.normalize().scale(this.speed);
            }
        }
    }

    destroyMyself(){
        this.destroy();
    }

    // tienes que pasarle un Phaser.Math.Vector2D normalizado
    knockBack(direction)
    {
        if (!this.inKnockBack)
        {
            let knockBackSpeed = 1000
            this.inKnockBack = true;
            this.body.setVelocity(knockBackSpeed * direction.x, knockBackSpeed * direction.y)
            this.scene.time.delayedCall(100, () =>{ this.inKnockBack = false })
        }
    }
    
    spawnMunition(){
    
        this.ammo = new municionBalas(this.scene, this.body.x + this.posXCentered, this.body.y + this.posYCentered, 'bulletAmmo');
        this.scene.addAmmoToGroup(this.ammo);
        this.scene.add.existing(this.ammo);
    }
    
    applyEffect(keyPotenciador){
        switch (keyPotenciador) {
            case 'botiquin':
                this.life += this.maxLife / 2;
                if (this.life > this.maxLife) {
                    this.life = this.maxLife;
                }
                break;
            case 'velocidad':
                this.aux = this.speed;
                this.speed = 250;
                this.scene.time.delayedCall(6000, () => {
                    this.speed = this.aux 
                });
                break;
            case 'vivu':
                this.aux = this.speed;
                this.speed = 0;
                this.scene.time.delayedCall(5000, () => {
                    this.speed = this.aux;
                });
                break;
            case 'invencible':
                this.invulnerable = true;
                this.scene.time.delayedCall(5000, () => {
                    this.invulnerable = false;
                });
                break;
            default:
                break;
        }
    }
}