export default class zombie extends Phaser.GameObjects.Container {
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
    this.speed = 1;

    this.mikeX = 0;
    this.mikeY = 0;

    this.zombie = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);
    
    this.add(this.zombie);
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
    this.zombie.preUpdate(t,dt);

    if (this.x < this.mikeX)
        this.dirX = 1;
    else if (this.x > this.mikeX)
        this.dirX = -1;
    if (this.y < this.mikeY)
        this.dirY = 1;
    else if (this.y > this.mikeY)
        this.dirY = -1;


    this.x += this.speed * this.dirX;
    this.y += this.speed * this.dirY;
    if (this.dirX == 0 && this.dirY == 0)
        this.zombie.play('idle' + this.key, true);
    else
        this.zombie.play('walk' + this.key, true);
}
}
