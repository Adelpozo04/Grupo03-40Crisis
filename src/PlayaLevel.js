import playerContenedor from './playerContenedor.js';
import Zombie from './zombie.js';
import Esqueleto from './esqueleto.js';
import Arma from './arma.js'
import Potenciador from './potenciadores.js';

export default class PlayaLevel extends Phaser.Scene{

    constructor(){
        super({key: 'PlayaLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
        this.potenciadorRecogido = true; // Inicialmente se permite generar el primer potenciador
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){
        this.load.image('PlayaImage', './Assets/Sprites/Tilesets/Playa/MapaPlayas.png');
        this.load.spritesheet('mike', './Assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './Assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('skeleton', './assets//Sprites//Enemigos//Esqueleto//esqueleto_SpriteSheet.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('pistol', 'pistola.png', {frameWidth: 25, frameHeight: 18})
    }


    create(){
        this.add.image(0, 0, 'PlayaImage').setScale(1, 1).setOrigin(0, 0)

        this.mike = new playerContenedor(this, 150, 150, 'mike', 20, -2000, -2000, 200, 150);
        //this.zombie = new Zombie(this, 500, 500,'zombie', this.mike);
        this.skeleton = new Esqueleto(this, 300, 300, 'skeleton', this.mike);

        this.arma = new Arma(this, 0, 0, 'pistol', this.mike);

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
        //this.zombie.update();
        this.skeleton.update()
        this.arma.update()
    }
}