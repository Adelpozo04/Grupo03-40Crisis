

export default class sombrero extends Phaser.GameObjects.Sprite{

/**
 * @param {Scene} scene
 * @param {number} hatId
 * @param {number} speed
 */

constructor(scene, hatId, speed){
    super(scene, 0, 0, 'hat', hatId);

    this.scene.add.existing(this);

    this.setScale(0.25);

    this.hatId = hatId;

    this.speed = speed;
}

Movement(dirX, dirY, t, dt){       

    if(dirX != 0 || dirY != 0){

        this.x += this.speed * dirX;
        this.y += this.speed * dirY;

    }


}






}