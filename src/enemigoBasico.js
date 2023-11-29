import Enemigo from "./enemigo.js";
export default class EnemigoBasico extends Enemigo{
/**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {key} key - sprite
     * @param {player} player - referencia al player
     */ 
constructor(scene, x, y, key, player)
{
    var speedEnemigos = new Map([
        ['zombie', 3], ['skeleton', 0.5], ['burger', 1]
    ]);
    var damageEnemigos = new Map([
        ['zombie', 1], ['skeleton', 1], ['burger', 1]
    ]);
    var attackDistEnemigos = new Map([
        ['zombie', 30], ['skeleton', 30], ['burger', 30]
    ]);
    var vidaEnemigos = new Map([
        ['zombie', 1], ['skeleton', 1], ['burger', 1]
    ]);
    var scaleEnemigos = new Map([
        ['zombie', 1], ['skeleton', 2], ['burger', 1]
    ]);
    super(scene, x, y, player, speedEnemigos.get(key), attackDistEnemigos.get(key), damageEnemigos.get(key), vidaEnemigos.get(key));
    this.key = key;
    
    scene.add.existing(this);
    this.enemy = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);
    this.add(this.enemy);
    this.setScale(scaleEnemigos.get(this.key)); //cuidao que esto igual da problemas
    this.attackFlag = true;
}

// comprobamos si estamos en rango de ataque y atacamos
attack() { if (super.isInAttackRange()) {super.attack()} }

// hace la animación y si se termina llamamos a attack en el super
tryAttack()
{
    this.enemy.play('attack' + this.key, true);
    this.enemy.on('animationcomplete', function(){
        this.attackFlag = true;
        this.attack();
        this.enemy.off('animationcomplete');
    }, this)
}

update(){
    // super accede a la clase ENEMIGO, donde basicMovement te mueve al player
    // y direction.x / y son las variables de direccion
    super.basicMovement(this.attackFlag);

    // si podemos atacar y seguimos en rango, intentamos atacar
    if (this.attackFlag)
    {
        if (super.isInAttackRange())
        {
            this.attackFlag = false;
            this.enemy.off('animationcomplete');
            this.tryAttack();
        }
        else
        {
            this.enemy.play('walk' + this.key, true);
        }
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