import playerContenedor from './playerContenedor.js';
import Potenciador from './Potenciador.js';
import Robot from './robot.js'
import EnemigoBasico from './enemigoBasico.js';
import lutano from './Lutano.js';
import cepo from './cepo.js';
import UIManager from './uiManager.js';

export default class CiudadLevel extends Phaser.Scene{

    constructor(){
        super({key: 'CiudadLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
        this.potenciadorSpawneado = false; // Inicialmente se permite generar el primer potenciador
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){

        //Se carga el Json
        this.load.tilemapTiledJSON('ciudadTilemap', './Assets/JSON/MapaCiudad.json');

        //Se carga el png con los tiles que usa el Json
        this.load.image('patronesCiudadTilemap', './Assets/Sprites/Tilesets/Ciudad/tilemapCiudadExtruded.png');

        //Cargado de spritessheets de entidades del juego
        this.load.spritesheet('mike', './Assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './Assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('zombieattack', './Assets/Sprites/Enemigos/Zombie/Zombie-attack-SpriteSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('skeleton', './assets//Sprites//Enemigos//Esqueleto//esqueleto_SpriteSheet.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('burger', './Assets/Sprites/Enemigos/Hamburguesa/hamburguesa-spriteSheet.png', {frameWidth: 64, frameHeight:64})
        this.load.spritesheet('robot', './Assets/Sprites/Enemigos/Robot/Robot-walk-SpriteSheet.png',{frameWidth: 256, frameHeight: 256})
        this.load.spritesheet('lutano', './Assets/Sprites/Enemigos/Lutano/Lutano-Walk-SpriteSheet.png',{frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('lutanoAttack', './Assets/Sprites/Enemigos/Lutano/Lutano-attack-SpriteSheet.png',{frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('cepo', './Assets/Sprites/Enemigos/Lutano/Bear_Trap.png',{frameWidth: 256, frameHeight: 256})

        //Cargado de imagenes de objetos del juego

        this.load.image('botiquin', './Assets/Sprites/Potenciadores/botiquin.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('velocidad', './Assets/Sprites/Potenciadores/speed.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('vivu', './Assets/Sprites/Potenciadores/pillow.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('invencible', './Assets/Sprites/Potenciadores/shield.png', {frameWidth: 64, frameHeight: 64});

        this.load.image('pistola', './Assets/Sprites/Armas/pistola.png');
    }
  
    loadAnimations()
    {
        this.anims.create({
            key: 'walkzombie',
            frames: this.anims.generateFrameNumbers('zombie', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'attackzombie',
            frames: this.anims.generateFrameNumbers('zombieattack', {start: 0, end: 3}),
            frameRate: 8
        });
        this.anims.create({
            key: 'walkskeleton',
            frames: this.anims.generateFrameNumbers('skeleton', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'attackskeleton',
            frames: this.anims.generateFrameNumbers('skeleton', {start: 4, end: 10}),
            frameRate: 8
        });
        this.anims.create({
            key: 'walkburger',
            frames: this.anims.generateFrameNumbers('burger', {start: 8, end:10}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'attackburger',
            frames: this.anims.generateFrameNumbers('burger', {start: 0, end:7}),
            frameRate: 10
        });
        this.anims.create({
            key: 'walkrobot',
            frames: this.anims.generateFrameNumbers('robot', {start: 0, end:3}),
            frameRate: 5
        });
        this.anims.create({
            key: 'walklutano',
            frames: this.anims.generateFrameNumbers('lutano', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'attacklutano',
            frames: this.anims.generateFrameNumbers('lutanoAttack', {start: 0, end:1}),
            frameRate: 10
        })
        this.anims.create({
            key: 'attackcepo',
            frames: this.anims.generateFrameNumbers('cepo', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
        })
    
        

    }

    create(){
        this.loadAnimations();

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
        this.mike = new playerContenedor(this, 300, 300, 'mike', 0, -2000, -2000, 200, 150);

        //this.robot = new Robot(this, 700, 600, 'robot', this.mike);
        this.skeleton = new EnemigoBasico(this, 500, 500, 'skeleton', this.mike);

        //this.lutano = new lutano(this, 600, 600, 'lutano', this.mike);

        this.cepo = new cepo(this, 600, 700, 'cepo', this.mike);

        //Se indica que colliders chocan entre si
        this.physics.add.collider(this.mike, this.collisionLayer);
        //this.physics.add.collider(this.lutano, this.collisionLayer);
        this.physics.add.collider(this.skeleton, this.collisionLayer);

       
        //Se crea la camara
        this.cameras.main.startFollow(this.mike);
        
        //Se crean layers por encima de las entidades
        this.objectsUpLayer = this.map.createLayer('ObjetosPorEncima', myTile);

        //Se ajusta el tamaño del mapa
        this.collisionLayer.setScale(1.35, 1.35);
        this.groundLayer.setScale(1.35, 1.35);
        this.groundUpLayer.setScale(1.35, 1.35);
        this.objectsUpLayer.setScale(1.35, 1.35);

        const potenciadorTypes = {
            BOTIQUIN: 'botiquin', 
            VELOCIDAD: 'velocidad', 
            SLEEP: 'vivu', 
            INVENCIBLE: 'invencible',
        };

        if(!this.potenciadorSpawneado){
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    let aux = Phaser.Math.RND.between(0, 3);
                    const potenciadorType = Object.values(potenciadorTypes)[aux];
                    this.potenciador = new Potenciador(this, 300, 300, potenciadorType, this.mike);

                    this.potenciadorSpawneado = true;

                     //Colision de potenciador con player
                    this.physics.add.collider(this.mike, this.potenciador, this.potenciador.enviarPotenciador(potenciadorType), null, this);


                    this.tweens.add({
                        targets: this.potenciador,
                        y: this.potenciador.y - 30,
                        duration: 2000,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1,
                        delay: 10
                    })
                },
                
                callbackScope: this,
                loop: false,
            });
        }

        this.myUI = new UIManager(this, 'UIManager', this.mike);

        this.myUI.setScrollFactor(0);

    }

   applyEffectPlayer() {
      
    console.log("hola");

   }
}