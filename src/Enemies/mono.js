
export default class Mono extends Phaser.GameObjects.Sprite{

constructor(scene, x, y, key){

super(scene, x, y);

this.x = x;

this.y = y;

this.key = key;

this.setScale(1.25, 1.25);

this.speed = 125;

this.life = 100;

this.potenciador = null;

this.changeMoveTime = 0.5;

this.scene.add.existing(this);

scene.physics.add.existing(this);

this.body.setSize(24, 24);

this.body.setOffset(12, 12)

Phaser.Math.RandomXY(this.body.velocity, this.speed);

this.scene.time.addEvent({

    delay: this.changeMoveTime * 1000,
    loop: true,
    callback: this.newRandomDirection,
    callbackScope: this,
    paused: this.potenciador != null

});


}

newRandomDirection(){

    if(this.potenciador == null){
        Phaser.Math.RandomXY(this.body.velocity, this.speed);
    }
    
}

setPotenciador(potenciador){
    console.log(potenciador);
    this.potenciador = potenciador;
}

deletePotenciador(){
    this.potenciador = null;
    this.newRandomDirection();
}

update(){

    this.play('walk' + this.key, true);

    if(this.potenciador != null){
        if (this.x < this.potenciador.getPosition().x)
        {
            this.setFlip(false, false);
        }
        else if (this.x > this.potenciador.getPosition().y)
        {
            this.setFlip(true, false);
        }

        var potenciadorPosition = this.potenciador.getPosition();

        this.vec = new Phaser.Math.Vector2(
            potenciadorPosition.x - this.x,
            potenciadorPosition.y - this.y
        );

        this.body.setVelocity(this.speed * this.vec.x, this.speed * this.vec.y);

        this.body.velocity.normalize().scale(this.speed);
    }
    else{
        if (this.body.velocity.x >= 0)
        {
            this.setFlip(false, false);
        }
        else if (this.body.velocity.x < 0)
        {
            this.setFlip(true, false);
        }
    }


    
}



}


