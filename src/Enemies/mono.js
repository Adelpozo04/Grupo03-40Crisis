
export default class Mono extends Phaser.GameObjects.Sprite{

constructor(scene, x, y, key){

super(scene, x, y);

this.x = x;

this.y = y;

this.key = key;

this.speed = 125;

this.life = life;

this.potenciador = null;

this.changeMoveTime = 5;

this.scene.time.addEvent({

    delay: this.spawnTime * 1000,
    loop: true,
    callback: this.newRandomDirection,
    callbackScope: this,
    paused: this.potenciador == null

});


}

newRandomDirection(){

    if(this.potenciador == null){
        this.vec = Phaser.Math.RandomXY(this.vec);

        this.vec.normalize();
    }
    
}

setPotenciador(potenciador){

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

        this.vec.normalize();
    }

    this.body.setVelocity(this.speed * this.vec.x, this.speed * this.vec.y);

    this.body.velocity.normalize().scale(this.speed);
    

}



}


