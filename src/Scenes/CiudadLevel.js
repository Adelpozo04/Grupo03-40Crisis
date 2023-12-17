import LevelBase from './levelBase.js'
import playerContenedor from '../Player/playerContenedor.js';
import Potenciador from '../Potenciador.js';
import Robot from '../Enemies/robot.js'
import EnemigoBasico from '../Enemies/enemigoBasico.js';
import lutano from '../Enemies/lutano.js';
import Mono from '../Enemies/mono.js';
import cepo from '../Enemies/cepo.js';
import UIManager from '../UI/uiManager.js';
import Bala from '../Armas/armaDisparos/balas.js'
import EnemigoSpawner from '../enemySpawner.js';
import municionBalas from '../Armas/armaDisparos/municionBalas.js';
import explosive from '../Armas/armaSpawneadora/explosive.js';
import Enemigo from "../Enemies/enemigo.js";

export default class CiudadLevel extends LevelBase{

    constructor(){
        super('CiudadLevel'); 
        this.potenciadorSpawneado = false;
        this.potenciadorRecogido = false;  // Inicialmente se permite generar el primer potenciador
        //this.hatID = hatID; 
    }
    
    init(data){
        
    }
    
    preload(){
        super.preload();
        //Se carga el Json
        this.load.tilemapTiledJSON('ciudadTilemap', './Assets/JSON/MapaCiudad.json');

        //Se carga el png con los tiles que usa el Json
        this.load.image('patronesCiudadTilemap', './Assets/Sprites/Tilesets/Ciudad/tilemapCiudadExtruded.png');
    }
    
    create(data){
        super.create();

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

        //Se le agregan las colisiones a la layer
        this.collisionLayer.setCollisionByExclusion([-1], true);

        //Creacion de entidades
        this.mike = new playerContenedor(this, 300, 300, 'mike', data, -2000, -2000, 200, 150);

        //Se indica que colliders chocan entre si
        this.physics.add.collider(this.mike, this.collisionLayer);

        //Se crea la camara
        this.camera = this.cameras.main.startFollow(this.mike);
        
        //Se crean layers por encima de las entidades
        this.objectsUpLayer = this.map.createLayer('ObjetosPorEncima', myTile).setDepth(3);

        //Se ajusta el tamaño del mapa
        this.collisionLayer.setScale(1.35, 1.35);
        this.groundLayer.setScale(1.35, 1.35);
        this.groundUpLayer.setScale(1.35, 1.35);
        this.objectsUpLayer.setScale(1.35, 1.35);
           
        this.enemySpawner1 = new EnemigoSpawner(this, 600, 400, this.mike, this.grupoEnemigos);
        this.enemySpawner2 = new EnemigoSpawner(this, 200, 1320, this.mike, this.grupoEnemigos);
        this.enemySpawner3 = new EnemigoSpawner(this, 1750, 2400, this.mike, this.grupoEnemigos);
        this.enemySpawner4 = new EnemigoSpawner(this, 3000, 1320, this.mike, this.grupoEnemigos);

        this.enemySpawners();

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

        // municion con player
        this.physics.add.collider(this.grupoMunicionBalas, this.mike, function(ammo, player){

            ammo.destroyMyself();
            player.reloadDisparosAmmo();

        });

        // enemigos con entorno
        this.physics.add.collider(this.grupoEnemigos, this.collisionLayer);
        
        this.spawnPotenciador();    

        this.myUI = new UIManager(this, 'UIManager', this.mike);

        this.myUI.setScrollFactor(0);
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
            { x: 600, y: 600 },
            { x: 600, y: 700 },
            { x: 700, y: 600 },
            { x: 700, y: 700 },
            //Añadir luego las coordenadas correctas
        ];
        
        let spawnPoint = Phaser.Math.RND.pick(spawnPoints);
        let spawnPointX = spawnPoint.x;
        let spawnPointY = spawnPoint.y;

        this.potenciador = new Potenciador(this, spawnPointX, spawnPointY, potenciadorType, this.mike);
        
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

    addAmmoToGroup(newAmmo){
        this.grupoMunicionBalas.add(newAmmo);
    }

    addExplosiveToGroup(newExplosive){
        this.grupoExplosivos.add(newExplosive);
    }

    sendPoints(points){
        this.myUI.gainPoints(points);
        this.events.emit('cambiarXP', 0, points);
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


    enemySpawners() {
        const allSpawners = [this.enemySpawner1, this.enemySpawner2, this.enemySpawner3, this.enemySpawner4];

        // Verifica la colisión entre la cámara y cada uno de los spawners
        allSpawners.forEach((spawner) => {
            const isColliding = Phaser.Geom.Intersects.RectangleToRectangle(this.camera.worldView, spawner.getBounds());
            if (!isColliding) {
                // Si hay colisión, spawnear enemigos
                spawner.spawnEnemies(5, 3000); // Ajusta el número y tiempo según lo que necesites
                // Limpiar todos los enemigos generados después de cierto tiempo 
                this.time.delayedCall(40000, () => {
                    spawner.clearEnemies();
                });     
            }
        });
    };

    

    update(dt, t){
        if(!this.potenciadorSpawneado && this.potenciadorRecogido)
        { 
            this.potenciadorSpawneado = true;
            this.potenciadorRecogido = false;
            this.time.delayedCall(5000, () => {
                this.spawnPotenciador();
                
            })
        }
   }
}

