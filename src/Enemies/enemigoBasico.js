import Enemigo from "./enemigo.js";
import municionBalas from "../Armas/municionBalas.js";

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
        ['zombie', 75], ['skeleton', 175], ['burger', 50], ['lutano', 75], ['caracol', 25]
    ]);
    var damageEnemigos = new Map([
        ['zombie', 1], ['skeleton', 3], ['burger', 5], ['lutano', 2], ['caracol', 9999]
    ]);
    var attackDistEnemigos = new Map([
        ['zombie', 30], ['skeleton', 30], ['burger', 30], ['lutano', 30], ['caracol', 10]
    ]);
    var vidaEnemigos = new Map([
        ['zombie', 10], ['skeleton', 5], ['burger', 50], ['lutano', 15], ['caracol', 999999]
    ]);
    var scaleEnemigos = new Map([
        ['zombie', 2], ['skeleton', 2], ['burger', 2], ['lutano', 2], ['caracol', 0.5]
    ]);
    var puntosEnemigos = new Map([
        ['zombie', 1], ['skeleton', 2], ['burger', 2], ['lutano', 0.3], ['caracol', 25]
    ]);
    var anchoColliderEnemigos = new Map([
        ['zombie', 18], ['skeleton', 16], ['burger', 30], ['lutano', 24], ['caracol', 18]
    ]);
    var altoColliderEnemigos = new Map([
        ['zombie', 26], ['skeleton', 24], ['burger', 30], ['lutano', 30], ['caracol', 26]
    ]);
    var posXColliderEnemigos = new Map([
        ['zombie', 9], ['skeleton', 8], ['burger', 14], ['lutano', 12], ['caracol', 9]
    ]);
    var posYColliderEnemigos = new Map([
        ['zombie', 10], ['skeleton', 14], ['burger', 2], ['lutano', 14], ['caracol', 10]
    ]);
    var munitionDropMaxProbability = new Map([
        ['zombie', 10], ['skeleton', 7], ['burger', 5], ['lutano', 3], ['caracol', 1]
    ]);


    super(scene, x, y, player, speedEnemigos.get(key), attackDistEnemigos.get(key), damageEnemigos.get(key), vidaEnemigos.get(key));
    this.key = key;

    this.posXCentered = posXColliderEnemigos.get(key);
    this.posYCentered = posYColliderEnemigos.get(key);
    
    this.enemy = new Phaser.GameObjects.Sprite(scene, this.posXCentered, this.posYCentered, key, 0);
    this.add(this.enemy);
    this.setScale(scaleEnemigos.get(this.key)); //cuidao que esto igual da problemas
    this.attackFlag = true;
    this.alive = true;
    this.points = puntosEnemigos.get(key);
    this.maxDropProbability = munitionDropMaxProbability.get(key);
    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.body.setSize(anchoColliderEnemigos.get(key), altoColliderEnemigos.get(key));
}

// comprobamos si estamos en rango de ataque y atacamos
attack() { if (super.isInAttackRange() || this.key == 'caracol') {super.attack()} }

// hace la animación y si se termina llamamos a attack en el super
tryAttack()
{
    this.body.setVelocity(0, 0);
    this.body.velocity.normalize().scale(this.speed);

    this.enemy.play('attack' + this.key, true);
    this.enemy.on('animationcomplete', function(){
        this.attackFlag = true;
        this.attack();
        this.enemy.off('animationcomplete');
    }, this)
}

destroyMyself(){

    this.destroy();

}

recibeDamage(damage){
    var myLifeLeft = super.getDamage(damage);

    if(myLifeLeft <= 0){

        this.alive = false;

        this.body.setVelocity(0, 0);

        this.body.destroy();

        this.scene.sendPoints(this.points);

        var dropMunition = Phaser.Math.Between(1, this.maxDropProbability);

        console.log(dropMunition);

        if(dropMunition == 1){
            this.spawnMunition();
        }

        this.enemy.play('enemydeath', true);
        
        this.enemy.on('animationcomplete', this.destroyMyself )
    }
}

spawnMunition(){

    this.ammo = new municionBalas(this.scene, this.body.x + this.posXCentered, this.body.y + this.posYCentered, 'bulletAmmo');
    this.scene.addAmmoToGroup(this.ammo);
    this.scene.add.existing(this.ammo);
}

applyEffect(keyPotenciador){
       
    let aux;
    switch (keyPotenciador) {
        case 'botiquin':
            console.log("boti");
            this.life += this.maxLife / 2;
            if (this.life > this.maxLife) {
                this.life = this.maxLife;
            }
            console.log(this.life);
            break;
        case 'velocidad':
            console.log("velo");
            this.aux = this.speed;
            this.speed = 280;
            this.scene.time.delayedCall(3000, () => {
                this.speed = this.aux // Reducir la velocidad de nuevo después de 3 segundos
            });
            break;
        case 'vivu':
            console.log("vivu");
            this.aux = this.speed;
            this.speed = 0;
            this.scene.time.delayedCall(5000, () => {
                this.speed = this.aux;
            });
            break;
        case 'invencible':
            console.log("inven");
            this.invulnerable = true;
            this.scene.time.delayedCall(5000, () => {
                this.invulnerable = false;
            });
            break;
        default:
            break;
    }
    //this.scene.potenciadorSpawneado = false; // Marcar que el potenciador ha sido recogido
}

update(){
    // super accede a la clase ENEMIGO, donde basicMovement te mueve al player
    // y direction.x / y son las variables de direccion

    if(this.alive){
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

}