import EnemigoBasico from "./enemigoBasico.js";
import cepo from "./cepo.js";

export default class lutano extends EnemigoBasico{

constructor(scene, x, y, key, player, config){

    super(scene, x, y, key, player, config)

    this.scene = scene;

    this.spawnTime = 30;

    this.elapsedTime = 0;

    this.scene.time.addEvent({

        delay: this.spawnTime * 1000,
        loop: true,
        callback: this.spawnCepo,
        callbackScope: this

    });
    
}

spawnCepo(){

    console.log("cepeame esta");

    this.cepo = new cepo(this.scene, this.x, this.y, "cepo", this.player);

    this.scene.add.existing(this.cepo);

}

update(){

    super.update();

}

}