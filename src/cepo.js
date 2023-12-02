
export default class cepo extends Phaser.GameObjects.Sprite {

constructor(scene, x, y, key, player){

    super(scene, x, y, key);

    this.player = player;

    this.paraliceTime = 5;

    this.cepo = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);

    this.setScale(0.2, 0.2);

    this.key = key;

    this.scene.add.existing(this);

    this.scene.physics.add.existing(this);

    this.body.setSize(32, 32);


}

destroyAfterTime(){

    this.cepo.play('attackcepo', true);

    this.scene.time.addEvent({

        delay: this.paraliceTime * 1000,
        loop: true,
        callback: this.destroyMyself,
        callbackScope: this
    })

}

destroyMyself(){
    this.destroy();
}

preUpdate(t, dt){

    this.cepo.preUpdate(t, dt);

    this.scene.physics.collide(this.player, this, ()=>{

        this.player.applyEffect("vivu");
        this.scene.physics.world.disable(this);
        this.destroyAfterTime();

    })

}



}