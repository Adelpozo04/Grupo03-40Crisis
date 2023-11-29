

export default class HealthBar extends Phaser.GameObjects.Graphics{

constructor( scene, x, y, initialValue, width, heigth){

    super(scene);

    this.x = x;
    this.y = y;

    this.w = width;
    this.h = heigth;

    this.maxValue = initialValue;

    this.value = initialValue;

    this.draw();

    scene.add.existing(this);

}

changeValue(amount){

    this.value += amount;

    this.draw();

}

draw(){
    this.clear();

    this.fillStyle(0x000000);

    this.fillRect(x - 2, y - 2, w + 4, h + 4);

    this.fillStyle(0xffffff);

    this.fillRect(x, y, w, h);

    this.fillStyle(0xff0000);

    var currentHeatlh = (this.value * this.w) / this.maxValue;

    this.fillRect(x, y, currentHeatlh, h);
}





}