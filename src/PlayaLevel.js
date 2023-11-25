import playerContenedor from './playerContenedor.js';
import Zombie from './zombie.js';
import Esqueleto from './esqueleto.js';
import Potenciador from './Potenciador.js';

export default class PlayaLevel extends Phaser.Scene{

    constructor(){
        super({key: 'PlayaLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){
        
        this.load.tilemapTiledJSON('playaTilemap', './Assets/JSON/MapaPlaya.json');

        this.load.image('patronesPlayaTilemap', './Assets/Sprites/Tilesets/Playa/TilePlaya-export.png');

        this.load.spritesheet('mike', './Assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './Assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('skeleton', './assets//Sprites//Enemigos//Esqueleto//esqueleto_SpriteSheet.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});
        this.load.image('botiquin', './Assets/Sprites/Potenciadores/botiquin2.jpg', {frameWidth: 32, frameHeight: 32});
        this.load.image('velocidad', './Assets/Sprites/Potenciadores/speed.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('vivu', './Assets/Sprites/Potenciadores/pillow.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('invencible', './Assets/Sprites/Potenciadores/shield.png', {frameWidth: 32, frameHeight: 32});
    }


    create(){
        
        this.map = this.make.tilemap({ 
			key: 'playaTilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        const myTile = this.map.addTilesetImage("TilePlaya-export", 'patronesPlayaTilemap', 32, 32, 1, 2);

        this.groundLayer = this.map.createLayer('Suelo', myTile);

        this.groundUpLayer = this.map.createLayer('SueloEncima', myTile);

        this.collisionLayer = this.map.createLayer('Colisiones', myTile);
        this.collisionLayer.setCollisionByExclusion([-1], true);

        this.collisionUpLayer = this.map.createLayer('ColisionesEncima', myTile);
        //this.collisionUpLayer.setCollisionByExclusion([-1], true);

        this.objectUpLayer = this.map.createLayer("ObjetosEncima", myTile);

        this.mike = new playerContenedor(this, 150, 150, 'mike', 20, -2000, -2000, 200, 150);
        //this.zombie = new Zombie(this, 500, 500,'zombie', this.mike);
        this.skeleton = new Esqueleto(this, 300, 300, 'skeleton', this.mike);
        
        this.physics.add.collider(this.mike, this.collisionLayer);

        this.physics.add.collider(this.mike, this.collisionUpLayer);

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
        //this.zombie.update();
        this.skeleton.update();
    }



}