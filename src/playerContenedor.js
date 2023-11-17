
export default class playerContenedor extends Phaser.GameObjects.Container {

    /**
     * @param {sombrero} hat
     * @param {jugador} player
     * @param {number} hatId
     * @param {number} personalityExp - array con la experiencia de todas las personalidades
     * @param {number} currentPersonality - personalidad que se usa actualmente
     * @param {scene} scene
     * @param {string} key
     * @param {number} life
     * @param {number} speed
     * @param {number} x
     * @param {number} y
     * ARMA
     * PERSONALIDAD
     */

    constructor(scene, x, y, key, hatId, hatX, hatY, life, speed){
        super(scene, x, y);

        this.x = x;
        this.y = y;

        this.key = key;

        this.life = life;
        this.speed = speed;

        this.dirX = 0;
        this.dirY = 0;

        const Personalities = {
            ANALISTA: 0,
            EXPLORADOR: 1,
            CENTINELA: 2,
            PACIFISTA: 3,
      
        }
    
        this.personalityExp = [0, 0, 0, 0];
    
        this.currentPersonality = Personalities.EXPLORADOR;

        this.scene.add.sprite();


        //Creacion sprites
        this.player = scene.add.sprite(16, 32, key);
        this.add(this.player);

        if(hatId != -1){
            this.myHat = scene.add.sprite(this.player.x -4, this.player.y -10, 'hat', hatId);
            this.myHat.setScale(0.25);
            this.add(this.myHat);
            
        }
        else{
            this.myHat = null;
        }

        this.aKey = this.scene.input.keyboard.addKey('A');
        this.dKey = this.scene.input.keyboard.addKey('D');
        this.wKey = this.scene.input.keyboard.addKey('W');
        this.sKey = this.scene.input.keyboard.addKey('S');

        this.lookDer = true;

        //Tema fisicas
        scene.physics.add.existing(this);
        this.scene.add.existing(this);  

        console.log(this.player.width + " / " + this.player.heigth);

        this.body.setSize(this.player.width/2, this.player.width);


        //Animaciones
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
        });
    }

    create(){

        this.body.setVelocity(speed, speed);
        this.setCollideWorldBounds(true);

    }

    preUpdate(t, dt){

        this.player.preUpdate(t, dt);

        if(this.dirX == 0 || this.dirX == -1){

            if(this.aKey.isDown){
                if(this.dirX == 0){
                    this.dirX = -1;

                    if(this.lookDer){
                        this.player.setFlip(true, false);
                        this.myHat.x = this.myHat.x + this.player.x / 2;
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
                        this.myHat.x = this.myHat.x - this.player.x / 2;
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

            this.body.setVelocity(this.speed * this.dirX, this.speed * this.dirY);

            //console.log(this.x + " / " + this.y);
        }
        else{
            this.body.setVelocity(0, 0);
            this.player.play('iddle' + this.key, true);
        }

    }

    GetPlayer(){
        return this.player;
    }
    
    getPosition() {
        return { x: this.x, y: this.y };
    }
    
}