
import armaDisparos from "../Armas/armaDisparos.js";
import armaMelee from "../Armas/armaMelee.js";
import armaObjetosSpawneado from "../Armas/armaObjetoSpawneado.js";

export default class playerContenedor extends Phaser.GameObjects.Container {

    /**
     * @param {sprite} hat -sprite del sombrero que se pone en el contenedor
     * @param {sprite} player - sprite del jugador que se coloca en el contenedor
     * @param {number} hatId
     * @param {number} personalityExp - array con la experiencia de todas las personalidades
     * @param {number} currentPersonality - personalidad que se usa actualmente
     * @param {scene} scene
     * @param {string} key
     * @param {number} life
     * @param {number} maxLife - Vida máxima del jugador
     * @param {number} speed
     * @param {number} x
     * @param {number} y
     * @param {boolean} sleep
     * @param {boolean} invencible
     * @param {Arma} arma
     * PERSONALIDAD
     */
    constructor(scene, x, y, key, hatId, hatX, hatY, life, speed){
        super(scene, x, y);

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.key = key;

        this.life = life;
        this.maxLife = life;

        this.speed = speed;

        this.sleep = false;

        this.invencible = false;

        this.dirX = 0;
        this.dirY = 0;

        const Personalities = {
            ANALISTA: 0,
            EXPLORADOR: 1,
            CENTINELA: 2,
            PACIFISTA: 3,}
    
        this.personalityExp = [0, 0, 0, 0];
    
        this.currentPersonality = Personalities.EXPLORADOR;

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
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);  

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
        
        var tiempoCooldown = new Map([
            ['fist', 600], ['bate', 1000], ['espada', 800],
            ['pistola', 2], ['metralleta', 0.2], ['franco', 7],
            ['muro', 2], ['mina', 4], ['c4', 6]
        ]);
        var damageArmas = new Map([
            ['fist', 1], ['bate', 1], ['espada', 1],
            ['pistola', 5], ['metralleta', 2], ['franco', 30],
        ]);


        this.armas = new Map([
            ['fist', new armaMelee(this.scene, tiempoCooldown.get('fist'), damageArmas.get('fist'),'fist', this)],
            ['bate', new armaMelee(this.scene, tiempoCooldown.get('bate'), damageArmas.get('bate'),'bate', this)],
            ['espada', new armaMelee(this.scene, tiempoCooldown.get('espada'), damageArmas.get('espada'),'espada', this)],
            ['pistola', new armaDisparos(this.scene, tiempoCooldown.get('pistola'), damageArmas.get('pistola'),'pistola', this)],
            ['metralleta', new armaDisparos(this.scene, tiempoCooldown.get('metralleta'), damageArmas.get('metralleta'),'metralleta', this)],
            ['franco', new armaDisparos(this.scene, tiempoCooldown.get('franco'), damageArmas.get('franco'),'franco', this)],
            ['mina', new armaObjetosSpawneado(this.scene, tiempoCooldown.get('mina'), 'mina', this)],
            ['muro', new armaObjetosSpawneado(this.scene, tiempoCooldown.get('muro'), 'muro', this)],
            ['c4', new armaObjetosSpawneado(this.scene, tiempoCooldown.get('c4'), 'c4', this)],
        ])

        this.arma = this.armas.get('c4');
        this.arma.activate();
    }


    changeWeapon(newWeaponName)
    {
        this.arma.deactivate()
        this.arma = this.armas.get(newWeaponName)
        this.arma.activate()
    }

    preUpdate(t, dt)
    {
        this.movement()    
    }

    movement()
    {
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
            this.body.velocity.normalize().scale(this.speed);

        }
        else{
            this.body.setVelocity(0, 0);
            this.player.play('iddle' + this.key, true);
        }
    }

    receiveDamage(damage){
        if(!this.invencible)
        {
            this.life = this.life - damage;
        }
       
    }

    applyEffect(keyPotenciador){
       
        let aux;
        switch (keyPotenciador) {
            case 'botiquin':
                console.log("boti");
                this.life += this.maxLife / 2;
                if (this.life > this.maxLife) {
                    this.life = this.maxLife;
                }
                console.log(this.life);
                break;
            case 'velocidad':
                console.log("velo");
                this.aux = this.speed;
                this.speed = 280;
                this.scene.time.delayedCall(3000, () => {
                    this.speed = this.aux // Reducir la velocidad de nuevo después de 3 segundos
                });
                break;
            case 'vivu':
                console.log("vivu");
                this.aux = this.speed;
                this.speed = 0;
                this.scene.time.delayedCall(5000, () => {
                    this.speed = this.aux;
                });
                break;
            case 'invencible':
                console.log("inven");
                this.invulnerable = true;
                this.scene.time.delayedCall(5000, () => {
                    this.invulnerable = false;
                });
                break;
            default:
                break;
        }
        //this.scene.potenciadorSpawneado = false; // Marcar que el potenciador ha sido recogido
    }

    reload(){

        this.arma.reload();
    }

    getPlayer(){
        return this.player;
    }
    
    getPosition() {
        return { x: this.x, y: this.y };
    }

    getLife(){
        return this.life;
    }

    // da el punto en el medio del player, ya que getPosition da la esquina superior izq
    getCenterPoint(){
        return {x: this.x + 16, y: this.y + 16};
    }

    getPersonalityExp(personalityID){

        return this.personalityExp[personalityID];

    }

    
}