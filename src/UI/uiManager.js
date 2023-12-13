import HealthBar from "./healthBar.js";
import playerContenedor from "../Player/playerContenedor.js";

export default class UIManager extends Phaser.GameObjects.Container{

constructor(scene, key, player){

    super(scene, 0, 0);

    this.scene = scene;

    this.player = player;

    this.healthBar = new HealthBar(scene, 24, 16, player, 341, 32).setScrollFactor(0);

    this.key = key;

    this.totalPoints = 0;

    scene.add.existing(this);

    this.ScoreLabel = this.scene.generateText(0, 650, 'Score: ', 32);
    this.ScoreLabel.setScrollFactor(0);

}

gainPoints(points){

    this.totalPoints += points;

    this.ScoreLabel.text = 'Score: ' + this.totalPoints;

    this.scene.tweens.add({
        targets: this.ScoreLabel,
        scale: 1.5,
        duration: 500,
        ease: 'Sine.easeInOut',
        yoyo: true, // Hace que la animación se repita en sentido inverso
        repeat: 0 // Repite infinitamente
    });

}

preUpdate(t, dt){

    this.healthBar.preUpdate(t, dt);


}





}