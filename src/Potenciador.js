import playerContenedor from './Player/playerContenedor.js';
import Enemigo from "./Enemies/enemigo.js";
import EnemigoBasico from './Enemies/enemigoBasico.js';

export default class Potenciador extends Phaser.GameObjects.Container {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {sprite} sprite - sprite
    * @param {number} y - posicion y
    * @param {playerContenedor} player - referencia al player
    * @param {string} key - sprite
    */

    constructor(scene, x, y, key, player){
        super(scene, x, y);
        this.key = key;
        this.player = player;
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.sprite = scene.add.sprite(32, 32, key);
        this.add(this.sprite);
        this.setScale(0.15); 

        scene.physics.add.collider(this, this.player, ()=>{
            this.player.applyEffect(this.key)
            this.scene.potenciadorSpawneado = false;
            this.destroy();
        })
        scene.physics.add.collider(this, scene.grupoEnemigos, (pot, enemigo)=>{
            enemigo.applyEffect(this.key)
            this.scene.potenciadorSpawneado = false;
            this.destroy();
        })
    }
}