import EnemigoBasico from './Enemies/enemigoBasico.js';
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

    spawnEnemies(enemyType, numberOfEnemies, timeBetweenSpawn) {
        let spawnCount = 0;
    
        this.spawnTimer = this.scene.time.addEvent({
            delay: timeBetweenSpawn,
            repeat: numberOfEnemies - 1,
            callback: () => {
                const enemy = this.createEnemy(enemyType);
                this.grupoEnemigos.add(enemy);
    
                spawnCount++;
    
                if (spawnCount === numberOfEnemies) {
                    this.spawnTimer.remove();
                    this.destroy();
                }
            },
            callbackScope: this
        });
    }


    static createSpawnersPos( map, camera, numberOfSpawners) {
        const spawnerLocations = [];
        const cameraRect = camera.worldView;

        while (spawnerLocations.length < numberOfSpawners) {
            const randomX = Phaser.Math.RND.between(0, map.widthInPixels);
            const randomY = Phaser.Math.RND.between(0, map.heightInPixels);

            if (
                randomX < cameraRect.left || randomX > cameraRect.right ||
                randomY < cameraRect.top || randomY > cameraRect.bottom
            ) {
                const tile = map.getTileAtWorldXY(randomX, randomY, true);

                if (tile && tile.properties.collides !== true) {
                    spawnerLocations.push({ x: randomX, y: randomY });
                }
            }
        }

        return spawnerLocations;
    }
    

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
