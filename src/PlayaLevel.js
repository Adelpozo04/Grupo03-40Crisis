import Jugador from './jugador.js';
import Zombie from './zombie.js';

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
        this.load.spritesheet('zombie', './assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 64, frameHeight: 64});
    }


    create(){
        this.add.image(0, 0, 'PlayaImage').setScale(1, 1).setOrigin(0, 0)

        new Jugador(this, 150, 150, 'mike');
        new Zombie(this, 150, 150, 'zombie');
        
    }

    
    update(t, dt){
        

    }
}