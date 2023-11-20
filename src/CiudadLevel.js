import playerContenedor from './playerContenedor.js';
import Zombie from './zombie.js';
import Esqueleto from './esqueleto.js';
import Potenciador from './potenciadores.js';

export default class CiudadLevel extends Phaser.Scene{

    constructor(){
        super({key: 'CiudadLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
        this.potenciadorRecogido = true; // Inicialmente se permite generar el primer potenciador
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){

        this.load.tilemapTiledJSON('ciudadTilemap', './Assets/JSON/MapaCiudad.json');
        console.log("leyo bien el JSON");

        this.load.image('patronesCiudadTilemap', './Assets/Sprites/Tilesets/Ciudad/tilemapCiudad.png');

        console.log("leyo bien el patron");

        this.load.spritesheet('mike', './Assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './Assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('skeleton', './assets//Sprites//Enemigos//Esqueleto//esqueleto_SpriteSheet.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});
    }


    create(){

        this.cameras.main.centerOn(800, 1500);

        this.map = this.make.tilemap({ 
			key: 'ciudadTilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        console.log("hizo bien el map");

        const myTile = this.map.addTilesetImage('ciudadTilemap', 'patronesCiudadTilemap');

        console.log("hizo bien el tile");

        this.groundLayer = this.map.createLayer('Suelo', myTile);

        this.groundUpLayer = this.map.createLayer('SueloEncima', myTile);

        this.collisionLayer = this.map.createLayer('Colisiones', myTile);
		this.collisionLayer.setCollisionByExclusion(-1);

        this.mike = new playerContenedor(this, 300, 300, 'mike', 20, -2000, -2000, 200, 150);
        //this.zombie = new Zombie(this, 500, 500,'zombie', this.mike);
        this.skeleton = new Esqueleto(this, 300, 300, 'skeleton', this.mike);
        
        this.groundUpLayer = this.map.createLayer('ObjetosPorEncima', myTile);

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                const potenciador = new Potenciador(this);
                if (this.potenciadorRecogido) {
                    potenciador.spawnPotenciador(this);
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    
    update(t, dt){
        this.zombie.update();
        this.skeleton.update();
    }



}