import EnemigoSpawner from "./enemySpawner.js";

export default class RoundManager extends Phaser.GameObjects.Container {
       /**
    * @param {scene} scene - escena a colocar
    * @param {EnemigoSpawner} spawners - referencia a los spawners
    * @param {number} enemiesPerRound - enemigos por ronda (cada spawner)
    */

    constructor(scene, spawners, initialEnemiesPerRound) {
        super(scene);
        this.spawners = spawners;
        this.enemiesPerRound = initialEnemiesPerRound;
        this.currentRound = 0;
        this.enemiesDefeated = 0;
        this.increasePerRound = 2; // Ajusta según la dificultad deseada
        this.totalEnemiesLeft = (this.enemiesPerRound + this.increasePerRound * this.currentRound) * 4;

    }

    startRound() {
        this.enemiesDefeated = 0;
        this.currentRound++;
        // Llama a los spawners para que generen la cantidad de enemigos de esta ronda
       // this.spawners.forEach((spawner) => {
         //   spawner.spawnEnemies(this.enemiesPerRound, 3000); // Ajusta los parámetros según tus necesidades
        this.scene.enemySpawners(this.enemiesPerRound + this.increasePerRound * this.currentRound);
    
        
       // });
    
       
    }



}