import sombrero from "./sombrero.js";
import jugador from "./jugador.js";

export default class playerContenedor extends Phaser.GameObjects.Container {

    /**
     * @param {sombrero} hat
     * @param {jugador} player
     * @param {number} hatId
     * ARMA
     * PERSONALIDAD
     */

    constructor(scene, x, y, key, hatId, hatX, hatY, life, speed){
        super(scene, x, y);

        this.dirX = 0;
        this.dirY = 0;

        scene.physics.add.existing(this);
        this.scene.add.existing(this);  

        if(hatId != -1){
            this.myHat = new sombrero(scene, hatId, hatX, hatY, speed);
            this.add(this.myHat);
            this.myHat.setDepth(1);

        }
        else{
            this.myHat = null;
        }

        this.player = new jugador(scene, key, x, y, life, speed);

        this.player.Depth = 0;

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
                        this.myHat.posX = this.myHat.posX * -1;
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
                        this.myHat.posX = this.myHat.posX * -1;
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
        this.myHat.Movement(this.dirX, this.dirY, t, dt);

    }

    GetPlayer(){
        return this.player;
    }

    
}