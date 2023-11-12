
export default class Entidad extends Phaser.GameObjects.Sprite{

    /**
     * @param {scene} scene
     * @param {string} key
     * @param {number} life
     * @param {number} speed
     * @param {number} x
     * @param {number} y
     */

    constructor(scene, key, posX, posY, life, speed){

        super(scene, posX, posY);

        scene.add.existing(this);
        this.entidad = new Phaser.GameObjects.Sprite(scene, posX, posY, key, 0)
        this.scene.add.existing(this.entidad);

        this.x = posX;
        this.y = posY;
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
        return this.x;
    }

    GetPosY(){
        return this.y;
    }


}