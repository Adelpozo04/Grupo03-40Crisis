import Enemigo from'./enemigo.js'
export default class Robot extends Enemigo {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {key} key - sprite
     * @param {player} player - referencia al player
     */ 
    constructor(scene, x, y, key, player, config)
    {
        super(scene, x, y, player, config.speed, config.attackDistance, config.damage, config.vida, config.points);
        this.key = key;
        this.posXCentered = config.posXCollider;
        this.posYCentered = config.posYCollider;
        scene.add.existing(this);

        this.enemy = new Phaser.GameObjects.Sprite(scene, this.posXCentered, this.posYCentered, key, 0);
        this.add(this.enemy);
        this.setScale(config.scale); //cuidao que esto igual da problemas
    
        this.body.setSize(config.anchoCollider,config.altoCollider);
        this.cooldownDisparos = 750;
        this.attackFlag = true;
    }

    attack() 
    {  
        this.body.setVelocity(0,0)
        var bala = this.scene.grupoBalasRobot.get(this.body.x + 16, this.body.y + 32, 'balaRobot', this.damageArma);
        var angle = Phaser.Math.Angle.Between(this.body.x + 16, this.body.y + 32, this.player.getCenterPoint().x, this.player.getCenterPoint().y)
        if (bala)
        {
            bala.disparar(Math.cos(angle) , Math.sin(angle))
        }
    }

    // hace la animación y si se termina llamamos a attack en el super
    tryAttack()
    {
        this.enemy.play('attackRobot', true);
        this.enemy.on('animationcomplete', function(){
            this.attack();
            this.scene.time.delayedCall(this.cooldownDisparos, ()=> {this.attackFlag = true});
            this.enemy.off('animationcomplete');
        }, this)
    }

    preUpdate(){
        if (this.alive)
        {
        // super accede a la clase ENEMIGO, donde basicMovement te mueve al player
        // y direction.x / y son las variables de direccion
        super.basicMovement(this.attackFlag);

        // si podemos atacar y seguimos en rango, intentamos atacar
        if (this.attackFlag && super.isInAttackRange())
        {
            this.attackFlag = false;
            this.tryAttack();
        } else if (!super.isInAttackRange())
        {
            this.enemy.play('walkrobot', true);
            this.attackFlag = true;
            this.enemy.off('animationcomplete');
        }


        //flip del sprite en función de la pos del player
        if (this.x < super.getPlayer().x)
        {
            this.enemy.setFlip(false, false);
        }
        else if (this.x > super.getPlayer().y)
        {
            this.enemy.setFlip(true, false);
        }
        }
        
    }
}
sd