import playerContenedor from './playerContenedor.js';
import Zombie from './zombie.js';
import Esqueleto from './esqueleto.js';
import Hamburgesa from './hamburgesa.js'
import Potenciador from './Potenciador.js';

export default class CiudadLevel extends Phaser.Scene{

    constructor(){
        super({key: 'CiudadLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
        this.potenciadorSpawneado = false; // Inicialmente se permite generar el primer potenciador
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){

        this.load.tilemapTiledJSON('ciudadTilemap', './Assets/JSON/MapaCiudad.json');
        console.log("leyo bien el JSON");

        this.load.image('patronesCiudadTilemap', './Assets/Sprites/Tilesets/Ciudad/tilemapCiudadExtruded.png');

        console.log("leyo bien el patron");

        this.load.spritesheet('mike', './Assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './Assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('skeleton', './assets//Sprites//Enemigos//Esqueleto//esqueleto_SpriteSheet.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});

        this.load.spritesheet('burgerWalk', './Assets/Sprites/Enemigos/Hamburguesa/Hamburguesa-walk-SpriteSheet.png', {frameHeight: 48, frameWidth:64})
        this.load.spritesheet('burgerAttack', './Assets/Sprites/Enemigos/Hamburguesa/Hamburguer-attack-SpriteSheet.png', {frameHeight: 64, frameWidth:48})
      
        this.load.image('botiquin', './Assets/Sprites/Potenciadores/botiquin2.jpg', {frameWidth: 32, frameHeight: 32});
        this.load.image('velocidad', './Assets/Sprites/Potenciadores/speed.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('vivu', './Assets/Sprites/Potenciadores/pillow.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('invencible', './Assets/Sprites/Potenciadores/shield.png', {frameWidth: 32, frameHeight: 32});
    }
  
    loadAnimations()
    {
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
            frames: this.anims.generateFrameNumbers('burgerWalk', {start: 0, end:2}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'attackburger',
            frames: this.anims.generateFrameNumbers('burgerAttack', {start: 0, end:7}),
            frameRate: 5
        })

        

    }

    create(){
        this.loadAnimations();
        this.map = this.make.tilemap({ 
			key: 'ciudadTilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        console.log("hizo bien el map");

        const myTile = this.map.addTilesetImage('tilemapCiudad', 'patronesCiudadTilemap', 32, 32, 1, 2);

        console.log("hizo bien el tile");

        this.groundLayer = this.map.createLayer('Suelo', myTile);

        this.groundUpLayer = this.map.createLayer('SueloEncima', myTile);

        this.collisionLayer = this.map.createLayer('Colisiones', myTile);
		    this.collisionLayer.setCollisionByExclusion([-1], true);

        this.mike = new playerContenedor(this, 300, 300, 'mike', 20, -2000, -2000, 200, 150);
        //this.zombie = new Zombie(this, 500, 500,'zombie', this.mike);
        this.skeleton = new Esqueleto(this, 300, 300, 'skeleton', this.mike);
        this.hamburger = new Hamburgesa(this, 600, 400, 'burger', this.mike);

        this.physics.add.collider(this.mike, this.collisionLayer);

        this.cameras.main.startFollow(this.mike);
        
        this.objectsUpLayer = this.map.createLayer('ObjetosPorEncima', myTile);

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

    }

    
    update(t, dt){
        //this.zombie.update();
        this.skeleton.update();
    }



}