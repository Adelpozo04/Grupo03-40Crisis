import enemigo from "./enemigo.js";

export default class Mono extends enemigo{

constructor(scene, x, y, key, player, config){
    super(scene, x, y, player, config);
    this.key = key;

    this.setScale(config.scale);
    this.enemy = new Phaser.GameObjects.Sprite(scene, this.posXCentered, this.posYCentered, key, 0);
    this.scene.add.existing(this);
    scene.physics.add.existing(this);
    this.add(this.enemy)
    this.body.setSize(config.anchoCollider, config.altoCollider);
    this.body.setOffset(config.posXCollider, config.posYCollider);

    this.scene.time.addEvent({
        delay: 1500,
        loop: true,
        callback: this.changeDirection,
        callbackScope: this
    });

    Phaser.Math.RandomXY(this.body.velocity, this.speed);
}

changeDirection(){

    if(this.scene.potenciadorSpawneado)
    {
        let direction = new Phaser.Math.Vector2(this.scene.potenciador.x - this.x, this.scene.potenciador.y - this.y)
        direction.normalize()

        this.body.setVelocity(direction.x * this.speed, direction.y * this.speed)
    }
    else
    {
        Phaser.Math.RandomXY(this.body.velocity, this.speed);
    }
}

preUpdate(){
    
    if (this.alive)
    {
        this.enemy.play('walk' + this.key, true);

        if (this.body.velocity.x >= 0)
        {
            this.enemy.setFlip(false, false);
        }
        else if (this.body.velocity.x < 0)
        {
            this.enemy.setFlip(true, false);
        }
    }   
}
}