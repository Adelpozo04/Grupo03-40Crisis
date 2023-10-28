

export default class jugador extends Phaser.GameObjects.Container {

    /**
     * @param {scene} scene - escena en la que se debe colocar a mike
     * @param {number} x - posicion x
     * @param {number} y - posicion en y
     * @param {string} key - identificador del sprite del jugador
     * HAT
     * XHAT
     * YHAT
     * ARMA
     * PERSONALIDAD
     */

    constructor(scene, x, y, key){
        super(scene, x, y);

        this.dirX = 0;
        this.dirY = 0;

        this.player = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);

        this.add(this.player);



        this.scene.add.existing(this);

        this.scene.anims.create({
            key: 'walk'+key,
            frames: scene.anims.generateFrameNumbers(key, {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });

        this.key = key

        this.aKey = this.scene.input.keyboard.addKey('A');
        this.dKey = this.scene.input.keyboard.addKey('D');
        this.wKey = this.scene.input.keyboard.addKey('W');
        this.sKey = this.scene.input.keyboard.addKey('S');
    }

    preUpdate(dt, t){

        this.player.preUpdate(dt, t);
       

        if(this.aKey.isDown && (this.dirX == 0 || this.dirX == -1)){
            this.dirX = -1;
            
        }

        if(this.dKey.isDown && (this.dirX == 0 || this.dirX == 1)){
            this.dirX = 1;
            
        }

        if(this.wKey.isDown && (this.dirY == 0 || this.dirY == 1)){
            this.dirX = 1;
            
        }

        if(this.sKey.isDown && (this.dirY == 0 || this.dirY == -1)){
            this.dirY = -1;
            
        }

        if(this.dirX != 0 && this.dirY != 0){
            this.player.play('walk' + key);
            
        }

    }

    




}