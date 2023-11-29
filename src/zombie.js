import Enemigo from'./enemigo.js'
export default class Zombie extends Enemigo {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {key} key - sprite
     * @param {player} player - referencia al player
     */ 
    constructor(scene, x, y, key, player)
    {
        super(scene, x, y, player, 1, 30, 10, 25);

        this.speed = 1; // velocidad enemigo
        this.attackDistance = 30; // distancia ataque (30 = melee)
        this.damage = 10;
        this.life = 25;

        this.key = key;
        scene.add.existing(this);
        this.zombie = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);
        this.add(this.zombie);
        this.setScale(2); //cuidao que esto igual da problemas
    
        this.attackFlag = true;
    }

    attack() { super.attack() }

    // hace la animación y si se termina llamamos a attack en el super
    tryAttack()
    {
        this.zombie.play('attackzombie', true);
        this.zombie.on('animationcomplete', function(){
            this.attack();
            this.attackFlag = true;
            this.skeleton.off('animationcomplete');
        }, this)
    }

    update(){
        // super accede a la clase ENEMIGO, donde basicMovement te mueve al player
        // y direction.x / y son las variables de direccion
        super.basicMovement();

        // si podemos atacar y seguimos en rango, intentamos atacar
        if (this.attackFlag && super.isAttacking())
        {
            this.attackFlag = false;
            this.tryAttack();
        } else if (!super.isAttacking())
        {
            this.skeleton.play('walkskeleton', true);
            this.attackFlag = true;
            this.skeleton.off('animationcomplete');
        }


        //flip del sprite en función de la pos del player
        if (this.x < super.getPlayer().x)
        {
            this.skeleton.setFlip(false, false);
        }
        else if (this.x > super.getPlayer().y)
        {
            this.skeleton.setFlip(true, false);
        }
    }
}
