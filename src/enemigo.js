export default class enemigo extends Phaser.GameObjects.Container {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {string} key - sprite
     */
    constructor(scene, x, y, key){
        super(scene, x, y);
    
        this.dirX = 0;
        this.dirY = 0;
        this.speed = 0.3;
    
        this.mikeX = 0;
        this.mikeY = 0;
    
        this.enemigo = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);
        
        this.add(this.enemigo);
        this.setScale(0.25);
        this.scene.add.existing(this);
    
        this.scene.anims.create({
            key: 'walk'+ key,
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
    
        this.key = key;
    }
    
    updateMikeValues(x, y)
    {
        this.mikeX = x;
        this.mikeY = y;
    }
    preUpdate(t, dt){
        this.enemigo.preUpdate(t,dt);
        
        let direction = new Phaser.Math.Vector2(
            mikeX - x,
            mikeY - y
        );
        direction.normalize();

        if (this.x < this.mikeX)
        {
            this.enemigo.setFlip(false, false);
        }
        else if (this.x > this.mikeX)
        {
            this.enemigo.setFlip(true, false);
        }
        
    
        this.x += this.speed * direction.x * deltatime;
        this.y += this.speed * direction.y * deltatime;
        if (this.dirX == 0 && this.dirY == 0)
            this.zombie.play('idle' + this.key, true);
        else
            this.zombie.play('walk' + this.key, true);
    }
}
    