

export default class Sombrero extends Phaser.GameObjects.Sprite{

/**
 * @param {Scene} scene
 * @param {number} hatId
 * 
 */

constructor(scene, hatId){
    super(scene, 0, 0, 'hat', hatId);

    this.scene.add.existing(this);

    this.setScale(0.25);

    this.hatId = hatId;
}






}