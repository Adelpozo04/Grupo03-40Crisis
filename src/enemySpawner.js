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
    * @param {grupoEnemigos} grupoEnemigos - grupoEnemigos del level
    */ 

    constructor(scene, x, y, player, grupoEnemigos) {
        super(scene, x, y);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.grupoEnemigos = grupoEnemigos
        this.spawnX = x;
        this.spawnY = y;
        
        this.player = player;
        this.spawnTimer = null;
        this.collisionArea = this.scene.add.rectangle(x, y, 20, 20);
        this.scene.physics.add.existing(this.collisionArea);
        this.grupoEnemigos = this.scene.add.group();
    }

    getScene()
    {
        return this.scene;
    }


    selectEnemyType(randomProbability) {
        // Define los rangos de probabilidad para cada tipo de enemigo
        const enemyTypes = [
            { type: 'zombie', probability: 0.4 }, //0,35
            { type: 'skeleton', probability: 0.25 },
            { type: 'burger', probability: 0.15 },
            { type: 'lutano', probability: 0.15 },
            { type: 'robot', probability: 0.05 }
        ];

        let cumulativeProbability = 0;

        for (let i = 0; i < enemyTypes.length; i++) {
            cumulativeProbability += enemyTypes[i].probability;

            if (randomProbability <= cumulativeProbability) {
                return enemyTypes[i].type;
            }
        }
    }
    
    spawnEnemies(numberOfEnemies, timeBetweenSpawn) {
        let enemiesSpawned = 0;
        this.spawnTimer = this.scene.time.addEvent({
        delay: timeBetweenSpawn,
        callback: () => {
           if (enemiesSpawned < numberOfEnemies) {
                const randomProbability = Phaser.Math.RND.frac();
                const enemyType = this.selectEnemyType(randomProbability);

              
                if(enemyType === 'lutano'){

                    const enemy = new Lutano(this.scene, this.spawnX, this.spawnY, enemyType, this.player, this.scene.generateEnemyConfig(enemyType));
                    this.scene.grupoEnemigos.add(enemy);
                    enemiesSpawned++;
                }
                else if(enemyType === 'robot') {
                    
                    const enemy = new Robot(this.scene, this.spawnX, this.spawnY, enemyType, this.player, this.scene.generateEnemyConfig(enemyType));
                    this.scene.grupoEnemigos.add(enemy);
                    enemiesSpawned++;
                }
                else {
                    const enemy = new EnemigoBasico(this.scene, this.spawnX, this.spawnY, enemyType, this.player, this.scene.generateEnemyConfig(enemyType));
                    this.scene.grupoEnemigos.add(enemy);
                    enemiesSpawned++;
                }
            }
            else{
                this.stopSpawn();
            }
        },
            callbackScope: this,
            repeat: numberOfEnemies - 1
        });
    }


    spawnMono() {
        const enemy = new Mono(this.scene, this.spawnX, this.spawnY, 'mono', this.player, this.scene.generateEnemyConfig('mono'));
        this.scene.grupoEnemigos.add(enemy);
    }

    spawnCaracol() {
        const enemy = new EnemigoBasico(this.scene, this.spawnX, this.spawnY, 'caracol', this.player, this.scene.generateEnemyConfig('caracol'));
        this.scene.grupoEnemigos.add(enemy);
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

    areEnemiesCleared() {
        // Verifica si no hay enemigos restantes en el grupo
        return this.grupoEnemigos.getLength() === 0;
    }
}
