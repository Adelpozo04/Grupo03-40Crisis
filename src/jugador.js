import Sombrero from "./sombrero.js";

export default class jugador extends Phaser.GameObjects.Container {

    /**
     * @param {scene} scene - escena en la que se debe colocar a mike
     * @param {number} x - posicion x
     * @param {number} y - posicion en y
     * @param {string} key - identificador del sprite del jugador
     * @param {Sombrero} hat
     * @param {number} hatX
     * @param {number} hatY
     * ARMA
     * PERSONALIDAD
     */

    constructor(scene, x, y, key, hat, hatX, hatY){
        super(scene, x, y);

        this.dirX = 0;
        this.dirY = 0;
        this.speed = 1;


        this.player = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);

        this.add(this.player);

        this.scene.add.existing(this);
        if(hat){
            this.myHat = hat;
            this.add(this.myHat);
            this.myHat.x = hatX;
            this.myHat.y = hatY;

        }
        else{
            this.myHat = null;
        }

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

        this.key = key

        this.aKey = this.scene.input.keyboard.addKey('A');
        this.dKey = this.scene.input.keyboard.addKey('D');
        this.wKey = this.scene.input.keyboard.addKey('W');
        this.sKey = this.scene.input.keyboard.addKey('S');

        this.lookDer = true;
    }

    preUpdate(dt, t){
        this.player.preUpdate(dt, t);
       
        if(this.dirX == 0 || this.dirX == -1){

            if(this.aKey.isDown){
                if(this.dirX == 0){
                    this.dirX = -1;

                    if(this.lookDer){
                        this.player.setFlip(true, false);
                        this.myHat.x = this.myHat.x * -1;
                        this.myHat.setFlip(true, false); 
                        this.lookDer = !this.lookDer;
                    }
                    
                }
                
            }
            else if(this.aKey.isUp){
                this.dirX = 0;
            }
        }
        
        if(this.dirX == 0 || this.dirX == 1){
            if(this.dKey.isDown){
                if(this.dirX == 0){
                    this.dirX = 1;
                    if(!this.lookDer){
                        this.player.setFlip(false, false);
                        this.myHat.x = this.myHat.x * -1;
                        this.myHat.setFlip(false, false);
                        this.lookDer = !this.lookDer;
                    }
                    
                }   
            }
            else if(this.dKey.isUp){
                this.dirX = 0;
            }
        }
        
        if(this.dirY == 0 || this.dirY == -1){
            if(this.wKey.isDown){
                if(this.dirY == 0){
                    this.dirY = -1;
                }
                
                
            }
            else if(this.wKey.isUp){
                
                this.dirY = 0;
            }
        }
        
        if(this.dirY == 0 || this.dirY == 1){
            if(this.sKey.isDown){
                if(this.dirY == 0){
                    this.dirY = 1;
                }
                
                
            }
            else if(this.sKey.isUp){
                this.dirY = 0;
            }
        }
        

        if(this.dirX != 0 || this.dirY != 0){
            this.player.play('walk' + this.key, true);
            this.x += this.speed * this.dirX;
            this.y += this.speed * this.dirY;
        }
        else{
            this.player.play('iddle' + this.key, true);
        }

    }

    // Método getter que devuelve la posición del player
    getPosition() {
        return { x: this.x, y: this.y };
    }
}