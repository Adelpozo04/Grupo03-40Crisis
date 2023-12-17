import enemigo from "./enemigo.js";

export default class Mono extends enemigo{

constructor(scene, x, y, key, player, config){
    super(scene, x, y, player, config.speed, config.attackDistance, config.damage, config.life, config.points);

    this.x = x;
    this.y = y;
    this.key = key;

    this.setScale(config.scale);
    this.enemy = new Phaser.GameObjects.Sprite(scene, this.posXCentered, this.posYCentered, key, 0);
    this.scene.add.existing(this);
    scene.physics.add.existing(this);
    this.add(this.enemy)
    this.body.setSize(config.anchoCollider, config.altoCollider);
    this.body.setOffset(config.posXCollider, config.posYCollider);


    Phaser.Math.RandomXY(this.body.velocity, this.speed);
}

newRandomDirection(){

    if(this.potenciador == null){
        Phaser.Math.RandomXY(this.body.velocity, this.speed);
    }
}

preUpdate(){

    if (this.alive)
    {
        this.enemy.play('walk' + this.key, true);

        if (this.scene.potenciadorSpawneado)
        {
            this.changeObjetive(this.scene.getPotenciador())
            super.basicMovement(true);
        }
        else
        {
            Phaser.Math.RandomXY(this.body.velocity, this.speed);
            
        }
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