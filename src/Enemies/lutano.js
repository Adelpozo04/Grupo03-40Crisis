import EnemigoBasico from "./enemigoBasico.js";
import cepo from "./cepo.js";

export default class lutano extends EnemigoBasico{

constructor(scene, x, y, key, player, config){

    super(scene, x, y, key, player, config)

    this.scene = scene;

    this.spawnTime = 30;

    this.elapsedTime = 0;

    this.spawnCepoEvent = this.scene.time.addEvent({ // Guardar el evento en una variable
        delay: this.spawnTime * 1000,
        loop: true,
        callback: this.spawnCepo,
        callbackScope: this
    });
    
}

spawnCepo(){

    if (this.alive) { // Verificar si el lutano está vivo antes de spawnear un cepo
            console.log("cepeame esta");
            this.cepo = new cepo(this.scene, this.x, this.y, "cepo", this.player);
            this.scene.add.existing(this.cepo);
    }

}




update(){

    super.update();

}

}