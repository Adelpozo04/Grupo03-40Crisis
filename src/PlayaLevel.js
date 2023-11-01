import Jugador from './jugador.js';
import Zombie from './zombie.js';
import Sombrero from './sombrero.js';

export default class PlayaLevel extends Phaser.Scene{

    constructor(){
        super({key: 'PlayaLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
        
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){
        this.load.image('PlayaImage', './assets/Sprites/Tilesets/Playa/MapaPlayas.png');
        this.load.spritesheet('mike', './assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('hat', './assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});
    }


    create(){
        this.add.image(0, 0, 'PlayaImage').setScale(1, 1).setOrigin(0, 0)

        this.mike = new Jugador(this, 150, 150, 'mike', new Sombrero(this, 20), -4, -10);
        this.zombie = new Zombie(this, 500, 500, 'zombie');
        
        
    }

    
    update(t, dt){
        this.zombie.updateMikeValues(this.mike.x, this.mike.y);

    }
}