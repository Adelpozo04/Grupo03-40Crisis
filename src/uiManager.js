import HealthBar from "./healthBar.js";
import playerContenedor from "./playerContenedor.js";

export default class UIManager extends Phaser.GameObjects.Container{

constructor(scene, key, player){

    super(scene, 0, 0);

    this.player = player;

    this.healthBar = new HealthBar(0, 0, player, 1024, 64);

    

    this.key = key;

}

preUpdate(t, dt){




}



}