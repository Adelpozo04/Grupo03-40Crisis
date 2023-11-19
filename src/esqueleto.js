import Enemigo from'./enemigo.js'
export default class Esqueleto extends Enemigo {
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
        this.speed = 0.5;
        this.attackDistance = 30;
        
        this.key = key;
        scene.add.existing(this);
        this.skeleton = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);
        this.add(this.skeleton);
        this.setScale(2); //cuidao que esto igual da problemas
    
        this.scene.anims.create({
            key: 'walk' + key,
            frames: scene.anims.generateFrameNumbers(key, {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'idle' + key,
            frames: scene.anims.generateFrameNumbers(key, {start: 0, end:0}),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'attack' + key,
            frames: scene.anims.generateFrameNumbers(key, {start: 4, end: 10}),
            frameRate: 8,
            repeat: 0
        });
    
        this.attackFlag = true;
    }

    attack() { super.attack() }

    tryAttack()
    {
        this.skeleton.play('attack' + this.key, true);
        this.skeleton.on('animationcomplete', function(){
            this.attack();
            this.attackFlag = true;
            this.skeleton.off('animationcomplete');
        }, this)
    }

    update(){
        // super accede a la clase ENEMIGO, donde basicMovement te mueve al player
        // y direction.x / y son las variables de direccion
        super.basicMovement();

        if (this.attackFlag && super.isAttacking())
        {
            this.inattackRange = true;
            this.attackFlag = false;
            this.tryAttack();
        } else if (!super.isAttacking())
        {
            this.skeleton.play('walk' + this.key, true);
        }

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
