
export default class Entidad extends Phaser.GameObjects.Sprite{

    /**
     * @param {scene} scene
     * @param {string} key
     * @param {number} life
     * @param {number} speed
     * @param {number} posX
     * @param {number} posY
     */

    constructor(scene, key, posX, posY, life, speed){

        super(scene, posX, posY);

  
        this.life = life;
        this.speed = speed;
        this.key = key;

        

    }

    Movement(){

    }

    Die(){

        Object.destroy();

    }

    ApplyEfect(){

    }

    GetSpeed(){
        return this.speed;
    }

    GetPosX(){
        return this.posX;
    }

    GetPosY(){
        return this.posY;
    }

    SetPosition(x, y){

        this.posX += x;
        this.posY += y;
    }

}