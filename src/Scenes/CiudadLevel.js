import LevelBase from './levelBase.js'
import playerContenedor from '../Player/playerContenedor.js';
import Potenciador from '../Potenciador.js';
import UIManager from '../UI/uiManager.js';
import EnemigoSpawner from '../enemySpawner.js';
import municionBalas from '../Armas/armaDisparos/municionBalas.js';
import explosive from '../Armas/armaSpawneadora/explosive.js';
import Enemigo from "../Enemies/enemigo.js";
import RoundManager from '../RoundManager.js';
import EffectArea from '../Scenes/Event/effectArea.js'
import DamageWave from '../Scenes/Event/damageWave.js'



export default class CiudadLevel extends LevelBase{

    constructor(){
        super('CiudadLevel'); 
        this.spawningPotenciador = false;
        //this.hatID = hatID; 
        this.roundManager = null;
        this.isGamePaused = false; // Estado de pausa
        this.escapeKey = null; // Variable para la tecla ESC
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){
        super.preload();
        //Se carga el Json
        this.load.tilemapTiledJSON('ciudadTilemap', './Assets/JSON/MapaCiudad.json');

        //Se carga el png con los tiles que usa el Json
        this.load.image('patronesCiudadTilemap', './Assets/Sprites/Tilesets/Ciudad/tilemapCiudadExtruded.png');

        this.load.image('FondoPlay', './Assets/Sprites/UI/PlayGame/tilemapCiudadExtruded.png')
    }
    
