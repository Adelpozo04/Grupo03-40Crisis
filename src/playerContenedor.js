import sombrero from "./sombrero.js";
import jugador from "./jugador.js";

export default class playerContenedor extends Phaser.GameObjects.Container {

    /**
     * @param {jugador} player
     * @param {sombrero} hat
     * @param {number} hatX
     * @param {number} hatY
     * ARMA
     * PERSONALIDAD
     */

    constructor(scene, x, y, key, hat, hatX, hatY, life, speed){
        super(scene, x, y);

        this.dirX = 0;
        this.dirY = 0;

        scene.physics.add.existing(this);
        this.scene.add.existing(this);

        this.player = new jugador(scene, key, x, y, life, speed);

        if(hat){
            this.myHat = hat;
            this.add(this.myHat);
            this.myHat.x = hatX;
            this.myHat.y = hatY;

        }
        else{
            this.myHat = null;
        }

        this.key = key

        this.aKey = this.scene.input.keyboard.addKey('A');
        this.dKey = this.scene.input.keyboard.addKey('D');
        this.wKey = this.scene.input.keyboard.addKey('W');
        this.sKey = this.scene.input.keyboard.addKey('S');

        this.lookDer = true;
    }

    preUpdate(t, dt){

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

        this.player.Movement(this.dirX, this.dirY, t, dt);
           

    }

    GetPlayer(){
        return this.player;
    }

    
}