import EnemigoBasico from './Enemies/enemigoBasico.js';
import Enemigo from './Enemies/enemigo.js';
import Lutano from './Enemies/lutano.js';
import Mono from './Enemies/mono.js';
import Robot from './Enemies/robot.js';
import playerContenedor from './Player/playerContenedor.js';

export default class EnemigoSpawner extends Phaser.GameObjects.Sprite {

     /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {playerContenedor} player - referencia al player
    * @param {EnemigoBasico} enemigo - referencia al enemigo 
    */

    constructor(scene, x, y, player) {
        super(scene, x, y);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.spawnX = x;
        this.spawnY = y;
        this.grupoEnemigos = this.scene.add.group({
            classType: EnemigoBasico,
            runChildUpdate: true,

        })
        this.player = player;
        this.spawnTimer = null;
    }

    getScene()
    {
        return this.scene;
    }


    getEnemyGroup(){
        return this.grupoEnemigos;
    }
   
    selectEnemyType(randomProbability) {
        // Define los rangos de probabilidad para cada tipo de enemigo
        const enemyRanges = [
            { type: 'zombie', range: { min: 0, max: 0.4 } },
            { type: 'skeleton', range: { min: 0.4, max: 0.7 } },
            { type: 'burger', range: { min: 0.7, max: 0.9 } },
            { type: 'lutano', range: { min: 0.9, max: 1.0 } }
        ];

        // Verifica si la probabilidad cae dentro de alguno de los rangos definidos
        for (const enemy of enemyRanges) 
        {
            if (randomProbability >= enemy.range.min && randomProbability < enemy.range.max) {
                return enemy.type; // Devuelve el tipo de enemigo si la probabilidad está dentro del rango
            }
        }
    }
    
    spawnEnemies(numberOfEnemies, timeBetweenSpawn) {
        let enemiesSpawned = 0;

        const spawnEnemy = () => {
            if (enemiesSpawned < numberOfEnemies) {
                const randomProbability = Phaser.Math.RND.frac();
                const enemyType = this.selectEnemyType(randomProbability);

                if (enemyType) {
                    const enemy = this.createEnemy(enemyType);
                    this.grupoEnemigos.add(enemy);
                    enemiesSpawned++;
                }
            } else {
               // this.stopSpawn();
            }
        };

        this.spawnTimer = this.scene.time.addEvent({
            delay: timeBetweenSpawn,
            callback: spawnEnemy,
            callbackScope: this,
            repeat: numberOfEnemies - 1
        });
    }
    /*spawnEnemies(enemyType, quantity, interval) {
        this.timerEvent = this.scene.time.addEvent({
            delay: interval,
            callback: () => {
                for (let i = 0; i < quantity; i++) {
                    this.createEnemy(enemyType);
                }
            },
            callbackScope: this,
            loop: true
        });
    } */
    
    

    createEnemy(enemyType) {
        const enemy = new EnemigoBasico(this.scene, this.spawnX, this.spawnY, enemyType, this.player);
        return enemy;
    }

    //Para de spawnear enemigos
    stopSpawn() {
        if (this.spawnTimer) {
            this.spawnTimer.remove();
        }
    }

    clearEnemies() {
        this.grupoEnemigos.clear(true, true); // Limpia el grupo de enemigos
    }
}
