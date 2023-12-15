import LevelBase from './levelBase.js'
import playerContenedor from '../Player/playerContenedor.js';
import Potenciador from '../Potenciador.js';
import Robot from '../Enemies/robot.js'
import EnemigoBasico from '../Enemies/enemigoBasico.js';
import lutano from '../Enemies/lutano.js';
import Mono from '../Enemies/mono.js';
import cepo from '../Enemies/cepo.js';
import UIManager from '../UI/uiManager.js';
import Bala from '../Armas/balas.js'
import EnemigoSpawner from '../enemySpawner.js';
import municionBalas from '../Armas/municionBalas.js';
import explosive from '../Armas/explosive.js';
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
        this.objectsUpLayer = this.map.createLayer('ObjetosPorEncima', myTile);

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

        // balas player con enemigos
        this.physics.add.collider(this.grupoBalas, this.grupoEnemigos, function(bala, enemigo){
            
            enemigo.recieveDamage(bala.getDamage());
            bala.destroy();
        });
               
        // balas player con el entorno
        this.physics.add.collider(this.grupoBalas, this.collisionLayer, function(bala, enemigo){
            bala.destroy()
        }, null, this)

        // municion con player
        this.physics.add.collider(this.grupoMunicionBalas, this.mike, function(ammo, player){
            ammo.destroyMyself();
            player.reload();
        });

        // enemigos con entorno
        this.physics.add.collider(this.grupoEnemigos, this.collisionLayer);

        this.physics.add.collider(this.grupoBalasRobot, this.player, function (bala, player){
            player.recieveDamage(bala.getDamage())
        })
        
        this.spawnPotenciador();    

        this.myUI = new UIManager(this, 'UIManager', this.mike);

        this.myUI.setScrollFactor(0);
    }

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

