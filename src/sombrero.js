

export default class sombrero extends Phaser.GameObjects.Sprite{

/**
 * @param {Scene} scene
 * @param {number} hatId
 * @param {number} posX
 * @param {number} posY
 * @param {number} speed
 */

constructor(scene, hatId, posX, posY){
    super(scene, 0, 0, 'hat', hatId);

    this.scene.add.existing(this);

    this.setScale(0.25);

    this.hatId = hatId;

    this.posX = posX;

    this.posY = posY;

}


}