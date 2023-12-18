
import armaDisparos from "../Armas/armaDisparos/armaDisparos.js";
import armaMelee from "../Armas/armaMelee.js";
import armaObjetosSpawneado from "../Armas/armaSpawneadora/armaObjetoSpawneado.js";

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

        this.key = key;

        this.life = life;
        this.maxLife = life;

        this.speed = speed;

        this.sleep = false;

        this.invencible = false;

        this.maxExp = 1200;

        this.dirX = 0;
        this.dirY = 0;

        this.changePerCooldown = 1;

        this.changePerBlock = false;

        this.Personalities = {
            ANALISTA: 0,
            EXPLORADOR: 1,
            CENTINELA: 2,
            PACIFISTA: 3,}
    
        this.personalityExp = [0, 1200, 0, 800];
    
        this.currentPersonality = this.Personalities.EXPLORADOR;

        this.currentWeapon = 0;

        this.disparosAmmo = 30;

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
        this.qKey = this.scene.input.keyboard.addKey('Q');
        this.eKey = this.scene.input.keyboard.addKey('E');

        this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) =>
        {

            if(deltaY > 0){
                this.changeWeaponAux(true);
            }
            else if(deltaY < 0){
                this.changeWeaponAux(false);
            }

        });


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
            ['fist', 0.6], ['bate', 1], ['espada', 0.8],
            ['pistola', 2], ['metralleta', 0.2], ['franco', 13],
            ['muro', 8], ['mina', 12], ['c4', 15],
            ['paralizador', 4], ['empuje', 0.4], ['varita', 20]
        ]);
        var damageArmas = new Map([
            ['fist', 1], ['bate', 1], ['espada', 50],
            ['pistola', 5], ['metralleta', 2], ['franco', 30],
            ['empuje', 0], ['varita', 0]
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
            ['paralizador', new armaObjetosSpawneado(this.scene, tiempoCooldown.get('paralizador'), 'paralizador', this)],
            ['empuje', new armaMelee(this.scene, tiempoCooldown.get('empuje'), damageArmas.get('empuje'), 'empuje', this)],
            ['varita', new armaDisparos(this.scene, tiempoCooldown.get('varita'), damageArmas.get('varita'), 'varita', this)]
        ])

        this.arma = this.armas.get('fist');

        this.arma.activate();
    }

    //Metodos de personalidades

    unlockPerChange(){
        this.changePerBlock = false;
    }

    changePersonality(right){

        this.changePerBlock = true;

        this.scene.time.addEvent({
            delay: 1000 * this.changePerCooldown,
            callback: this.unlockPerChange,
            callbackScope: this,
            loop: false

        })

        if(right){
            this.currentPersonality = (this.currentPersonality + 1) % 4;
        }
        else{
            if(this.currentPersonality == 0){
                this.currentPersonality = 3;
            }
            else{
                this.currentPersonality--;
            }

        }

        this.scene.changeInventory(this.currentPersonality);

        this.currentWeapon = 0;
        let name = this.weaponNameByPersonality();
        console.log(name);
        this.changeWeapon(name);

    }

    personalityInput(){
        if(!this.changePerBlock){
            if(this.eKey.isDown){
                this.changePersonality(true);
            }
            else if(this.qKey.isDown){
                this.changePersonality(false);
            }
        }
        
    }

    getCurrentPersonality(){
        return this.currentPersonality;
    }

    getPersonalityExp(personalityID){
        return this.personalityExp[personalityID];
    }

    getMaxExp(){
        return this.maxExp;
    }

    gainPersonalityExp(exp){

        if(this.personalityExp[this.currentPersonality] < this.maxExp){
            this.personalityExp[this.currentPersonality] += exp;

            if(this.personalityExp[this.currentPersonality] > this.maxExp){
                this.personalityExp[this.currentPersonality] = this.maxExp;
            }
        }
        

    }

    //Metodos de armas
    weaponNameByPersonality(){
        let weaponName = ' '

        if(this.currentPersonality == this.Personalities.ANALISTA){
            if(this.currentWeapon == 0){
                weaponName = 'muro';
            }
            else if(this.currentWeapon  == 1){
                weaponName = 'mina';
            }
            else if(this.currentWeapon  == 2){
                weaponName = 'c4';
            }
        }
        else if(this.currentPersonality == this.Personalities.CENTINELA){
            if(this.currentWeapon  == 0){
                weaponName = 'pistola';
            }
            else if(this.currentWeapon  == 1){
                weaponName = 'metralleta';
            }
            else if(this.currentWeapon  == 2){
                weaponName = 'franco';
            }
        }
        else if(this.currentPersonality == this.Personalities.EXPLORADOR){
            if(this.currentWeapon  == 0){
                weaponName = 'fist';
            }
            else if(this.currentWeapon  == 1){
                weaponName = 'bate';
            }
            else if(this.currentWeapon  == 2){
                weaponName = 'espada';
            }
        }
        else if(this.currentPersonality == this.Personalities.PACIFISTA){
            if(this.currentWeapon  == 0){
                weaponName = 'paralizador';
            }
            else if(this.currentWeapon  == 1){
                weaponName = 'empuje';
            }
            else if(this.currentWeapon  == 2){
                weaponName = 'varita';
            }
        }

        return weaponName;
    }

    changeWeaponAux(up){
        
        if(up){
            this.currentWeapon = (this.currentWeapon + 1) % 3;
        }
        else{
            if(this.currentWeapon == 0){
                this.currentWeapon = 2;
            }
            else{
                this.currentWeapon--;
            }

        }

        console.log(this.currentWeapon, this.getPersonalityExp(this.currentPersonality))

        if(this.currentWeapon == 1 && this.getPersonalityExp(this.currentPersonality) < this.maxExp / 3){
            this.currentWeapon = 0;
        }

        if(this.currentWeapon == 2 && this.getPersonalityExp(this.currentPersonality) < (this.maxExp * 2) / 3){
            this.currentWeapon = 0;
        }

        this.scene.changeInvenSelection(this.currentWeapon);
        this.changeWeapon(this.weaponNameByPersonality());
    }

    changeWeapon(newWeaponName)
    {
        this.arma.deactivate()
        //console.log(newWeaponName);
        this.arma = this.armas.get(newWeaponName)
        this.arma.activate()
    }

    getWeapon(){
        return this.arma;
    }

    getCurrentWeaponName(){
        return this.weaponNameByPersonality();
    }

    reloadDisparosAmmo(){
        this.disparosAmmo += 10;
        console.log(this.disparosAmmo);
    }

    getAmmo(){
        return this.disparosAmmo;
    }


    preUpdate(t, dt)
    {
        this.movement();
        this.personalityInput();
    }

    //Movimiento y fisicas
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

    //Potenciadores
    applyEffect(keyPotenciador){
        switch (keyPotenciador) {
            case 'botiquin':
                this.life += this.maxLife / 2;
                if (this.life > this.maxLife) {
                    this.life = this.maxLife;
                }
                break;
            case 'velocidad':
                this.aux = this.speed;
                this.speed = 280;
                this.scene.time.delayedCall(6000, () => {
                    this.speed = this.aux // Reducir la velocidad de nuevo después de 3 segundos
                });
                break;
            case 'vivu':
                this.aux = this.speed;
                this.speed = 0;
                this.scene.time.delayedCall(5000, () => {
                    this.speed = this.aux;
                });
                break;
            case 'invencible':
                this.invulnerable = true;
                this.scene.time.delayedCall(5000, () => {
                    this.invulnerable = false;
                });
                break;
            default:
                break;
        }
    }

    //Gets generales
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
}