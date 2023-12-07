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
    * @param {EnemigoBasico} enemigo - referencia al enemigo 
    * @param {string} key - sprite
    */

    constructor(scene, x, y, key, player, enemy, currentScene){
        super(scene, x, y);
        this.key = key;
        this.player = player;
        this.enemy = enemy
        this.scene = scene;
        this.currentScene = currentScene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.sprite = scene.add.sprite(32, 32, key);
        this.add(this.sprite);
        this.setScale(0.15); 

        const potenciadorTypes = {
            BOTIQUIN: 'botiquin', 
            VELOCIDAD: 'velocidad', 
            SLEEP: 'vivu', 
            INVENCIBLE: 'invencible',
        };

    }

    getScene()
    {
        return this.scene;
    }


    getPosition() {
        return { x: this.x, y: this.y };
    }

    enviarPotenciadorPlayer(){
        console.log(this.key);
        this.player.applyEffect(this.key);

        this.getScene().potenciadorRecogido = true; // Indica que el potenciador ha sido recogido
        this.getScene().potenciadorSpawneado = false;  // Habilita la generación del próximo potenciador
        console.log(this.getScene().potenciadorSpawneado);
        this.destroy();
                
    }

    enviarPotenciadorEnemy(){
        console.log(this.enemy);
        this.enemy.applyEffect(this.key);

        this.getScene().potenciadorRecogido = true; // Indica que el potenciador ha sido recogido
        this.getScene().potenciadorSpawneado = false;  // Habilita la generación del próximo potenciador
        console.log(this.getScene().potenciadorSpawneado);
        this.destroy();
                
    }

    
   

    
}
