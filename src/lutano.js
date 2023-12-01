import EnemigoBasico from "./enemigoBasico.js";

export default class lutano extends EnemigoBasico{

constructor(scene, x, y, key, player){

    super(scene, x, y, key, player)

    this.spawnTime = 30;

    this.elapsedTime = 0;

}

update(){
    super.update();

    this.time.addEvent

}

}