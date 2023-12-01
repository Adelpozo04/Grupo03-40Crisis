import EnemigoBasico from "./enemigoBasico.js";
import cepo from "./cepo.js";

export default class lutano extends EnemigoBasico{

constructor(scene, x, y, key, player){

    super(scene, x, y, key, player)

    this.scene = scene;

    this.spawnTime = 30;

    this.elapsedTime = 0;

    this.timeEvent = new Phaser.Time.TimerEvent({

        delay: this.spawnTime * 1000,
        loop: true,
        callback: this.spawnCepo()

    })

}

spawnCepo(){

    this.cepo = new cepo(this.scene, this.direction.x, this.direction.y, "cepo_" + this.key, this.player);

    this.scene.add.existing(this.cepo);

}

update(){
    
    super.update();

}

}