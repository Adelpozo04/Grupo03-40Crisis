import playerContenedor from '../Player/playerContenedor.js';
import Potenciador from '../Potenciador.js';

export default class VolcanLevel extends Phaser.Scene{

    constructor(){
        super({key: 'VolcanLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
        
        this.potenciadorSpawneado = false;
        this.potenciadorRecogido = false;  // Inicialmente se permite generar el primer potenciador

    }
    
    init(data){
        console.log(data);
    }
    
    preload(){
        
        this.load.tilemapTiledJSON('volcanTilemap', './Assets/JSON/MapaVolcan.json');

        this.load.image('patronesVolcanTilemap', './Assets/Sprites/Tilesets/Volcan/TileVolcan.png');

        this.load.spritesheet('mike', './Assets/Sprites/Jugador/Mike/Mike-Walk-SpriteSheett.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('zombie', './Assets/Sprites/Enemigos/Zombie/Zombie_walk-SpriteSheet.png', {frameWidth: 256, frameHeight: 256});
        this.load.spritesheet('skeleton', './assets//Sprites//Enemigos//Esqueleto//esqueleto_SpriteSheet.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});

        this.load.image('botiquin', './Assets/Sprites/Potenciadores/botiquin.png', {frameWidth: 128, frameHeight: 128});
        this.load.image('velocidad', './Assets/Sprites/Potenciadores/speed.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('vivu', './Assets/Sprites/Potenciadores/pillow.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('invencible', './Assets/Sprites/Potenciadores/shield.png', {frameWidth: 128, frameHeight: 128});
    }

    loadAnimations()
    {
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
            frames: this.anims.generateFrameNumbers('burgerWalk', {start: 0, end:2}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'attackburger',
            frames: this.anims.generateFrameNumbers('burgerAttack', {start: 0, end:7}),
            frameRate: 5
        })

        

    }


    create(){
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
       
        this.physics.add.collider(this.grupoBalas, this.collisionLayer, function(bala, enemigo){
            bala.destroy()
        }, null, this)
        

        //Creacion de entidades
        this.mike = new playerContenedor(this, 300, 300, 'mike', 0, -2000, -2000, 200, 150);
       
        //this.robot = new Robot(this, 700, 600, 'robot', this.mike);

        //this.lutano = new lutano(this, 600, 600, 'lutano', this.mike);

        //Se indica que colliders chocan entre si
        this.physics.add.collider(this.mike, this.collisionLayer);
        //this.physics.add.collider(this.lutano, this.collisionLayer);

        //Se crea la camara
        this.cameras.main.startFollow(this.mike);
        
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

        
        // Crear un spawner de enemigos en las coordenadas 
        const spawner = new EnemigoSpawner(this, 600, 700, this.mike);

        // Ejemplo de uso: generar una oleada de 5 enemigos de tipo 'zombie' cada 'x' tiempo
        spawner.spawnEnemies('zombie', 5, 3000);

        this.physics.add.collider(this.grupoBalas, spawner.getEnemyGroup(), function(bala, enemigo){
            
            enemigo.recibeDamage(bala.getDamage());
            bala.destroy();

        });

        this.physics.add.collider(this.grupoMunicionBalas, this.mike, function(ammo, player){
            console.log("se tocan jiji");

            ammo.destroyMyself();

            player.reload();

        });

        this.physics.add.collider(spawner.getEnemyGroup(), this.collisionLayer);

        // Detener la generación de enemigos después de un tiempo 
        this.time.delayedCall(15000, () => {
        spawner.stopSpawn();
        });

        // Limpiar todos los enemigos generados después de cierto tiempo 
        this.time.delayedCall(40000, () => {
        spawner.clearEnemies();
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


   

   
    update(t, dt){
        if(!this.potenciadorSpawneado && this.potenciadorRecogido)
        { 
          // setTimeout(() => {
                this.spawnPotenciador();
               
          //  }, 5000);
    
    
            
                   
        }

    }



}