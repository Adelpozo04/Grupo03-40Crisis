import Entidad from "./entidad.js";
import sombrero from "./sombrero.js";

export default class jugador extends Entidad{

/**
 * @param {number} personalityExp - array con la experiencia de todas las personalidades
 * @param {number} currentPersonality - personalidad que se usa actualmente
 * 
 */


constructor(scene, key, posX, posY, life, speed){

    console.log(speed);

    super(scene, key, posX, posY, life, speed);

    const Personalities = {
        ANALISTA: 0,
        EXPLORADOR: 1,
        CENTINELA: 2,
        PACIFISTA: 3,
  
    }

    this.personalityExp = [0, 0, 0, 0];

    this.currentPersonality = Personalities.EXPLORADOR;   

    this.player = new Phaser.GameObjects.Sprite(scene, posX, posY, key, 0);

    this.scene.add.existing(this.player);

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

    this.player.preUpdate(t, dt);

    this.posX = super.GetPosX();
    this.posY = super.GetPosY();

    

    if(this.dirX != 0 || this.dirY != 0){
        this.play('walk' + this.key, true);
        this.posX += super.GetSpeed() * this.dirX;
        this.posY += super.GetSpeed() * this.dirY;
    }
    else{
        this.play('iddle' + this.key, true);
    }

    console.log(super.GetSpeed() + "/" + super.GetSpeed);

    super.SetPosition(this.posX, this.posY);

}

// Método getter que devuelve la posición del player
getPosition() {
    return { x: this.x, y: this.y };
}

}