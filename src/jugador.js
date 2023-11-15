import Entidad from "./entidad.js";
import sombrero from "./sombrero.js";

export default class jugador extends Entidad{

/**
 * @param {number} personalityExp - array con la experiencia de todas las personalidades
 * @param {number} currentPersonality - personalidad que se usa actualmente
 * @param {scene} scene
 * @param {string} key
 * @param {number} life
 * @param {number} speed
 * @param {number} x
 * @param {number} y
 */


constructor(scene, key, posX, posY, life, speed){

    super(scene, key, posX, posY, life, speed);

    const Personalities = {
        ANALISTA: 0,
        EXPLORADOR: 1,
        CENTINELA: 2,
        PACIFISTA: 3,
  
    }

    this.personalityExp = [0, 0, 0, 0];

    this.currentPersonality = Personalities.EXPLORADOR;   

    scene.add.existing(this);

    this.scene.anims.create({
        key: 'walk'+ key,
        frames: scene.anims.generateFrameNumbers(key, {start:0, end:3}),
        frameRate: 5,
        repeat: -1
    });

    this.scene.anims.create({
        key: 'iddle' + key,
        frames: scene.anims.generateFrameNumbers(key, {start: 0, end:0}),
        frameRate: 5,
        repeat: -1
    })


}



Movement(dirX, dirY, t, dt){       

    this.preUpdate(t, dt);

    if(dirX != 0 || dirY != 0){
        this.play('walk' + this.key, true);

        this.x += super.GetSpeed() * dirX;
        this.y += super.GetSpeed() * dirY;

    }
    else{
        this.play('iddle' + this.key, true);
    }

}

// Método getter que devuelve la posición del player
getPosition() {
    return { x: super.GetPosX(), y: super.GetPosY() };
}

}