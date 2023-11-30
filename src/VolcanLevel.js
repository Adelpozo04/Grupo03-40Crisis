import playerContenedor from './playerContenedor.js';
import Potenciador from './Potenciador.js';

export default class VolcanLevel extends Phaser.Scene{

    constructor(){
        super({key: 'VolcanLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){
        
        this.load.tilemapTiledJSON('volcanTilemap', './Assets/JSON/MapaVolcan.json');

        this.load.image('patronesVolcanTilemap', './Assets/Sprites/Tilesets/Volcan/TileVolcan.png');

        this.load.spritesheet('mike', './Assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './Assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('skeleton', './assets//Sprites//Enemigos//Esqueleto//esqueleto_SpriteSheet.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});

        this.load.image('botiquin', './Assets/Sprites/Potenciadores/botiquin.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('velocidad', './Assets/Sprites/Potenciadores/speed.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('vivu', './Assets/Sprites/Potenciadores/pillow.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('invencible', './Assets/Sprites/Potenciadores/shield.png', {frameWidth: 64, frameHeight: 64});
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
			key: 'volcanTilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        const myTile = this.map.addTilesetImage("TileVolcan", 'patronesVolcanTilemap', 32, 32, 0, 2);

        this.groundLayer = this.map.createLayer('Suelo', myTile);

        this.groundUpLayer = this.map.createLayer('SueloEncima', myTile);

        this.collisionLayer = this.map.createLayer('Colisiones', myTile);
        this.collisionLayer.setCollisionByExclusion([-1], true);     

        this.mike = new playerContenedor(this, 150, 150, 'mike', 20, -2000, -2000, 200, 150);

        this.objectUpLayer = this.map.createLayer("Encima", myTile);

        this.physics.add.collider(this.mike, this.collisionLayer);

        this.physics.add.collider(this.mike, this.collisionUpLayer);

        this.collisionLayer.setScale(1.5, 1.5);
        this.groundLayer.setScale(1.5, 1.5);
        this.groundUpLayer.setScale(1.5, 1.5);
        this.objectUpLayer.setScale(1.5, 1.5);

        this.cameras.main.startFollow(this.mike);

        /*
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                aux = Phaser.Math.RND.between(0, 3);
                const potenciador = new Potenciador(this, 0, 0, potenciadorTypes[aux], this.mike);
                if (this.potenciadorRecogido) {
                    potenciador.spawnPotenciador(this);
                }
            },
            callbackScope: this,
            loop: true
        });
        */
    }

    
    update(t, dt){

    }



}