import playerContenedor from '../Player/playerContenedor.js';
import municionBalas from '../Armas/armaDisparos/municionBalas.js';
export default class enemigo extends Phaser.GameObjects.Container {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {playerContenedor} player - referencia al player
     * @param {config} config - config
     */

    constructor(scene, x, y, player, config){
        super(scene, x, y);

        this.player = player;
        this.speed = config.speed;
        this.damage = config.damage;
        this.life = config.vida;
        this.attackDistance = config.attackDistance;
        this.points = config.puntos;
        this.maxDropProbability = config.ammoDrop;

        this.direction = new Phaser.Math.Vector2();
        this.objetive = player;

        this.isAttacking = false;
        this.canDamage = true;
        this.inKnockBack = false;
        this.alive = true;
        this.invencible = false;

        this.canGetHitByWave = true;

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

    gainObjetiveState(){

        this.objetiveState = true;
    
        this.zone = this.scene.add.zone(this.x, this.y, 100, 100);
            this.scene.physics.world.enable(this.zone);
            this.zone.body.setCircle(100 / 2);
    
            this.overlapObject = this.scene.physics.add.overlap(this.scene.grupoEnemigos, this.zone, function(enemy, zone){
                if(enemy != this){
                    this.attacker = enemy;
                    enemy.changeObjetive(this);
                    this.zone.destroy();
                }
                
            }, null, this)
    
    }

    receiveDamage(damage){

        if(!this.invencible && this.alive && !(this.inKnockBack && this.canGetHitByWave)){
          
            this.life -= damage;

            if(this.life <= 0){

                if(this.objetiveState){

                    this.attacker.changeObjetive(this.player);

                }

                this.alive = false;
                this.body.setVelocity(0, 0);
                this.scene.sendPoints(this.points);
                
                this.player.gainPersonalityExp(2);
        
                var dropMunition = Phaser.Math.Between(1, this.maxDropProbability);
    
        
                if(dropMunition == 1){
                    this.spawnMunition();
                }
    
                this.enemy.play('enemydeath', true);
                this.body.destroy();
                this.enemy.on('animationcomplete', this.destroyMyself )

                  // Asegúrate de contabilizar la eliminación solo una vez
                if (!this.isDestroyed) {
                this.scene.decreaseEnemiesLeft();
                this.isDestroyed = true;
            
             
                }
            }
        }
    }   

    recieveDamageNotGetPoints(damage)
    {
        if(!this.invencible && this.alive && !(this.inKnockBack && this.canGetHitByWave)){
          
            this.life -= damage;
            if(this.life <= 0){

                if(this.objetiveState){

                    this.attacker.changeObjetive(this.player);
                }

                this.alive = false;
                this.body.setVelocity(0, 0);
    
                this.enemy.play('enemydeath', true);
                this.body.destroy();
                this.enemy.on('animationcomplete', this.destroyMyself )

                  // Asegúrate de contabilizar la eliminación solo una vez
                if (!this.isDestroyed) {
                this.scene.decreaseEnemiesLeft();
                this.isDestroyed = true;
             
                }
            }
        }
    }

    attack()
    {
        this.objetive.receiveDamage(this.damage);
    }

    basicMovement(canMove)
    {
        if(!this.objetiveState){
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
        else{
            this.body.setVelocity(0, 0);
        }
        
        
        if(this.zone != undefined){
            this.zone.x = this.body.x + 16;
            this.zone.y = this.body.y + 16;
        }
        
    }

    destroyMyself(){
        this.destroy();
    }

    // tienes que pasarle un Phaser.Math.Vector2D normalizado
    // 600 = al que estaba antes
    knockBack(direction, knockBackSpeed)
    {
        direction.normalize();
        if (!this.inKnockBack)
        {
            this.inKnockBack = true;
            this.body.setVelocity(knockBackSpeed * direction.x, knockBackSpeed * direction.y)
            this.scene.time.delayedCall(300, () =>{ this.inKnockBack = false })
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
                if (!this.underSpeedEffect)
                {
                    this.underSpeedEffect = true;
                    this.aux = this.speed;
                    this.speed = 280;
                    this.scene.time.delayedCall(6000, () => {
                        this.speed = this.aux // Reducir la velocidad de nuevo después de 3 segundos
                        this.underSpeedEffect = false;
                    });
                }
                break;
            case 'vivu':
                if (!this.underSpeedEffect)
                {
                    this.underSpeedEffect = true;
                    this.aux = this.speed;
                    this.speed = 0;
                    this.scene.time.delayedCall(5000, () => {
                        this.speed = this.aux;
                        this.underSpeedEffect = false;
                    });
                }
                break;
            case 'invencible':
                this.invulnerable = true;
                this.scene.time.delayedCall(5000, () => {
                    this.invulnerable = false;
                });
                break;
            case 'bocaIncendios':
                if (!this.underSpeedEffect)
                {
                    this.underSpeedEffect = true;
                    this.aux = this.speed;
                    this.speed = 40
                    this.scene.time.delayedCall(2000, () => {
                        this.speed = this.aux 
                        this.underSpeedEffect = false;
                    });
                }
                break;
            case 'coche':
                if (this.canGetHitByWave)
                {
                    this.canGetHitByWave = false;
                    this.recieveDamageNotGetPoints(5)
                    this.scene.time.delayedCall(300, () => {
                        this.canGetHitByWave = true;
                    });
                }
                break;
            default:
                break;
        }
    }

    getCenterPoint(){
        return {x: this.x + 16, y: this.y + 16};
    }
}