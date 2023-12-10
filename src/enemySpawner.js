import EnemigoBasico from './Enemies/enemigoBasico.js';
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
    }

    spawnEnemies(enemyType, numberOfEnemies, timeBetweenSpawn) {
        this.spawnTimer = this.scene.time.addEvent({
            delay: timeBetweenSpawn,
            repeat: numberOfEnemies - 1,
            callback: () => {
                const enemy = this.createEnemy(enemyType);
                this.grupoEnemigos.add(enemy);
            }
        });
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
