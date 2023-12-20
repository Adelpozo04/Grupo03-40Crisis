import LevelBase from './levelBase.js'
import playerContenedor from '../Player/playerContenedor.js';
import Potenciador from '../Potenciador.js';
import UIManager from '../UI/uiManager.js';
import EnemigoSpawner from '../enemySpawner.js';
import RoundManager from '../RoundManager.js';
import DamageWave from '../Scenes/Event/damageWave.js'


export default class PlayaLevel extends LevelBase{

    constructor(){
        super('PlayaLevel'); 
        this.potenciadorSpawneado = false;
        this.spawningPotenciador = false;
        this.roundManager = null;
    }
    
    init(data){
        
    }
    
    preload(){
        super.preload();

        this.load.tilemapTiledJSON('playaTilemap', './Assets/JSON/MapaPlaya.json');

        this.load.image('patronesPlayaTilemap', './Assets/Sprites/Tilesets/Playa/TilePlaya-export.png');

    }


    create(data){

        super.create();

        this.points = 0;

        this.backgroundMusic = this.sound.add('playaMusic', {loop: true, volume: 0.2});

        this.backgroundMusic.play();

        //Creacion del tilemap a partir de los datos cargados
        this.map = this.make.tilemap({ 
			key: 'playaTilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        //Se indica el Json, el png de tiles, el tamaño de los tiles y el espaciado del tile con los bordes y el margen entre sprites
        const myTile = this.map.addTilesetImage('TilePlaya-export', 'patronesPlayaTilemap', 32, 32, 0, 0);

        //Creacion de las Layers del mapa
        this.groundLayer = this.map.createLayer('Suelo', myTile);

        this.groundUpLayer = this.map.createLayer('SueloEncima', myTile);

        this.collisionLayer = this.map.createLayer('Colisiones', myTile);

        this.collisionUpLayer = this.map.createLayer('ColisionesEncima', myTile).setDepth(4);

        this.objectsUpLayer = this.map.createLayer('ObjetosEncima', myTile).setDepth(5);

        //Se le agregan las colisiones a las layers
        this.collisionLayer.setCollisionByExclusion([-1], true);
        this.collisionUpLayer.setCollisionByExclusion([-1], true);

        //Creacion de entidades 
        this.mike = new playerContenedor(this, 700, 700, 'mike', data, -2000, -2000, 200, 150);

        this.camera = this.cameras.main.startFollow(this.mike);

        //Se ajusta el tamaño del mapa
        this.collisionLayer.setScale(1.35, 1.35);
        this.collisionUpLayer.setScale(1.35, 1.35);
        this.groundLayer.setScale(1.35, 1.35);
        this.groundUpLayer.setScale(1.35, 1.35);
        this.objectsUpLayer.setScale(1.35, 1.35);


           
        this.enemySpawner1 = new EnemigoSpawner(this, 1750, 400, this.mike, this.grupoEnemigos);
        this.enemySpawner2 = new EnemigoSpawner(this, 200, 1320, this.mike, this.grupoEnemigos);
        this.enemySpawner3 = new EnemigoSpawner(this, 1750, 2400, this.mike, this.grupoEnemigos);
        this.enemySpawner4 = new EnemigoSpawner(this, 3000, 1320, this.mike, this.grupoEnemigos);



        //Creacion de la UI
        this.myUI = new UIManager(this, 'UIManager', this.mike);

        this.myUI.setScrollFactor(0);
   
        // Inicializa el RoundManager con los spawners y la cantidad inicial de enemigos por ronda
        this.roundManager = new RoundManager(this, [this.enemySpawner1, this.enemySpawner2, this.enemySpawner3, this.enemySpawner4], 5);
        this.roundManager.startRound(); // Comienza la primera ronda
        this.myUI.updateRounds(this.roundManager.currentRound);
        this.numberEnemiesCheckers();

        //Se indica que colliders chocan entre si
        this.physics.add.collider(this.mike, this.collisionLayer);
 
        this.physics.add.collider(this.grupoBalas, this.collisionLayer, function(bala, layer){
            bala.destroy()
        }, null, this)

        this.physics.add.collider(this.grupoBalasMagicas, this.collisionLayer, function(bala, layer){
            bala.destroy()
        }, null, this)

        // balas con enemigos
        this.physics.add.overlap(this.grupoBalas, this.grupoEnemigos, function(bala, enemigo){
            
            enemigo.receiveDamage(bala.getDamage());
            bala.destroy();

        });

        this.physics.add.collider(this.grupoBalasMagicas, this.grupoEnemigos, function(bala, enemy){

            enemy.gainObjetiveState();
            bala.destroy();

        })

        //balas robot con el player
        this.physics.add.collider(this.grupoBalasRobot, this.mike, function(bala,player){
            player.receiveDamage(bala.getDamage())
            bala.destroy();
        })
        this.physics.add.collider(this.grupoBalasRobot, this.collisionLayer, function(bala, entorno){
            bala.destroy();
        })

        // municion con player
        this.physics.add.collider(this.grupoMunicionBalas, this.mike, function(ammo, player){

            ammo.destroyMyself();
            player.reloadDisparosAmmo();

        });

        // enemigos con entorno
        this.physics.add.collider(this.grupoEnemigos, this.collisionLayer);
        
        this.spawnPotenciador();    

        // en segundos
        let tiempoEntreEventos = 5
        // llama a crear un evento cada x tiempo
        this.time.addEvent({
            delay: tiempoEntreEventos * 1000,
            loop: true,
            callback: this.eventManager,
            callbackScope: this
        });

 
    }

    //Event manager (olas)
    eventManager()
    {
        let y = Phaser.Math.RND.between(300, 2250)
        var wave = new DamageWave(this, 3000, y, 'wave', 1)
        wave.setFlip(true, false);
    }

    getPotenciador()
    {
        return this.potenciador;
    }

    //Generar potenciador random en uno de los generadores que hay
    spawnPotenciador() {
        const potenciadorTypes = {
            BOTIQUIN: 'botiquin', 
            VELOCIDAD: 'velocidad', 
            SLEEP: 'vivu', 
            INVENCIBLE: 'invencible',
        };

        let aux = Phaser.Math.RND.between(0, 3);
        let potenciadorType = Object.values(potenciadorTypes)[aux];
        const spawnPoints = [
            { x: 660, y: 1010 },
            { x: 1857, y: 1661 },
            { x: 2181, y: 679 },
            { x: 2630, y: 1705 },
        ];
        
        let spawnPoint = Phaser.Math.RND.pick(spawnPoints);
        let spawnPointX = spawnPoint.x;
        let spawnPointY = spawnPoint.y;

        this.potenciador = new Potenciador(this, spawnPointX, spawnPointY, potenciadorType, this.mike);
        this.potenciadorSpawneado = true;

        //animacion del potenciador
        this.tweens.add({
            targets: this.potenciador,
            y: this.potenciador.y - 30,
            duration: 2000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            delay: 10
        })
    }

    
    //Metodo para reespawner potenciador
    reespawnearPotenciador()
    {
        if (!this.spawningPotenciador)
        {
            this.spawningPotenciador = true;
            this.time.delayedCall(9000, () => {
                this.spawnPotenciador();
                this.spawningPotenciador = false;
            })
        }
        
    } 

    addAmmoToGroup(newAmmo){
        this.grupoMunicionBalas.add(newAmmo);
    }

    addExplosiveToGroup(newExplosive){
        this.grupoExplosivos.add(newExplosive);
    }

    sendPoints(points){
        this.points += points;
        this.myUI.gainPoints(points);
    }

    generateText(x, y, message, size){
        let ogText = this.add.text(x, y, message, 
            { fontFamily: 'TitleFont', fontSize: size, color: 'white' })
        this.textCreated = true;

        return ogText;
    }

    getGrupoEnenmigos(){
        return this.grupoEnemigos;
    }
    
    //Cambiar el inventario (persoanlidad)
    changeInventory(currentPersonality){
        this.myUI.changeInventory(currentPersonality);
        this.myUI.changeInventorySelect(0);
    }

    //Cambiar seleccion de arma
    changeInvenSelection(currentWea){
        this.myUI.changeInventorySelect(currentWea);
    }


    //genera los enemigos de cada spawner que haya en el mapa, pasandole el numero de enmigos que genera cada spawn
    enemySpawners(enemyNumbers) {
        const allSpawners = [this.enemySpawner1, this.enemySpawner2, this.enemySpawner3, this.enemySpawner4];

        // Verifica la colisión entre la cámara y cada uno de los spawners
        allSpawners.forEach((spawner) => {
            
                // Si no hay colisión, spawnear enemigos
                spawner.spawnEnemies(enemyNumbers, 3000); // Ajusta el número y tiempo según lo que necesites
                // Limpiar todos los enemigos generados después de cierto tiempo 
                this.time.delayedCall(40000, () => {
                    spawner.clearEnemies();
                });     
            
        });
    };

    numberEnemiesCheckers() {
        this.roundManager.enemiesLeft--;


         // Verifica si la ronda ha terminado
         const checkRoundEnd = () => {
            
            // Verifica si se eliminaron todos los enemigos
            const allEnemiesEliminated = this.roundManager.enemiesDefeated === this.roundManager.totalEnemiesLeft;

            if (allEnemiesEliminated) {
            this.roundManager.totalEnemiesLeft = (this.roundManager.enemiesPerRound + this.roundManager.increasePerRound * this.roundManager.currentRound) * 4;

             this.time.delayedCall(5000, () => {

                this.roundManager.startRound(); // Comienza la siguiente ronda

             })
             
            }

        };

        // Establece un evento que verifique si se ha completado la ronda cada cierto intervalo
        this.time.addEvent({
        delay: 1000, // Intervalo para verificar el final de la ronda
        loop: true,
        callback: checkRoundEnd,
        callbackScope: this
        });
    };

     //Incrementa el numero de enemigos eliminados
    increaseEnemiesDefeated() {
        this.roundManager.enemiesDefeated++;
    };

    //Game Over
    die(){
        this.backgroundMusic.destroy();
        this.scene.start('gameOver', {datos: this.points, level: 0});
    }


    update(dt, t){
  
   }
}