    create(data){
        super.create();
        
        this.points = 0;
        console.log(this.points);


        //Cargado de la musica
        this.backgroundMusic = this.sound.add('ciudadMusic', {loop: true, volume: 0.2});

        this.backgroundMusic.play();

        //Creacion del tilemap a partir de los datos cargados
        this.map = this.make.tilemap({ 
			key: 'ciudadTilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        //Se indica el Json, el png de tiles, el tamaño de los tiles y el espaciado del tile con los bordes y el margen entre sprites
        const myTile = this.map.addTilesetImage('tilemapCiudad', 'patronesCiudadTilemap', 32, 32, 1, 2);

        //Creacion de las Layers del mapa
        this.groundLayer = this.map.createLayer('Suelo', myTile);

        this.groundUpLayer = this.map.createLayer('SueloEncima', myTile);

        this.collisionLayer = this.map.createLayer('Colisiones', myTile);

        this.objectsUpLayer = this.map.createLayer('ObjetosPorEncima', myTile).setDepth(3);

        //Se le agregan las colisiones a las layers
        this.collisionLayer.setCollisionByExclusion([-1], true);

        //Creacion de entidades 
        this.mike = new playerContenedor(this, 300, 300, 'mike', data, -2000, -2000, 200, 150);

        this.camera = this.cameras.main.startFollow(this.mike);

        //Creacion de la UI
        this.myUI = new UIManager(this, 'UIManager', this.mike);

        this.myUI.setScrollFactor(0);

        //Se ajusta el tamaño del mapa
        this.collisionLayer.setScale(1.35, 1.35);
        this.groundLayer.setScale(1.35, 1.35);
        this.groundUpLayer.setScale(1.35, 1.35);
        this.objectsUpLayer.setScale(1.35, 1.35);

           
        this.enemySpawner1 = new EnemigoSpawner(this, 1750, 400, this.mike, this.grupoEnemigos);
        this.enemySpawner2 = new EnemigoSpawner(this, 200, 1320, this.mike, this.grupoEnemigos);
        this.enemySpawner3 = new EnemigoSpawner(this, 1750, 2400, this.mike, this.grupoEnemigos);
        this.enemySpawner4 = new EnemigoSpawner(this, 3000, 1320, this.mike, this.grupoEnemigos);



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
        let tiempoEntreEventos = 9
        // llama a crear un evento cada x tiempo
        this.time.addEvent({
            delay: tiempoEntreEventos * 1000,
            loop: true,
            callback: this.eventManager,
            callbackScope: this
        });


    }


    eventManager()
    {
        let choice = Phaser.Math.RND.between(0,1)

        if (choice == 0)
        {
            
            let x = Phaser.Math.RND.between(300, 3000)
            let y = Phaser.Math.RND.between(300, 2250)
            new EffectArea(this, x, y, 'humo', 15000, 0.25)
        }
        else if (choice == 1)
        {
            let y = Phaser.Math.RND.between(300, 2250)
            new DamageWave(this, 3000, y, 'coche', 0.15)
        }
    }

    togglePause() {
        if (this.isGamePaused) {
            this.isGamePaused = false;
            this.scene.resume('CiudadLevel');
        } else {
            this.isGamePaused = true;
            this.scene.pause();
        }
    }

    getPotenciador()
    {
        return this.potenciador;
    }

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
            { x: 486, y: 386 },
            { x: 800, y: 1700 },
            { x: 2500, y: 734 },
            { x: 2589, y: 1587 },
        
        ];
        
        let spawnPoint = Phaser.Math.RND.pick(spawnPoints);
        let spawnPointX = spawnPoint.x;
        let spawnPointY = spawnPoint.y;

        this.potenciador = new Potenciador(this, spawnPointX, spawnPointY, potenciadorType, this.mike);
        this.potenciadorSpawneado = true;

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
        console.log(points, this.points);
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
    
    changeInventory(currentPersonality){
        this.myUI.changeInventory(currentPersonality);
        this.myUI.changeInventorySelect(0);
    }

    changeInvenSelection(currentWea){
        this.myUI.changeInventorySelect(currentWea);
    }


    enemySpawners(enemyNumbers) {
        const allSpawners = [this.enemySpawner1, this.enemySpawner2, this.enemySpawner3, this.enemySpawner4];

        // Verifica la colisión entre la cámara y cada uno de los spawners
        allSpawners.forEach((spawner) => {
            const isColliding = Phaser.Geom.Intersects.RectangleToRectangle(this.camera.worldView, spawner.getBounds());
            if (!isColliding) {
                // Si no hay colisión, spawnear enemigos
                spawner.spawnEnemies(enemyNumbers, 3000); // Ajusta el número y tiempo según lo que necesites
                // Limpiar todos los enemigos generados después de cierto tiempo 
                this.time.delayedCall(40000, () => {
                    spawner.clearEnemies();
                });     
            }
        });
    };

    die(){
        this.backgroundMusic.destroy();
        this.scene.start('gameOver', {datos: this.points, level: 0});
    }

    numberEnemiesCheckers() {
        this.roundManager.enemiesLeft--;


         // Verifica si se eliminaron todos los enemigos
         const checkRoundEnd = () => {
            
            console.log(this.roundManager.totalEnemiesLeft);
            console.log(this.roundManager.enemiesDefeated);
            // Verifica si se eliminaron todos los enemigos
            const allEnemiesEliminated = this.roundManager.enemiesDefeated === this.roundManager.totalEnemiesLeft;

            if (allEnemiesEliminated) {
            this.roundManager.totalEnemiesLeft = (this.roundManager.enemiesPerRound + this.roundManager.increasePerRound * this.roundManager.currentRound) * 4;

             this.time.delayedCall(5000, () => {
                console.log("paso de ronda");
                
                this.roundManager.startRound(); // Comienza la siguiente ronda

             })
             
            }

        };

        // Establece un evento que verifique si se ha completado la ronda cada cierto intervalo
        this.time.addEvent({
        delay: 1000, 
        loop: true,
        callback: checkRoundEnd,
        callbackScope: this
        });
    };

    decreaseEnemiesLeft() {
        this.roundManager.enemiesDefeated++;
    };


    update(dt, t){

    }


    Pause() {
        const checkPause = () => {

            this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

            // Verificar si la tecla Esc está presionada
            if ( this.escapeKey.on('down', this.togglePause, this)) {
                console.log("funciona");
                   this.togglePause();
               }
           
       }
        // Establece un evento que verifique si se ha completado la ronda cada cierto intervalo
            this.time.addEvent({
           delay: 1000, 
           loop: true,
           callback: checkPause,
           callbackScope: this
           });
   
       // this.escapeKey.on('down', this.togglePause, this);
     
      
    }

}

