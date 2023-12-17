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
        this.enemiesLeft = 0;
        this.increasePerRound = 2; // Ajusta según la dificultad deseada
    }

    startRound() {
       
        this.enemiesLeft = this.enemiesPerRound + this.increasePerRound * this.currentRound;
        this.currentRound++;
        // Llama a los spawners para que generen la cantidad de enemigos de esta ronda
       // this.spawners.forEach((spawner) => {
         //   spawner.spawnEnemies(this.enemiesPerRound, 3000); // Ajusta los parámetros según tus necesidades
        this.scene.enemySpawners(this.enemiesPerRound);
       // });
    
       
    }


    decreaseEnemiesLeft() {
        this.enemiesLeft--;


         // Verifica si se eliminaron todos los enemigos
         const checkRoundEnd = () => {
            
            console.log(this.enemiesLeft);
        // Verifica si se eliminaron todos los enemigos
        const allEnemiesEliminated = this.enemiesLeft === 0;

        if (allEnemiesEliminated) {
            this.startRound(); // Comienza la siguiente ronda
        }

    };

     // Establece un evento que verifique si se ha completado la ronda cada cierto intervalo
     this.scene.time.addEvent({
        delay: 1000, // Intervalo para verificar el final de la ronda
        loop: true,
        callback: checkRoundEnd,
        callbackScope: this
    });
    }
    


}