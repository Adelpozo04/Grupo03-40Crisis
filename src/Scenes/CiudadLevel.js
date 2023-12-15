
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
import Enemigo from "../Enemies/enemigo.js";


export default class CiudadLevel extends Phaser.Scene{

    constructor(){
        super({key: 'CiudadLevel'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
        this.potenciadorSpawneado = false;
        this.potenciadorRecogido = false;  // Inicialmente se permite generar el primer potenciador
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){

       
    }
  

    create(data){

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

           
        this.enemySpawner1 = new EnemigoSpawner(this, 600, 400, this.mike, this.grupoEnemigos);
        //this.enemySpawner1 = new EnemigoSpawner(this, 1750, 400, this.mike);
        this.enemySpawner2 = new EnemigoSpawner(this, 200, 1320, this.mike, this.grupoEnemigos);
        this.enemySpawner3 = new EnemigoSpawner(this, 1750, 2400, this.mike, this.grupoEnemigos);
        this.enemySpawner4 = new EnemigoSpawner(this, 3000, 1320, this.mike, this.grupoEnemigos);
           
        console.log(this.enemySpawner1.getEnemyGroup());

        // Crear un grupo para almacenar todos los enemigos generados por los spawners
        this.grupoEnemigosTotales = this.add.group();
        this.grupoEnemigosTotales.add(this.enemySpawner1.getEnemyGroup());
        this.grupoEnemigosTotales.add(this.enemySpawner2.getEnemyGroup());
        this.grupoEnemigosTotales.add(this.enemySpawner3.getEnemyGroup());
        this.grupoEnemigosTotales.add(this.enemySpawner4.getEnemyGroup());

        this.enemySpawners();
    

        this.physics.add.collider(this.grupoBalas, this.grupoEnemigos, function(bala, enemigo){
            
            enemigo.recieveDamage(bala.getDamage());
            bala.destroy();

        });

        this.physics.add.collider(this.grupoMunicionBalas, this.mike, function(ammo, player){

            ammo.destroyMyself();

            player.reload();

        });


        this.physics.add.collider(this.grupoEnemigos, this.collisionLayer);
        
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
                   
                    this.potenciador = new Potenciador(this, spawnPointX, spawnPointY, potenciadorType, this.mike, this.enemy, this);
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


                    //delete potenciador le indica al mono que el potenciador se ha eliminado
                    this.physics.add.collider(this.mike, pot, ()=>{pot.enviarPotenciadorPlayer()}, null, this);
                    //this.physics.add.collider(this.grupoEnemigosTotales, pot, ()=>{pot.enviarPotenciadorEnemy()}, null, this);
  
                    const enemigos = this.grupoEnemigosTotales.getChildren();
                    console.log(this.grupoEnemigosTotales.getChildren()[0]);
                    // Iterar sobre los enemigos para aplicar el efecto del potenciador a cada uno
                   enemigos.forEach(enemigo => {
                   // Verificar si el potenciador colisiona con este enemigo específico
                   if (this.physics.overlap(this, enemigo)) {
                       enemigo.applyEffect(this.key); // Aplicar efecto del potenciador al enemigo
                       pot.enviarPotenciadorEnemy();
                   }
               });
                }




    addAmmoToGroup(newAmmo){
        this.grupoMunicionBalas.add(newAmmo);
    }

    addExplosiveToGroup(newExplosive){
        this.grupoExplosivos.add(newExplosive);
    }

    sendPoints(points){
        this.myUI.gainPoints(points);
        this.events.emit('cambiarCiudadPoints', points);
    }

    generateText(x, y, message, size){
        let ogText = this.add.text(x, y, message, 
            { fontFamily: 'TitleFont', fontSize: size, color: 'white' })
        this.textCreated = true;

        return ogText
    }

    changeInventory(currentPersonality){
        this.myUI.changeInventory(currentPersonality);
        this.myUI.changeInventorySelect(0);
    }

    changeInvenSelection(currentWea){
        this.myUI.changeInventorySelect(currentWea);
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

