export default class enemigo extends Phaser.GameObjects.Container {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {player} player - referencia al player
     * @param {number} speed - velocidad
     * @param {number} attackDistance - distancia mínima de ataque
     */

    //Habria que poner una variable life
    constructor(scene, x, y, player, speed, attackDistance, damage, life){
        super(scene, x, y);

        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.player = player;
        this.speed = speed;
        this.damage = damage;
        this.life = life;
        this.direction = new Phaser.Math.Vector2();
        this.attackDistance = attackDistance;

        this.isAttacking = false;
        this.canDamage = true;
    
        this.body.setSize(this.width, this.width);

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


    attack()
    {
        this.player.damagePlayer(this.damage);
    }

    basicMovement(canMove)
    {
        var playerPosition = this.player.getCenterPoint();

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
            if (canMove)
            {
                this.x += this.speed * this.direction.x;
                this.y += this.speed * this.direction.y;
            }
        }
    }

    applyEffect(keyPotenciador){

        if(keyPotenciador == 'botiquin'){
            this.life = this.life + 0.5 * this.maxLife;
        }
        else if(keyPotenciador == 'zapato'){
            this.speed = this.speed * 1.5;
        }
        else if(keyPotenciador == 'vivu'){
            this.sleep = true;
        }
        else if(keyPotenciador == 'invencible'){
            this.invencible = true;
        }

        
    }
}
    