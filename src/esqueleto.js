import Enemigo from'./enemigo.js'
export default class Esqueleto extends Enemigo {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {number} speed - velocidad
     * @param {number} attackDistance - minima distancia de ataque
     * @param {key} key - sprite
     * @param {player} player - referencia al player
     */ 
    constructor(scene, x, y, speed, attackDistance, key, player)
    {
        super(scene, x, y, player, speed, attackDistance);
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
        })
    }

    update(){
        // super accede a la clase ENEMIGO, donde basicMovement te mueve al player
        // y direction.x / y son las variables de direccion
        super.basicMovement();

        if (super.isAttacking())
            this.skeleton.play('idle' + this.key, true);
        else
            this.skeleton.play('walk' + this.key, true);

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