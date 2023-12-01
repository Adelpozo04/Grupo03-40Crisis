

export default class cepo extends Phaser.GameObjects.Sprite {

constructor(scene, x, y, key, player){

    super(scene, x, y, key);

    this.player = player;

    this.paraliceTime = 5;

    //this.cepo = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);

    scene.add.existing(this);

    //scene.add.existing(this.cepo);

    scene.physics.add.existing(this);

}

destroyAfterTime(){

    this.timeEvent = new Phaser.Time.TimerEvent({

        delay: this.paraliceTime * 1000,
        loop: true,
        callback: this.destroyMyself()

    })

}

destroyMyself(){
    this.destroy();
}

preUpdate(){

    this.scene.physics.collide(this.player, this, ()=>{

        this.player.applyEffect("vivu");
        this.destroyAfterTime();

    })

}



}