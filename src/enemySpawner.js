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
    * @param {Enemigo} enemigo - referencia al enemigo 
    */

    constructor(scene, x, y, player) {
        super(scene, x, y);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.spawnX = x;
        this.spawnY = y;
        this.grupoEnemigos = this.scene.add.group({
            classType: Enemigo,
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
   
    
    /*spawnEnemies1(numberOfEnemies, timeBetweenSpawn) {
        let enemiesSpawned = 0;
        const enemyTypes = [
            { type: 'zombie', probability: 0.4 },
            { type: 'skeleton', probability: 0.3 },
            { type: 'burger', probability: 0.2 },
            { type: 'lutano', probability: 0.1 },
            { type: 'mono', probability: 0.05 }
        ];

        const spawnEnemy5 = () => {
            if (enemiesSpawned < numberOfEnemies) {
                const randomProbability = Phaser.Math.RND.frac(); // Genera un número aleatorio entre 0 y 1
                let cumulativeProbability = 0;

                for (let i = 0; i < enemyTypes.length; i++) {
                    cumulativeProbability += enemyTypes[i].probability;

                    if (randomProbability <= cumulativeProbability) {
                        const enemy = this.createEnemy(enemyTypes[i].type);
                        this.grupoEnemigos.add(enemy);
                        enemiesSpawned++;
                        break;
                    }
                }
            } else {
                // Si se alcanza el límite de enemigos, detiene el spawneo
                this.stopSpawn();
            }
        };

        // Inicia el spawneo de enemigos con el intervalo de tiempo especificado
        this.spawnTimer = this.scene.time.addEvent({
            delay: timeBetweenSpawn,
            callback: spawnEnemy,
            callbackScope: this,
            repeat: numberOfEnemies - 1 // Establece el número de veces que se ejecutará la función (número de enemigos - 1)
        });
    } */

    spawnEnemies(enemyType, quantity, interval) {
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
    }
    
    

    createEnemy(enemyType) {
        const enemy = new Enemigo(this.scene, this.spawnX, this.spawnY, enemyType, this.player);
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
