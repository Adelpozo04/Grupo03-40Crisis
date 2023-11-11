import playerContenedor from './playerContenedor.js';
import Zombie from './zombie.js';
import Sombrero from './sombrero.js';
import Esqueleto from './esqueleto.js';

export default class PlayaLevel extends Phaser.Scene{

    constructor(){
        super({key: 'PlayaLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
        
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){
        this.load.image('PlayaImage', './Assets/Sprites/Tilesets/Playa/MapaPlayas.png');
        this.load.spritesheet('mike', './Assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './Assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('skeleton', './assets//Sprites//Enemigos//Esqueleto//esqueleto_walk_spriteSheet.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});
    }


    create(){
        this.add.image(0, 0, 'PlayaImage').setScale(1, 1).setOrigin(0, 0)

        this.mike = new playerContenedor(this, 150, 150, 'mike', new Sombrero(this, 1), -4, -10, 200, 10);
        //this.zombie = new Zombie(this, 500, 500, 0.5, 25, 'zombie', this.mike);
        //this.skeleton = new Esqueleto(this, 300, 300, 0.5, 100, 'skeleton', this.mike);
        
    }

    
    update(t, dt){
        //this.zombie.update();
        //this.skeleton.update();
    }
}