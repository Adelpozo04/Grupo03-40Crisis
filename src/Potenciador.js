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
    * @param {Enemigo} enemigo - referencia al enemigo 
    * @param {string} key - sprite
    */

    constructor(scene, x, y, key, player, enemy){
        super(scene, x, y);
        this.key = key;
        this.player = player;
        this.enemy = enemy
        this.scene = scene;
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

        this.player.applyEffect(this.key);

        this.getScene().potenciadorRecogido = true; // Indica que el potenciador ha sido recogido
        this.getScene().potenciadorSpawneado = false;  // Habilita la generación del próximo potenciador
        this.destroy();
                
    }

    enviarPotenciadorEnemy(){
        // Obtener la lista de enemigos en el grupo
        const enemigosArray = this.scene.grupoEnemigos.getChildren();
        let i = 0;
        while(i < enemigosArray.length){
            // Verificar si el potenciador colisiona con este enemigo específico
            if (this.scene.physics.add.collider(this, enemigosArray[i])) {
                enemigosArray[i].applyEffect(this.key); // Aplicar efecto del potenciador al enemigo
                break;
            }
            else
                i++;
        }; 

        //Los enemigos cogen el potenciadore, entra al metodo applyEffect pero el juego se queda congelado
        this.getScene().potenciadorRecogido = true; // Indica que el potenciador ha sido recogido
        this.getScene().potenciadorSpawneado = false;  // Habilita la generación del próximo potenciador
        this.destroy();
                
    }

    
   

    
}
