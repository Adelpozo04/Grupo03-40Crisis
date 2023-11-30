import HealthBar from "./healthBar.js";
import playerContenedor from "./playerContenedor.js";

export default class UIManager extends Phaser.GameObjects.Container{

constructor(scene, key, player){

    super(scene, 0, 0);

    this.player = player;

    this.healthBar = new HealthBar(scene, 0, 0, player, 341, 32).setScrollFactor(0);

    this.key = key;

    scene.add.existing(this);

}

preUpdate(t, dt){

    this.healthBar.preUpdate(t, dt);


}



}