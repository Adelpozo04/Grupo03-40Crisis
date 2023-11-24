import Enemigo from'./enemigo.js'
export default class Hamburgesa extends Enemigo {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {key} key - sprite
     * @param {player} player - referencia al player
     */ 
    constructor(scene, x, y, key, player)
    {
        super(scene, x, y, player, 0.5, 30);
        this.speed = 0.5; // velocidad enemigo
        this.attackDistance = 30; // distancia ataque (30 = melee)
        
        this.key = key;
        scene.add.existing(this);
        this.burger = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);
        this.add(this.burger);
        this.setScale(1); //cuidao que esto igual da problemas
    
        this.attackFlag = true;
    }

    attack() { super.attack() }

    // hace la animación y si se termina llamamos a attack en el super
    tryAttack()
    {
        this.burger.play('attackburger', true);
        this.burger.on('animationcomplete', function(){
            this.attack();
            this.attackFlag = true;
            this.burger.off('animationcomplete');
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
            this.burger.play('walkburger', true);
            this.attackFlag = true;
            this.burger.off('animationcomplete');
        }


        //flip del sprite en función de la pos del player
        if (this.x < super.getPlayer().x)
        {
            this.burger.setFlip(false, false);
        }
        else if (this.x > super.getPlayer().y)
        {
            this.burger.setFlip(true, false);
        }
    }
}
