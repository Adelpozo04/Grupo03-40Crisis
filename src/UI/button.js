

export default class button extends Phaser.GameObjects.Container{

    constructor(scene, x, y, key, xReduction, yReduction, width, height){

        super(scene, x, y);

        this.buttonSprite = scene.add.sprite(x - xReduction, y - yReduction, key); 
        
        this.setSize(width, height);

        this.flipX = false;

        this.flipY = false;

        this.buttonSprite.setFlip(this.flipX, this.flipY);

        this.setInteractive();

        this.scene.add.existing(this);

    }

    setFlip(flipX, flipY){

        this.flipX = flipX;

        this.flipY = flipY;

        this.buttonSprite.setFlip(this.flipX, this.flipY);

    }


}