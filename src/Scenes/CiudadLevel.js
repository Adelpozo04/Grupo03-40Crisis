
import playerContenedor from '../Player/playerContenedor.js';
import Potenciador from '../Potenciador.js';
import Robot from '../Enemies/robot.js'
import EnemigoBasico from '../Enemies/enemigoBasico.js';
import lutano from '../Enemies/lutano.js';
import Mono from '../Enemies/mono.js';
import cepo from '../Enemies/cepo.js';
import UIManager from '../UI/uiManager.js';
import Bala from '../Armas/balas.js'
import EnemigoSpawner from '../enemySpawner.js';
import municionBalas from '../Armas/municionBalas.js';
import explosive from '../Armas/explosive.js';


export default class CiudadLevel extends Phaser.Scene{

    constructor(hatID){
        super({key: 'CiudadLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
        this.potenciadorSpawneado = false;
        this.potenciadorRecogido = false;  // Inicialmente se permite generar el primer potenciador
        this.hatID = hatID;
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){

        //Se carga el Json
        this.load.tilemapTiledJSON('ciudadTilemap', './Assets/JSON/MapaCiudad.json');

        //Se carga el png con los tiles que usa el Json
        this.load.image('patronesCiudadTilemap', './Assets/Sprites/Tilesets/Ciudad/tilemapCiudadExtruded.png');

        //Cargado de spritessheets de entidades del juego
        this.load.spritesheet('mike', './Assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './Assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('zombieattack', './Assets/Sprites/Enemigos/Zombie/Zombie-attack-SpriteSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('skeleton', './assets//Sprites//Enemigos//Esqueleto//esqueleto_SpriteSheet.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('burger', './Assets/Sprites/Enemigos/Hamburguesa/hamburguesa-spriteSheet.png', {frameWidth: 64, frameHeight:64})
        this.load.spritesheet('robot', './Assets/Sprites/Enemigos/Robot/Robot-walk-SpriteSheet.png',{frameWidth: 256, frameHeight: 256})
        this.load.spritesheet('lutano', './Assets/Sprites/Enemigos/Lutano/Lutano-Walk-SpriteSheet.png',{frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('lutanoAttack', './Assets/Sprites/Enemigos/Lutano/Lutano-attack-SpriteSheet.png',{frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('cepo', './Assets/Sprites/Enemigos/Lutano/Bear_Trap.png',{frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('caracol', './Assets/Sprites/Enemigos/Caracol/Caracol-Walk-SpriteSheet.png',{frameWidth: 48, frameHeight: 32});
        this.load.spritesheet('caracolattack', './Assets/Sprites/Enemigos/Caracol/Caracol-Attack-SpriteSheet.png',{frameWidth: 512, frameHeight: 768});
        this.load.spritesheet('mono', './Assets/Sprites/Enemigos/Mono/Monkey-walk-SpriteSheet.png',{frameWidth: 48, frameHeight: 48});
        //this.load.spritesheet('monopick', './Assets/Sprites/Enemigos/Caracol/Caracol-Attack-SpriteSheet.png',{frameWidth: 512, frameHeight: 768});
        this.load.spritesheet('deathEnemy', './Assets/Sprites/Enemigos/Enemies-death-SpriteSheet.png',{frameWidth: 32, frameHeight: 32});
        
        //Cargado de imagenes de objetos del juego

        this.load.image('botiquin', './Assets/Sprites/Potenciadores/botiquin.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('velocidad', './Assets/Sprites/Potenciadores/speed.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('vivu', './Assets/Sprites/Potenciadores/pillow.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('invencible', './Assets/Sprites/Potenciadores/shield.png', {frameWidth: 64, frameHeight: 64});

        //Cargado de armas y balas

        //Centinela
        this.load.image('pistola', './Assets/Sprites/Armas/pistola.png');
        this.load.image('metralleta', './Assets/Sprites/Armas/machinegun.png');
        this.load.image('franco', './Assets/Sprites/Armas/franco.png');
        this.load.image('bala', './Assets/Sprites/Armas/bala.png');
        this.load.image('bulletAmmo', './Assets/Sprites/Armas/munitionBox_Sprite.png');
        //Explorador
        this.load.image('fist', './Assets/Sprites/Armas/fist.png');
        this.load.image('bate', './Assets/Sprites/Armas/bat.png');
        this.load.image('espada', './Assets/Sprites/Armas/sword.png');
        //Analista
        this.load.image('muro', './Assets/Sprites/Armas/muro.png');
        this.load.image('mina', './Assets/Sprites/Armas/mine.png');
        this.load.image('c4', './Assets/Sprites/Armas/c4.png');
        this.load.spritesheet('explosion', './Assets/Sprites/Armas/explosion.png', {frameWidth: 32, frameHeight: 32});
        //Pacifista
        this.load.image('paralizador', './Assets/Sprites/Armas/paralizador.png');
        this.load.image('empuje', './Assets/Sprites/Armas/empuje.png');
        this.load.image('varita', './Assets/Sprites/Armas/varita.png');

        //Cargado de imagenes de UI de juego
        this.load.spritesheet('heart', './Assets/Sprites/UI/PlayGame/UI_Heart_SpriteSheet.png',{frameWidth: 64, frameHeight: 64});

    }
  
    loadAnimations()
    {
        this.anims.create({
            key: 'walkzombie',
            frames: this.anims.generateFrameNumbers('zombie', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'attackzombie',
            frames: this.anims.generateFrameNumbers('zombieattack', {start: 0, end: 3}),
            frameRate: 8
        });
        this.anims.create({
            key: 'walkskeleton',
            frames: this.anims.generateFrameNumbers('skeleton', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'attackskeleton',
            frames: this.anims.generateFrameNumbers('skeleton', {start: 4, end: 10}),
            frameRate: 8
        });
        this.anims.create({
            key: 'walkburger',
            frames: this.anims.generateFrameNumbers('burger', {start: 8, end:10}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'attackburger',
            frames: this.anims.generateFrameNumbers('burger', {start: 0, end:7}),
            frameRate: 10
        });
        this.anims.create({
            key: 'walkrobot',
            frames: this.anims.generateFrameNumbers('robot', {start: 0, end:3}),
            frameRate: 5
        });
        this.anims.create({
            key: 'walklutano',
            frames: this.anims.generateFrameNumbers('lutano', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'attacklutano',
            frames: this.anims.generateFrameNumbers('lutanoAttack', {start: 0, end:1}),
            frameRate: 10
        })
        this.anims.create({
            key: 'attackcepo',
            frames: this.anims.generateFrameNumbers('cepo', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'walkcaracol',
            frames: this.anims.generateFrameNumbers('caracol', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'attackcaracol',
            frames: this.anims.generateFrameNumbers('caracolattack', {start: 0, end:10}),
            frameRate: 10
        })
        this.anims.create({
            key: 'walkmono',
            frames: this.anims.generateFrameNumbers('mono', {start: 0, end: 1}),
            frameRate: 7,
            repeat: -1
        })
        this.anims.create({
            key: 'enemydeath',
            frames: this.anims.generateFrameNumbers('deathEnemy', {start: 0, end: 6}),
            frameRate: 10
        })
    
        

    }

    create(data){
        this.loadAnimations();

        //Creacion del tilemap a partir de los datos cargados
        this.map = this.make.tilemap({ 
			key: 'ciudadTilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        //Se indica el Json, el png de tiles, el tamaño de los tiles y el espaciado del tile con los bordes y el margen entre sprites
        const myTile = this.map.addTilesetImage('tilemapCiudad', 'patronesCiudadTilemap', 32, 32, 1, 2);

        //Creacion de las Layers del mapa
        this.groundLayer = this.map.createLayer('Suelo', myTile);

        this.groundUpLayer = this.map.createLayer('SueloEncima', myTile);

        this.collisionLayer = this.map.createLayer('Colisiones', myTile);

        //Se le agregan las colisiones a la layer
        this.collisionLayer.setCollisionByExclusion([-1], true);

        
        // grupo de balas
        this.grupoBalas = this.add.group({
            classType: Bala,
            maxSize: 50
        })

        this.grupoMunicionBalas = this.add.group({
            classType: municionBalas,
            maxSize: 50
        })

        this.grupoEnemigos = this.add.group({
            classType: EnemigoBasico,
            runChildUpdate: true,

        })

        this.grupoExplosivos = this.add.group({
            classType: explosive,
            runChildUpdate: true,

        })
       
        this.physics.add.collider(this.grupoBalas, this.collisionLayer, function(bala, enemigo){
            bala.destroy()
        }, null, this)
        

        //Creacion de entidades
        this.mike = new playerContenedor(this, 300, 300, 'mike', data, -2000, -2000, 200, 150);

        
       
        //this.robot = new Robot(this, 700, 600, 'robot', this.mike);

        //this.lutano = new lutano(this, 600, 600, 'lutano', this.mike);

        //Se indica que colliders chocan entre si
        this.physics.add.collider(this.mike, this.collisionLayer);
        //this.physics.add.collider(this.lutano, this.collisionLayer);

        //Se crea la camara
        this.camera = this.cameras.main.startFollow(this.mike);
        
        //Se crean layers por encima de las entidades
        this.objectsUpLayer = this.map.createLayer('ObjetosPorEncima', myTile);

        //Se ajusta el tamaño del mapa
        this.collisionLayer.setScale(1.35, 1.35);
        this.groundLayer.setScale(1.35, 1.35);
        this.groundUpLayer.setScale(1.35, 1.35);
        this.objectsUpLayer.setScale(1.35, 1.35);

        const potenciadorTypes = {
            BOTIQUIN: 'botiquin', 
            VELOCIDAD: 'velocidad', 
            SLEEP: 'vivu', 
            INVENCIBLE: 'invencible',
        };

           
        this.enemySpawner1 = new EnemigoSpawner(this, 600, 400, this.mike);
        //this.enemySpawner1 = new EnemigoSpawner(this, 1750, 400, this.mike);
        this.enemySpawner2 = new EnemigoSpawner(this, 200, 1320, this.mike);
        this.enemySpawner3 = new EnemigoSpawner(this, 1750, 2400, this.mike);
        this.enemySpawner4 = new EnemigoSpawner(this, 3000, 1320, this.mike);
           

        // Crear un grupo para almacenar todos los enemigos generados por los spawners
        this.grupoEnemigosTotales = this.add.group();
        this.grupoEnemigosTotales.add(this.enemySpawner1.getEnemyGroup());
        this.grupoEnemigosTotales.add(this.enemySpawner2.getEnemyGroup());
        this.grupoEnemigosTotales.add(this.enemySpawner3.getEnemyGroup());
        this.grupoEnemigosTotales.add(this.enemySpawner4.getEnemyGroup());

        this.enemySpawners();
           
        
        //const spawnerLocations = EnemigoSpawner.createSpawnersPos(this.map, this.camera, 3);
       
       /* spawnerLocations.forEach((location) => {
            this.newSpawner = new EnemigoSpawner(this, location.x, location.y);
            this.newSpawner.spawnEnemies('zombie', 5, 3000);
        }); */
    


        this.mina = new explosive(this, 400, 400, 'mina', 0, this.grupoEnemigosTotales);

        this.physics.add.collider(this.grupoBalas, this.grupoEnemigosTotales, function(bala, enemigo){
            
            enemigo.recibeDamage(bala.getDamage());
            bala.destroy();

        });

        this.physics.add.collider(this.grupoMunicionBalas, this.mike, function(ammo, player){

            ammo.destroyMyself();

            player.reload();

        });


        this.physics.add.collider(this.grupoEnemigosTotales, this.collisionLayer);

        // Detener la generación de enemigos después de un tiempo 
        this.time.delayedCall(15000, () => {
        spawner.stopSpawn();
        });


        
       this.spawnPotenciador();    

        this.myUI = new UIManager(this, 'UIManager', this.mike);

        this.myUI.setScrollFactor(0);

    }
    spawnPotenciador() {

        
        const potenciadorTypes = {
            BOTIQUIN: 'botiquin', 
            VELOCIDAD: 'velocidad', 
            SLEEP: 'vivu', 
            INVENCIBLE: 'invencible',
        };
                    let aux = Phaser.Math.RND.between(0, 3);
                    let potenciadorType = Object.values(potenciadorTypes)[aux];
                    const spawnPoints = [
                        { x: 600, y: 600 },
                        { x: 600, y: 700 },
                        { x: 700, y: 600 },
                        { x: 700, y: 700 },
                    //Añadir luego las coordenadas correctas
                    ];
        
                    let spawnPoint = Phaser.Math.RND.pick(spawnPoints);
                    let spawnPointX = spawnPoint.x;
                    let spawnPointY = spawnPoint.y;
                   
                    this.potenciador = new Potenciador(this, spawnPointX, spawnPointY, potenciadorType, this.mike, this.skeleton, this);
                    let pot = this.potenciador;
                    this.potenciadorSpawneado = true;
                    this.potenciadorRecogido = false;
                
     
                    this.tweens.add({
                        targets: this.potenciador,
                        y: this.potenciador.y - 30,
                        duration: 2000,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1,
                        delay: 10
                    })


                    console.log("aparecio potenciador");

                    this.setPotenciador();

                    //delete potenciador le indica al mono que el potenciador se ha eliminado
                    this.physics.add.collider(this.mike, pot, ()=>{pot.enviarPotenciadorPlayer()}, null, this);
                    this.physics.add.collider(this.grupoEnemigos, pot, ()=>{pot.enviarPotenciadorEnemy()}, null, this);
                    //; this.skeleton.deletePotenciador() esto estaba dentro de las llaves ??
  
                }//,


                //callbackScope: this,
               // loop: false,
         //   });
 
        //}
       

     //   this.myUI = new UIManager(this, 'UIManager', this.mike);

     //   this.myUI.setScrollFactor(0);

   // }

   //Le pasa la info del potenciador a cualquier entidad que sea un mono
   setPotenciador(){

   //this.skeleton.setPotenciador(this.potenciador);
   }
   applyEffectPlayer() {
      
     if(!this.potenciadorSpawneado && this.potenciadorRecogido)
        { 
          // setTimeout(() => {
                this.spawnPotenciador();
               
          //  }, 5000);        
        }
   
          
   }

    addAmmoToGroup(newAmmo){
        this.grupoMunicionBalas.add(newAmmo);
    }

    addExplosiveToGroup(newExplosive){
        this.grupoExplosivos.add(newExplosive);
    }

    sendPoints(points){
        this.myUI.gainPoints(points);
    }

    generateText(x, y, message, size){
        let ogText = this.add.text(x, y, message, 
            { fontFamily: 'TitleFont', fontSize: size, color: 'white' })
        this.textCreated = true;

        return ogText
    }


    enemySpawners() {
        const allSpawners = [this.enemySpawner1, this.enemySpawner2, this.enemySpawner3, this.enemySpawner4];

        // Verifica la colisión entre la cámara y cada uno de los spawners
        allSpawners.forEach((spawner) => {
            const isColliding = Phaser.Geom.Intersects.RectangleToRectangle(this.camera.worldView, spawner.getBounds());
            if (!isColliding) {
                // Si hay colisión, spawnear enemigos
                spawner.spawnEnemies(5, 3000); // Ajusta el número y tiempo según lo que necesites
                // Limpiar todos los enemigos generados después de cierto tiempo 
                this.time.delayedCall(40000, () => {
                    spawner.clearEnemies();
                });     
            }
        });
    };

    

    update(dt, t){
    if(!this.potenciadorSpawneado && this.potenciadorRecogido)
    { 
      // setTimeout(() => {
            this.spawnPotenciador();
           
      //  }, 5000);  
            
    }

   }
}

