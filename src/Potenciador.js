import playerContenedor from './playerContenedor.js';

export default class Potenciador extends Phaser.GameObjects.Container {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {sprite} sprite - sprite
    * @param {number} y - posicion y
    * @param {playerContenedor} player - referencia al player
    * @param {enemigo} enemigo - referencia al enemigo 
    * @param {string} key - sprite
    */

    constructor(scene, x, y, key, player, currentScene){
        super(scene, x, y);
        this.key = key;
        this.player = player;
        this.currentScene = currentScene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.sprite = scene.add.sprite(32, 32, key);
        this.add(this.sprite);
        this.setScale(0.15); //cuidao que esto igual da problemas


        const potenciadorTypes = {
            BOTIQUIN: 'botiquin', 
            VELOCIDAD: 'velocidad', 
            SLEEP: 'vivu', 
            INVENCIBLE: 'invencible',
        };

    }


   

    enviarPotenciador(){
        console.log(this.key);
        this.player.applyEffect(this.key);
        this.currentScene.pote
        this.destroy();
        
        
            
            //this.scene.potenciadorSpawneado = false; // Establece que el potenciador actual ha sido generado
        
    }

    
    spawnPotenciador() {
        if (this.scene.potenciadorRecogido) {
            const spawnPoints = [
                { x: 600, y: 600 },
                { x: 600, y: 700 },
                { x: 700, y: 600 },
                { x: 700, y: 700 },
            //Añadir luego las coordenadas correctas
            ];

            
            let spawnPoint = Phaser.Math.RND.pick(spawnPoints);
            let spawnPointX = spawnPoint.x;
            let spawnPointY = spawnPoint.y;
           

           
        }
    }
    
}
